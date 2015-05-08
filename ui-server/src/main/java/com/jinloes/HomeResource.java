package com.jinloes;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.google.common.collect.Lists;
import com.google.common.collect.Maps;
import org.apache.commons.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.security.oauth2.client.OAuth2RestTemplate;
import org.springframework.security.oauth2.client.token.AccessTokenProvider;
import org.springframework.security.oauth2.client.token.AccessTokenRequest;
import org.springframework.security.oauth2.client.token.DefaultAccessTokenRequest;
import org.springframework.security.oauth2.client.token.grant.password.ResourceOwnerPasswordResourceDetails;
import org.springframework.security.oauth2.common.OAuth2AccessToken;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

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

    @RequestMapping(value = "/test", method = RequestMethod.POST)
    public Map login(@RequestBody LoginCredentials credentials) {
        ResourceOwnerPasswordResourceDetails details = (ResourceOwnerPasswordResourceDetails)
                context.getBean("resourceOwnerPasswordResourceDetails");
        details.setUsername(credentials.getUsername());
        details.setPassword(credentials.getPassword());
        OAuth2AccessToken token = accessTokenProvider.obtainAccessToken(details, new DefaultAccessTokenRequest());
        restTemplate.getOAuth2ClientContext().setAccessToken(token);
        Map map = restTemplate.getForObject("http://localhost:9090/uaa/user", Map.class);
        return map;
    }

    public static class LoginCredentials {
        private final String username;
        private final String password;

        @JsonCreator
        public LoginCredentials(@JsonProperty("username") String username, @JsonProperty("password") String password) {
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
}
