#!/bin/bash
# runs unit tests and coverage report


export NODE_ENV=${NODE_ENV:-development}

echo Running Tests...

cd /react
exec npm run test
