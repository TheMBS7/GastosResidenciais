using WebAPI.Domain.Enums;

namespace WebAPI.Domain.Entities
{
    /// <summary>
    /// Entidade que representa uma transação no sistema
    /// </summary>
    public class Transacao
    {
        public Guid Id { get; set; }
        public string Descricao { get; set; } = default!;
        public decimal Valor { get; set; }

        /// <summary>
        /// Tipo da transação, indicando se é receita ou despesa
        /// </summary>
        public Tipo Tipo { get; set; }

        /// <summary>
        /// Id da categoria relacionada a transação
        /// </summary>
        public Guid CategoriaId { get; set; }

        /// <summary>
        /// Categoria associada a transação
        /// </summary>
        public Categoria Categoria { get; set; } = default!;

        /// <summary>
        /// Id da pessoa relacionada a transação
        /// </summary>
        public Guid PessoaId { get; set; }

        /// <summary>
        /// Pessoa associada a transação
        /// </summary>
        public Pessoa Pessoa { get; set; } = default!;
    }
}
