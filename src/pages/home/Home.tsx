import { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css";
import Header from "../../components/header/Header";
import visaoimg from "../../assets/visaoimg.jpeg";
import Carrossel from "../../components/carrossel/carrossel";
import Footer from "../../components/footer/footer";
import CardEvento from "../../components/cardEvento/CardEvento";

import type { Evento } from "../../Types/api";
import { eventoService } from "../../service/EventPlusService";

function Home() {
    const [eventos, setEventos] = useState<Evento[]>([]);

    useEffect(() => {
        async function carregar() {
            const dados = await eventoService.listar_proximos()
            setEventos(dados)
        }
        void carregar();
    }, [])

    return (
        <>
            <Header />

            <main>
                <Carrossel />

                <section className="home-visao">
                    <div className="home-visao-container">
                        <img src={visaoimg} alt="Pessoas confraternizando" />
                        <div className="home-visao-texto">
                            <h1>Visão</h1>
                            <p>
                                A EventPlus organiza eventos e informações em um interface
                                direta, facilitando a consulta da agenda e a participação dos
                                usuários.
                            </p>
                        </div>
                    </div>
                </section>

                <section id="eventos" className="home-eventos">
                    <div className="home-eventos-titulo">
                        <h2 className="titulo">Próximos Eventos</h2>
                        <hr />
                    </div>

                    <div className="home-eventos-lista">
                        {eventos.length > 0 ? (
                            eventos.map((evento) => (
                                <CardEvento
                                    key={evento.idEvento}
                                    id={evento.idEvento}
                                    titulo={evento.nomeEvento}
                                    imagem={evento.imagemUrl}
                                    descricao={evento.descricao}
                                    categoria={evento.idTipoEventoNavigation?.tituloTipoEvento}
                                />
                            ))
                        ) : (
                            <p>Nenhum evento nos próximos dias</p>
                        )}
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
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3655.6989003491735!2d-46.57329922466824!3d-23.615129178762857!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce5d11c031c57f%3A0x8f79f71018065a16!2sSENAI%20S%C3%A3o%20Caetano%20do%20Sul%20-%20Cyber%20e%20IA!5e0!3m2!1spt-BR!2sbr!4v1791222343392!5m2!1spt-BR!2sbr"
                            width="600"
                            height="450"
                            loading="lazy"
                        ></iframe>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}

export default Home;