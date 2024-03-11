import React  from 'react'
import {  useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { useEffect , useState} from 'react'
import Alerta from '../components/Alerta'


const NuevoPassword = () => {

  const params = useParams();
  const [alerta , setAlerta] = useState({});
  const [nuevoPassword , setNuevoPassword] = useState('');
  const [alertaPassword , setAlertaPassword] = useState({});
  const navigate = useNavigate();
  const {token} = params;
  

    useEffect(() => {
        const comprobarToken = async () => {
        try {
          const {data} = await axios(`${import.meta.env.VITE_BACKEND_URL}/api/usuarios/olvide-password/${token}`)
          console.log(data)
        } catch (error) {
          setAlerta({
            msg : error.response.data.msg , 
            error : true,
          })
        }
        }


        return () => {comprobarToken()}
    } , [])

    const handleSubmit  = async (e) => {
   
      e.preventDefault()
      if(nuevoPassword === ''){
        console.log('entre')
        setAlertaPassword({
          msg : "El campo no puede estar vacio" , 
          error : true,
        })
       
        return
      }
      if(nuevoPassword.length < 6){
        setAlertaPassword({
          msg : "El password debe ser de mas de 6 caracteres" , 
          error : true,
        })
        
        return
      }

      setAlertaPassword({})

      //Restablecemos el password del usuario

      try {
        const password = nuevoPassword;
        const {data} = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/usuarios/olvide-password/${token}`,
        {password})
        setAlertaPassword({msg : data.msg , error : false})
        setTimeout(() => {
          navigate("/")
        }, 3000);
        
      } catch (error) {
        setAlertaPassword({})
        setAlerta({msg : error.response.data.msg , error : true})
        console.log(error)
      }
     
     }

    const {msg} = alerta;
    



  return (
    <div>
    <h1 className='text-sky-600 font-black text-6xl capitalize'>Restablece tu password y no pierdas acceso a tus {''}
    <span className='text-slate-700'>proyectos</span></h1>

     {Object.keys(alertaPassword).length  ? <Alerta alerta={alertaPassword}/> : ''}
     {Object.keys(alerta).length ? <Alerta alerta={alerta}/> :  (

      
      <form action="" className='bg-white p-10 my-10' 
      onSubmit={handleSubmit}>

       
      <div className='my-5'>
          <label htmlFor="email" 
          className='block mb-2 font-bold'>NUEVO PASSWORD</label>
          <input 
          type="password" 
          id='email'
          placeholder='Ingresa tu nuevo password'
          className='bg-gray-50 w-full rounded-lg p-3 text-black'
          value={nuevoPassword}
          onChange={(e)=> setNuevoPassword(e.target.value)}/>
      </div>


      <input type="submit" 
      className='w-full bg-sky-700 p-2 text-white font-bold hover:cursor-pointer mb-4' 
      value='RESTABLECER PASSWORD'/>
   </form>
     )}

   
</div>
  )
}

export default NuevoPassword
