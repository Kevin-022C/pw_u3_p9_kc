import axios from "axios";
 
const consumirApi = async (id) => {
    try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    console.log("Respuesta:", response.data);
    return response.data; // ← Ahora sí retorna
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
 
function obtenerAleatorio(min,max){
    return Math.floor(Math.random()*(max-min + 1)+ min);
}

const obtenerVectorNumerico=() =>{
    const vector=[];
    for(let i=0;i<4;i++){
        vector[i]=obtenerAleatorio(1,118);
    }
    return vector;
}
const  obtenerVectorPokemon= async (vectorNumerico)=>{
     const [pokemon1, pokemon2, pokemon3, pokemon4] = await Promise.all([
    consumirApi(vectorNumerico[0]),
    consumirApi(vectorNumerico[1]),
    consumirApi(vectorNumerico[2]),
    consumirApi(vectorNumerico[3]),
  ]);

  const pokemon1Data = {
    nombre: pokemon1.name,
    id: pokemon1.id,
  };
  const pokemon2Data = {
    nombre: pokemon2.name,
    id: pokemon2.id,
  };
  const pokemon3Data = {
    nombre: pokemon3.name,
    id: pokemon3.id,
  };
  const pokemon4Data = {
    nombre: pokemon4.name,
    id: pokemon4.id,
  };

  return [pokemon1Data, pokemon2Data, pokemon3Data, pokemon4Data];
}

//Facade para exportar la funcion de consumir API Pokemon
export default async function ConsumirVectorPokemonAPIFacade() {
  const vectorPokemon = obtenerVectorNumerico();
  return await obtenerVectorPokemon(vectorPokemon);
}

export function obtenerAleatorioFachada(min, max) {
  return obtenerAleatorio(min, max);
}