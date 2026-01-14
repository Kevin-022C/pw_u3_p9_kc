<template>
    <div class="contenedorPrincipal">
    <PokemonImagen v-if="pokemonGanador" :pokemon-id="pokemonGanador.id" />
        <div v-else class="loading">Cargando Pokémon...</div>

        <!-- Mensaje de resultado -->
        <div v-if="mensajeResultado.mostrar" :class="['mensaje-resultado', mensajeResultado.tipo]">
            <div class="mensaje-icono">
                <span v-if="mensajeResultado.tipo === 'ganador'">🎉</span>
                <span v-else>😞</span>
            </div>
            <h2>{{ mensajeResultado.titulo }}</h2>
            <p>{{ mensajeResultado.mensaje }}</p>
            <button @click="reiniciarJuego" class="btn-reiniciar">Jugar de Nuevo</button>
        </div>

        <PokemonOpsiones v-if="!mensajeResultado.mostrar" @seleccionar-pokemon="evaluarGanador($event)" :listaPokemons="listaPokemones" />
        <button @click="destruirComponente">destruir</button>
        
  </div>

</template>

<script>
import PokemonImagen from '../components/PokemonImagen.vue';
import PokemonOpsiones from '../components/PokemonOpsiones'
import ConsumirVectorPokemonAPIFacade, { obtenerAleatorioFachada } from '../clients/PokemonClient.js';
export default {
    name: 'PokemonView',
    components: {
        PokemonImagen,
        PokemonOpsiones
    },
    data() {
        return {
            listaPokemones: [],
            pokemonGanador: null,
            mensajeResultado: {
                mostrar: false,
                tipo: '', // 'ganador' o 'perdedor'
                titulo: '',
                mensaje: ''
            },
            mostrarComponente: true
        }
    },

    // CICLO DE VIDA DEL COMPONENTE
    //Cuando se crea el componente
    beforeCreate() {
        console.log('Antes de crear el componente PokemonView');
    },
    created() {
        console.log('Componente PokemonView creado');
        console.log('Create: cuando ya se resolvio el data, computed, watch y methods');
    },
    //Monta el componente en el DOM, renderiza la vista
    beforeMount() {
        console.log('Antes de montar el componente PokemonView');
    },
    mounted() {
        console.log('Componente PokemonView montado o renderizado en el DOM');
        this.iniciarJuego();
    },
    //Actualizacion del componente
    beforeUpdate() {
        console.log('Antes de actualizar el componente PokemonView');
        console.log('BeforeUpdate: cuando hay un cambio en data, computed o props');
    },
    updated() {
        console.log('Componente PokemonView actualizado');
        console.log('Updated: despues de que se actualizo la vista');
    },
    //Eliminacion del componente
    beforeDestroy() {
        console.log('Antes de eliminar el componente PokemonView');
    },
    destroyed() {
        console.log('Componente PokemonView eliminado');

    },
    methods: {
        async iniciarJuego() {
            this.listaPokemones = await ConsumirVectorPokemonAPIFacade();

            const idAleatorio = obtenerAleatorioFachada(0, this.listaPokemones.length - 1);
            this.pokemonGanador = this.listaPokemones[idAleatorio];
        },

        evaluarGanador(idGanador) {
            console.log('Pokemon seleccionado:', idGanador);
            if (idGanador === this.pokemonGanador.id) {
                this.mensajeResultado = {
                    mostrar: true,
                    tipo: 'ganador',
                    titulo: '¡Has Ganado!',
                    mensaje: `¡Felicitaciones! Has adivinado correctamente.`
                };
            } else {
                this.mensajeResultado = {
                    mostrar: true,
                    tipo: 'perdedor',
                    titulo: '¡Has Perdido!',
                    mensaje: `El Pokémon ganador era ${this.pokemonGanador.nombre}. ¡Inténtalo de nuevo!`
                };
            }
        },

        reiniciarJuego() {
            this.mensajeResultado.mostrar = false;
            this.iniciarJuego();
        },

        destruirComponente() {
            this.mostrarComponente = false;
        }
    }
}
</script>

<style scoped>
.loading {
    font-size: 1.2rem;
    color: #6b7280;
    font-weight: 500;
    padding: 2rem;
    text-align: center;
}

.mensaje-resultado {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 2rem;
    border-radius: 20px;
    max-width: 400px;
    width: 100%;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
    animation: aparecer 0.5s ease-out;
}

.mensaje-resultado.ganador {
    background: linear-gradient(135deg, #10b981, #059669);
    color: white;
}

.mensaje-resultado.perdedor {
    background: linear-gradient(135deg, #ef4444, #dc2626);
    color: white;
}

.mensaje-icono {
    font-size: 3rem;
    margin-bottom: 1rem;
}

.mensaje-resultado h2 {
    font-size: 2rem;
    margin: 0.5rem 0;
    font-weight: 700;
}

.mensaje-resultado p {
    font-size: 1.1rem;
    margin: 1rem 0;
    opacity: 0.9;
}

.btn-reiniciar {
    background: rgba(255, 255, 255, 0.2);
    color: white;
    border: 2px solid rgba(255, 255, 255, 0.3);
    padding: 0.75rem 1.5rem;
    border-radius: 10px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-top: 1rem;
}

.btn-reiniciar:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}

@keyframes aparecer {
    from {
        opacity: 0;
        transform: scale(0.8) translateY(20px);
    }

    to {
        opacity: 1;
        transform: scale(1) translateY(0);
    }
}

@media (max-width: 640px) {
    .contenedorPrincipal {
        padding: 2rem 1.25rem;
    }
}

</style>