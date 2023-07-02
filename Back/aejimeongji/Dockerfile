FROM openjdk:11-jdk

ARG JAR_FILE=build/libs/*.jar

COPY ${JAR_FILE} server.jar

ENTRYPOINT ["java", "-Duser.timezone=Asia/Seoul", "-jar", "/server.jar"]