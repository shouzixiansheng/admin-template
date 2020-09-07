<template>
  <section id="dash">
    <admin ></admin>
  </section>
</template>
<script>
import admin from './admin'
const types = {
  admin: '管理员'
}
export default {
  name: 'home',
  components: {
    admin
  },
  data() {
    return {
      ready: false,
      types
    }
  },
  computed: {
    type() {
      if (this.userInfo && this.userInfo.userInfo) {
        return this.types[this.userInfo.userInfo.type]
      } else {
        return '游客'
      }
    }
  },
  watch: {
  },
  methods: {

  },
  created() {
  },
  mounted() {
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
h1 {
  position: absolute;
  top: 35%;
  left: 45%;
  transform: translate(-50%, -50%);
  font-size: 38px;
  text-align: center;
}
#dash {
  padding: 20px;
  background-color: #eaedf1;
}
</style>
