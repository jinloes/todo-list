# todo-list
A To-Do application

Building a single page web application to explore AngularJS, Spring Boot, and Gradle.
UI Server - AngularJS with Spring Boot and embedded tomcat
Auth Server - Spring Boot using OAuth2 and embedded tomcat

Get Access Token

 - curl -X POST -u acme:acmesecret http://localhost:9090/uaa/oauth/token -H "Accept: application/json" -d "password=user&username=user&grant_type=password&scope=openid&client_secret=acmesecret&client_id=acme"


 Error Codes

  - ERR-01 (Invalid Credentials)

