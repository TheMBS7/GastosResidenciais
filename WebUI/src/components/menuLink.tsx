import { Link } from "react-router-dom";

// Tipagem das propriedades do componente MenuLink
// "to" define a rota de destino
// "children" representa o texto/conteúdo que será exibido dentro do link
type MenuLinkProps = {
  to: string;
  children: React.ReactNode;
};

// Componente reutilizável para criar links de navegação do menu
function MenuLink({ to, children }: MenuLinkProps) {
  return (
    // Utilizo componente Link para navegação entre páginas
    <Link
      to={to}
      className="w-full max-w-sm text-2xl rounded-md bg-indigo-200 p-2 text-center hover:bg-indigo-300"
    >
      {/* Exibe o conteúdo passado entre as tags do componente */}
      {children}
    </Link>
  );
}

export default MenuLink;
