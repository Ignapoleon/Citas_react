import Paciente from "./Paciente"

const ListadoPacientes = ({pacientes, setPaciente, eliminar}) => {
    return (
        <div className="md:w-1/2 lg:w-3/5 md:h-screen overflow-y-scroll">

            {pacientes && pacientes.length ? (
                <>
                    <h2 className="font-black text-3xl text-center">Listado de Citas</h2>
                    <p className="text-xl mt-5 mb-10 text-center">
                        Administra tu {''}
                        <span className="text-indigo-600 font-bold ">Base Datos Citas</span>
                    </p>

                    { pacientes.map( paciente => (
                        <Paciente 
                            key={paciente.id}
                            paciente={paciente}
                            setPaciente={setPaciente}
                            eliminar={eliminar}
                        />
                    ))}
                </>

            ) : (
                <>
                    <h2 className="font-black text-3xl text-center">No hay Citas</h2>
                    <p className="text-xl mt-5 mb-10 text-center">
                        Comienza agregando Citas {''}
                        <span className="text-indigo-600 font-bold ">y aparecerán en este lugar</span>
                    </p>
                </>
            )}
        </div>
    )
}

export default ListadoPacientes
