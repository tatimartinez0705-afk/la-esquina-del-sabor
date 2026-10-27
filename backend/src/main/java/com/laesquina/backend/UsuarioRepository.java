package com.laesquina.backend;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * Proporciona operaciones para consultar y guardar usuarios.
 */
public interface UsuarioRepository extends MongoRepository<Usuario, String> {

    // Busca un usuario por su nombre de inicio de sesión.
    Optional<Usuario> findByNombreUsuario(String nombreUsuario);

    // Comprueba si el nombre de usuario ya está registrado.
    boolean existsByNombreUsuario(String nombreUsuario);
}
