using Microsoft.EntityFrameworkCore;
using WebAPI.Data;
using WebAPI.Services;
using WebAPI.Services.Interfaces;

// Cria o builder da aplicação Web API
var builder = WebApplication.CreateBuilder(args);

// Adiciona suporte para explorar os endpoints da API para usar o Swagger
builder.Services.AddEndpointsApiExplorer();

// Adiciona o Swagger para API
builder.Services.AddSwaggerGen();

// Configura o Entity Framework com PostgreSQL
// Usa a string de conexão definida no appsettings.json
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(
        builder.Configuration.GetConnectionString("DefaultConnection")
    )
);

// Habilita o uso de Controllers na aplicação
builder.Services.AddControllers();

// Registra os serviços no container de injeção de dependência
builder.Services.AddScoped<ICategoriaService, CategoriaService>();
builder.Services.AddScoped<IPessoaService, PessoaService>();
builder.Services.AddScoped<ITransacaoService, TransacaoService>();

// Configuração do CORS
// Permite que o frontend (React) acesse a API
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy =>
        {
            policy
                // URL do frontend
                .WithOrigins("http://localhost:5173")
                // Permite qualquer header
                .AllowAnyHeader()
                // Permite qualquer método (GET, POST, PUT, DELETE, etc)
                .AllowAnyMethod();
        });
});

var app = builder.Build();

// Aplica a política de CORS configurada
app.UseCors("AllowFrontend");

if (app.Environment.IsDevelopment())
{
    // Ativa o Swagger
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Mapeia os controllers para os endpoints da API
app.MapControllers();

app.UseHttpsRedirection();

app.Run();
