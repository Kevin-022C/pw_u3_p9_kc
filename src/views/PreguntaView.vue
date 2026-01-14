<template>
   <div class="view-container">
        <Pregunta/>
   </div>
</template>

<script>
import Pregunta from '@/components/Pregunta.vue';
export default {
   // name: 'Pregunta',
    components: {
        Pregunta
    }
}
</script>

<style scoped>
.view-container {
    display: flex;
    min-height: 100vh;
    padding: 20px;
    justify-content: center;
    align-items: center;
}

h2{
    font-size: 28px;
}
</style>