import { axiosInstance } from "./Api";

import { type Comentario, type ComentarioPayload, type Evento, type LoginPayload, type LoginResponse, type MensagemModeracao, type Presenca, type PresencaPayload, type TipoEventoPayLoad, type TipoEvento, type TipoUsuario, type Usuario, type UsuarioPayLoad, type TipoUsuarioPayLoad } from "../Types/api";

export const authService = {
    async login(payload: LoginPayload) {
        const { data } = await axiosInstance.post<LoginResponse>("Login", payload);
        return data;
    }
}

export const eventoService = {
    async listar() {
        const { data } = await axiosInstance.get<Evento[]>("Evento/Listar");
        return data;
    },

    async listarProximos() {
        const { data } = await axiosInstance.get<Evento[]>("Evento/ListarProximos");
        return data;
    },

    async buscar(id: string) {
        const { data } = await axiosInstance.get<Evento>(`Evento/${id}`);
        return data;
    }
}

export const comentarioService = {
    async listarPorEvento(idEvento: string) {
        const { data } = await axiosInstance.get<Comentario[]>(`Comentario/Evento/${idEvento}`);
        return data;
    },

    async cadastrar(payload: ComentarioPayload) {
        const { data } = await axiosInstance.post<Comentario | MensagemModeracao>("Comentario", payload);
        return data;
    }
}

export const presencaService = {
    async listarPorUsuario(idUsuario: string) {
        const { data } = await axiosInstance.get<Presenca[]>(`Presenca/Usuario/${idUsuario}`);
        return data;
    },

    async cadastrar(payload: PresencaPayload) {
        const { data } = await axiosInstance.post<Presenca>("Presenca", payload);
        return data;
    },

    async excluir(id: string) {
        await axiosInstance.delete(`Presenca/${id}`);
    },

    async atualizarSituacao(id: string) {
        await axiosInstance.put(`Presenca/${id}`);
    },

    async listarPorEvento(idEvento: string) {
        const { data } = await axiosInstance.get<Presenca[]>(`Presenca/Evento/${idEvento}`);
        return data;
    }
}

export const usuarioService = {
    async buscar(id: string) {
        const { data } = await axiosInstance.get<Usuario>(`Usuario/${id}`);
        return data;
    },

    async listar() {
        const { data } = await axiosInstance.get<Usuario[]>("Usuario");
        return data;
    },

    async cadastrar(payload: UsuarioPayLoad) {
        const { data } = await axiosInstance.post<Usuario>("Usuario", payload);
        return data;
    },

    async atualizar(id: string, payload: UsuarioPayLoad) {
        await axiosInstance.patch(`Usuario/${id}`, payload)
    },

    async excluir(id: string) {
        await axiosInstance.delete(`Usuario/${id}`)
    }
}

function tipoService<T extends { titulo: string }>(endpoint: string) {
    return {
        async listar() {
            const { data } = await axiosInstance.get<T[]>(endpoint);
            return data;
        },

        async cadastrar(titulo: string) {
            const { data } = await axiosInstance.post<T>(endpoint, { titulo });
            return data;
        },

        async atualizar(id: string, titulo: string) {
            await axiosInstance.patch(`${endpoint}/${id}/${titulo}`);
        },

        async excluir(id: string) {
            await axiosInstance.delete(`${endpoint}/${id}`);
        }
    }
}

export const tipoUsuarioService = {
    async listar() {
        const { data } = await axiosInstance.get<TipoUsuario[]>("TipoUsuario")
        return data
    },

    async cadastrar(payload: string) {
        const { data } = await axiosInstance.post<TipoUsuario>(`TipoUsuario/${payload}`)
        return data
    },

    async atualizar(id: string, payload: TipoUsuarioPayLoad) {
        await axiosInstance.put(`TipoUsuario/${id}`, payload)
    },

    async excluir(id: string) {
        await axiosInstance.delete(`TipoUsuario/${id}`)
    }
}

export const tipoEventoService = {
    async listar() {
        const { data } = await axiosInstance.get<TipoEvento[]>("TipoEvento")
        return data
    },

    async cadastrar(payload: string) {
        const { data } = await axiosInstance.post<TipoEvento>(`TipoEvento/${payload}`)
        return data
    },

    async atualizar(id: string, payload: TipoEventoPayLoad) {
        await axiosInstance.put(`TipoEvento/${id}`, payload)
    },

    async excluir(id: string) {
        await axiosInstance.delete(`TipoEvento/${id}`)
    }
}

// export const tipoUsuarioService = tipoService<TipoUsuario>("TipoUsuario")
// export const tipoEventoService = tipoService<TipoEvento>("TipoEvento")