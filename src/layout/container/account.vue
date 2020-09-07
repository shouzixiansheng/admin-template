<template>
  <section class="fr">
    <span @mousemove="()=>this.look = true" @mouseleave="()=>this.look = false" class="inline-block mr30">
      <span class="mr5">{{userInfo.userInfo.username}}</span>
      <el-collapse-transition>
        <ul v-show="look" class="ul-item">
          <li class="welcom">欢迎，{{userInfo.userInfo.username}}</li>
          <!-- <li class="item" @click="open">基本资料</li> -->
          <li class="item" @click="openDialog">修改密码</li>
          <li class="tc mr20" @click="logout">退出当前账户</li>
        </ul>
      </el-collapse-transition>
    </span>
    <edit-dialog :show.sync="show" @listen="listen" :form="form"></edit-dialog>
    <show-dialog :show2.sync="show2" title="基本信息"></show-dialog>
  </section>
</template>

<script>
import editDialog from './editDialog'
import showDialog from './showDialog'
import { mapGetters } from 'vuex'
export default {
  name: 'account',
  components: {
    editDialog, showDialog
  },
  data() {
    return {
      look: false,
      show: false,
      show2: false,
      form: {}
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  watch: {},
  methods: {
    open() {
      this.show2 = true
    },
    openDialog() {
      this.form = {}
      this.show = true
    },
    listen() {
      this.$store.dispatch('logout')
      this.$message({
        type: 'success',
        message: '修改成功'
      })
    },
    logout() {
      this.$confirm('是否退出当前账户?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$store.dispatch('logout')
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消 操作'
          })
        })
    }
  },
  created() { },
  mounted() { }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.ul-item {
  right: 0;
  position: absolute;
  font-size: 12px;
  width: 280px;
  background-color: #091536;
  border-radius: 5px;
  box-shadow: rgb(48, 46, 46) 0px 0px 10px;
  z-index: 10000;
  li {
    padding-left: 40px;
    height: 60px;
    cursor: pointer;
    border-radius: 2px;
    color: #fff;
    &:hover:not(:nth-of-type(1)) {
      color: #65f9ff;
      text-decoration: underline;
    }
  }
  li:nth-of-type(odd) {
    background-color: #091536;
  }
  li:nth-of-type(even) {
    background-color: #172342;
  }
}
</style>
