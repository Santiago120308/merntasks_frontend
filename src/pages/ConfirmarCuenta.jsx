import {useState , useEffect} from 'react'
import Alerta from '../components/Alerta'
import axios from 'axios'
import { useParams , Link } from 'react-router-dom'


const ConfirmarCuenta = () => {

    const params = useParams();
    const {id} = params;
    const [alerta , setAlerta] = useState({})
    const [cuentaConfirmada , setCuentaConfirmada] = useState(false)

    useEffect( ()=> {
        const confirmar = async ()=>{
            try {
                const url = `${import.meta.env.VITE_BACKEND_URL}/api/usuarios/confirmar/${id}`
                const {data} = await axios(url);
                setAlerta({
                    msg : data.msg ,
                    error : false
                })
                setCuentaConfirmada(true)
               
            } catch (error) {
                setAlerta({
                    msg : error.response.data.msg , 
                    error : true
                })
            }
        }

       return () => { confirmar()};
    } , [])
    
    const {msg} = alerta;

  return (
    <div>
      <h1 className='text-sky-600 font-black text-6xl capitalize'>Confirma tu cuenta y comienza a crear tus {''}
     <span className='text-slate-700'>proyectos</span></h1>

     <div>
        {msg && <Alerta alerta={alerta} />}
        {cuentaConfirmada && (
             <Link className='text-center block my-5 text-slate-500 uppercase text-sm'
             to={"/"}>
                <span className='font-bold'>Inicia Sesion</span> 
             </Link>
        )}
     </div>
    </div>
  )
}

export default ConfirmarCuenta
