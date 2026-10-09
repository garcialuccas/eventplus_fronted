export interface TipoEvento{
    idTipoEvento: string;
    tituloTipoEvento: string;
}

export interface insituticao{
    idInstituicao: string;
    cnpj: string;
    nomeFantasia: string;
    endereco: string;
}

export interface Evento{
    idEvento: string;
    nomeEvento: string;
    descricao: string;
    dataEvento: string;
    imagemUrl?: string | null;
    idTipoEvento?: string | null;
    idInstituicao?: string | null;
    idTipoEventoNavigation?: TipoEvento | null;
    idInsituicaoNavigation?: insituticao | null;
}