<template>
  <div class="container">
    <div class="row">
      <div class="col-md-3">
        <div class="card" style="width: 16rem;" v-on:click="btnPlayer">
          <img class="card-img-top" src="https://svgsilh.com/svg/1299754-009688.svg" alt="Card image cap">
        </div>
      </div>

      <div class="col-md-3">
        <div class="card" style="width: 16rem;">
          <img class="card-img-top" src="https://svgsilh.com/svg/1299754-009688.svg" alt="Card image cap">
        </div>
      </div>

      <div class="col-md-3">
        <div class="card" style="width: 16rem;">
          <img class="card-img-top" src="https://svgsilh.com/svg/1299754-009688.svg" alt="Card image cap">
        </div>
      </div>

      <div class="col-md-3">
        <div class="card" style="width: 16rem;">
          <img class="card-img-top" src="https://svgsilh.com/svg/1299754-009688.svg" alt="Card image cap">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import database from '../assets/config.js'

export default {
  name: 'gameplay',
  created: function () {
    // database().ref('users/').set({
      
    // })
  },
  methods: {
    btnPlayer: function(){
      console.log('oke')
    }
  }
}
</script>
