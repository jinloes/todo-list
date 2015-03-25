package com.jinloes.model;

import org.joda.time.DateTime;
import org.springframework.data.annotation.Id;
import org.springframework.data.domain.Auditable;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Field;

/**
 * Created by jinloes on 3/23/15.
 */
public abstract class AuditedEntity implements Auditable<User, String> {
    @Id
    @Field("_id")
    private String id;
    @DBRef
    private User createdBy;
    private DateTime creationDate;


    @Override
    public User getCreatedBy() {
        return createdBy;
    }

    @Override
    public void setCreatedBy(User createdBy) {
        this.createdBy = createdBy;
    }

    @Override
    public DateTime getCreatedDate() {
        return creationDate;
    }

    @Override
    public void setCreatedDate(DateTime creationDate) {
        this.creationDate = creationDate;
    }

    @Override
    public User getLastModifiedBy() {
        return null;
    }

    @Override
    public void setLastModifiedBy(User lastModifiedBy) {

    }

    @Override
    public DateTime getLastModifiedDate() {
        return null;
    }

    @Override
    public void setLastModifiedDate(DateTime lastModifiedDate) {

    }

    @Override
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    @Override
    public boolean isNew() {
        return false;
    }
}
