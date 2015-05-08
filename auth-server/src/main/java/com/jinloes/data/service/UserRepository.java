package com.jinloes.data.service;

import com.jinloes.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

/**
 * Created by jinloes on 3/24/15.
 */
@RepositoryRestResource(collectionResourceRel = "users", path = "users")
public interface UserRepository extends MongoRepository<User, String> {

    /**
     * Finds a user by username.
     *
     * @param username user name
     * @return user if one exists
     */
    User findByUsername(String username);
}
