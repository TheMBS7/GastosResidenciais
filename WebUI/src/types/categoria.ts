// Tipo que representa uma categoria do sistema
export type CategoriasProps = {
    id: number;
    descricao: string;
    finalidade: Finalidade;
};

// Tipo Finalidade define os valores possíveis para uma categoria
export type Finalidade = 1 | 2 | 3;

// Objeto usado para transformar o valor numérico da finalidade
// em um texto mais fácil de entender na tela
export const FinalidadeLabel: Record<Finalidade, string> = {
    1: "Despesa",
    2: "Receita",
    3: "Ambas"
};
