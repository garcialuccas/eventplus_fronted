import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../pages/home/Home"
import Eventos from "../pages/Eventos/Eventos";
import DetalhesEvento from "../pages/DetalhesEvento/DetalhesEvento";
import Login from "../pages/Login/login"

function AppRoutes() {
    return (
        <Routes>
            <Route path="/Home" element={<Home />} />
            <Route path="/Eventos" element={<Eventos />} />
            <Route path="/Eventos/:id" element={<DetalhesEvento />} />
            <Route path="/Login" element={<Login />}></Route>
            <Route path="*" element={<Navigate to="/Home" replace />} />
        </Routes>
    )
}

export default AppRoutes;