# todo-list
A To-Do application

Building a single page web application using AngularJS and Spring Boot.
UI Server - AngularJS with Spring Boot server
Auth Server - Spring Boot using OAuth2

Get Access Token

 - curl -X POST -u acme:acmesecret http://localhost:9090/uaa/oauth/token -H "Accept: application/json" -d "password=user&username=user&grant_type=password&scope=openid&client_secret=acmesecret&client_id=acme"

