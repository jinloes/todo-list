package com.jinloes.event_handlers;

import com.jinloes.data.service.ToDo;

import org.springframework.data.rest.core.annotation.RepositoryEventHandler;
import org.springframework.stereotype.Component;

/**
 * Created by jinloes on 3/24/15.
 */
@Component
@RepositoryEventHandler
public class TodoEventHandler extends AuditedEntityEventHandler<ToDo> {

    public void handleCreateObject(ToDo entity) {
    }
}
