<template>
  
  <div>
    <h3>Babylon examples</h3>
    <div id="loader">
      <p>Loading</p>

      <div id="loadingContainer">
        <div id="loadingBar"></div>
      </div>

      <p id="percentLoaded">25%</p>
    </div>

    <p>Custom Loading Screen</p>
    <canvas></canvas>
  </div>

</template>

<script lang="ts">
  // import { BasicScene } from '@/babylonExamples/BasicScene'
// import { StandarMaterials } from '@/babylonExamples/StandarMaterials';
  // import { PBR } from '@/babylonExamples/PBR';
import { LightsShadows } from '@/babylonExamples/LightsShadows';
// import { BakedLighting } from '@/babylonExamples/BakedLighting';
import { CustomLoading } from '@/babylonExamples/CustomLoading';
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'BabylonExamples',
  mounted(){
    const canvas = document.querySelector("canvas") as HTMLCanvasElement;
    const loadingBar = document.getElementById("loadingBar") as HTMLElement;
    const percentLoaded = document.getElementById(
      "percentLoaded"
    ) as HTMLElement;
    const loader = document.getElementById("loader") as HTMLElement;
    new CustomLoading(canvas,loadingBar,percentLoaded,loader)
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
canvas{
  width: 70%;
  height: 70%;
}#loader {
  width: 100%;
  height: 100%;
  background: slategrey;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
#loaded {
  width: 100%;
  height: 100%;
  background: slategrey;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 1s ease;
}
#loadingContainer {
  width: 30%;
  height: 2rem;
  background: rgba(255, 255, 255, 0.75);
  border-radius: 6px;
  margin: 0.5rem;
}
#loadingBar {
  height: 100%;
  background: green;
  border-radius: 6px;
}
p {
  color: white;
  background: none;
  margin-bottom: 1rem;
  font-family: "Roboto Condensed";
  font-weight: 400;
  font-size: 2rem;
}
</style>
