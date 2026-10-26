import type { Usuario } from "../../Types/api";
import lapis from "../../assets/icons/lapis.svg"
import lixo from "../../assets/icons/lixo.svg"
import "./listaUsuarios.css"

interface ListarUsuariosProps {
    usuarios: Usuario[];
    idEmEdicao: string | null;
    carregando?: boolean;
    onEditar: (usuario: Usuario) => void;
    onExcluir: (usuario: Usuario) => void;
}

function ListaUsuarios({ usuarios, idEmEdicao, carregando, onEditar, onExcluir }: ListarUsuariosProps) {
    return (
        <section className="lista-tipos lista-usuarios">
            <div className="lista-tipos-conteudo">
                <h2>Usuários Cadastrados</h2>
                <div className="lista-tipos-tabela-wrapper">
                    <table className="lista-usuarios-tabela">
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>E-Mail</th>
                                <th>Tipo Usuário</th>
                                <th>Editar</th>
                                <th>Excluir</th>
                            </tr>
                        </thead>

                        <tbody>
                            {carregando ? <tr><td colSpan={5} className="lista-tipos-tabela-vazia">Carregando...</td></tr> : null}
                            {!carregando && usuarios.length === 0 ? <tr><td colSpan={5} className="lista-tipos-tabela-vazia">Nenhum usuário cadastrado</td></tr> : null}
                            {!carregando && usuarios.map((usuario) => (
                                <tr className={idEmEdicao === usuario.idUsuario ? "lista-tipos-linha-ativa" : ""} key={usuario.idUsuario}>
                                    <td>{usuario.nome}</td>
                                    <td>{usuario.email}</td>
                                    <td>{usuario.idTipoUsuarioNavigation?.tituloTipoUsuario || "Não informado"}</td>
                                    <td><button type="button" className="lista-tipos-acao" aria-label={`Editar ${usuario.nome}`} onClick={() => onEditar(usuario)}><img src={lapis} alt="edite"/></button></td>
                                    <td><button type="button" className="lista-tipos-acao" aria-label={`Excluir ${usuario.nome}`} onClick={() => onExcluir(usuario)}><img src={lixo} alt="apague"/></button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    )
}

export default ListaUsuarios;