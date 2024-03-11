import React, { useEffect } from 'react'
import useProyectos from '../hooks/useProyectos'
import ProyectoPreview from '../components/ProyectoPreview';
import io from 'socket.io-client'

let socket;

const Proyectos = () => {

  useEffect(()=> {
    socket = io(import.meta.env.VITE_BACKEND_URL);
    socket.emit('prueba')
  }, [])

  const {proyectos} = useProyectos();

  console.log(proyectos)

  return (
    <div>
      <h1 className='text-4xl font-black'>Proyectos</h1>

      <div className='bg-white shadow mt-10 rounded-lg'>
          {proyectos.length ? proyectos.map(proyecto => (
            <ProyectoPreview 
            key={proyecto._id}
            proyecto={proyecto}/>
          )) : <p className='text-2xl font-bold'>No hay proyectos aun</p>}
      </div>
    </div>
  )
}

export default Proyectos
