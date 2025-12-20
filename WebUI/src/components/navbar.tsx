import { Link, useLocation } from "react-router-dom";

// Componente exibe o menu de navegação entre as páginas
export function Header() {

  // Hook usado para identificar a rota atual
  const location = useLocation();

  // Se for o menu, ele não exibe a navbar
  if (location.pathname === "/") return null;

  return (
    <header className="w-full bg-indigo-200 text-slate-800 flex items-center justify-center px-6 py-2">
      <nav className="flex gap-4">
        {/* Link para a página inicial */}
        <Link to="/" className="hover:text-slate-500">
          Home
        </Link>

        {/* Link para a tela de cadastro de pessoas */}
        <Link to="/pessoas" className="hover:text-slate-500">
          Pessoas
        </Link>

        {/* Link para a tela de cadastro de categorias */}
        <Link to="/categorias" className="hover:text-slate-500">
          Categorias
        </Link>

        {/* Link para a tela de transações */}
        <Link to="/transacoes" className="hover:text-slate-500">
          Transações
        </Link>

        {/* Link para a tela de relatórios */}
        <Link to="/relatorios" className="hover:text-slate-500">
          Relatórios
        </Link>
      </nav>
    </header>
  );
}
