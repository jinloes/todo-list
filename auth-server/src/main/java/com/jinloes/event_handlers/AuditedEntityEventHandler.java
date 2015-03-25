package com.jinloes.event_handlers;

import com.jinloes.model.AuditedEntity;

import org.joda.time.DateTime;
import org.springframework.data.rest.core.annotation.HandleBeforeCreate;
import org.springframework.data.rest.core.event.AbstractRepositoryEventListener;
import org.springframework.security.core.context.SecurityContextHolder;

/**
 * Created by jinloes on 3/23/15.
 */
public abstract class AuditedEntityEventHandler<T extends AuditedEntity>
        extends AbstractRepositoryEventListener {

    @HandleBeforeCreate(AuditedEntity.class)
    public void handleAuditedEntityCreate(T entity) {
        //TODO(jinloes) figure out how to get user's id
        SecurityContextHolder.getContext().getAuthentication();
        handleCreateObject(entity);
        entity.setCreatedBy("123");
        entity.setCreatedDate(DateTime.now());
    }

    protected abstract void handleCreateObject(T entity);
}

