import React from 'react'
import FormularioProyecto from '../components/FormularioProyecto'

const NuevoProyecto = () => {
  return (
    <div >
     <h1 className='text-4xl font-black'> Nuevo proyecto</h1>

      <div className='mt-10 flex-col'>
        <FormularioProyecto />
      </div>
    </div>
  )
}

export default NuevoProyecto
