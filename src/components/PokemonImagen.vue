<template>
    <div class="pokemon-container">
        <img :src="srcImagen" alt="imagen no cargada por detras">
    </div>
  
</template>

<script>
export default {
    props:{
        pokemonId:{
            type:Number,
            required:true
        }
    },
    computed:{
        srcImagen(){
            return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${this.pokemonId}.svg`
        }        
    },
    methods: {
        destruirComponente() {
            console.log('Ejecutando limpieza del componente PokemonImagen');
            console.log('Limpiando recursos, cancelando suscripciones, etc.');
            // Aquí puedes agregar lógica de limpieza específica
            // Por ejemplo: cancelar timers, limpiar event listeners, etc.
        }
    },
    //Destruccion o eliminacion del componente
    beforeUnmount() {
        console.log('Antes de desmontar el componente PokemonImagen');
        console.log('BeforeUnmount: justo antes de que el componente sea eliminado del DOM');
        this.destruirComponente();
    },
    unmounted() {
        console.log('Componente PokemonImagen desmontado o eliminado del DOM');
        console.log('Unmounted: despues de que el componente ha sido eliminado del DOM');
    }
}
</script>

<style scoped>
img{
    height: 200px;
    right: 32%;
}
.pokemon-container{
    height: 200px;
}
</style>