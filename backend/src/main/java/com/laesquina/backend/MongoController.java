
package com.laesquina.backend;

import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class MongoController {

    private final MongoTemplate mongoTemplate;

    public MongoController(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    @GetMapping("/api/mongodb")
    public Map<String, String> comprobarMongoDB() {
        mongoTemplate.getDb().runCommand(
            new org.bson.Document("ping", 1)
        );

        return Map.of(
            "mensaje", "Conexion con MongoDB exitosa",
            "baseDatos", mongoTemplate.getDb().getName()
        );
    }
}
