import bannerEvento1 from "../../assets/banner-1.png"
import bannerEvento2 from "../../assets/banner-2.png"
import bannerEvento3 from "../../assets/banner-3.png"
import "./carrossel.css"

function Carrossel() {
    return (
<section id="carouselEventPlus" className="carousel slide" data-bs-ride="carousel" data-bs-interval="10000">
    <div className="carousel-inner">
        <div className="carousel-item active">
            <img src={bannerEvento1} alt="Banner do Primeiro Evento" className="carousel-banner" />
        </div>
        
        <div className="carousel-item">
            <img src={bannerEvento2} alt="Banner do Segundo Evento" className="carousel-banner" />
        </div>
        
        <div className="carousel-item">
            <img src={bannerEvento3} alt="Banner do Terceiro Evento" className="carousel-banner" />
        </div>
    </div>

    <button className="carousel-control-prev" type="button" data-bs-target="#carouselEventPlus" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true" />
        <span className="visually-hidden">Anterior</span>
    </button>

    <button className="carousel-control-next" type="button" data-bs-target="#carouselEventPlus" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true" />
        <span className="visually-hidden">Próximo</span>
    </button>
</section>
    )
}

export default Carrossel;