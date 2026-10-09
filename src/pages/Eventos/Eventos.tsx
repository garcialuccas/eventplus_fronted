import "./Eventos.css"
import Header from "../../components/header/Header";
import Footer from "../../components/footer/footer";
import { useEffect, useState } from "react";
import type { Evento, TipoEvento } from "../../Types/api";
import { eventoService, tipoEventoService } from "../../service/EventPlusService";
import CardEvento from "../../components/cardEvento/CardEvento";

function Eventos() {

    const [eventos, setEventos] = useState<Evento[]>([])

    useEffect(() => {
        async function carregarEventos() {
            const dados = await eventoService.listar()
            setEventos(dados)
        }
        void carregarEventos();
    }, [])

    const [tiposEventos, setTipoEventos] = useState<TipoEvento[]>([])

    useEffect(() => {
        async function carregarTipoEventos() {
            const dados = await tipoEventoService.listar()
            setTipoEventos(dados.map((tp) => tp))
        }
        void carregarTipoEventos()
    }, [])

    const [categoria, setCategoria] = useState<string>("")

    const eventosFiltrados = categoria === "" ? eventos : eventos.filter((e) => (e.idTipoEventoNavigation?.tituloTipoEvento === categoria))

    return (
        <>
            <Header />
            <main>
                <section className="section-eventos">
                    <div className="eventos-botoes">
                        <button className={`eventos-botao-categoria ${categoria === "" ? "ativo" : ""}`} onClick={() => setCategoria("")}>Todos</button>
                        {
                            tiposEventos.map((te) => (
                                <button className={`eventos-botao-categoria ${categoria === te.tituloTipoEvento ? "ativo" : ""}`} onClick={() => setCategoria(te.tituloTipoEvento)}>{te.tituloTipoEvento}</button>
                            ))
                        }
                    </div>
                    <div className="eventos-lista">
                        {
                            eventosFiltrados.map((e) => (
                                <CardEvento
                                    key={e.idEvento}
                                    id={e.idEvento}
                                    imagem={e.imagemUrl}
                                    categoria={e.idTipoEventoNavigation?.tituloTipoEvento}
                                    titulo={e.nomeEvento}
                                    descricao={e.descricao} />
                            ))
                        }
                    </div>
                </section>
            </main>
            <Footer />
        </>
    )
}

export default Eventos;