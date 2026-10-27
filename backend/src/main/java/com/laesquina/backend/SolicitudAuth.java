package com.laesquina.backend;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

/**
 * Contiene los datos enviados por el cliente a la API de autenticación.
 */
public class SolicitudAuth {

    @NotBlank(message = "El nombre de usuario es obligatorio")
    @Size(min = 3, max = 50,
          message = "El usuario debe tener entre 3 y 50 caracteres")
    private String nombreUsuario;

    @NotBlank(message = "La contraseña es obligatoria")
    @Size(min = 8, max = 72,
          message = "La contraseña debe tener entre 8 y 72 caracteres")
    private String contrasena;

    public SolicitudAuth() {
    }

    public String getNombreUsuario() {
        return nombreUsuario;
    }

    public void setNombreUsuario(String nombreUsuario) {
        this.nombreUsuario = nombreUsuario;
    }

    public String getContrasena() {
        return contrasena;
    }

    public void setContrasena(String contrasena) {
        this.contrasena = contrasena;
    }
}
