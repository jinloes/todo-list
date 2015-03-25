package com.jinloes.data.service;

import com.jinloes.model.User;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

/**
 * Created by jinloes on 3/24/15.
 */
@Component
public class UserServiceImpl implements UserDetailsService {
    private static final User user;
    static {
        user = new User();
        user.setId("90c5d2d7");
        user.setUsername("user");
    }
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return user;
    }
}
