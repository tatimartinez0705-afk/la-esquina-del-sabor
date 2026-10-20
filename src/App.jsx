

import { useEffect, useState } from 'react'
import './App.css'

// Dirección del endpoint que consulta los platillos guardados en MongoDB.
const API_PLATILLOS = 'http://localhost:8080/api/platillos'

function App() {
  // Guarda los platillos que devuelve el backend.
  const [platillos, setPlatillos] = useState([])

  // Controla si la aplicación está consultando los datos.
  const [cargando, setCargando] = useState(true)

  // Guarda un mensaje si ocurre un error al consultar el backend.
  const [error, setError] = useState('')

    // Guarda los datos que el usuario escribe en el formulario.
  const [nuevoPlatillo, setNuevoPlatillo] = useState({
    nombre: '',
    foto: '',
    descripcion: '',
    precio: '',
    categoria: '',
  })

  // Controla si se está enviando un platillo al backend.
  const [guardando, setGuardando] = useState(false)

  // Muestra mensajes de éxito o error al guardar.
  const [mensajeFormulario, setMensajeFormulario] = useState('')

    // Actualiza los datos del formulario cuando el usuario escribe.
  function manejarCambio(evento) {
    const { name, value } = evento.target

    setNuevoPlatillo((anterior) => ({
      ...anterior,
      [name]: value,
    }))
  }

  // Envía el nuevo platillo al backend para guardarlo en MongoDB.
  async function guardarPlatillo(evento) {
    // Evita que el formulario recargue toda la página.
    evento.preventDefault()

    // Limpia el mensaje anterior antes de realizar un nuevo intento.
    setMensajeFormulario('')

   
    // Elimina espacios al principio y al final de los textos.
    const nombreLimpio = nuevoPlatillo.nombre.trim()
    const descripcionLimpia = nuevoPlatillo.descripcion.trim()
    const categoriaLimpia = nuevoPlatillo.categoria.trim()
    const precioNumerico = Number(nuevoPlatillo.precio)

    // Comprueba que los campos obligatorios tengan contenido.
    if (!nombreLimpio || !descripcionLimpia || !categoriaLimpia) {
      setMensajeFormulario(
        'Completa el nombre, la descripción y la categoría.'
      )
      return
    }

    // Comprueba que el precio sea un número válido mayor que cero.
    if (!Number.isFinite(precioNumerico) || precioNumerico <= 0) {
      setMensajeFormulario('El precio debe ser un número mayor que cero.')
      return
    }

    

    // Activa el indicador de guardado.
    setGuardando(true)

    try {
      // Envía los datos del formulario al endpoint de platillos.
      const respuesta = await fetch(API_PLATILLOS, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        
        body: JSON.stringify({
          // Envía los textos depurados al backend.
          ...nuevoPlatillo,
          nombre: nombreLimpio,
          descripcion: descripcionLimpia,
          categoria: categoriaLimpia,

          // Envía el precio como número, no como texto.
          precio: precioNumerico,
        }),

      })

      // Lee la respuesta del backend.
      const datos = await respuesta.json()

      // Muestra un error si el backend rechaza los datos.
      if (!respuesta.ok) {
        throw new Error(datos.message || 'No fue posible guardar el platillo.')
      }

           // Vuelve a consultar todos los platillos guardados en MongoDB.
      const respuestaMenu = await fetch(API_PLATILLOS)

      // Comprueba que la consulta del menú haya funcionado.
      if (!respuestaMenu.ok) {
        throw new Error('El platillo se guardó, pero no se pudo actualizar el menú.')
      }

      // Convierte la respuesta del backend en una lista de platillos.
      const todosLosPlatillos = await respuestaMenu.json()

      // Actualiza el menú con todos los platillos activos.
      setPlatillos(
        todosLosPlatillos.filter((platillo) => platillo.activo !== false)
      )

      // Limpia los campos para permitir registrar otro platillo.
      setNuevoPlatillo({
        nombre: '',
        foto: '',
        descripcion: '',
        precio: '',
        categoria: '',
      })

      // Informa que el registro se guardó correctamente.
      setMensajeFormulario('¡Platillo registrado correctamente!')
    } catch (err) {
      // Informa si ocurrió un problema al guardar.
      setMensajeFormulario(
        err.message || 'No fue posible conectar con el servidor.'
      )
      console.error('Error al guardar el platillo:', err)
    } finally {
      // Finaliza el estado de guardado, haya éxito o error.
      setGuardando(false)
    }
  }

  useEffect(() => {
    // Consulta los platillos cuando se carga la página.
    async function cargarPlatillos() {
      try {
        const respuesta = await fetch(API_PLATILLOS)

        // Comprueba si el servidor respondió correctamente.
        if (!respuesta.ok) {
          throw new Error('No fue posible consultar el menú.')
        }

        // Convierte la respuesta del servidor a datos JavaScript.
        const datos = await respuesta.json()

        // Muestra solamente los platillos que estén activos.
        setPlatillos(datos.filter((platillo) => platillo.activo !== false))
      } catch (err) {
        // Informa si el backend no está disponible.
        setError('No pudimos cargar el menú. Verifica que el backend esté funcionando.')
        console.error('Error al cargar los platillos:', err)
      } finally {
        // Oculta el mensaje de carga, incluso si ocurre un error.
        setCargando(false)
      }
    }

    cargarPlatillos()
  }, [])

  return (
    <div className="app">
      <header className="navbar">
        <a className="brand" href="#inicio">
          <span className="brand-icon">🍽️</span>
          <span>
            LaEsquina<span className="brand-accent">DelSabor</span>
          </span>
        </a>

        <nav className="nav-links">
          <a href="#inicio">Inicio</a>
          <a href="#menu">Menú</a>
          <a href="#nosotros">Nosotros</a>
          <a href="#contacto">Contacto</a>
        </nav>

        <a className="nav-button" href="#reservas">Reservar mesa</a>
      </header>

      <main>
        <section className="hero-section" id="inicio">
          <div className="hero-content">
            <span className="eyebrow">BIENVENIDO A NUESTRA CASA</span>

            <h1>
              El sabor que<br />
              te hace sentir <span>en casa.</span>
            </h1>

            <p>
              Disfruta platos deliciosos, ingredientes frescos
              y momentos especiales alrededor de la mesa.
            </p>

            <div className="hero-actions">
              <a className="primary-button" href="#menu">Explorar menú ↗</a>
              <a className="secondary-button" href="#reservas">Reservar una mesa</a>
            </div>

            <div className="hero-note">
              <span>✦</span> Hecho con amor, servido con sabor.
            </div>
          </div>

          <div className="hero-visual">
            <div className="food-circle">
              <span className="food-emoji">🍔</span>
              <span className="floating-food food-one">🍟</span>
              <span className="floating-food food-two">🥤</span>
            </div>

            <div className="food-label">
              <span>★ ★ ★ ★ ★</span>
              <strong>¡Mucho sabor en cada bocado!</strong>
            </div>
          </div>
        </section>

        <section className="features">
          <article>
            <span className="feature-icon">🥬</span>
            <div>
              <h3>Ingredientes frescos</h3>
              <p>Calidad en cada preparación.</p>
            </div>
          </article>

          <article>
            <span className="feature-icon">👨‍🍳</span>
            <div>
              <h3>Preparado al momento</h3>
              <p>El sabor que mereces.</p>
            </div>
          </article>

          <article>
            <span className="feature-icon">♥</span>
            <div>
              <h3>Atención cercana</h3>
              <p>Nos encanta recibirte.</p>
            </div>
          </article>
        </section>

        <section className="menu-section" id="menu">
          <span className="eyebrow">NUESTROS FAVORITOS</span>
          <h2>Un menú para <span>disfrutar</span></h2>
          <p>Descubre algunas de las opciones que tenemos para ti.</p>

          
            {/* Formulario para registrar nuevos platillos en el menú. */}
            <section className="formulario-platillo">
              <h3>Agregar un nuevo platillo</h3>
              <p>Completa los datos para incorporar una opción a nuestro menú.</p>

              <form onSubmit={guardarPlatillo}>
                {/* Campo para el nombre del platillo. */}
                <label htmlFor="nombre">Nombre del platillo</label>
                <input
                  id="nombre"
                  name="nombre"
                  type="text"
                  placeholder="Ej. Hamburguesa especial"
                  value={nuevoPlatillo.nombre}
                  onChange={manejarCambio}
                  required
                />

                {/* Campo para la ruta o URL de la imagen. */}
                <label htmlFor="foto">Foto (URL o nombre del archivo)</label>
                <input
                  id="foto"
                  name="foto"
                  type="text"
                  placeholder="Ej. hamburguesa.jpg"
                  value={nuevoPlatillo.foto}
                  onChange={manejarCambio}
                />

                {/* Campo para describir los ingredientes o características. */}
                <label htmlFor="descripcion">Descripción</label>
                <textarea
                  id="descripcion"
                  name="descripcion"
                  placeholder="Describe los ingredientes del platillo"
                  value={nuevoPlatillo.descripcion}
                  onChange={manejarCambio}
                  required
                  rows="3"
                />

                {/* Campo numérico para el precio en pesos colombianos. */}
                <label htmlFor="precio">Precio (COP)</label>
                <input
                  id="precio"
                  name="precio"
                  type="number"
                  placeholder="Ej. 18000"
                  min="1"
                  step="1"
                  value={nuevoPlatillo.precio}
                  onChange={manejarCambio}
                  required
                />

                {/* Lista para seleccionar la categoría del platillo. */}
                <label htmlFor="categoria">Categoría</label>
                <select
                  id="categoria"
                  name="categoria"
                  value={nuevoPlatillo.categoria}
                  onChange={manejarCambio}
                  required
                >
                  <option value="">Selecciona una categoría</option>
                  <option value="Hamburguesas">Hamburguesas</option>
                  <option value="Entradas">Entradas</option>
                  <option value="Platos principales">Platos principales</option>
                  <option value="Bebidas">Bebidas</option>
                  <option value="Postres">Postres</option>
                </select>

                {/* Botón que envía los datos al backend. */}
                <button type="submit" disabled={guardando}>
                  {guardando ? 'Guardando...' : 'Guardar platillo'}
                </button>

                {/* Mensaje que informa el resultado del registro. */}
                {mensajeFormulario && (
                  <p role="status">{mensajeFormulario}</p>
                )}
              </form>
            </section>


          <div className="menu-grid">
            {cargando && <p>Cargando el menú...</p>}

            {!cargando && error && <p role="alert">{error}</p>}

            {!cargando && !error && platillos.length === 0 && (
              <p>Pronto encontrarás aquí nuestros deliciosos platillos.</p>
            )}

            {!cargando && !error && platillos.map((platillo) => (
              <article className="menu-card" key={platillo.id || platillo.nombre}>
                <div className="dish-image">
                  {platillo.foto ? (
                    <img
                      src={platillo.foto}
                      alt={platillo.nombre}
                      loading="lazy"
                    />
                  ) : (
                    <span>🍽️</span>
                  )}
                </div>

                <div className="dish-info">
                  <span className="dish-tag">
                    {platillo.categoria || 'NUESTRO MENÚ'}
                  </span>

                  <h3>{platillo.nombre}</h3>
                  <p>{platillo.descripcion}</p>

                  <strong>
                    {new Intl.NumberFormat('es-CO', {
                      style: 'currency',
                      currency: 'COP',
                      maximumFractionDigits: 0,
                    }).format(Number(platillo.precio))}
                  </strong>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="reservation-section" id="reservas">
          <div>
            <span className="eyebrow">TU PRÓXIMO MOMENTO FAVORITO</span>
            <h2>¡Tu mesa te está esperando!</h2>
            <p>
              Pronto podrás gestionar tus reservas directamente
              desde nuestra plataforma.
            </p>
          </div>

          <a className="primary-button" href="#contacto">Contáctanos ↗</a>
        </section>
      </main>

      <footer id="contacto">
        <a className="brand" href="#inicio">
          <span className="brand-icon">🍽️</span>
          <span>
            LaEsquina<span className="brand-accent">DelSabor</span>
          </span>
        </a>

        <p>Buenos momentos, grandes sabores.</p>
        <span>© 2026 LaEsquinaDelSabor</span>
      </footer>
    </div>
  )
}

export default App

