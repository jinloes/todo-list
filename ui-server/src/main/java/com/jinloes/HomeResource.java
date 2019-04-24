package com.jinloes;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.jinloes.todolist.ErrorCode;
import com.jinloes.todolist.resources.ErrorResource;
import com.jinloes.todolist.resources.UserResource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.client.OAuth2RestTemplate;
import org.springframework.security.oauth2.client.resource.OAuth2AccessDeniedException;
import org.springframework.security.oauth2.client.token.AccessTokenProvider;
import org.springframework.security.oauth2.client.token.DefaultAccessTokenRequest;
import org.springframework.security.oauth2.client.token.grant.password
        .ResourceOwnerPasswordResourceDetails;
import org.springframework.security.oauth2.common.OAuth2AccessToken;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by jinloes on 3/10/15.
 */
@RestController
public class HomeResource {
    @RequestMapping(value = "/resource")
    public Map<String, Object> home() {
        Map<String, Object> model = new HashMap<String, Object>();
        model.put("id", UUID.randomUUID().toString());
        model.put("content", "Hello World");
        return model;
    }

    @Autowired private OAuth2RestTemplate restTemplate;
    @Autowired private AccessTokenProvider accessTokenProvider;
    @Autowired private ApplicationContext context;

    @RequestMapping(value = "/token", method = RequestMethod.POST)
    public UserResource login(@RequestBody LoginCredentials credentials) {
        ResourceOwnerPasswordResourceDetails details = (ResourceOwnerPasswordResourceDetails)
                context.getBean("resourceOwnerPasswordResourceDetails");
        details.setUsername(credentials.getUsername());
        details.setPassword(credentials.getPassword());
        OAuth2AccessToken token = accessTokenProvider.obtainAccessToken(details, new
                DefaultAccessTokenRequest());
        restTemplate.getOAuth2ClientContext().setAccessToken(token);
        UserResource user = restTemplate.getForObject("http://localhost:9090/uaa/user", UserResource.class);
        return user;
    }

    public static class LoginCredentials {
        private final String username;
        private final String password;

        @JsonCreator
        public LoginCredentials(@JsonProperty("username") String username,
                @JsonProperty("password") String password) {
            this.username = username;
            this.password = password;
        }

        public String getUsername() {
            return username;
        }

        public String getPassword() {
            return password;
        }
    }

    @ExceptionHandler(OAuth2AccessDeniedException.class)
    public ResponseEntity<ErrorResource> handleInvalidGrant(OAuth2AccessDeniedException e) {
        return new ResponseEntity<>(
                new ErrorResource(ErrorCode.INVALID_CREDENTIALS), HttpStatus.UNAUTHORIZED);
    }
}
