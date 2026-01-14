<template>
  <div>
    <h1>hola mundo</h1>
    <p>Consultando los datos del estudiante /{{ idEstudiante }}</p>
    <button @click="identificarID">Identificar ID</button>
  </div>
</template>

<script>
export default {
  name: 'HolaMundo',
  data() {
        return {
            idEstudiante: null,
        }
    },
    created() {
        console.log(this.$route);
        console.log(this.$route.query);

    },
    methods: {
        identificarID() {
            this.idEstudiante = this.$route.params.id;
        }
    }
}
</script>

<style scoped>

</style>