<template>
  <el-dialog class="dialog-form" width="600px" :visible.sync="dialogFormVisible" @close="$emit('update:show2', false)">
    <div slot="title" class="tc title">{{title}}</div>
    <el-form label-width="130px">
      <el-form-item label="手机号：">
       13812345678
      </el-form-item>
      <el-form-item label="用户名：">
         admin
      </el-form-item>
      <!-- <el-form-item label="角色：">
      </el-form-item> -->
    </el-form>
  </el-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'editDialog',
  props: {
    title: {
      type: String,
      default: '修改密码'
    },
    show2: {
      type: Boolean,
      default: false
    }
  },
  components: {},
  data() {
    return {
      dialogFormVisible: this.show2
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  watch: {
    show2() {
      this.dialogFormVisible = this.show2
    }
  },
  methods: {
  },
  created() { },
  mounted() { }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
</style>
