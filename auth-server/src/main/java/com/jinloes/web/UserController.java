package com.jinloes.web;

import com.jinloes.data.service.UserConverter;
import com.jinloes.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.Resource;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
public class UserController {

    @Autowired
    private UserConverter userConverter;

    @Autowired
    private UserDetailsService userDetailsService;

    @RequestMapping("/user")
    public Resource user(Principal principal) {
        return userConverter.convert((User) userDetailsService.loadUserByUsername(principal
                .getName()));
    }
}
