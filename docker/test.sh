#!/bin/bash
# runs webpack in react container

NODE_ENV=${1:-dev_server}
echo "Running with NODE_ENV=$NODE_ENV"

# stop and remove the containers if they are running
stop_and_remove_container()
{
    docker stop BOILERPLATE-PROJECT-NAME
    docker rm BOILERPLATE-PROJECT-NAME
}
stop_and_remove_container || true

# run the phase3_app container
docker run \
    -v $(pwd)/src:/react/src \
    -v $(pwd)/dev-server:/react/dev-server \
    -v $(pwd)/docker:/react/docker \
    -v $(pwd)/webpack:/react/webpack \
    -v $(pwd)/coverage:/react/coverage \
    -v $(pwd)/test:/react/test \
    --name=BOILERPLATE-PROJECT-NAME \
    -e NODE_ENV=$NODE_ENV \
    --publish BOILERPLATE-PORT:BOILERPLATE-PORT \
    --entrypoint=/react/docker/entrypoints/test.sh \
    -t BOILERPLATE-PROJECT-NAME