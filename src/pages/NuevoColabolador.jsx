import React, { useEffect, useState } from 'react'
import FormularioColaborador from '../components/FormularioColaborador'
import useProyectos from '../hooks/useProyectos';
import { useParams } from 'react-router-dom';
import Alerta from '../components/Alerta';

const NuevoColabolador = () => {
    
    const [alerta , setAlerta] = useState({});
    const {_id} = useParams();
    const {obtenerProyecto , proyecto , colaborador , cargando , agregarColaborador
    , setColaborador} = useProyectos();

    useEffect(()=>{
      obtenerProyecto(_id)
      setColaborador({})
      console.log(proyecto)
    } , [])

    const addColaborador = async ()=>{
     try {
      const {msg}  = await agregarColaborador(colaborador.email)
      
      setAlerta({msg : msg , error : false})
      setTimeout(() => {
        setAlerta({})
      }, 3000);
     } catch (error) {
      setAlerta({msg : error.response.data.msg , error : true})
     }


    }
  const {msg} = alerta;
  return (

  <>
    <h1 className='text-4xl font-black'>Agregar Colaborador(a) al proyecto : {proyecto.nombre}</h1>
    
    <div className='mt-10 flex flex-col items-center '>
    {msg && <Alerta alerta={alerta}/>}
        <FormularioColaborador />
    </div>

   {cargando && <div className="flex justify-center items-center mt-5">
      <div className="animate-spin rounded-full h-12 w-12 border-t-8 border-b-8 border-sky-900"></div>
    </div> }

    {colaborador?._id && (
    <div className='flex justify-center mt-10'>
       <div className='bg-white py-10 px-5 md:w-1/2 rounded-lg shadow'>
          <h2 className='text-center mb-10 text-3xl font-bold'>Resultado:</h2>

          <div className=' flex flex-col gap-2 xl:flex xl:flex-row xl:justify-between xl:items-center xl:gap-4'>
             <div className='sm:text-center'>
             <p className='text-3xl font-bold'>{colaborador.nombre}</p>
             <p className='break-words text-slate-400 font-bold '>{colaborador.email}</p>
             </div>

            
               <button className='bg-slate-500 p-4 rounded text-white
                  font-bold uppercase text-center sm:mt-5 lg:w-full mt-5 lg:mt-0'
                  onClick={addColaborador}>
                  Agregar
               </button>
               
          </div>
         
       </div>
    </div>)}
    
  </>
  )
}

export default NuevoColabolador
