import "./Home.css"
import logoEvent from "../../assets/logo1.svg"
import banner1 from "../../assets/banner-1.png"
import banner2 from "../../assets/banner-2.png"
import banner3 from "../../assets/banner-3.png"
import visaoimg from "../../assets/visaoimg.jpeg"

import Carrossel from "../../components/carrossel/carrossel"

function Home() {
    return (
        <>
            <header className="home-header">
                <div className="home-header-conteudo">
                    <img src={logoEvent} alt="Logo Event+" />

                    <nav>
                        <a href="#inicio">Home</a>
                        <a href="#eventos">Eventos</a>
                        <a href="usuarios">Usuarios</a>
                        <a href="#contato">Contatos</a>
                    </nav>

                    <button>Entrar</button>
                </div>
            </header>

            <main>
                <Carrossel/>

                <section className="home-visao">
                    <div className="home-visao-container">
                        <img src={visaoimg} alt="Pessoas confraternizando" />
                        <div className="home-visao-texto">
                            <h1>Visão</h1>
                            <p>A EventPlus organiza eventos e informações em um interface direta, facilitando a consulta da agenda e a participação dos usuários.</p>
                        </div>
                    </div>
                </section>

                <section id="eventos" className="home-eventos">
                    <div className="home-eventos-titulo">
                        <h2 className="titulo">Próximos Eventos</h2>
                        <hr />
                    </div>

                    <div className="home-eventos-lista">
                        <article className="home-evento-card">
                            <img src={banner1} alt="Evento de Tecnologia" />
                            <span>Tecnologia</span>
                            <div className="home-evento-card-info">
                                <h3>Evento de Tecnologia</h3>
                                <p>Conheça novidades e tendências do setor</p>
                                <button type="button">Ver Evento</button>
                            </div>
                        </article>

                        <article className="home-evento-card">
                            <img src={banner2} alt="Workshop de desenvolvimento" />
                            <span>Workshop</span>
                            <div className="home-evento-card-info">
                                <h3>Evento de Tecnologia</h3>
                                <p>Pratique desenvolvimento com atividades guiadas.</p>
                                <button type="button">Ver Evento</button>
                            </div>
                        </article>

                        <article className="home-evento-card">
                            <img src={banner3} alt="Meetup de inteligência Artificial" />
                            <span>Meetup</span>
                            <div className="home-evento-card-info">
                                <h3>Meet up de IA</h3>
                                <p>Discusões sobre aplicações de inteligência artificial</p>
                                <button type="button">Ver Evento</button>
                            </div>
                        </article>
                    </div>
                </section>

                <section id="contato" className="home-contato">
                    <div className="home-contato-titulo">
                        <h2>Contato</h2>
                        <hr />
                    </div>
                    <div className="home-contato-endereco">
                        <div className="home-contato-endereco-escrito">
                            <p>Rua Niterói, 180 - Centro</p>
                            <p>São Caetano do Sul - SP</p>
                            <p>(11) 4225-2000</p>
                            <hr />
                        </div>
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3655.6989003491735!2d-46.57329922466824!3d-23.615129178762857!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce5d11c031c57f%3A0x8f79f71018065a16!2sSENAI%20S%C3%A3o%20Caetano%20do%20Sul%20-%20Cyber%20e%20IA!5e0!3m2!1spt-BR!2sbr!4v1791222343392!5m2!1spt-BR!2sbr" width="600" height="450" loading="lazy"></iframe>
                    </div>

                </section>
            </main>

            <footer className="home-footer">
                <p>Escola Senai de informática - 2026</p>
            </footer>
        </>
    );
}

export default Home;