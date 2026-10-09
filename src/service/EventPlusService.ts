import axiosInstance from "./Api";

import type { Evento, TipoEvento } from "../Types/api";

export const eventoService = {
    async listar() {
        const { data } = await axiosInstance.get<Evento[]>("Evento/Listar")
        return data
    },

    async listar_proximos() {
        const { data } = await axiosInstance.get<Evento[]>("Evento/ListarProximos")
        return data
    },

    async buscar(id: string) {
        const { data } = await axiosInstance.get<Evento>(`Evento/${id}`)
        return data
    },
}

export const tipoEventoService = {
    async listar() {
        const { data } = await axiosInstance.get<TipoEvento[]>("TipoEvento")
        return data
    },
}