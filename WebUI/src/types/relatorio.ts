// Tipo que representa o total de receitas e despesas por pessoa
export type TotalPorPessoaProps = {
    pessoaId: number;
    totalReceita: number;
    totalDespesas: number;
    totalLiquido: number;
};

// Tipo que representa o total geral. Soma de todas as receitas e despesas de todas as pessoas
export type TotalGeralProps = {
    totalGeralReceita: number;
    totalGeralDespesas: number;
    totalGeralLiquido: number;
};

// Tipo principal do relatório. Contém o total separado por pessoa e também o total geral
export type RelatorioPessoaProps = {
    totalPorPessoas: TotalPorPessoaProps[];
    totalGeral: TotalGeralProps;
};

// Tipo principal do relatório. Contém o total separado por pessoa e também o total geral
export type RelatorioCategoriaProps = {
    totalPorCategoria: TotalPorCategoriaProps[];
    totalGeral: TotalGeralProps;
};

// Tipo que representa o total de receitas e despesas das categorias
export type TotalPorCategoriaProps = {
    categoriaId: number;
    totalReceita: number;
    totalDespesas: number;
    totalLiquido: number;
};