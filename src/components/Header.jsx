import React from 'react'
import { Link } from 'react-router-dom'
import useProyectos from '../hooks/useProyectos'
import Busqueda from './Busqueda';
import useAuth from '../hooks/useAuth';

const Header = () => {

  const {buscador , handleBuscador , cerrarSesion} = useProyectos();
  const {cerrarSesionAuth} = useAuth();

  const handleSerrarsesion = () => {
    cerrarSesion();
    cerrarSesionAuth();
    localStorage.removeItem('token');
    localStorage.removeItem('id');
  }

  return (
    <header className='px-4 py-5 bg-white border-b'>
        <div className='flex flex-col md:flex md:flex-row md:justify-between'>
            <h2 className='text-4xl text-sky-600 font-black
            text-center mb-5 md:mb-0'>UpTask</h2>

          
            <div className='flex flex-col md:flex md:flex-row  items-center gap-4'>

                 <button
                 type='button'
                 className='font-bold uppercase sm:mb-2 md:mb-0'
                 onClick={handleBuscador}
                 >Buscar Proyecto</button>

                <Link to={"/proyectos"} className='font-bold uppercase'>
                Proyectos</Link>

                <button type='button'
                className='text-white text-sm bg-sky-600 p-3 
                rounded-md uppercase font-bold'
                onClick={handleSerrarsesion}>
                    Cerrar Sesion 
                </button>

                <Busqueda />
            </div>
        </div>
    </header>
  )
}

export default Header