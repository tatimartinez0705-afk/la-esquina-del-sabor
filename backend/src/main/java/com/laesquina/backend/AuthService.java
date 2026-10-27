package com.laesquina.backend;

import java.util.Locale;

import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

/**
 * Gestiona el registro y la validación de las credenciales.
 */
@Service
public class AuthService {

    private final UsuarioRepository usuarioRepository;

    // BCrypt transforma la contraseña en un hash seguro.
    private final BCryptPasswordEncoder codificador =
            new BCryptPasswordEncoder();

    public AuthService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    /**
     * Registra un usuario nuevo si el nombre no está ocupado.
     */
    public void registrar(String nombreUsuario, String contrasena) {
        // Normaliza el nombre para evitar diferencias por mayúsculas.
        String nombre = nombreUsuario.trim().toLowerCase(Locale.ROOT);

        if (usuarioRepository.existsByNombreUsuario(nombre)) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "El nombre de usuario ya está registrado");
        }

        // Nunca se guarda la contraseña original en la base de datos.
        String hash = codificador.encode(contrasena);

        Usuario usuario = new Usuario(nombre, hash);
        usuarioRepository.save(usuario);
    }

    /**
     * Verifica el nombre y la contraseña proporcionados.
     */
    public boolean autenticar(String nombreUsuario, String contrasena) {
        String nombre = nombreUsuario.trim().toLowerCase(Locale.ROOT);

        return usuarioRepository.findByNombreUsuario(nombre)
                .map(usuario ->
                        codificador.matches(
                                contrasena,
                                usuario.getContrasenaHash()))
                .orElse(false);
    }
}
