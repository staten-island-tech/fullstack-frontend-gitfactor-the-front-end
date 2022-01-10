<template>
  <div>
    <div class="textbox">
      <p class="textbox-title">Count Dracula</p>
<p class="textbox-test">Mwaha! Welcome to my castle~</p>
    </div>
  </div>
</template>

<script>
export default {
name: "TextBox",
}
</script>

<style>
.textbox{
  border: red 1rem solid;
  background-color: black;
  width: 100%;
  height: 20rem;
position: absolute;
bottom: 0;
padding: 2rem;
padding-top: 1rem;
}
.textbox-test, .textbox-title{
  color: white;
  font-size: 2rem;
  text-align: left;
}
.textbox-title{
  font-size: 2.5rem;
  padding-top: 0.5rem;
}
</style>