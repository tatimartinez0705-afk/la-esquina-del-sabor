
import './App.css'

function App() {
  return (
    <div className="app">
      <header className="navbar">
        <a className="brand" href="#inicio">
          <span className="brand-icon">🍽️</span>
          <span>LaEsquina<span className="brand-accent">DelSabor</span></span>
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
            <h1>El sabor que<br />te hace sentir <span>en casa.</span></h1>
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
            <span className="feature-icon">❤️</span>
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

          <div className="menu-grid">
            <article className="menu-card">
              <div className="dish-image">🍔</div>
              <div className="dish-info">
                <span className="dish-tag">MÁS PEDIDO</span>
                <h3>Hamburguesa de la casa</h3>
                <p>Una combinación irresistible de sabor.</p>
                <strong>Consulta nuestro menú</strong>
              </div>
            </article>
            <article className="menu-card">
              <div className="dish-image">🍕</div>
              <div className="dish-info">
                <span className="dish-tag">PARA COMPARTIR</span>
                <h3>Pizza especial</h3>
                <p>Ideal para disfrutar con tus personas favoritas.</p>
                <strong>Consulta nuestro menú</strong>
              </div>
            </article>
            <article className="menu-card">
              <div className="dish-image">🍟</div>
              <div className="dish-info">
                <span className="dish-tag">EL ACOMPAÑANTE</span>
                <h3>Papas crocantes</h3>
                <p>Doradas, crujientes y deliciosas.</p>
                <strong>Consulta nuestro menú</strong>
              </div>
            </article>
          </div>
        </section>

        <section className="reservation-section" id="reservas">
          <div>
            <span className="eyebrow">TU PRÓXIMO MOMENTO FAVORITO</span>
            <h2>¡Tu mesa te está esperando!</h2>
            <p>Pronto podrás gestionar tus reservas directamente desde nuestra plataforma.</p>
          </div>
          <a className="primary-button" href="#contacto">Contáctanos ↗</a>
        </section>
      </main>

      <footer id="contacto">
        <a className="brand" href="#inicio">
          <span className="brand-icon">🍽️</span>
          <span>LaEsquina<span className="brand-accent">DelSabor</span></span>
        </a>
        <p>Buenos momentos, grandes sabores.</p>
        <span>© 2026 LaEsquinaDelSabor</span>
      </footer>
    </div>
  )
}

export default App
