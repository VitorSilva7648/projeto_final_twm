import { Route, Routes as RoutesDom } from "react-router-dom"
import Home from "./Home"
import Clientes from "./pages/clientes.jsx"
import Produtos from "./pages/produtos.jsx"
import Tecnicos from "./pages/Tecnicos.jsx"
import Ordem_servico from "./pages/Ordem_Servico.jsx"

const Routes = () => {
  return (
      <RoutesDom>
        <Route index element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="clientes" element={<Clientes />} />
        <Route path="produtos" element={<Produtos />} />
        <Route path="tecnicos" element={<Tecnicos />} />
        <Route path="Ordem_servico" element={<Ordem_servico />} />
        
      </RoutesDom>
  )
}

export default Routes
