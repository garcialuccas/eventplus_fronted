import { useCallback, useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import Campo from "../../components/campo/Campo";
import Footer from "../../components/footer/footer";
import Header from "../../components/header/Header";
import "./tipoEvento.css"
import { tipoEventoService } from "../../service/EventPlusService";
import { getApiErrorMessage } from "../../service/Api";
import type { TipoEvento } from "../../Types/api";
import Botao from "../../components/botao/botao";
import ListaTipoEventos from "../../components/listaTipo/listaTipo";
import ModalConfirmacao from "../../components/modal/ModalConfirmacao";
import ListaTipo from "../../components/listaTipo/listaTipo";

interface FormularioTipoEvento {
    tituloTipoEvento: string,
}

const inicial: FormularioTipoEvento = { tituloTipoEvento: "" }

function tipoEvento() {

    const [tipos, setTipos] = useState<TipoEvento[]>([])
    const [formulario, setFormulario] = useState(inicial)
    const [selecionado, setSelecionado] = useState<TipoEvento | null>(null)
    const [carregando, setCarregando] = useState(false)
    const [enviando, setEnviando] = useState(false)
    const [mensagem, setMensagem] = useState("")
    const [idEmEdicao, setIdEmEdicao] = useState<string | null>(null)

    function limpar() {
        setFormulario({ ...inicial, })
        setIdEmEdicao(null)
        setMensagem("")
    }

    const carregar = useCallback(async () => {
        setCarregando(true)
        setMensagem("")
        try {
            const tiposApi = await tipoEventoService.listar()
            setTipos(tiposApi)
        }
        catch (error) {
            setMensagem(getApiErrorMessage(error))
        }
        finally {
            setCarregando(false)
        }
    }, [])

    useEffect(() => {
        const timeout = window.setTimeout(() => void carregar(), 0)
        return () => window.clearTimeout(timeout)
    }, [carregar])

    async function salvar(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setEnviando(true);
        setMensagem("")

        try {
            const payload = { ...formulario, tituloTipoEvento: formulario.tituloTipoEvento.trim() }

            if (idEmEdicao) await tipoEventoService.atualizar(idEmEdicao, payload);
            else await tipoEventoService.cadastrar(payload.tituloTipoEvento);
            limpar();
            carregar();
        }
        catch (error) {
            setMensagem(getApiErrorMessage(error))
        }
        finally {
            setEnviando(false)
        }
    }

    function atualizar(event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        setFormulario((value) => ({ ...value, [event.target.name]: event.target.value }))
    }

    function editar(tipoEvento: TipoEvento) {
        setIdEmEdicao(tipoEvento.idTipoEvento)
        setFormulario({ tituloTipoEvento: tipoEvento.tituloTipoEvento })
        window.scrollTo({ top: 0, behavior: "smooth" })
    }

    async function excluir() {
        if (!selecionado) return;

        setEnviando(true)
        try {
            await tipoEventoService.excluir(selecionado.idTipoEvento)
            if (idEmEdicao === selecionado.idTipoEvento) limpar();
            setSelecionado(null)
            await carregar()
        }
        catch (error) {
            setMensagem(getApiErrorMessage(error))
            setSelecionado(null)
            limpar()
        }
        finally {
            setEnviando(false)
        }
    }

    return (
        <>
            <Header />
            <main>
                <section className="cadastro-tipo-evento">
                    <form className="formulario-tipo-evento" onSubmit={salvar}>
                        <label htmlFor="tipo-evento-titulo">Tipo Evento Título</label>
                        <Campo id="tipo-evento-titulo" type="text" name="tituloTipoEvento" value={formulario.tituloTipoEvento} onChange={atualizar} />
                        <Botao texto={enviando ? "Salvando..." : idEmEdicao ? "Salvar" : "Cadastrar"} type="submit" disabled={enviando} />
                        {idEmEdicao ? <button type="button" onClick={limpar}>Cancelar Edição</button> : null}
                        {mensagem ? <p>{mensagem}</p> : null}
                    </form>
                </section>

                <ListaTipo
                    dados={tipos}
                    idEmEdicao={idEmEdicao}
                    carregando={carregando}
                    onEditar={editar}
                    onExcluir={setSelecionado}
                    getKey={(tipo) => tipo.idTipoEvento}
                    getTitulo={(tipo) => tipo.tituloTipoEvento}
                />
                <ModalConfirmacao show={Boolean(selecionado)} titulo="Excluir Evento" mensagem={selecionado ? `Deseja excluir "${selecionado.tituloTipoEvento}"?` : ""} textoConfirmar={enviando ? "Excluindo..." : "Excluir"} textoCancelar="Cancelar" onClose={() => setSelecionado(null)} onConfirm={() => void excluir()}></ModalConfirmacao>

            </main>
            <Footer />
        </>
    )
}

export default tipoEvento;