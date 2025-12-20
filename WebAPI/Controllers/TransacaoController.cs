using Microsoft.AspNetCore.Mvc;
using WebAPI.RequestModels;
using WebAPI.Services.Interfaces;

namespace WebAPI.Contollers
{
    /// <summary>
    /// Controller responsável por receber as requisições das transações
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    public class TransacaoController : ControllerBase
    {
        /// <summary>
        /// Endpoint responsável por criar uma nova transação
        /// </summary>
        [HttpPost("CriarTransacao")]
        public async Task<IActionResult> CriarTransacao(TransacaoCreateModel model, [FromServices] ITransacaoService transacaoService
        )
        {
            // Chama o service para realizar a criação da transação
            TransacaoDTO? transacaoCriada = await transacaoService.CriarTransacaoAsync(model);

            // Caso ocorra algum erro na criação, retorna BadRequest
            if (transacaoCriada == null)
            {
                return BadRequest("Erro ao criar Transacao");
            }

            // Retorna a transação criada com sucesso
            return Ok(transacaoCriada);
        }

        /// <summary>
        /// Endpoint responsável por listar todas as transações
        /// </summary>
        [HttpGet("MostrarTransacoes")]
        public async Task<IActionResult> MostrarCategoria([FromServices] ITransacaoService transacaoService)
        {
            // Busca todas as transações através do service
            IEnumerable<TransacaoDTO> transacoes = await transacaoService.MostrarTransacoesAsync();

            return Ok(transacoes);
        }

        /// <summary>
        /// Endpoint responsável por remover uma transação pelo Id
        /// </summary>
        [HttpDelete("DeletarTransacao/{id}")]
        public async Task<IActionResult> DeletarTransacaoId(Guid id, [FromServices] ITransacaoService transacaoService)
        {
            // Solicita ao service a remoção da transação
            TransacaoDTO? transacaoDeletada = await transacaoService.DeletarTransacaoIdAsync(id);

            // Caso a transação não seja encontrada, retorna erro
            if (transacaoDeletada == null)
            {
                return BadRequest("Erro ao deletar transacao");
            }

            // Retorna a transação removida
            return Ok(transacaoDeletada);
        }

        /// <summary>
        /// Endpoint responsável por retornar o relatório
        /// de totais agrupados por pessoa
        /// </summary>
        [HttpGet("TotalPorPessoa")]
        public async Task<IActionResult> MostrarTotalPorPessoa([FromServices] ITransacaoService transacaoService)
        {
            // Busca o relatório de totais por pessoa
            RelatorioDeTotaisPorPessoa totais = await transacaoService.MostrarTotalPorPessoaAsync();

            return Ok(totais);
        }

        /// <summary>
        /// Endpoint responsável por retornar o relatório
        /// de totais agrupados por categoria
        /// </summary>
        [HttpGet("TotalPorCategoria")]
        public async Task<IActionResult> MostrarTotalPorCategoria([FromServices] ITransacaoService transacaoService)
        {
            // Busca o relatório de totais por categoria
            RelatorioDeTotaisPorCategoria totais = await transacaoService.MostrarTotalPorCategoriaAsync();

            return Ok(totais);
        }
    }
}
