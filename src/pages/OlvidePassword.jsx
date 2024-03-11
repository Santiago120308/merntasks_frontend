import React, { useState , useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import Alerta from '../components/Alerta'
import axios from 'axios'



const OlvidePassword = () => {

  const [email , setEmail] = useState('');
  const [alerta , setAlerta] = useState({});
  
  const params = useParams();
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(email === ''){
      setAlerta({
        msg : "El email es obligatorio" ,
        error : true
      })

      return;
    }
    setAlerta({})
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/api/usuarios/olvide-password` 
      const {data} =await axios.post(url , {email});     
      setAlerta({msg : data.msg , error : false});
    } catch (error) {
      setAlerta({msg : error.response.data.msg , error : true})
      
    }

    
  }

  const {msg} = alerta;
  
  return (
    <div>
    <h1 className='text-sky-600 font-black text-6xl capitalize'>Recupera tu {''}
     <span className='text-slate-700'>password</span></h1>

     {msg && <Alerta alerta={alerta}/>}

     <form action="" className='bg-white p-10 my-10' 
     onSubmit={handleSubmit}>

       
        <div className='my-5'>
            <label htmlFor="email" 
            className='block mb-2 font-bold'>EMAIL</label>
            <input 
            type="email" 
            id='email'
            placeholder='Email de registro'
            className='bg-gray-50 w-full rounded-lg p-3 text-black' 
            value={email} 
            onChange={(e)=> setEmail(e.target.value)}/>
        </div>


        <input type="submit" 
        className='w-full bg-sky-700 p-2 text-white font-bold hover:cursor-pointer mb-4' 
        value='ENVIAR INSTRUCCIONES'/>
     </form>

     <nav className='lg:flex lg:justify-between'>
        <Link className='text-center block my-5 text-slate-500 uppercase text-sm'
        to={"/"}>
            ¿Ya tienes una cuenta? <span className='font-bold'>Inicia Sesion</span> 
        </Link>

        <Link className='text-center block my-5 text-slate-500 uppercase text-sm'
        to={"/registrar"}>
            ¿No tienes cuenta? <span className='font-bold'>Registrate</span>
        </Link>
       
     </nav>
</div>
  )
}

export default OlvidePassword
