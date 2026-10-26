import "./listaTipo.css"
import lapis from "../../assets/icons/lapis.svg"
import lixo from "../../assets/icons/lixo.svg"

// 1. Definimos uma interface base ou permitimos que o T passe as propriedades necessárias
interface ListarTiposProps<T> {
    dados: T[]; // Renomeado de 'tipos' para 'dados' para fazer sentido de forma genérica
    idEmEdicao: string | null;
    carregando?: boolean;
    onEditar: (item: T) => void;
    onExcluir: (item: T) => void;
    // Funções auxiliares para extrair os valores de forma genérica se as propriedades mudarem entre tabelas
    getKey: (item: T) => string;
    getTitulo: (item: T) => string;
}

function ListaTipo<T>({ 
    dados, 
    idEmEdicao, 
    carregando, 
    onEditar, 
    onExcluir, 
    getKey, 
    getTitulo 
}: ListarTiposProps<T>) {
    return (
        <>
        <section className="lista-tipos">
            <h2>Registos Cadastrados</h2>
            <div className="lista-tipos-tabela-wrapper">
                <table className="lista-tipos-tabela">
                    <thead>
                        <tr>
                            <th>Título</th>
                            <th>Editar</th>
                            <th>Excluir</th>
                        </tr>
                    </thead>

                    <tbody>
                        {carregando ? (
                            <tr><td colSpan={3} className="lista-tipos-tabela-vazia">Carregando...</td></tr>
                        ) : null}

                        {!carregando && dados.length === 0 ? (
                            <tr><td colSpan={3} className="lista-tipos-tabela-vazia">Nenhum registo cadastrado</td></tr>
                        ) : null}

                        {!carregando && dados.map((item) => {
                            const id = getKey(item);
                            const titulo = getTitulo(item);

                            return (
                                <tr className={idEmEdicao === id ? "lista-tipos-linha-ativa" : ""} key={id}>
                                    <td>{titulo}</td>
                                    <td>
                                        <button type="button" className="lista-tipos-acao" aria-label={`Editar ${titulo}`} onClick={() => onEditar(item)}>
                                            <img src={lapis} alt="edite"/>
                                        </button>
                                    </td>
                                    <td>
                                        <button type="button" className="lista-tipos-acao" aria-label={`Excluir ${titulo}`} onClick={() => onExcluir(item)}>
                                            <img src={lixo} alt="apague"/>
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </section>
        </>
    )
}

export default ListaTipo;