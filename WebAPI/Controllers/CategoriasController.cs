using Microsoft.AspNetCore.Mvc;
using WebAPI.RequestModels;
using WebAPI.Services.Interfaces;

namespace WebAPI.Contollers
{
    /// <summary>
    /// Controller responsável por receber as requisições das categorias
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    public class CategoriasController : ControllerBase
    {
        /// <summary>
        /// Endpoint responsável por criar uma nova categoria
        /// </summary>
        [HttpPost("CriarCategoria")]
        public async Task<IActionResult> CriarCategoria(CategoriaCreateModel model, [FromServices] ICategoriaService categoriaService)
        {
            // Chama o service para realizar a criação da categoria
            CategoriaDTO? categoriaCriada = await categoriaService.CriarCategoriaAsync(model);

            // Caso ocorra algum erro na criação, retorna BadRequest
            if (categoriaCriada == null)
            {
                return BadRequest("Erro ao criar Categoria");
            }

            // Retorna a categoria criada com sucesso
            return Ok(categoriaCriada);
        }

        /// <summary>
        /// Endpoint responsável por listar todas as categorias
        /// </summary>
        [HttpGet("MostrarCategorias")]
        public async Task<IActionResult> MostrarCategorias([FromServices] ICategoriaService categoriaService)
        {
            // Busca todas as categorias através do service
            IEnumerable<CategoriaDTO> categorias = await categoriaService.MostrarCategoriasAsync();

            return Ok(categorias);
        }

        /// <summary>
        /// Endpoint responsável por remover uma categoria pelo Id
        /// </summary>
        [HttpDelete("DeletarCategoria/{id}")]
        public async Task<IActionResult> DeletarCategoriaId(Guid id, [FromServices] ICategoriaService categoriaService
        )
        {
            // Solicita ao service a remoção da categoria
            CategoriaDTO? categoriaDeletada = await categoriaService.DeletarCategoriaIdAsync(id);

            // Caso a categoria não seja encontrada, retorna erro
            if (categoriaDeletada == null)
            {
                return BadRequest("Erro ao deletar categoria");
            }

            // Retorna a categoria removida
            return Ok(categoriaDeletada);
        }
    }
}
