<template>
  <div>
    <img class="loading-prot" src="../assets/sprites/walk-right.gif" />
    <img class="loading-door" src="../assets/lv1_door.png" />
    <h2 class="loading">Loading the Tower</h2>
  </div>
</template>

<script>
export default {
  name: "PageLoader",
}
</script>

<style scoped>
@import "../assets/global.css";

  div {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: var(--darkest-purple);
    z-index: 100;
  }
  .loading-prot {
    width: 10%;
  }
  .loading-door {
    width: 20%;
  }

  .loading {
    font-size: 2.5rem; 
    /* must match width in keyframes */
  }
  .loading:after {
    overflow: hidden;
    display: inline-block;
    vertical-align: bottom;
    -webkit-animation: ellipsis steps(5, end) 2s infinite;      
    animation: ellipsis steps(5, end) 2s infinite;
    content: "..."; /* ascii code for the ellipsis character */
    width: 0;
  }

  @keyframes ellipsis {
    to {
      width: 2.5rem;    
    }
  }
  @-webkit-keyframes ellipsis {
    to {
      width: 2.5rem;    
    }
  }

  @media only screen and (max-width: 768px) {
    .loading-prot {
      width: 15%;
    }
    .loading-door {
      width: 30%;
    }
  }
</style>