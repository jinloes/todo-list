package com.jinloes.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.domain.Auditable;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.Instant;
import java.util.Optional;

/**
 * Created by jinloes on 3/23/15.
 */
public abstract class AuditedEntity implements Auditable<User, String, Instant> {
    @Id
    @Field("_id")
    private String id;
    @DBRef
    private User createdBy;
    private Instant creationDate;


    @Override
    public Optional<User> getCreatedBy() {
        return Optional.ofNullable(createdBy);
    }

    @Override
    public void setCreatedBy(User createdBy) {
        this.createdBy = createdBy;
    }

    @Override
    public Optional<Instant> getCreatedDate() {
        return Optional.ofNullable(creationDate);
    }

    @Override
    public void setCreatedDate(Instant creationDate) {
        this.creationDate = creationDate;
    }

    @Override
    public Optional<User> getLastModifiedBy() {
        return Optional.empty();
    }

    @Override
    public void setLastModifiedBy(User lastModifiedBy) {

    }

    @Override
    public Optional<Instant> getLastModifiedDate() {
        return Optional.empty();
    }

    @Override
    public void setLastModifiedDate(Instant lastModifiedDate) {

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
