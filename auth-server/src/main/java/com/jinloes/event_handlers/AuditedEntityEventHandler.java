package com.jinloes.event_handlers;

import com.jinloes.data.service.api.UserService;
import com.jinloes.model.AuditedEntity;
import com.jinloes.model.User;
import org.springframework.data.rest.core.event.AbstractRepositoryEventListener;

import java.time.Instant;

/**
 * Created by jinloes on 3/23/15.
 */
public abstract class AuditedEntityEventHandler<T extends AuditedEntity>
        extends AbstractRepositoryEventListener {
    private final UserService userService;

    public AuditedEntityEventHandler(UserService userService) {
        this.userService = userService;
    }

    public void handleAuditedEntityCreate(T entity) {
        User currentUser = getCreator(entity);
        entity.setCreatedBy(currentUser);
        entity.setCreatedDate(Instant.now());
    }

    public User getCreator(T entity) {
        return userService.getCurrentUser();
    }
}

