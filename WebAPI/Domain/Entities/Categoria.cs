using WebAPI.Domain.Enums;

namespace WebAPI.Domain.Entities
{
    /// <summary>
    /// Entidade que representa uma categoria no sistema
    /// </summary>
    public class Categoria
    {
        public Guid Id { get; set; }
        public string Descricao { get; set; } = default!;

        /// <summary>
        /// Finalidade da categoria, indicando se é usada
        /// para receitas, despesas ou ambas
        /// </summary>
        public Finalidade Finalidade { get; set; }
    }
}