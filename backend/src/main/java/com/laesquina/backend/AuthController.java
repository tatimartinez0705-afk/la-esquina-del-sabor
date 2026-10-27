package com.laesquina.backend;

import java.util.Map;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

/**
 * Expone los endpoints de registro e inicio de sesión.
 */
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    /**
     * Registra un usuario y devuelve una respuesta HTTP 201.
     */
    @PostMapping("/registro")
    public ResponseEntity<Map<String, String>> registrar(
            @Valid @RequestBody SolicitudAuth solicitud) {

        authService.registrar(
                solicitud.getNombreUsuario(),
                solicitud.getContrasena());

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(Map.of("mensaje", "Registro satisfactorio"));
    }

    /**
     * Comprueba las credenciales y devuelve un resultado explícito.
     */
    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> iniciarSesion(
            @Valid @RequestBody SolicitudAuth solicitud) {

        boolean autenticado = authService.autenticar(
                solicitud.getNombreUsuario(),
                solicitud.getContrasena());

        if (!autenticado) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("mensaje", "Error en la autenticación"));
        }

        return ResponseEntity.ok(
                Map.of("mensaje", "Autenticación satisfactoria"));
    }
}
