package com.jinloes.config;

import com.mongodb.MongoClient;
import cz.jirutka.spring.embedmongo.EmbeddedMongoBuilder;
import de.flapdoodle.embed.mongo.distribution.Version;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.IOException;

@Configuration
public class MongoConfig {
    @Bean(destroyMethod = "close")
    public MongoClient mongo() throws IOException {
        return new EmbeddedMongoBuilder()
                .version(Version.Main.PRODUCTION.asInDownloadPath())
                .bindIp("127.0.0.1")
                .build();
    }
}
