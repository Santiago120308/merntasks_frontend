import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import useProyectos from '../hooks/useProyectos';
import FormularioProyecto from '../components/FormularioProyecto';


const EditarProyecto = () => {

const params = useParams();
const {_id} = params;

const {obtenerProyecto , proyecto , cargando} = useProyectos();

useEffect(() => {
  return () => {obtenerProyecto(_id)} 
} , [])

  return (
    <>
    {cargando ? (
      <div className="flex justify-center items-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-8 border-b-8 border-sky-900"></div>
    </div>
    ) : <div>
        <h1 className='font-black text-4xl'>Editar proyecto : {proyecto.nombre}</h1>
      
        <div className='mt-10'>
            <FormularioProyecto />
        </div>
        </div>}
    </>
 
  )
}

export default EditarProyecto
    