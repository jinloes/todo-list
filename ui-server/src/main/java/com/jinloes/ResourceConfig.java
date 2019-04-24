package com.jinloes;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Scope;
import org.springframework.security.oauth2.client.OAuth2ClientContext;
import org.springframework.security.oauth2.client.OAuth2RestTemplate;
import org.springframework.security.oauth2.client.resource.OAuth2ProtectedResourceDetails;
import org.springframework.security.oauth2.client.token.grant.code.AuthorizationCodeResourceDetails;
import org.springframework.security.oauth2.client.token.grant.password.ResourceOwnerPasswordResourceDetails;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableOAuth2Client;

import java.util.Arrays;

@Configuration
@EnableOAuth2Client
public class ResourceConfig {
    /*@Bean
    public OAuth2ProtectedResourceDetails sparklr() {
        AuthorizationCodeResourceDetails details = new AuthorizationCodeResourceDetails();
        details.setId("sparklr/tonr");
        details.setClientId("tonr");
        details.setClientSecret("secret");
        details.setAccessTokenUri("localhost:9090/uaa/oauth/token");
        details.setUserAuthorizationUri("localhost:9090/uaa/oauth/authorize");
        details.setScope(Arrays.asList("read", "write"));
        return details;
    }*/

    @Bean
    @Scope("prototype")
    public ResourceOwnerPasswordResourceDetails resourceOwnerPasswordResourceDetails() {
        ResourceOwnerPasswordResourceDetails details = new ResourceOwnerPasswordResourceDetails();
        details.setAccessTokenUri("http://localhost:9090/uaa/oauth/token");
        details.setClientId("acme");
        details.setClientSecret("acmesecret");
        return details;
    }

    @Bean
    public OAuth2RestTemplate sparklrRestTemplate(OAuth2ClientContext clientContext) {
        return new OAuth2RestTemplate(resourceOwnerPasswordResourceDetails(), clientContext);
    }
}
