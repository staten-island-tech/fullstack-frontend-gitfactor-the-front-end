<template>
  <div class="end-game-popup">
      <h1>You have bested the Riddler!</h1>

      <div class="btn-group">
         <button class="reset-btn">Let's do it again.</button>
         <button class="reset-btn">Get me out of here.</button>
      </div>

      <h3>"Man, I'm hungry now. Wonder if the bloodcake store is still open?"</h3>

  </div>
</template>

<script>

/* reset button: wipes user data from the store, essentially the same as the "give up" but without the giving up 

Get me out button: logs user out
*/

export default {

}
</script>

<style scoped>
@import "../assets/global.css";

.end-game-popup {
    width: 100%;
    height: 100%;
    position: ;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: var(--dark-purple);
    margin: 0 auto;
    padding: 2rem;
    border-radius: 1.5rem;
}

.reset-btn {
    background-color: var(--highlight-color);
    font-size: var(--h4);
    font-weight: 700;
    margin: 10% 2rem 10% 2rem;
    padding: 1.5rem 2rem;
    border: none;
    border-radius: 1rem;
    color: var(--background-color);
}

h1 {
    margin-top: 15rem;
}

h3 {
    color: var(--purple);
}

.btn-group{

}
</style>