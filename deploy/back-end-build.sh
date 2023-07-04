#!/bin/bash

BACKEND_HOME=$JENKINS_HOME/workspace/애지멍지/Back/aejimeongji
DOCKER_HUB_ID=tobeykwon
DOCKER_IMAGE_NAME=aejimeongji-serverㅠ마

echo "<<빌드 시작>>"
cd $JENKINS_HOME/workspace/애지멍지/Back/aejimeongji
./gradlew clean build

echo "<<도커 이미지 생성>>"
docker build -t $DOCKER_HUB_ID/$DOCKER_IMAGE_NAME .
echo "<<도커 허브에 이미지 푸시>>"
docker push $DOCKER_HUB_ID/$DOCKER_IMAGE_NAME
