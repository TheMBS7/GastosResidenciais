import RelatorioCategoria from "../../components/relatorioCategoria";
import RelatorioPessoa from "../../components/relatorioPessoa";

export default function App() {

  return (
    <div className="flex gap-10">

      {/* Renderiza o componente de relatório de pessoa */}
      <RelatorioPessoa />

      {/* Renderiza o componente de relatório de categoria */}
      <RelatorioCategoria />

    </div>
  );
}
