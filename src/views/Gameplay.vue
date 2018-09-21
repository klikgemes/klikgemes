<template>

  <div id="relativePosition" class="container">
    <div class="row">

      <div class="col-md-3" v-for="(user, index) in users" :key="index">
        <div style="text-align: center">
          <img :src="user.avatar" alt=""> Name : <span>{{user.username}}</span>
        </div>
        <!-- <div class="card" style="width: 16rem;">
          <img class="card-img-top" src="https://svgsilh.com/svg/1299754-009688.svg" alt="Card image cap">
        </div> -->
        <div>
          <baby-obj :id="user.id"></baby-obj>
        </div>
        <button :id="user.id" @click="clickMe(user.id)" v-if="!finish && gameStart && id == user.id">CLICK ME</button>
      </div>

    </div>
    <!-- <div id="absolutePosition" class="card w-75" style="position: absolute;" v-if="!gameStart">
      <div class="card-body">
        <h5 class="card-title">Mohon Tunggu</h5>
        <p class="card-text">Jumlah Pemain Tidak Cukup, Cepat Ajak Teman-Teman Mu</p>
      </div>
    </div> -->
  </div>
</template>

<script>
import database from '../assets/config.js'
import BabyObj from '@/components/BabyObj.vue'

export default {
  name: 'gameplay',
  components: {
    BabyObj
  },
  data: function () {
    return {
      users: [],
      finish: false,
      gameStart: false,
      id: ''
    }
  },
  created: function () {
    let self = this
    var starCountRef = database.ref('room/' + localStorage.getItem('room') + '/users')
    starCountRef.on('value', function (snapshot) {
      self.id = localStorage.getItem('id')
      self.users = []
      let keys = []
      let values = []
      if (snapshot.val()) {
        keys = Object.keys(snapshot.val())
        values = Object.values(snapshot.val())
      }

      if (keys.length == 4) {
        self.gameStart = true
      }

      keys.forEach((key, index) => {
        self.users.push({
          id: key,
          username: values[index].userName,
          avatar: values[index].avatar
        })
        if (values[index].count >= 50) {
          self.finish = true
        }
      })
    })
  },
  methods: {
    clickMe: function (userId) {
      console.log(this.users)
      var starCountRef = database.ref('room/' + localStorage.getItem('room') + '/users/' + userId)
      starCountRef.once('value', function (snapshot) {
        let counter = snapshot.val().count
        starCountRef.update({
          count: counter + 1
        })
      })
    }
  }
}
</script>

<style scoped>
button {
  position: relative;
  top: 400px;
  border: none;
  color: #fff;
  width: 100px;
  height: 100px;
  transition: 0.3s;
  left: 28%;
  border-radius: 50%;
  background-color: #f2ca27;
  cursor: pointer;
}
</style>
