import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css'

// Importação das páginas do sistema
import Home from './pages/Home/index.tsx'
import Pessoas from './pages/Pessoas/index.tsx';
import Categorias from './pages/Categorias/index.tsx';
import Transacoes from './pages/Transacoes/index.tsx';
import Relatorio from './pages/Relatorio/index.tsx';
import App from './App.tsx';

// Aqui eu configuro as rotas da aplicação
// Eu utilizei a biblioteca react-router-dom para o roteamento
const router = createBrowserRouter([
  {
    element: <App/>,
    children: [
      { path: "/", element: <Home /> },
      { path: "/pessoas", element: <Pessoas /> },
      { path: "/categorias", element: <Categorias /> },
      { path: "/transacoes", element: <Transacoes /> },
      { path: "/relatorios", element: <Relatorio /> },
    ],
  },
]);

// O RouterProvider recebe as rotas e controla a navegação entre as páginas
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>
);
