#!/usr/bin/env bash

echo "Docker build started"
docker-compose --project-directory=. -f docker-compose.dev.yml build
docker-compose --project-directory=. -f docker-compose.dev.yml push
echo "Docker build completed"
