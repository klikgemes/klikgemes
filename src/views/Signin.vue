<template>
  <div class="home text-center"> <br><br>
    <p><b><i>Input your name to start KlikGEMES!</i></b></p>
    <div class="container col-md-4">
      <input type="text" class="form-control" v-model="userName" placeholder="Player name"> <br>
      <button type="button" class="btn btn-info" v-on:click="submitUserName">Submit Username</button>

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
      database.ref('room/' + localStorage.getItem('room') + '/users').push({
        userName: self.userName
      })
      this.$router.push('/gameplay')
    }
  }
}
localStorage.setItem('room', 'test')
</script>

<style scoped>
  .home {
    height: 800px;
    background-image: url("https://vignette.wikia.nocookie.net/star-and-the-forces-of-evil/images/0/0c/S3E5_Star_Butterfly_poking_Buff_Frog%27s_stomach.png/revision/latest/scale-to-width-down/1280?cb=20170729025101");
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }

  p {
    font-size: 40px;
    color: whitesmoke;
  }
</style>
