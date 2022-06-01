<template>
  <div>
    <img src="../assets/sprites/walk-right.gif" />
    <img src="../assets/lv1_door.png" />
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
  img {
    width: 10%;
  }
  .loading {
    font-size: 3rem;
  }

  .loading:after {
    overflow: hidden;
    display: inline-block;
    vertical-align: bottom;
    -webkit-animation: ellipsis steps(4, end) 2s infinite;      
    animation: ellipsis steps(4, end) 2s infinite;
    content: "..."; /* ascii code for the ellipsis character */
    width: 0;
  }

  @keyframes ellipsis {
    to {
      width: 3rem;    
    }
  }

  @-webkit-keyframes ellipsis {
    to {
      width: 3rem;    
    }
  }
</style>