<template>
  <div class="pause-menu">
    <div class="icon-div">
      <font-awesome-icon @click="$emit('closeSetting')" icon="x" class="x-icon"/>
    </div>
    <h2 class="pause-title settings-title">Settings</h2>

    <div class="slider-and-label">
      <h3 class="slider-label">Music Volume:</h3>
      <div class="slide-container" >
        <input @click="volumeLog()"  type="range" min="0" max="100" value="50" class="slider slider1" id="myRange">
      </div> 
    </div>
    <div class="slider-and-label">
      <h3 class="slider-label">SFX Volume:</h3>
      <div class="slide-container" >
        <input @click="volumeLog2()"  type="range" min="0" max="100" value="50" class="slider slider2" id="myRange">
      </div> 
    </div>
    <h3 class="volume"></h3>
  </div>
</template>

<script>
export default {
  name: "Settings", 
  data() {
    return {
      passingVolVal: '',
      passingSFXVal: '',
    }
  },
  methods: {
    volumeLog(){
      const volumeSlider = document.querySelector(".slider1")
      this.passingVolVal = volumeSlider.value;
      this.$emit('emitVol', this.passingVolVal)
    }, 
    volumeLog2(){
      const volumeSlider = document.querySelector(".slider2")
      this.passingSFXVal = volumeSlider.value;
      this.$emit('emitVol2', this.passingSFXVal)
    }, 
  },
}
</script>

<style scoped>
@import "../assets/global.css";

.pause-menu {
  overflow: scroll;
  position: absolute;
  top: 0;
  text-align: center;
  width: 100%;
  height: 100%;
  padding: 2rem;
  background-color: var(--purple);
  z-index: 3;
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.x-icon {
  position: absolute;
  top: 3rem;
  right: 3rem;
  font-size: var(--h4);
  color: var(--highlight-color);
}
.settings-title {
  font-size: 3.5rem;
}
.slider-and-label button {
  font-size: 2rem;
}
.slider-and-label {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.slider-and-label h3 {
  margin-bottom: 1rem;
}
.slider-label {
  font-size: 2rem;
  color: var(--highlight-color);
  margin-top: 2rem;
}
.slide-container {
  width: 25%; /* Width of the outside container */
}
.v-slider {
  width: 100%;
  background: var(--protagonist);
}
/* The slider itself */
.slider {
  -webkit-appearance: none;  /* Override default CSS styles */
  appearance: none;
  width: 100%; /* Full-width */
  height: 1.5rem; /* Specified height */
  border-radius: 1rem;
  background: var(--lightest-purple);
  outline: none; /* Remove outline */
  opacity: 0.7; /* Set transparency (for mouse-over effects on hover) */
  -webkit-transition: .2s; /* 0.2 seconds transition on hover */
  transition: opacity .2s;
}

/* Mouse-over effects */
.slider:hover {
  opacity: 1; /* Fully shown on mouse-over */
}

/* The slider handle (use -webkit- (Chrome, Opera, Safari, Edge) and -moz- (Firefox) to override default look) */
.slider::-webkit-slider-thumb {
  -webkit-appearance: none; /* Override default look */
  appearance: none;
  width: 2rem; /* Set a specific slider handle width */
  height: 3rem; /* Slider handle height */
  border-radius: 1rem;
  background: var(--protagonist); /* Green background */
  cursor: pointer; /* Cursor on hover */
}

.slider::-moz-range-thumb {
  width: 2rem; /* Set a specific slider handle width */
  height: 3rem; /* Slider handle height */
  background: var(--protagonist); /* Green background */
  cursor: pointer; /* Cursor on hover */
}

</style>