namespace WebAPI.Domain.Entities
{
    /// <summary>
    /// Entidade que representa uma pessoa no sistema
    /// </summary>
    public class Pessoa
    {
        public Guid Id { get; set; }
        public string Nome { get; set; } = default!;
        public int Idade { get; set; } = default!;
    }
}