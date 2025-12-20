using Microsoft.AspNetCore.Mvc;
using WebAPI.RequestModels;
using WebAPI.Services.Interfaces;

namespace WebAPI.Contollers
{
    /// <summary>
    /// Controller responsável por receber as requisições das pessoas
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    public class PessoasController : ControllerBase
    {
        /// <summary>
        /// Endpoint responsável por criar uma nova pessoa
        /// </summary>
        [HttpPost("CriarPessoa")]
        public async Task<IActionResult> CriarPessoa(PessoaCreateModel model, [FromServices] IPessoaService pessoaService)
        {
            // Chama o service para realizar a criação da pessoa
            PessoaDTO? pessoaCriada = await pessoaService.CriarPessoaAsync(model);

            // Caso ocorra algum erro na criação, retorna BadRequest
            if (pessoaCriada == null)
            {
                return BadRequest("Erro ao criar Pessoa");
            }

            // Retorna a pessoa criada com sucesso
            return Ok(pessoaCriada);
        }

        /// <summary>
        /// Endpoint responsável por listar todas as pessoas
        /// </summary>
        [HttpGet("MostrarPessoas")]
        public async Task<IActionResult> MostrarPessoas([FromServices] IPessoaService pessoaService)
        {
            // Busca todas as pessoas através do service
            IEnumerable<PessoaDTO> pessoas = await pessoaService.MostrarPessoasAsync();

            return Ok(pessoas);
        }

        /// <summary>
        /// Endpoint responsável por remover uma pessoa pelo Id
        /// </summary>
        [HttpDelete("DeletarPessoa/{id}")]
        public async Task<IActionResult> DeletarPessoaId(Guid id, [FromServices] IPessoaService pessoaService)
        {
            // Solicita ao service a remoção da pessoa
            PessoaDTO? pessoaDeletada = await pessoaService.DeletarPessoaIdAsync(id);

            // Caso a pessoa não seja encontrada, retorna erro
            if (pessoaDeletada == null)
            {
                return BadRequest("Erro ao deletar pessoa");
            }

            // Retorna a pessoa removida
            return Ok(pessoaDeletada);
        }
    }
}
