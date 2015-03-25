package com.jinloes.data.service;

import org.springframework.data.rest.core.annotation.RepositoryRestResource;

/**
 * Created by jinloes on 3/24/15.
 */
@RepositoryRestResource(collectionResourceRel = "users", path = "users")
public interface UserRepository {
}
