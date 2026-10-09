import Header from "../../components/header/Header";
import Footer from "../../components/footer/footer";
import { Link, useParams } from "react-router-dom"
import "./DetalhesEvento.css"

function DetalhesEvento() {

    const { id = "" } = useParams();

    return (
        <>
            <Header />
            <main>
                <Link to="/Eventos">Voltar aos Eventos</Link>
                <h1>Detalhes do Evento</h1>
                <p>ID recebido: {id}</p>
            </main>
            <Footer />
        </>
    )
}

export default DetalhesEvento;