package com.jinloes.data.service;

import com.jinloes.model.AuditedEntity;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;
import java.util.Objects;

/**
 * ToDo model object.
 */
@Document(collection = "todo")
public class ToDo extends AuditedEntity {
    private String name;
    private Instant deadline;
    private String notes;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Instant getDeadline() {
        return deadline;
    }

    public void setDeadline(Instant deadline) {
        this.deadline = deadline;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ToDo toDo = (ToDo) o;
        return Objects.equals(name, toDo.name) &&
                Objects.equals(deadline, toDo.deadline) &&
                Objects.equals(notes, toDo.notes);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, deadline, notes);
    }
}
