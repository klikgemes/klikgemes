<template>
  <div class="home">
    <h1>SELAMAT DATANG DI KLIK GEMES</h1>
    <div class="col-md-4">
      <h2>Silahkan input nama room</h2>
      <input class="form-control form-control-lg" type="text" placeholder="Room" v-model="room">
      <button type="button" class="btn btn-outline-success" v-on:click="inputRoom">Success</button>

    </div>
  </div>
</template>

<script>
import database from '../assets/config.js'
export default {
  name: 'home',
  data: function () {
    return {
      room: ''
    }
  },
  methods: {
    inputRoom () {
      let self = this
      localStorage.setItem('room', self.room)
      if (this.room) {
        var starCountRef = database.ref('room/' + this.room)
        starCountRef.once('value', function (snapshot) {
          if (!snapshot.val()) {
            database.ref('room/' + self.room).set({
              name: self.room
            })
              .then(response => {
                self.room = ''
              })
          }
          self.$router.push('signin')
        })
      }
    }
  }
}
</script>

<style scoped>
button {
  margin-top: 10px;
}
.col-md-4 {
  margin: 3% 0 0 10%;
}
h1 {
  margin-left: 9%;
}
.home {
background-image: url('https://i.ytimg.com/vi/YYT1kQyRbxo/maxresdefault.jpg');
height: 900px;
background-size: cover;
}
</style>
