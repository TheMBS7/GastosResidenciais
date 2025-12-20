using Microsoft.EntityFrameworkCore;
using WebAPI.Domain.Entities;

namespace WebAPI.Data
{
    /// <summary>
    /// Contexto principal do banco de dados da aplicação
    /// responsável por gerenciar as entidades e suas configurações
    /// </summary>
    public class ApplicationDbContext : DbContext
    {
        /// <summary>
        /// Construtor que recebe as opções do DbContext
        /// configuradas na inicialização da aplicação
        /// </summary>
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        /// <summary>
        /// Representa a tabela de Categorias no banco de dados
        /// </summary>
        public DbSet<Categoria> Categorias { get; set; }

        /// <summary>
        /// Representa a tabela de Pessoas no banco de dados
        /// </summary>
        public DbSet<Pessoa> Pessoas { get; set; }

        /// <summary>
        /// Representa a tabela de Transações no banco de dados
        /// </summary>
        public DbSet<Transacao> Transacoes { get; set; }

        /// <summary>
        /// Aplica automaticamente todas as configurações de mapeamento encontradas na aplicação
        /// </summary>
        protected override void OnModelCreating(ModelBuilder modelBuilder)
            => modelBuilder.ApplyConfigurationsFromAssembly(typeof(ApplicationDbContext).Assembly);
    }
}
