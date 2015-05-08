package com.jinloes.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

/**
 * Created by jinloes on 5/6/15.
 */
@Configuration
@Order(-10)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf()
                .requireCsrfProtectionMatcher(new AntPathRequestMatcher("/oauth/authorize"))
                .disable()
                //.formLogin()
                //.loginPage("/login").permitAll()
                //.and()
                .requestMatchers().antMatchers("/login", "/oauth/authorize",
                "/oauth/confirm_access")
                .and()
                .anonymous()
                .and()
                .authorizeRequests()
                .anyRequest().authenticated();
    }
}
