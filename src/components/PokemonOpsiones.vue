<template>
  <div class="opsiones-container">
     <ul>
            <li v-on:click="pasarPadre(pokemon.id)" v-for="pokemon in listaPokemons" :key="pokemon.id">{{ pokemon.nombre
                }}</li>
        </ul>
  </div>
</template>

<script>

export default {
    name: 'PokemonOpsiones',
    props: {
        listaPokemons: {
            type: Array,
            required: true
        }
    },
    methods: {
        pasarPadre(id) {
            this.$emit('seleccionar-pokemon', id);
        }
    }
}
</script>

<style scoped>
ul{
    list-style-type:none;
}
li{
    background-color: aliceblue;
    border-radius: 5px;
    border: 1px solid;
    cursor: pointer;
    width: 250px;
    margin-top: 10px;
}
.opsiones-container{
    display: flex;
    justify-content: center;
   
}
</style>