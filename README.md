# Redux Docker Boilerplate

This project includes an `init.sh` script that automates setup of a Redux application developed with docker.

When you run the `init.sh` script, you will be prompted for the following items:

    1. Project Name
    2. Author Name
    3. Author Email
    4. Browser Port (defaults to 2000)

## Requirements
 * [Docker](https://docs.docker.com/engine/installation/) must be installed


## Project Initialization
### Example: "Test Project"
```
>>>me: ~/redux-docker-boilerplate$ ./init.sh
Redux Docker Boilerplate
------------------------

Project Name:
Test Project

Brief Description:
Demo the boilerplate init script.

Author Name:
Mac Gainor

Author Email:
mac.gainor@gmail.com

Browser Port: (Skipping defaults to port 2000)
3000

--- Project Config ---
Project Name: Test Project
Project Description: Demo the boilerplate init script.
Author Name: Mac Gainor
Author Email: mac.gainor@gmail.com
Browser Port: 3000

Everything look good? (Y/n) Y

--- Creating Project ---
Building Docker Container...
this may take a few minutes

--- "Test Project" Creation Complete ---
directory created: ./../test-project

To run dev server, copy and run these commands:
>>> cd ./../test-project
>>> ./docker/dev-server.sh

Then navigate to http://localhost:3000 in your web browser
```
### Default Browser Output
![alt text](https://github.com/mac-s-g/redux-docker-boilerplate/blob/master/docs/default-index.png?raw=true)

## Help
### Permission Errors
If docker requires root permissions, then prefix init command with `sudo `.
```
sudo ./init.sh
...
sudo ./docker/dev-server.sh
```

### Setup Environment
Project initialization was tested in a Linux Environment.  Further work may be required to support Windows and Mac.

## To Do's

* Improve input validation in `init.sh`
* Fine tune the set of dependencies that are included by default
