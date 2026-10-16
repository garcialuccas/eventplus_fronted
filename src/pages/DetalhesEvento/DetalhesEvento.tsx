import Header from "../../components/header/Header";
import Footer from "../../components/footer/footer";
import { Link, useParams } from "react-router-dom"
import "./DetalhesEvento.css"
import { useEffect, useState } from "react";
import { type Comentario, type Evento, type Presenca } from "../../Types/api";
import { comentarioService, eventoService } from "../../service/EventPlusService";
import banner from "../../assets/banner-1.png"
import Botao from "../../components/botao/botao";

function DetalhesEvento() {

    const { id = "" } = useParams();

    const [evento, setEvento] = useState<Evento | null>(null);
    const [secaoComentario, setSecaoComentarios] = useState<boolean>(false);
    const [comentarios, setComentarios] = useState<Comentario[]>();
    const [presenca, setPresenca] = useState<Presenca | null>(null);
    const [presencaCarregada, setPresencaCarregada] = useState("");
    const [confirmandoCancelamento, setConfirmandoCancelamento] = useState(false);

    useEffect(() => {
        async function carregar() {
            if (!id) return;
            const dados = await eventoService.buscar(id);
            setEvento(dados);
        }
        void carregar();
    }, [id]);

    useEffect(() => {
        async function carregar() {
            if (!id) return;
            const dados = (await comentarioService.listarPorEvento(id));
            setComentarios(dados);
        }
        void carregar();
    }, [])

    useEffect(() => {
        async function verificar() {
            
        }
    })

    // const chavePresenca = usuario && id ? `${usuario.idUsuario}:${id}` : ""
    // const checandoPresenca = Boolean(chavePresenca && presencaCarregada !== chavePresenca)

    return (
        <>
            <Header />
            <main>
                <div className="evento-banner">
                    <img src={evento?.imagemUrl || banner} alt="Banner do Evento" />
                    <h1>{evento?.nomeEvento}</h1>
                    <div className="evento-total">
                        <div className="evento-comentario-descricao">
                            <div className="evento-botoes">
                                <Botao texto="Sobre o Evento" onClick={() => setSecaoComentarios(false)}/>
                                <Botao texto="Comentários" onClick={() => setSecaoComentarios(true)}/>
                            </div>
                            {secaoComentario ? <>
                                <h2>Comentários</h2>

                                {comentarios?.map((c) => (
                                    <>
                                        <div style={{display: "flex", gap: "10px"}}><strong>{c.idUsuarioNavigation?.nome}</strong> <p>{new Date(c.dataComentario).toLocaleString("pt-br", { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false }).replace(/[,]|( às)/g, ' -')}</p></div>
                                        <p>{c.descricao}</p>
                                    </>
                                ))}

                            </> :
                                <>
                                    <h2>Descrição do Evento</h2>
                                    <p>{evento?.descricao}</p>
                                </>}
                        </div>

                        <div className="evento-informacoes">
                            <h2>Informações principais</h2>
                            <hr />

                            <div className="evento-informacoe-item">
                                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M33 20C33 27.1813 27.1813 33 20 33C12.8188 33 7 27.1813 7 20C7 12.8188 12.8188 7 20 7C27.1813 7 33 12.8188 33 20ZM4 20C4 28.8375 11.1625 36 20 36C28.8375 36 36 28.8375 36 20C36 11.1625 28.8375 4 20 4C11.1625 4 4 11.1625 4 20ZM18.5 11.5V20C18.5 20.5 18.75 20.9688 19.1688 21.25L25.1688 25.25C25.8563 25.7125 26.7875 25.525 27.25 24.8313C27.7125 24.1375 27.525 23.2125 26.8313 22.75L21.5 19.2V11.5C21.5 10.6688 20.8313 10 20 10C19.1688 10 18.5 10.6688 18.5 11.5Z" fill="black" />
                                </svg>
                                <p>{evento?.dataEvento}</p>
                            </div>

                            <div className="evento-informacoe-item">
                                <svg width="46" height="48" viewBox="0 0 46 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13.8002 8.40005C13.1677 8.40005 12.6502 8.94005 12.6502 9.60005V38.4001C12.6502 39.0601 13.1677 39.6001 13.8002 39.6001H19.5502V33.6C19.5502 32.2726 20.578 31.2001 21.8502 31.2001H24.1502C25.4224 31.2001 26.4502 32.2726 26.4502 33.6V39.6001H32.2002C32.8327 39.6001 33.3502 39.0601 33.3502 38.4001V9.60005C33.3502 8.94005 32.8327 8.40005 32.2002 8.40005H13.8002ZM9.2002 9.60005C9.2002 6.95255 11.263 4.80005 13.8002 4.80005H32.2002C34.7374 4.80005 36.8002 6.95255 36.8002 9.60005V38.4001C36.8002 41.0476 34.7374 43.2001 32.2002 43.2001H13.8002C11.263 43.2001 9.2002 41.0476 9.2002 38.4001V9.60005ZM16.1002 13.2C16.1002 12.54 16.6177 12 17.2502 12H19.5502C20.1827 12 20.7002 12.54 20.7002 13.2V15.6C20.7002 16.26 20.1827 16.8 19.5502 16.8H17.2502C16.6177 16.8 16.1002 16.26 16.1002 15.6V13.2ZM26.4502 12H28.7502C29.3827 12 29.9002 12.54 29.9002 13.2V15.6C29.9002 16.26 29.3827 16.8 28.7502 16.8H26.4502C25.8177 16.8 25.3002 16.26 25.3002 15.6V13.2C25.3002 12.54 25.8177 12 26.4502 12ZM16.1002 22.8C16.1002 22.14 16.6177 21.6 17.2502 21.6H19.5502C20.1827 21.6 20.7002 22.14 20.7002 22.8V25.2001C20.7002 25.8601 20.1827 26.4 19.5502 26.4H17.2502C16.6177 26.4 16.1002 25.8601 16.1002 25.2001V22.8ZM26.4502 21.6H28.7502C29.3827 21.6 29.9002 22.14 29.9002 22.8V25.2001C29.9002 25.8601 29.3827 26.4 28.7502 26.4H26.4502C25.8177 26.4 25.3002 25.8601 25.3002 25.2001V22.8C25.3002 22.14 25.8177 21.6 26.4502 21.6Z" fill="black" />
                                </svg>
                                <p>{evento?.idInsituicaoNavigation?.endereco || "Desconhecido"}</p>
                            </div>

                            <div className="evento-informacoe-item">
                                <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5.10023 6.80005C4.41491 6.80005 3.79335 7.21442 3.52773 7.85192C3.2621 8.48942 3.41085 9.21724 3.8996 9.70067L13.6002 19.4066V25.5C13.6002 25.9516 13.7809 26.3819 14.0996 26.7007L17.4996 30.1007C17.9884 30.5894 18.7162 30.7329 19.3537 30.4672C19.9912 30.2016 20.4002 29.5854 20.4002 28.9V19.4066L30.1009 9.70599C30.5896 9.21724 30.733 8.48942 30.4674 7.85192C30.2018 7.21442 29.5855 6.80005 28.9002 6.80005H5.10023Z" fill="black" />
                                </svg>
                                <p>{evento?.idTipoEventoNavigation?.tituloTipoEvento || "Nenhum"}</p>
                            </div>

                            <Botao className={presenca ? "detalhe-evento-cancelar" : ""} texto={presenca ? "Cancelar Inscrição" : "Se Inscrever"}/>
                        </div>

                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}

export default DetalhesEvento;