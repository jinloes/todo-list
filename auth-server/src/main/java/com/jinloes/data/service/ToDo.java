package com.jinloes.data.service;

import com.jinloes.model.AuditedEntity;

import org.springframework.data.mongodb.core.mapping.Document;

/**
 * Created by jinloes on 3/23/15.
 */
@Document(collection = "todo")
public class ToDo extends AuditedEntity {
    private String name;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
