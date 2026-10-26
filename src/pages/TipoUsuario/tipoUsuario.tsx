import { useCallback, useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import Campo from "../../components/campo/Campo";
import Footer from "../../components/footer/footer";
import Header from "../../components/header/Header";
import "./tipoUsuario.css"
import { tipoUsuarioService } from "../../service/EventPlusService";
import { getApiErrorMessage } from "../../service/Api";
import type { TipoUsuario } from "../../Types/api";
import Botao from "../../components/botao/botao";
import ModalConfirmacao from "../../components/modal/ModalConfirmacao";
import ListaTipo from "../../components/listaTipo/listaTipo";

interface FormularioTipoUsuario {
    tituloTipoUsuario: string,
}

const inicial: FormularioTipoUsuario = { tituloTipoUsuario: "" }

function tipoUsuario() {

    const [tipos, setTipos] = useState<TipoUsuario[]>([])
    const [formulario, setFormulario] = useState(inicial)
    const [selecionado, setSelecionado] = useState<TipoUsuario | null>(null)
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
            const tiposApi = await tipoUsuarioService.listar()
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
            const payload = { ...formulario, tituloTipoUsuario: formulario.tituloTipoUsuario.trim() }

            if (idEmEdicao) await tipoUsuarioService.atualizar(idEmEdicao, payload);
            else await tipoUsuarioService.cadastrar(payload.tituloTipoUsuario);
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

    function editar(tipoUsuario: TipoUsuario) {
        setIdEmEdicao(tipoUsuario.idTipoUsuario)
        setFormulario({ tituloTipoUsuario: tipoUsuario.tituloTipoUsuario })
        window.scrollTo({ top: 0, behavior: "smooth" })
    }

    async function excluir() {
        if (!selecionado) return;

        setEnviando(true)
        try {
            await tipoUsuarioService.excluir(selecionado.idTipoUsuario)
            if (idEmEdicao === selecionado.idTipoUsuario) limpar();
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
                <section className="cadastro-tipo-Usuario">
                    <form className="formulario-tipo-Usuario" onSubmit={salvar}>
                        <label htmlFor="tipo-Usuario-titulo">Tipo Usuario Título</label>
                        <Campo id="tipo-Usuario-titulo" type="text" name="tituloTipoUsuario" value={formulario.tituloTipoUsuario} onChange={atualizar} />
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
                    getKey={(tipo) => tipo.idTipoUsuario}
                    getTitulo={(tipo) => tipo.tituloTipoUsuario}
                />
                <ModalConfirmacao show={Boolean(selecionado)} titulo="Excluir Usuario" mensagem={selecionado ? `Deseja excluir "${selecionado.tituloTipoUsuario}"?` : ""} textoConfirmar={enviando ? "Excluindo..." : "Excluir"} textoCancelar="Cancelar" onClose={() => setSelecionado(null)} onConfirm={() => void excluir()}></ModalConfirmacao>

            </main>
            <Footer />
        </>
    )
}

export default tipoUsuario;