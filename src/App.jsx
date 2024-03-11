import { BrowserRouter , Route , Routes} from "react-router-dom"
import AuthLayout from "./layouts/AuthLayout"
import Login from "./pages/Login"
import Registrar from "./pages/Registrar"
import OlvidePassword from "./pages/OlvidePassword"
import NuevoPassword from "./pages/NuevoPassword"
import ConfirmarCuenta from "./pages/ConfirmarCuenta"
import { AuthProvaider } from "./context/AuthProvaider"
import RutaProtegida from "./layouts/RutaProtegida"
import Proyectos from "./pages/Proyectos"
import NuevoProyecto from "./pages/NuevoProyecto"
import { ProyectosProvaider } from "./context/ProyectosContext"
import Proyecto from "./pages/Proyecto"
import EditarProyecto from "./pages/EditarProyecto"
import NuevoColabolador from "./pages/NuevoColabolador"



function App() {


  return (
    <BrowserRouter>
    <AuthProvaider>
      <ProyectosProvaider>
      <Routes>
        <Route path="/" element = {<AuthLayout />}>
            <Route index element = {<Login />}/>
            <Route path="registrar" element = {<Registrar />}/>
            <Route path="olvide-password" element = {<OlvidePassword />}/>
            <Route path="olvide-password/:token" element = {<NuevoPassword />}/>
            <Route path="confirmar/:id" element = {<ConfirmarCuenta />}/>
        </Route>

        <Route path="/proyectos" element = {<RutaProtegida />}>
          <Route index element = {<Proyectos />}></Route>
          <Route path="crear-proyecto" element = {<NuevoProyecto />}/>
          <Route path="nuevo-colaborador/:_id" element = {<NuevoColabolador />}/>
          <Route path=":_id" element = {<Proyecto />}/>
          <Route path="editar/:_id" element = {<EditarProyecto />}/>
        </Route>
      </Routes>
      </ProyectosProvaider>
      </AuthProvaider>
    </BrowserRouter>
  )
}

export default App
