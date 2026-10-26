import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Home from "../pages/home/Home"
import Eventos from "../pages/Eventos/Eventos";
import DetalhesEvento from "../pages/DetalhesEvento/DetalhesEvento";
import Login from "../pages/Login/login"
import { useEffect } from "react";
import Usuarios from "../pages/Usuarios/Usuarios";
import TipoEvento from "../pages/TipoEvento/tipoEvento";
import TipoUsuario from "../pages/TipoUsuario/tipoUsuario";

function ScrollToHash() {
    const { pathname, hash, key } = useLocation();

    useEffect(() => {
        if (hash) {
            document.getElementById(hash.slice(1))?.scrollIntoView();
        } else {
            window.scrollTo({ top: 0, behavior: "instant" });
        }
    }, [pathname, hash, key]);

    return null;
}

function AppRoutes() {
    return (
        <>
            <ScrollToHash />
            <Routes>
                <Route path="/Home" element={<Home />} />
                <Route path="/Eventos" element={<Eventos />} />
                <Route path="/Eventos/:id" element={<DetalhesEvento />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/Usuario" element={<Usuarios />} />
                <Route path="/TipoEvento" element={<TipoEvento />} />
                <Route path="/TipoUsuario" element={<TipoUsuario />} />
                <Route path="*" element={<Navigate to="/Home" replace />} />
            </Routes>
        </>
    )
}

export default AppRoutes;