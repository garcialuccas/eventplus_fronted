export interface TipoEvento {
    idTipoEvento: string;
    tituloTipoEvento: string;
}

export interface TipoEventoPayLoad {
    tituloTipoEvento: string
}

export interface Insituticao {
    idInstituicao: string;
    cnpj: string;
    nomeFantasia: string;
    endereco: string;
}

export interface Evento {
    idEvento: string;
    nomeEvento: string;
    descricao: string;
    dataEvento: string;
    imagemUrl?: string | null;
    idTipoEvento?: string | null;
    idInstituicao?: string | null;
    idTipoEventoNavigation?: TipoEvento | null;
    idInsituicaoNavigation?: Insituticao | null;
}

export interface Comentario {
    idComentario: string;
    dataComentario: string;
    descricao: string;
    exibe: boolean;
    idEvento: string;
    idUsuario: string;
    idEventoNavigation: Evento | null;
    idUsuarioNavigation: Usuario | null;
}

export interface Usuario {
    idUsuario: string;
    nome: string;
    email: string;
    senha: string;
    idTipoUsuario: string;
    comentario: Comentario[] | null;
    idTipoUsuarioNavigation: TipoUsuario | null;
    presenca: Presenca[];
}

export interface TipoUsuario {
    idTipoUsuario: string;
    tituloTipoUsuario: string;
    usuario: Usuario[];
}

export interface TipoUsuarioPayLoad {
    tituloTipoUsuario : string
}

export interface Presenca {
    idPresenca: string;
    situacao: boolean;
    idEvento: string;
    idUsuario: string;
    idEventoNavigation: Evento | null;
    idUsuarioNavigation: Usuario | null;
}

export interface LoginPayload {
    email: string;
    senha: string;
}

export interface LoginResponse {
    token: string;
    expiracao: string;
    usuario: Usuario;
}

export interface AuthSession extends LoginResponse {
    usuario: Usuario;
}

export interface PresencaPayload {
    situacao: boolean;
    idEvento: string;
    idUsuario: string | null;
}

export interface ComentarioPayload{
    descricao: string;
    idEvento: string;
    idUsuario: string | null;
}

export interface MensagemModeracao{
    mensagem: string;
    motivo?: string;
}

export interface UsuarioPayLoad {
    nome: string,
    email: string,
    senha: string,
    idTipoUsuario: string | null;
}