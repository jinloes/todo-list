package com.jinloes.data.service;

import com.jinloes.model.User;
import com.jinloes.todolist.resources.UserResource;

import org.springframework.core.convert.converter.Converter;
import org.springframework.hateoas.Resource;
import org.springframework.stereotype.Component;

/**
 * Created by jinloes on 5/7/15.
 */
@Component
public class UserConverter implements Converter<User, Resource> {
    @Override
    public Resource convert(User source) {
        return new Resource<>(new UserResource(source.getId(), source.getUsername(), source
                .getEmail()));
    }
}
