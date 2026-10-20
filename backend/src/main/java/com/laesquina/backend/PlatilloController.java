
package com.laesquina.backend;

// Importa el modelo que representa un platillo.
import com.laesquina.backend.Platillo;

// Importa el servicio que contiene la lógica para crear y consultar platillos.
import com.laesquina.backend.PlatilloService;

// Permite trabajar con listas de platillos.
import java.util.List;

// Permite indicar que un método recibe datos JSON desde una petición HTTP.
import org.springframework.web.bind.annotation.RequestBody;

// Permite definir una dirección base para los servicios REST.
import org.springframework.web.bind.annotation.RequestMapping;

// Permite identificar esta clase como un controlador REST.
import org.springframework.web.bind.annotation.RestController;

// Permite crear registros mediante peticiones HTTP POST.
import org.springframework.web.bind.annotation.PostMapping;

// Permite consultar información mediante peticiones HTTP GET.
import org.springframework.web.bind.annotation.GetMapping;

// Permite recibir solicitudes desde el frontend de React.
import org.springframework.web.bind.annotation.CrossOrigin;

// Permite responder con el código HTTP 201 (Created) al crear un recurso.
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

// Permite las solicitudes desde React en el puerto actual del frontend.
@CrossOrigin(origins = "http://localhost:5174")
@RestController
@RequestMapping("/api/platillos")
public class PlatilloController {

    // Servicio encargado de validar y guardar los platillos.
    private final PlatilloService platilloService;

    // Spring inyecta automáticamente el servicio necesario.
    public PlatilloController(PlatilloService platilloService) {
        this.platilloService = platilloService;
    }

    // Registra un nuevo platillo recibido en formato JSON.
    // Dirección: POST /api/platillos
    @PostMapping
    public ResponseEntity<Platillo> crearPlatillo(
            @RequestBody Platillo platillo) {

        // Llama al servicio para validar y guardar el platillo.
        Platillo platilloGuardado =
                platilloService.crearPlatillo(platillo);

        // Devuelve el platillo guardado con el código HTTP 201.
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(platilloGuardado);
    }

    // Consulta todos los platillos registrados.
    // Dirección: GET /api/platillos
    @GetMapping
    public List<Platillo> listarPlatillos() {

        // Solicita al servicio la lista de platillos de MongoDB.
        return platilloService.listarPlatillos();
    }
}
