package com.jinloes;

import java.net.URI;
import java.util.Map;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.google.common.collect.ImmutableList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.oauth2.client.OAuth2RestTemplate;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

/**
 */
@RestController
@RequestMapping("/registration")
public class RegistrationController {

    @Autowired private OAuth2RestTemplate oAuth2RestTemplate;

    @RequestMapping(method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    public void registerUser(@RequestBody User user,
            @RequestHeader("X-XSRF-TOKEN") String csrfToken) {
        /*oAuth2RestTemplate.postForObject(URI.create("http://localhost:9090/uaa/users"), user,
        Map.class);*/
        HttpHeaders headers = new HttpHeaders();
        //headers.put("X-CSRF-TOKEN", ImmutableList.of(csrfToken));
        HttpEntity<User> entity = new HttpEntity<User>(user, headers);
        new RestTemplate().exchange(URI.create("http://localhost:9090/uaa/users"),
                HttpMethod.POST, entity, Map.class);
    }

    private static class User {
        private String username;
        private String password;
        private String email;

        @JsonCreator
        public User(@JsonProperty("email") String email, @JsonProperty("password") String password,
                @JsonProperty("username") String username) {
            this.email = email;
            this.password = password;
            this.username = username;
        }

        public String getEmail() {
            return email;
        }

        public String getPassword() {
            return password;
        }

        public String getUsername() {
            return username;
        }
    }
}
