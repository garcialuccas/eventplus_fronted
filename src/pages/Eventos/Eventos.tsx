import "./Eventos.css"
import Header from "../../components/header/Header";
import Footer from "../../components/footer/footer";
import { useCallback, useEffect, useState } from "react";
import type { Evento, TipoEvento } from "../../Types/api";
import { eventoService, tipoEventoService } from "../../service/EventPlusService";
import CardEvento from "../../components/cardEvento/CardEvento";
import Botao from "../../components/botao/botao";
import Campo from "../../components/campo/Campo";

function Eventos() {

    const [eventos, setEventos] = useState<Evento[]>([])
    const [tiposEventos, setTipoEventos] = useState<TipoEvento[]>([])
    const [categoria, setCategoria] = useState<string>("")
    const [idEmEdicao, setIdEmEdicao] = useState<string | null>(null)
    const [selecionado, setSelecionado] = useState<Evento | null>(null)
    const [carregando, setCarregando] = useState(false)
    const [enviando, setEnviando] = useState(false)
    const [mensagem, setMensagem] = useState("")

    useEffect(() => {
        async function carregarEventos() {
            const dados = await eventoService.listar()
            setEventos(dados)
        }
        void carregarEventos();
    }, [])


    useEffect(() => {
        async function carregarTipoEventos() {
            const dados = await tipoEventoService.listar()
            setTipoEventos(dados)
        }
        void carregarTipoEventos()
    }, [])

    const eventosFiltrados = categoria === "" ? eventos : eventos.filter((e) => (e.idTipoEventoNavigation?.titulo === categoria))

    return (
        <>
            <Header />
            <main>

                <section className="adm-evento">
                    <h2>Administração de Eventos</h2>
                    <form className="adm-evento-cadastro">
                        <label htmlFor="evento-titulo" className="visually-hidden">Título do Evento</label>
                        <Campo id="evento-titulo"/>
                    </form>
                </section>

                <section className="section-eventos">
                    <div className="eventos-botoes">
                        <Botao className={`eventos-botao-categoria ${categoria === "" ? "ativo" : ""}`} onClick={() => setCategoria("")} texto="Todos"/>
                        {
                            tiposEventos.map((te) => (
                                <Botao key={te.idTipoEvento} className={`eventos-botao-categoria ${categoria === te.titulo ? "ativo" : ""}`} onClick={() => setCategoria(te.titulo)} texto={te.titulo} />
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
                                    categoria={e.idTipoEventoNavigation?.titulo}
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