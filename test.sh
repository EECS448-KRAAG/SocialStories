#!/bin/sh

echo "Running Classes++ Test Suite"
echo "Make sure to quit the interactive test runner from the frontend to continue on to backend tests\n\n\n"

sleep 2

cd social-stories-frontend
npm test

echo "Rebuilding backend image"
cd ..
docker-compose build

echo "\n\nRunning backend tests\n\n"

docker-compose run backend npm test
docker-compose down