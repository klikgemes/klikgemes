<template>
  <div class="babyobj" :style="{width: checkBabyWidth + 'px', height: checkBabyHeight + 'px'}" :id="userid">
    <div class="face">
      <div class="eyes"></div>
      <div class="mouth">
        <div class="tongue"></div>
      </div>
    </div>
    <div class="blanket"></div>
  </div>
</template>

<script>
export default {
  name: 'BabyObj',
  data () {
    return {
      width: 83,
      height: 225,
      users: [],
      finish: false,
      gameStart: false
    }
  },
  props: ['userid', 'userclick'],
  methods: {
  },
  created () {
    console.log('===== created')
  },
  computed: {
    checkBabyWidth: {
      get: function () {
        return this.width
      }
    },
    checkBabyHeight: {
      get: function () {
        return this.height
      }
    }
  },
  watch: {
    checkBabyWidth: function (val) {
      console.log('cek width', val)
    },
    checkBabyHeight: function (val) {
      console.log('cek height', val)
    }
    // userclick: function(newVal, oldVal) {
    //   this.growBig()
    // }
  }
}
</script>

<style>
.babyobj {
  background: #e8dcd8;
  box-shadow: -15px -10px 0px #65a9c1;
  overflow: hidden;
  position: absolute;
  top: 80%;
  left: 25%;
  border-radius: calc(100px);
  transform: rotate(-40deg);
  -webkit-transform: rotate(-40deg);
  animation: moving 1.2s ease-in-out infinite;
  -webkit-animation: moving 1.2s ease-in-out infinite;
}

.babyobj .face {
  margin: 10px 22px 0 8px;
  width: 60px;
  height: 66px;
  background: #f9c19f;
  border-radius: 50%;
  position: relative;
  animation: face 1.2s ease-in-out infinite;
  -webkit-animation: face 1.2s ease-in-out infinite;
}

.babyobj .face:before {
  content: "";
  display: block;
  width: 20px;
  height: 10px;
  background: #edb256;
  border-bottom-left-radius: 400%;
  border-bottom-right-radius: 200%;
  position: absolute;
  top: 0;
  left: 40%;
  transform: rotate(-15deg);
  -webkit-transform: rotate(-15deg);
}

.babyobj .face .eyes {
  margin-left: -30%;
  width: 60%;
  height: 10px;
  position: absolute;
  top: 20px;
  left: 50%;
}

.babyobj .face .eyes:before {
  content: "";
  width: 9px;
  height: 9px;
  background: #1b414c;
  border-radius: 50%;
  float: left;
  animation: eyes .5s linear infinite; -webkit-animation: eyes .5s linear infinite;
}

.babyobj .face .eyes:after {
  content: "";
  width: 9px;
  height: 9px;
  background: #1b414c;
  border-radius: 50%;
  float: right;
  animation: eyes .5s linear infinite; -webkit-animation: eyes .5s linear infinite;
}

.babyobj .face .mouth {
  margin-left: -16px;
  width: 32px;
  height: 18px;
  background: #7e2e33;
  border-radius: 10px;
  position: absolute;
  bottom: 10px;
  left: 50%;
  animation: mouth .3s ease-in-out infinite;
  -webkit-animation: mouth .3s ease-in-out infinite;
}

.babyobj .face .mouth .tongue {
  margin-left: -3px;
  width: 6px;
  height: 10px;
  background: #ed5c56;
  border-top-left-radius: 120%;
  border-top-right-radius: 50%;
  position: absolute;
  bottom: 0;
  left: 50%;
  z-index: 1;
  animation: tongue .3s ease-in-out infinite;
  -webkit-animation: tongue .3s ease-in-out infinite;
}

.babyobj .blanket {
  width: 200%;
  height: 15px;
  background: #cdd3d7;
  transform: rotate(-30deg);
  -webkit-transform: rotate(-30deg);
  position: absolute;
  top: 45%;
  left: -30px;
  animation: blanket 1.2s ease-in-out infinite;
  -webkit-animation: blanket 1.2s ease-in-out infinite;
}

@keyframes moving {
  0% {
    top: 50%;
    left: 50%;
  }
  50% {
    top: 49%;
    left: 51%;
  }
  100% {
    top: 50%;
    left: 50%;
  }
}

@-webkit-keyframes moving {
  0% {
    top: 50%;
    left: 50%;
  }
  50% {
    top: 49%;
    left: 51%;
  }
  100% {
    top: 50%;
    left: 50%;
  }
}

@keyframes face {
  0% {
    margin: 10px 22px 0 8px;
  }
  50% {
    margin: 10px 8px 0 22px;
  }
  100% {
    margin: 10px 22px 0 8px;
  }
}

@-webkit-keyframes face {
  0% {
    margin: 10px 22px 0 8px;
  }
  50% {
    margin: 10px 8px 0 22px;
  }
  100% {
    margin: 10px 22px 0 8px;
  }
}

@keyframes eyes {
  0% {
    height: 9px;
    border-radius: 50%;
  }
  50% {
    height: 5px;
    border-radius: 400%;
  }
  100% {
    height: 9px;
    border-radius: 50%;
  }
}

@-webkit-keyframes eyes {
  0% {
    height: 9px;
    border-radius: 5px;
  }
  50% {
    height: 5px;
    border-radius: 400%;
  }
  100% {
    height: 9px;
    border-radius: 5px;
  }
}

@keyframes mouth {
  0% {
    margin-left: -16px;
    width: 32px;
    height: 18px;
  }
  50% {
    margin-left: -10px;
    width: 20px;
    height: 20px;
  }
  100% {
    margin-left: -16px;
    width: 32px;
    height: 18px;
  }
}

@-webkit-keyframes mouth {
  0% {
    margin-left: -16px;
    width: 32px;
  }
  50% {
    margin-left: -9px;
    width: 18px;
  }
  100% {
    margin-left: -16px;
    width: 32px;
  }
}

@keyframes tongue {
  0% {
    border-top-left-radius: 120%;
    border-top-right-radius: 50%;
  }
  50% {
    border-top-left-radius: 50%;
    border-top-right-radius: 120%;
  }
  100% {
    border-top-left-radius: 120%;
    border-top-right-radius: 50%;
  }
}

@-webkit-keyframes tongue {
  0% {
    border-top-left-radius: 120%;
    border-top-right-radius: 50%;
  }
  50% {
    border-top-left-radius: 50%;
    border-top-right-radius: 120%;
  }
  100% {
    border-top-left-radius: 120%;
    border-top-right-radius: 50%;
  }
}

@keyframes blanket {
  0% {
    top: 45%;
  }
  50% {
    top: 50%;
  }
  100% {
    top: 45%;
  }
}

@-webkit-keyframes blanket {
  0% {
    top: 45%;
  }
  50% {
    top: 50%;
  }
  100% {
    top: 45%;
  }
}
</style>
