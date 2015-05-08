package com.jinloes;

import java.io.IOException;
import java.security.Principal;

import javax.annotation.PostConstruct;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.databind.ser.impl.SimpleFilterProvider;
import com.fasterxml.jackson.datatype.joda.JodaModule;
import com.jinloes.data.service.UserConverter;
import com.jinloes.data.service.UserRepository;
import com.jinloes.model.User;
import com.mongodb.Mongo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.data.rest.webmvc.config.RepositoryRestMvcConfiguration;
import org.springframework.hateoas.Resource;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.oauth2.config.annotation.configurers
        .ClientDetailsServiceConfigurer;
import org.springframework.security.oauth2.config.annotation.web.configuration
        .AuthorizationServerConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configuration
        .EnableAuthorizationServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.security.oauth2.config.annotation.web.configuration
        .ResourceServerConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configurers
        .AuthorizationServerEndpointsConfigurer;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;

import cz.jirutka.spring.embedmongo.EmbeddedMongoBuilder;
import de.flapdoodle.embed.mongo.distribution.Version;

;

/**
 * Created by jinloes on 3/10/15.
 */
@SpringBootApplication
@EnableResourceServer
@RestController
public class AuthserverApplication extends RepositoryRestMvcConfiguration {

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserConverter userConverter;

    public static void main(String[] args) {
        SpringApplication.run(AuthserverApplication.class, args);
    }

    @RequestMapping("/user")
    public Resource user(Principal principal) {
        return userConverter.convert((User) userDetailsService.loadUserByUsername(principal
                .getName()));
    }

    @PostConstruct
    public void setUp() {
        try {
            User user = new User("user@email.com", "user", "user");
            userRepository.save(user);
        } catch (Exception e) {
            throw new RuntimeException("Failed to start embedded mongo.", e);
        }
    }

    @Bean(destroyMethod = "close")
    public Mongo mongo() throws IOException {
        return new EmbeddedMongoBuilder()
                .version(Version.Main.PRODUCTION.asInDownloadPath())
                .bindIp("127.0.0.1")
                .build();
    }

    @Bean
    @Primary
    public ObjectMapper objectMapper() {
        ObjectMapper mapper = new ObjectMapper()
                .registerModule(new JodaModule())
                .configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, false)
                .configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false)
                .configure(DeserializationFeature.USE_BIG_INTEGER_FOR_INTS, true);
        mapper.setFilters(new SimpleFilterProvider().setFailOnUnknownId(false));
        return mapper;
    }

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/login").setViewName("login");
        //registry.addViewController("/oauth/confirm_access").setViewName("authorize");
    }

    @Configuration
    public static class ResourceServerConfiguration extends ResourceServerConfigurerAdapter {
        @Override
        public void configure(HttpSecurity http) throws Exception {
            http.anonymous().and()
                    .authorizeRequests()
                    .antMatchers(HttpMethod.POST, "/users").permitAll()
                    .anyRequest().authenticated();
        }
    }

    @Configuration
    @EnableAuthorizationServer
    protected static class OAuth2Config extends AuthorizationServerConfigurerAdapter {

        @Autowired
        private AuthenticationManager authenticationManager;

        @Override
        public void configure(AuthorizationServerEndpointsConfigurer endpoints) throws Exception {
            endpoints.authenticationManager(authenticationManager);
        }

        @Override
        public void configure(ClientDetailsServiceConfigurer clients) throws Exception {
            clients.inMemory()
                    .withClient("acme")
                    .secret("acmesecret")
                    .authorizedGrantTypes("refresh_token", "password")
                    .scopes("openid")
                    .autoApprove(true);
        }
    }
}
