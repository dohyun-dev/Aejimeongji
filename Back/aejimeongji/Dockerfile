FROM openjdk:11-jdk

ARG JAR_FILE=./build/libs/*SNAPSHOT.jar

COPY ${JAR_FILE} server.jar

ENTRYPOINT ["java", "-Duser.timezone=Asia/Seoul", "Dspring.profiles.active=prod", "-jar", "/server.jar"]