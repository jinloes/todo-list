package com.jinloes.model;

import org.joda.time.DateTime;
import org.springframework.data.annotation.Id;
import org.springframework.data.domain.Auditable;

/**
 * Created by jinloes on 3/23/15.
 */
public abstract class AuditedEntity implements Auditable<String, String> {
    @Id
    private String id;
    private String createdBy;
    private DateTime creationDate;


    @Override
    public String getCreatedBy() {
        return createdBy;
    }

    @Override
    public void setCreatedBy(String createdBy) {
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
    public String getLastModifiedBy() {
        return null;
    }

    @Override
    public void setLastModifiedBy(String lastModifiedBy) {

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
