package com.jinloes.event_handlers;

import com.jinloes.data.service.ToDo;
import com.jinloes.data.service.api.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.core.annotation.HandleBeforeCreate;
import org.springframework.data.rest.core.annotation.RepositoryEventHandler;
import org.springframework.stereotype.Component;

/**
 * Created by jinloes on 3/24/15.
 */
@Component
@RepositoryEventHandler
public class TodoEventHandler extends AuditedEntityEventHandler<ToDo> {

    @Autowired
    public TodoEventHandler(UserService userService) {
        super(userService);
    }

    @HandleBeforeCreate(ToDo.class)
    public void handleToDoCreate(ToDo entity) {
        super.handleAuditedEntityCreate(entity);
    }
}
