import axiosInstance from "./Api";

import type { Comentario, Evento, LoginPayload, LoginResponse, Presenca, PresencaPayLoad, TipoEvento, Usuario } from "../Types/api";

export const authService = {
    async login(payload: LoginPayload) {
        const { data } = await axiosInstance.post<LoginResponse>("Login", payload);
        return data;
    }
}

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

export const comentarioService = {
    async listarPorEvento(idEvento: string) {
        const { data } = await axiosInstance.get<Comentario[]>(`/Comentario/Evento/${idEvento}`)
        return data;
    }
}

export const presencaService = {
    async listarPorUsuario(idUsuario: string) {
        const { data } = await axiosInstance.get<Presenca[]>(`/Presenca/Usuario/${idUsuario}`)
        return data
    },

    async cadastrar(payload: PresencaPayLoad) {
        const { data } = await axiosInstance.post<Presenca>("/Presenca", payload);
        return data
    },

    async excluit(id: string) {
        await axiosInstance.delete(`Presenca/${id}`)
    }
}

export const usuarioService = {
    async buscar(id: string) {
        const { data } = await axiosInstance.get<Usuario>(`Usuario/${id}`);
        return data;
    }
}