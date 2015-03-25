package com.jinloes.event_handlers;

import com.jinloes.data.service.api.UserService;
import com.jinloes.model.AuditedEntity;
import com.jinloes.model.User;

import org.joda.time.DateTime;
import org.springframework.data.rest.core.annotation.HandleBeforeCreate;
import org.springframework.data.rest.core.event.AbstractRepositoryEventListener;

/**
 * Created by jinloes on 3/23/15.
 */
public abstract class AuditedEntityEventHandler<T extends AuditedEntity>
        extends AbstractRepositoryEventListener {
    private final UserService userService;

    public AuditedEntityEventHandler(UserService userService) {
        this.userService = userService;
    }

    @HandleBeforeCreate(AuditedEntity.class)
    public void handleAuditedEntityCreate(T entity) {
        User currentUser = userService.getCurrentUser();
        handleCreateObject(entity);
        entity.setCreatedBy(currentUser.getId());
        entity.setCreatedDate(DateTime.now());
    }

    protected abstract void handleCreateObject(T entity);
}

