#!/bin/bash

echo -e "\nRedux Docker Boilerplate"

echo ------------------------

echo -e "\nProject Name:"
read project_name

echo -e "\nBrief Description:"
read project_description

echo -e "\nAuthor Name:"
read author_name

echo -e "\nAuthor Email:"
read author_email
#lowercase and remove spaces
author_email=`echo "$author_email" | tr '[:upper:]' '[:lower:]' | tr -d '[:space:]'`

echo -e "\nBrowser Port: (Skipping defaults to port 2000)"
read browser_port
browser_port=`echo $browser_port | sed "s/[^0-9]*//g"`
if [ "$browser_port" == "" ]; then
    browser_port=2000
fi

echo -e "\n--- Project Config ---"
echo "Project Name: $project_name"
echo "Project Description: $project_description"
echo "Author Name: $author_name"
echo "Author Email: $author_email"
echo "Browser Port: $browser_port"

echo
read -p "Everything look good? (Y/n) "
if [[ $REPLY =~ ^[Yy]$ ]]
then
    echo
    echo --- Creating Project ---
else
    echo
    echo "Let's start from the top"
    echo
    exec ./init.sh
fi


# do dangerous stuff
#replace spaces with dashes for project name
safe_name=`echo $project_name | tr ' ' '-'`
#lowercase it and trim
safe_name=`echo "$safe_name" | tr '[:upper:]' '[:lower:]' | tr -d '[:space:]'`
safe_description=`echo "$project_description" | tr '[:upper:]' '[:lower:]' | tr -d '[:space:]'`

#create and move to project repo
cd ..
mkdir $safe_name
cp -rp ./redux-docker-boilerplate/. `echo "./$safe_name"`
cd `echo "./$safe_name"`
rm -rf docs .git
rm init.sh README.md
mv readme_template.txt README.md


# write project name
find -type f -name '*' -exec sed -i "s/BOILERPLATE-PROJECT-NAME/$safe_name/g" {} +

# write project description
find -type f -name '*' -exec sed -i "s/BOILERPLATE-PROJECT-DESCRIPTION/$project_description/g" {} +

#write author
find -type f -name '*' -exec sed -i "s/BOILERPLATE-AUTHOR/$author_name/g" {} +

#write email
find -type f -name '*' -exec sed -i "s/BOILERPLATE-EMAIL/$author_email/g" {} +

#write browser port
find -type f -name '*' -exec sed -i "s/BOILERPLATE-PORT/$browser_port/g" {} +

chmod 777 `echo "./../$safe_name"`


echo Building Docker Container...
echo this may take a few minutes
./docker/build-container.sh >/dev/null

echo
echo "--- \"$project_name\" Creation Complete ---"
echo "directory created: ./../$safe_name"

echo
echo "To run dev server, copy and run these commands:"
echo ">>> cd ./../$safe_name"
echo ">>> npm install --save-dev"
echo ">>> npm run dev"
echo
echo "To run the app in a docker container:"
echo ">>> cd ./../$safe_name"
echo ">>> ./docker/dev-server.sh"
echo
echo "Then navigate to http://localhost:$browser_port in your web browser"
echo
