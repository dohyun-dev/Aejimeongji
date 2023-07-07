DOCKER_IMAGE_NAME=tobeykwon/aejimeongji-server

echo "도커 이미지 다운"
docker pull $DOCKER_IMAGE_NAME

echo "기존 컨테이너 종료 및 삭제"
docker stop $DOCKER_IMAGE_NAME
docker rmi -f $DOCKER_IMAGE_NAME

echo "도커 컨테이너 실행"
docker run -itd -p 8080:8080 $DOCKER_IMAGE_NAME
