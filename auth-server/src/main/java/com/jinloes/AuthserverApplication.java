package com.jinloes;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.databind.ser.impl.SimpleFilterProvider;
import com.fasterxml.jackson.datatype.joda.JodaModule;
import com.jinloes.data.service.UserRepository;
import com.jinloes.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import javax.annotation.PostConstruct;

;

/**
 * Created by jinloes on 3/10/15.
 */
@SpringBootApplication
@EnableResourceServer
public class AuthserverApplication {
    @Autowired
    private UserRepository userRepository;


    public static void main(String[] args) {
        SpringApplication.run(AuthserverApplication.class, args);
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

    @Bean
    @Primary
    public ObjectMapper objectMapper() {
        ObjectMapper mapper = new ObjectMapper()
                .registerModule(new JodaModule())
                .configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, false)
                .configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false)
                .configure(DeserializationFeature.USE_BIG_INTEGER_FOR_INTS, true);
        mapper.setFilterProvider(new SimpleFilterProvider().setFailOnUnknownId(false));
        return mapper;
    }

   /* @Bean
    public CorsFilter corsFilter() {
        // Old Config
        //response.setHeader("Access-Control-Allow-Origin", "*");
        //        response.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
        //        response.setHeader("Access-Control-Max-Age", "3600");
        //        response.setHeader("Access-Control-Allow-Headers", "accept, Content-Type, x-requested-with");
        final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        final CorsConfiguration config = new CorsConfiguration();
        config.addAllowedOrigin("*");
        config.addAllowedHeader("*");
        config.addAllowedMethod("*");
        config.addExposedHeader("Authorization");
        config.addExposedHeader("Content-Type");
        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }*/

    @Configuration
    public static class ResourceServerConfiguration extends ResourceServerConfigurerAdapter {
        @Override
        public void configure(HttpSecurity http) throws Exception {
            http.anonymous().and()
                    .authorizeRequests()
                    .antMatchers(HttpMethod.POST, "/users").permitAll()
                    .antMatchers(HttpMethod.OPTIONS, "/oauth/token").permitAll()
                    .anyRequest().authenticated();
        }
    }
}
