// Tipo que representa uma transação do sistema
export type TransacoesProps = {
    id: number;
    descricao: string;
    valor: number;
    tipo: Tipo;
    categoriaId: string;
    pessoaId: string;
};

// Tipo que define se a transação é Despesa ou Receita
export type Tipo = 1 | 2;

// Objeto usado para converter o tipo numérico em um texto
export const TipoLabel: Record<Tipo, string> = {
    1: "Despesa",
    2: "Receita",
};
