import { Outlet } from "react-router-dom";
import { Header } from "./components/navbar";

// Componente de layout principal das páginas
// Define a estrutura base que será reutilizada em todas as rotas
export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-800">
      {/* Barra de navegação exibida em todas as páginas */}
      <Header />

      {/* Area onde os conteudos das paginas vão ser renderizados */}
      <main className="flex-1 flex justify-center items-start">
        <Outlet />
      </main>
    </div>
  );
}
