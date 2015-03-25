package com.jinloes.event_handlers;

import com.jinloes.data.service.api.UserService;
import com.jinloes.model.User;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.core.annotation.HandleBeforeCreate;
import org.springframework.data.rest.core.annotation.RepositoryEventHandler;
import org.springframework.stereotype.Component;

/**
 * Created by jinloes on 3/25/15.
 */
@Component
@RepositoryEventHandler
public class UserEventHandler extends AuditedEntityEventHandler<User> {

    @Autowired
    public UserEventHandler(UserService userService) {
        super(userService);
    }

    @HandleBeforeCreate(User.class)
    public void handleUserCreate(User entity) {
        super.handleAuditedEntityCreate(entity);
        entity.setId(new ObjectId().toString());
        entity.setCreatedBy(entity);
    }

    @Override
    public User getCreator(User entity) {
        return null;
    }
}
