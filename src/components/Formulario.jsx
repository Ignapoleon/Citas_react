import { useState, useEffect } from 'react';
import Error from './Error';

// eslint-disable-next-line react/prop-types
const Formulario = ({ pacientes, setPacientes, paciente, setPaciente}) => {

  const [nombre, setNombre] = useState('');
  const [propietario, setPropietario] = useState('');
  const [email, setEmail] = useState('');
  const [alta, setAlta] = useState('');
  const [sintomas, setSintomas] = useState('');//capturar campos

  const [error, setError] = useState(false);//mensaje de error

  useEffect(() => {//volver a pasar los campos al formulario al darle a editar 
    if (Object.keys(paciente).length > 0) {
      setNombre(paciente.nombre)
      setPropietario(paciente.propietario)
      setEmail(paciente.email)
      setAlta(paciente.alta)
      setSintomas(paciente.sintomas)
      
    }
  }, [paciente])

  const generarId = () => { //Generar identificador unico para cada iteración (obligatorio en react(key))
    const random = Math.random().toString(36).substring(2);
    const fecha = Date.now().toString(36);
    return random + fecha;
  }


  const handleSubmit = (e) => {
    e.preventDefault();//Agregar paciente

    //validación Formulario
    if ([nombre, propietario, email, alta, sintomas].includes('')) { //si incluye vacio pues...     
      setError(true)
      return;//retornar para volver a validar
    }
    setError(false)

    //Objeto/array de pacientes

    const arrayPaciente = {
      nombre,
      propietario,
      email,
      alta,
      sintomas
    }

    if (paciente.id) {
      // Editando el Registro
      arrayPaciente.id = paciente.id
      console.log(arrayPaciente)
      console.log(paciente)

      const pacientesactualizados = pacientes.map(pacienteState => pacienteState.id===paciente.id 
        ? arrayPaciente : pacienteState)

        setPacientes(pacientesactualizados)
        setPaciente({})//Reinicio de la memoria


    } else {
      // Nuevo registro
      arrayPaciente.id = generarId();
      setPacientes([...pacientes, arrayPaciente]);
    }



    //reiniciar formulario
    setNombre('')
    setPropietario('')
    setEmail('')
    setAlta('')
    setSintomas('')
  }

  return (
    <div className="md:w-1/2 lg:w-2/5 mx-5">
      <h2 className="font-black text text-3xl text-center">Establecer Citas</h2>

      <p className="text-xl mt-5 mb-10 text-center">Añadir Citas y {''}
        <span className="text-indigo-600 font-bold">Adminístralas</span>
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg py-10 px-5 ml-5 mb-10">

        {/* aviso de error && es True*/}
        {error && <Error>
          <p>Todos los campos son obligatorios</p>
        </Error>}

        {/* Bloque formaulario */}
        <div className="mb-5">
          <label htmlFor="mascota" className="block text-grey-700 uppercase font-bold">Nombre</label>
          <input id="mascota"
            type="text"
            placeholder="ej. Yaiza López"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)} /> {/* eventlistener */}

        </div>

        <div className="mb-5">
          <label htmlFor="propietario" className="block text-grey-700 uppercase font-bold">Código / Teléfono</label>
          <input id="propietario"
            type="text"
            placeholder="Código y/o Teléfono"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={propietario}
            onChange={(e) => setPropietario(e.target.value)} /> {/* eventlistener */}

        </div>

        <div className="mb-5">
          <label htmlFor="email" className="block text-grey-700 uppercase font-bold">e-Mail / Datos</label>
          <input id="email"
            type="text"
            placeholder="e-mail o Datos"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)} /> {/* eventlistener */}

        </div>

        <div className="mb-5">
          <label htmlFor="alta" className="block text-grey-700 uppercase font-bold">Fecha Cita</label>
          <input id="alta"
            type="date"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={alta}
            onChange={(e) => setAlta(e.target.value)} /> {/* eventlistener */}

        </div>

        <div className="mb-5">
          <label htmlFor="sintomas" className="block text-grey-700 uppercase font-bold">Observaciones</label>
          <textarea
            id="sintomas"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            placeholder="Extras, tipo de pensión, etc."
            value={sintomas}
            onChange={(e) => setSintomas(e.target.value)} /> {/* eventlistener */}

        </div>

        <input type="submit"
          className="bg-indigo-600 w-full p-3 text-white uppercase font-bold rounded-xl
           hover:bg-indigo-700 cursor-pointer transition-all"
          value={paciente.id ? "Editar Cliente" : "Agregar Cita"}
        />

      </form>
    </div>
  )
}

export default Formulario