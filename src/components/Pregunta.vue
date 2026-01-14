<template>
    <div>
        <img v-if="imagen" :src="imagen" alt="No se puede ver" />
        <div v-if="imagen" class="oscuro"></div>


        <div class="pregunta-container">
        <input v-model="pregunta" type="text" placeholder="Hazme una pregunta"/>
        <p>Recuerda terminar con el signo de interrogación (?)</p>

        <h2>{{ pregunta }}</h2>
        <h1>{{ respuesta }}</h1>
        </div>
    </div>
   
</template>
 
<script>
import {consumirApiFacade} from '../clients/YesNoClient.js';
export default {
    data() {
        return {
            pregunta: null,
            respuesta: null,
            imagen: null,
        };
    },
    watch: {
        pregunta(value, oldValue) {
 
            if(value.includes('?')){
                //llamar al API
                this.respuesta = "Pensando...";
                this.consumir();
 
            }
        },
    },
    methods: {
        async consumir() {
            const resp =  await consumirApiFacade();
                console.log("Respuesta final");
                console.log(resp);
                console.log(resp.answer);
                this.respuesta = resp.answer;
                this.imagen = resp.image;
        }
       
    },
 
};
</script>
 
<style scoped>
img, .oscuro {
    height: 100vh;
    width: 100vw;
    max-height: 100%;
    max-width: 100%;
    position: fixed;
    left: 0px;
    top: 0px;
}

.oscuro {
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 0;
}
/*Hacemos que las letras se vean al frente de la imagen */
.pregunta-container {
    position: relative;
    color: white;
    z-index: 1;

    min-height: 100vh; /* altura de toda la pantalla */
    display: flex;
    flex-direction: column; /* elementos uno debajo del otro */
    justify-content: center; /* centrado vertical */
    align-items: center; /* centrado horizontal */
   
}
 
input {
    width: 250px;
    padding: 10px 15px;
    border-radius: 5px;
    border: none;
 
}
 
input:focus {
    outline: none;
}
 
h1, h2, p {
    color: white;
}
 
p {
    font-size: 18px;
}

h2 {
    margin-top: 40px;
    font-size: 28px;
}
</style>