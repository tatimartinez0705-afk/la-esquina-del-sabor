
    package com.laesquina.backend;

    // Permite utilizar la clase Platillo para representar los datos del producto.
    import com.laesquina.backend.Platillo;

    // Permite utilizar el repositorio para guardar y consultar platillos.
    import com.laesquina.backend.PlatilloRepository;

    // Se utiliza para trabajar con precios decimales.
    import java.math.BigDecimal;

    // Permite manejar listas de platillos.
    import java.util.List;

    // Permite identificar cuándo un dato no es válido.
    import org.springframework.http.HttpStatus;
    import org.springframework.web.server.ResponseStatusException;

    // Permite registrar esta clase como un servicio de Spring.
    import org.springframework.stereotype.Service;

    // Indica que esta clase contiene la lógica de negocio de los platillos.
    @Service
    public class PlatilloService {

        // Repositorio que permite comunicarse con MongoDB.
        private final PlatilloRepository platilloRepository;

        // Spring proporciona automáticamente el repositorio necesario.
        public PlatilloService(PlatilloRepository platilloRepository) {
            this.platilloRepository = platilloRepository;
        }

        // Registra un platillo después de validar sus datos principales.
        public Platillo crearPlatillo(Platillo platillo) {

            // Comprueba que el platillo y sus campos de texto no estén vacíos.
            if (platillo == null
                    || textoVacio(platillo.getNombre())
                    || textoVacio(platillo.getDescripcion())
                    || textoVacio(platillo.getCategoria())) {

                // Devuelve un error HTTP 400 cuando faltan datos obligatorios.
                throw new ResponseStatusException(
                        HttpStatus.BAD_REQUEST,
                        "El nombre, la descripcion y la categoria son obligatorios."
                );
            }

            // Comprueba que el precio exista y sea mayor que cero.
            BigDecimal precio = platillo.getPrecio();

            if (precio == null || precio.compareTo(BigDecimal.ZERO) <= 0) {

                // Impide registrar precios iguales o inferiores a cero.
                throw new ResponseStatusException(
                        HttpStatus.BAD_REQUEST,
                        "El precio debe ser mayor que cero."
                );
            }

            // Los platillos nuevos se crean activos por defecto.
            platillo.setActivo(true);

            // Guarda el platillo en MongoDB y devuelve el documento guardado.
            return platilloRepository.save(platillo);
        }

        // Consulta todos los platillos almacenados en MongoDB.
        public List<Platillo> listarPlatillos() {
            return platilloRepository.findAll();
        }

        // Comprueba si un texto es nulo, vacío o contiene solo espacios.
        private boolean textoVacio(String texto) {
            return texto == null || texto.isBlank();
        }
    }
