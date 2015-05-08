package com.jinloes.data.service;

import com.jinloes.model.User;
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
        return new Resource<>(new UserResource(source.getId(), source.getUsername(), source.getEmail()));
    }

    private static class UserResource {
        private final String id;
        private final String username;
        private final String email;

        public UserResource(String id, String username, String email) {
            this.id = id;
            this.username = username;
            this.email = email;
        }

        public String getId() {
            return id;
        }

        public String getUsername() {
            return username;
        }

        public String getEmail() {
            return email;
        }
    }
}
