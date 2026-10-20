
package com.laesquina.backend;

// Importa el modelo que representa los platillos del restaurante.
import com.laesquina.backend.Platillo;

// Permite utilizar las operaciones básicas de MongoDB.
import org.springframework.data.mongodb.repository.MongoRepository;

// Este repositorio permite guardar, consultar, actualizar y eliminar platillos.
// Spring Data MongoDB proporciona estas operaciones automáticamente.
public interface PlatilloRepository extends MongoRepository<Platillo, String> {

    // Busca platillos por su nombre exacto.
    // Spring genera la consulta a partir del nombre de este método.
    // Lo utilizaremos más adelante cuando necesitemos buscar platillos.
    // List<Platillo> findByNombre(String nombre);
}
