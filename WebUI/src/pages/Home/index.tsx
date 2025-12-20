import MenuLink from "../../components/menuLink";

// Componente responsável pela página inicial do sistema
// Aqui funciona como um menu para acessar as outras funcionalidades
function Home() {
  return (
    <section className="overflow-hidden h-screen">
      <div className="text-center pt-10 h-screen w-screen bg-slate-800">
        <div>
          <h1 className="font-bold text-indigo-300 text-7xl flex justify-center">
            Gastos Residenciais
          </h1>
        </div>
        <div className="flex flex-col items-center gap-4 pt-10">
          {/* Link para a tela de cadastro de pessoas. Usei meu componente menulink */}
          <MenuLink to="/pessoas">
            Cadastro de Pessoas
          </MenuLink>

          {/* Link para a tela de cadastro de categorias */}
          <MenuLink to="/categorias">
            Cadastro de Categorias
          </MenuLink>

          {/* Link para a tela de lançamento de receitas e despesas */}
          <MenuLink to="/transacoes">
            Transações
          </MenuLink>

          {/* Link para a tela de relatórios */}
          <MenuLink to="/relatorios">
            Relatórios
          </MenuLink>
        </div>
      </div>
    </section>
  )
}

export default Home;
