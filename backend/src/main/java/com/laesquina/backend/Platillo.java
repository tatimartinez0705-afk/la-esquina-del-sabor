
package com.laesquina.backend;

// Importa la anotación que identifica cada documento en MongoDB.
import org.springframework.data.annotation.Id;

// Permite indicar en qué colección de MongoDB se guardará la clase.
import org.springframework.data.mongodb.core.mapping.Document;

// Permite representar precios con precisión decimal.
import java.math.BigDecimal;

// Indica que los objetos de esta clase se guardarán en la colección "platillos".
@Document(collection = "platillos")
public class Platillo {

    // Identificador único que MongoDB asigna a cada platillo.
    @Id
    private String id;

    // Nombre del platillo, por ejemplo: Hamburguesa clásica.
    private String nombre;

    // Dirección o referencia de la imagen del platillo.
    private String foto;

    // Descripción de los ingredientes o características del producto.
    private String descripcion;

    // Precio del platillo; BigDecimal ayuda a manejar valores monetarios.
    private BigDecimal precio;

    // Categoría a la que pertenece, por ejemplo: Hamburguesas o Bebidas.
    private String categoria;

    // Indica si el platillo está disponible para la venta.
    // Por defecto, un platillo nuevo estará activo.
    private boolean activo = true;

    // Constructor vacío que Spring Data utiliza para crear objetos.
    public Platillo() {
    }

    // Constructor que permite crear un platillo con sus datos principales.
    public Platillo(
            String nombre,
            String foto,
            String descripcion,
            BigDecimal precio,
            String categoria) {

        this.nombre = nombre;
        this.foto = foto;
        this.descripcion = descripcion;
        this.precio = precio;
        this.categoria = categoria;

        // Todo platillo nuevo se crea como disponible.
        this.activo = true;
    }

    // Devuelve el identificador del platillo.
    public String getId() {
        return id;
    }

    // Permite establecer el identificador del platillo.
    public void setId(String id) {
        this.id = id;
    }

    // Devuelve el nombre del platillo.
    public String getNombre() {
        return nombre;
    }

    // Permite modificar el nombre del platillo.
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    // Devuelve la referencia de la foto.
    public String getFoto() {
        return foto;
    }

    // Permite establecer o cambiar la foto.
    public void setFoto(String foto) {
        this.foto = foto;
    }

    // Devuelve la descripción del platillo.
    public String getDescripcion() {
        return descripcion;
    }

    // Permite modificar la descripción.
    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    // Devuelve el precio del platillo.
    public BigDecimal getPrecio() {
        return precio;
    }

    // Permite establecer el precio del platillo.
    public void setPrecio(BigDecimal precio) {
        this.precio = precio;
    }

    // Devuelve la categoría del platillo.
    public String getCategoria() {
        return categoria;
    }

    // Permite establecer la categoría.
    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }

    // Indica si el platillo está activo.
    public boolean isActivo() {
        return activo;
    }

    // Permite activar o desactivar un platillo.
    public void setActivo(boolean activo) {
        this.activo = activo;
    }
}
