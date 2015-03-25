package com.jinloes.data.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

/**
 * Repository for todo items.
 */
@RepositoryRestResource(collectionResourceRel = "todos", path = "todos")
public interface ToDoRepository extends MongoRepository<ToDo, String> {
    Page<ToDo> findByCreatedBy(@Param("user") String userId, Pageable pageable);
}
