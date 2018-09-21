<template>

  <div id="relativePosition" class="container">
    <div class="row">

      <div class="col-md-3" v-for="(user, index) in users" :key="index">
        <div style="text-align: center">
          <img :src="user.avatar" alt=""> Name : <span>{{user.username}}</span>
        </div>
        <div>
          <baby-obj :id="user.id" v-if="user.count <= 15"></baby-obj>
          <img class="teen" src="../assets/images/teen.gif" v-else-if="user.count <= 30">
          <img class="old" src="../assets/images/kakek.gif" v-else>
        </div>
        <button :id="user.id" @click="clickMe(user.id)" v-if="!finish && gameStart && id == user.id"></button>
      </div>
    </div>
    <div id="absolutePosition" v-if="!gameStart">
      <div class="overlay"></div>       
      <div class="baby-load">
        <div class="body">
          <div class="head">
            <div class="eyes"></div>
            <div class="mouth"></div>
          </div>
          <div class="neck"></div>
        </div>
        <div class="hand"></div>
        <div class="hand r"></div>
        <div class="leg"></div>
        <div class="leg r"></div>
      </div>
      <div class="card-body">
        <h5 class="card-title">Mohon Tunggu</h5>
        <p class="card-text">Jumlah Pemain Tidak Cukup, Cepat Ajak Teman-Teman Mu</p>
      </div>
    </div>
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
          avatar: values[index].avatar,
          count: values[index].count
        })
        if (values[index].count >= 50) {
          self.finish = true
        }
      })
    })
  },
  methods: {
    clickMe: function (userId) {
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
#absolutePosition {
  position: fixed;
  left: 0!important;
  top: 0!important;
  text-align: center;
}
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
.overlay {
  background: dimgrey;
  opacity: 0.7;
  width: 150%;
  height: 150%;
  position: fixed;
  z-index: 10;
}

.card-body {
  position: fixed;
  z-index: 1000;
  top: 35%;
  left: 38%;
}

.teen, .old {
  width: 72%;
  position: absolute;
  margin: 10%;
}

.baby-load {
  position: fixed;
  z-index: 1000;
  height: 100px;
  width: 120px;
  left: 48%;
  right: 0;
  top: 55%;
  bottom: 0;
  /* margin: auto; */
}
.baby-load:after {
  width: 170px;
  height: 10px;
  background: rgba(0, 0, 0, 0.15);
  box-shadow: 0 0 15px 25px rgba(0, 0, 0, 0.15);
  position: absolute;
  border-radius: 50%;
  top: 80px;
  left: -30px;
  -webkit-filter: blur(4px);
  filter: blur(4px);
}
.baby-load:before {
  content: 'Loading....';
  position: absolute;
  color: #fff;
  font-size: 22px;
  top: 100%;
  left: 0;
}
.baby-load .head {
  background: #FDCDAC;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  position: absolute;
  bottom: 50px;
  left: -50px;
  z-index: 75;
  -webkit-transform-origin: 50% 100%;
          transform-origin: 50% 100%;
}
.baby-load .head:after {
  position: absolute;
  width: 80px;
  height: 70px;
  background: #FDCDAC;
  left: -10px;
  bottom: -20px;
  border-radius: 50px;
  box-shadow: 1px 1px rgba(247, 189, 149, 0.53);
}
.baby-load .head:before {
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  z-index: 10;
  box-shadow: 0 -1px;
}
.baby-load .head .eyes {
  position: absolute;
  background: #000;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  left: 7px;
  top: 20px;
  box-shadow: 25px 2px;
  z-index: 50;
}
.baby-load .head .mouth {
  position: absolute;
  background: #fff;
  width: 10px;
  height: 5px;
  border-radius: 0 0 50px 50px;
  bottom: 10px;
  left: 10px;
  z-index: 25;
}
.baby-load .head .mouth:after {
  background: #1374B6;
  position: absolute;
  width: 20px;
  height: 20px;
  left: 5px;
  top: -7px;
  border-radius: 50%;
}
.baby-load .head .mouth:before {
  border: 2px solid #fff;
  position: absolute;
  border-radius: 50%;
  width: 10px;
  height: 10px;
  z-index: 5;
  left: 10px;
  top: 0;
}
.baby-load .neck {
  background: #FDCDAC;
  position: absolute;
  width: 40px;
  height: 30px;
  left: -10px;
  top: 10px;
  z-index: 50;
  -webkit-transform: rotate(-45deg);
  transform: rotate(-45deg);
}
.baby-load .body {
  width: 120px;
  height: 70px;
  background: #ff0;
  border-radius: 100px;
  background-color: #ff0239;
  z-index: 20;
  *zoom: 1;
  filter: progid:DXImageTransform.Microsoft.gradient(gradientType=1, startColorstr='#FFFDCDAC', endColorstr='#FFFCFFC6');
  background-image: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4gPHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJncmFkIiBncmFkaWVudFVuaXRzPSJvYmplY3RCb3VuZGluZ0JveCIgeDE9IjAuMCIgeTE9IjAuNSIgeDI9IjEuMCIgeTI9IjAuNSI+PHN0b3Agb2Zmc2V0PSI1NSUiIHN0b3AtY29sb3I9IiNmZGNkYWMiLz48c3RvcCBvZmZzZXQ9IjU1JSIgc3RvcC1jb2xvcj0iI2ZjZmZjNiIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JhZCkiIC8+PC9zdmc+IA==');
  background-size: 100%;
  background-image: linear-gradient(to right, #fdcdac 55%, #fcffc6 55%);
  position: relative;
  -webkit-transform-origin: 50% 100%;
          transform-origin: 50% 100%;
  -webkit-animation: 1s head alternate infinite;
  animation: 1s head alternate infinite;
}
.baby-load .body:after, .baby-load .body::before {
  background: #ff0;
  color: #ff0;
  width: 7px;
  height: 7px;
  position: absolute;
  right: 30px;
  top: 50px;
  border-radius: 50%;
  box-shadow: 10px 10px, -10px -15px , -10px 5px;
}
.baby-load .body:before {
  top: 20px;
  right: 20px;
}
.baby-load .hand, .baby-load .leg {
  background: #F7BD95;
  width: 25px;
  position: absolute;
  height: 50px;
  border-radius: 20px;
  left: 15px;
  top: 35px;
  z-index: 125;
  -webkit-transform-origin: 50% 0;
          transform-origin: 50% 0;
  -webkit-animation: 1s hMove 0.2s alternate infinite;
  animation: 1s hMove 0.2s alternate infinite;
}
.baby-load .hand:after, .baby-load .leg:after {
  position: absolute;
  width: 50px;
  height: 20px;
  background: #F7BD95;
  bottom: 2px;
  right: 5px;
  -webkit-transform: rotate(5deg);
  transform: rotate(5deg);
  border-radius: 50px;
}
.baby-load .hand:before, .baby-load .leg:before {
  position: absolute;
  width: 25px;
  height: 24px;
  background: #F7BD95;
  bottom: 4px;
  right: 35px;
  border-radius: 10px 10px 0 10px;
}
.baby-load .hand.r, .baby-load .r.leg {
  z-index: 5;
  -webkit-animation: 1s hMove alternate infinite;
  animation: 1s hMove alternate infinite;
  -webkit-transform: rotate(25deg);
  transform: rotate(25deg);
  background: #ad8060;
}
.baby-load .hand.r:after, .baby-load .r.leg:after, .baby-load .hand.r:before, .baby-load .r.leg:before {
  background: #ad8060;
}
.baby-load .leg {
  left: auto;
  top: 30px;
  right: 5px;
  height: 55px;
  width: 30px;
  -webkit-transform: rotate(15deg);
  transform: rotate(15deg);
  -webkit-transform-origin: 50% 0;
          transform-origin: 50% 0;
  -webkit-animation: 1s move alternate infinite;
  animation: 1s move alternate infinite;
}
.baby-load .leg:after {
  position: absolute;
  width: 40px;
  height: 20px;
  background: #F7BD95;
  bottom: 2px;
  left: 5px;
  border-radius: 0 0 0 10px;
  -webkit-transform: rotate(-15deg);
  transform: rotate(-15deg);
}
.baby-load .leg:before {
  position: absolute;
  width: 20px;
  height: 30px;
  background: #F7BD95;
  bottom: 0;
  left: 35px;
  -webkit-transform: rotate(-45deg);
  transform: rotate(-45deg);
  border-radius: 10px;
}
.baby-load .leg.r {
  z-index: 5;
  -webkit-transform: rotate(25deg);
  transform: rotate(25deg);
  background: #ad8060;
  -webkit-animation: 1s move 0.2s alternate infinite;
  animation: 1s move 0.2s alternate infinite;
}
.baby-load .leg.r:before, .baby-load .leg.r:after {
  background: #ad8060;
}
@-webkit-keyframes move {
  from {
    -webkit-transform: translateX(0px) rotate(5deg);
    transform: translateX(0px) rotate(5deg);
  }
  to {
    -webkit-transform: translateX(-5px) rotate(15deg);
    transform: translateX(-5px) rotate(15deg);
  }
}
@keyframes move {
  from {
    -webkit-transform: translateX(0px) rotate(5deg);
    transform: translateX(0px) rotate(5deg);
  }
  to {
    -webkit-transform: translateX(-5px) rotate(15deg);
    transform: translateX(-5px) rotate(15deg);
  }
}
@-webkit-keyframes hMove {
  from {
    -webkit-transform: translateX(5px) rotate(-5deg);
    transform: translateX(5px) rotate(-5deg);
  }
  to {
    -webkit-transform: translateX(0px) rotate(0deg);
    transform: translateX(0px) rotate(0deg);
  }
}
@keyframes hMove {
  from {
    -webkit-transform: translateX(5px) rotate(-5deg);
    transform: translateX(5px) rotate(-5deg);
  }
  to {
    -webkit-transform: translateX(0px) rotate(0deg);
    transform: translateX(0px) rotate(0deg);
  }
}
@-webkit-keyframes head {
  from {
    -webkit-transform: translateX(5px) rotate(5deg);
    transform: translateX(5px) rotate(5deg);
  }
  to {
    -webkit-transform: translateX(0px) rotate(0deg);
    transform: translateX(0px) rotate(0deg);
  }
}
@keyframes head {
  from {
    -webkit-transform: translateX(5px) rotate(5deg);
    transform: translateX(5px) rotate(5deg);
  }
  to {
    -webkit-transform: translateX(0px) rotate(0deg);
    transform: translateX(0px) rotate(0deg);
  }
}

</style>
