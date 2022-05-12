<template>
   <div class="pause-menu">
          <div class="icon-div">
<font-awesome-icon @click="$emit('closeSetting')" icon="x" class="x-icon"/>
</div>
      <h2 class="pause-title settings-title">Settings</h2>
      <div class="pause-button-box settings-box">

      <!-- <button>Music Volume</button> -->
       <!-- <button>Sound Effect Volume</button> -->

    <!-- sliders go here! -->
    <div class="slider-and-label">
        <h2 class="slider-label">Music Volume:</h2>
<div class="slidecontainer">
     <input type="range" min="1" max="100" value="50" class="slider" id="myRange">
</div>
</div>

   <div class="slider-and-label">
        <h2 class="slider-label">Brightness:</h2>
<div class="slidecontainer">
     <input type="range" min="1" max="100" value="50" class="slider" id="myRange">
</div>
</div>
<h3 class="volume"></h3>
           <button>Restart Game</button>
          <button>Delete Account</button>
          </div>
  </div>
</template>

<script>
export default {
name: "Settings", 
methods: {

},
}
</script>

<style>
.settings-title{
    font-size: 3.5rem;
}
.settings-box button{
    font-size: 2rem;
}
.slider-and-label{
  width: 100%;
  display: flex;
  justify-content: center;
}
.slider-label{
    font-size: 2rem;
    color: black;
}
.slidecontainer {
  width: 20%; /* Width of the outside container */
}

/* The slider itself */
.slider {
  margin-left: 1rem;
  -webkit-appearance: none;  /* Override default CSS styles */
  appearance: none;
  width: 100%; /* Full-width */
  height: 2rem; /* Specified height */
  border-radius: 1rem;
  /* background: #d3d3d3; Grey background */
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
  width: 2.5rem; /* Set a specific slider handle width */
  height: 2rem; /* Slider handle height */
  border-radius: 1rem;
  background: #04AA6D; /* Green background */
  cursor: pointer; /* Cursor on hover */
}

.slider::-moz-range-thumb {
  width: 2rem; /* Set a specific slider handle width */
  height: 2rem; /* Slider handle height */
  background: #04AA6D; /* Green background */
  cursor: pointer; /* Cursor on hover */
}

</style>