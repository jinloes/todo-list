package com.jinloes.todolist.resources;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * Created by jinloes on 5/8/15.
 */
public class UserResource {
    private final String id;
    private final String username;
    private final String email;

    @JsonCreator
    public UserResource(@JsonProperty("id") String id, @JsonProperty("username") String username,
            @JsonProperty("email") String email) {
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
