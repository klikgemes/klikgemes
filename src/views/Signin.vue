<template>
  <div class="home text-center"> <br><br>
    <p><b><i>Input your name to start KlikGEMES!</i></b></p>
    <div class="container col-md-4">
      <input type="text" class="form-control" v-model="userName" placeholder="Player name"> <br>
      <button type="button" class="btn btn-info" v-on:click="submitUserName">MASUK</button>
    </div>
    <div>
      <button v-on:click="nontonAja" type="button" class="btn btn-info" style="margin-top:20px;">ROOM PENUH : NONTON AJA</button>
    </div>
  </div>
</template>

<script>
import database from '../assets/config.js'
export default {
  name: 'home',
  data () {
    return {
      userName: ''
    }
  },
  methods: {
    submitUserName () {
      let self = this
      if (self.userName === '') {
        alert('Isi username dong kaka!!!')
      } else {
        database.ref('room/' + localStorage.getItem('room') + '/users').once('value')
          .then(function (snapshot) {
            let totalPlayer = 0
            if (snapshot.val()) {
              totalPlayer = Object.keys(snapshot.val()).length
            }
            if (totalPlayer > 3) {
              alert('room penoh cenoy')
            } else {
              database.ref('room/' + localStorage.getItem('room') + '/users').push({
                userName: self.userName,
                avatar: `https://api.adorable.io/avatars/50/${self.userName}`,
                count: 0,
                width: 0,
                height: 0
              })
              .then(response => {
                localStorage.setItem('id', response.key)
              })
              self.userName = ''
              self.$router.push('/gameplay')
            }
          })
      }
    },
    nontonAja () {
      this.$router.push('/gameplay')
    }
  }
}
</script>

<style scoped>

  .home {
    background-image: url("https://vignette.wikia.nocookie.net/star-and-the-forces-of-evil/images/0/0c/S3E5_Star_Butterfly_poking_Buff_Frog%27s_stomach.png/revision/latest/scale-to-width-down/1280?cb=20170729025101");
    position: fixed; 
    top: 0; 
    left: 0; 
    background-size: cover;
    min-width: 100%;
    min-height: 100%;
  }
  

  p {
    font-size: 40px;
    color: whitesmoke;
  }
</style>
