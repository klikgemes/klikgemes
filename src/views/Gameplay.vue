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
        <button :id="user.id" @click="clickMe(user.id, 'https://00e9e64bacdf738599c06e1efed7b88a47481e2c6ce9186046-apidata.googleusercontent.com/download/storage/v1/b/imageblog/o/engahhh.mp3?qk=AD5uMEs3wRHCBwBpRgapCLiTBDNOfMTUuHF8q3S9vyw7V6i-EZ7sFY-uTG6qyEukLZwTzp7qDECySZEd-UXKmlnaW5ccMfudMD9zcz-O1XBX7ET-E7jHM2IU2q6n6ARee5XtwBjtqGvufzW0BWg6g__l6Gv-URwC6SobluTin_OMaXZOL6eTLNMV2Pyd5VQn-0-zPajJyqIr069v34Cy4K8pgyvx2Oe1oy7G6wNg7xGa7RIacbGn3M8YeKjObtnYdaCPky4d7WCqYjWtt0ysVXTSnyJzElAX68v3M5bozP3FGxn6PeyQHGa5zum2YiIbmKXzACGz5pg9qLfwp8GkSxxr6_-ugdJ72v_Xtm2QmK3U7IFGVGtTRsYc_u6FR0sbEOmJ6ehI_zzJLiOdMwDlXTvGP04f0FWe3O3vUlpmMFgXV_dUhYg9hDMEgWgmooRo-ewYVbhb_Ld0k8s06yUqKohGhGUPomAZAHwyXB76eqOatlNFEtj0tIuFgo-kYQPQuMLWH9pk8bg0PUJfwqqILvUr0hmhq7PN-z1KuzWaa3rwHZIsNke0BLeXnEmLT8HNwGC565J_dW_K8UAT2F7MnKSeZEo09Zava05UNTJASoLzQ3uh5doMe1W4uN-MuxehSyugTrG_d7njNaO-7GzYpTmibmLACOKsG5wpXDPgm2qiPEX2U28DFrS04y25PxlanFa2ADYgFBdIFUqoQx8dXt8TFYg82OZMokEiRuhRHC0-_QeUxkCL4Oit-BuuH55v5wWIabwB2nZi')" v-if="!finish && gameStart && id == user.id" style="cursor:pointer;"></button>
      </div>

    </div>
    <div id="absolutePosition" class="card w-75" style="position: absolute;" v-if="!gameStart">
      <div class="card-body">
        <h5 class="card-title">Mohon Tunggu</h5>
        <p class="card-text">Jumlah Pemain Tidak Cukup, Cepat Ajak Teman-Teman Mu</p>
      </div>
    </div>

    <div id="absolutePosition" class="card w-75" style="position: absolute;" v-if="finish">
      <div class="card-body">
        <div>
          <img src="../assets/images/winner.png" alt="" width="500px" height="300px">
           <audio autoplay loop>
                <source src="../assets/music/acengpilek.mp3">
          </audio> 
          <h1>1. {{ firstName[0].userName }}</h1>
          <h4>2. {{ firstName[1].userName }}</h4>
          <h4>3. {{ firstName[2].userName }}</h4>
          <h4>4. {{ firstName[3].userName }}</h4>
        </div>
        <router-link to="/">KEMBALI KEBERANDA</router-link>
      </div>
    </div>

    <!-- <audio  ref="audioElm" src="../assets/music/engahhh.mp3"></audio> -->
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
      id: '',
      playerName: [],
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
          for(let i = 0; i < values.length; i++){
            for(let j = 0; j < values.length-1; j++){
              if(values[j].count < values[j+1].count){
                let sort = values[j+1]
                values[j+1] = values[j]
                values[j] = sort
              }
            }
          }
        }
        self.firstName = values
      })
    })
  },
  methods: {
    clickMe: function (userId,sound) {
     var audio = new Audio(sound);
      audio.play();
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
  left: 25%;
  border-radius: 50%;
  background-color: #f2ca27;
}
</style>
