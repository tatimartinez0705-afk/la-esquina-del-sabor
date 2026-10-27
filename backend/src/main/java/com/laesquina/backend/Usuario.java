package com.laesquina.backend;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * Representa a un usuario registrado en la aplicación.
 * La contraseña se almacena como hash BCrypt, nunca en texto plano.
 */
@Document(collection = "usuarios")
public class Usuario {

    @Id
    private String id;

    // Nombre que el usuario utilizará para iniciar sesión.
    private String nombreUsuario;

    // Hash de la contraseña generado mediante BCrypt.
    private String contrasenaHash;

    // Constructor vacío requerido por Spring Data MongoDB.
    public Usuario() {
    }

    public Usuario(String nombreUsuario, String contrasenaHash) {
        this.nombreUsuario = nombreUsuario;
        this.contrasenaHash = contrasenaHash;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getNombreUsuario() {
        return nombreUsuario;
    }

    public void setNombreUsuario(String nombreUsuario) {
        this.nombreUsuario = nombreUsuario;
    }

    public String getContrasenaHash() {
        return contrasenaHash;
    }

    public void setContrasenaHash(String contrasenaHash) {
        this.contrasenaHash = contrasenaHash;
    }
}
