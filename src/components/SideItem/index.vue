<template>
  <div :class="[isCollapse?'w64':'w200','sideItem']">
    <scroll-bar>
      <div v-show="!isCollapse" class="logo flex pd20 pb0 pl0 mb10 items-center">
        <img :src="require('@/assets/images/logo.png')" width="40">
        <span class="white ml10 fz18">后台管理</span>
      </div>
      <el-menu :default-active="ActivePath" class="el-menu-vertical-demo" :collapse="isCollapse">
        <router-link to="/dashboard">
          <el-menu-item index="/dashboard" id="submenu-title-noDropdown">
            <i class="el-icon-s-home"></i>
            <span slot="title">主页</span>
          </el-menu-item>
        </router-link>
        <template v-for="item in permission">
          <el-submenu :index="item.path" :key="item.name" v-if="item.children.length>0">
            <template slot="title">
              <i v-if="item.meta&&item.meta.icon" :class="['iconfont', item.meta.icon]"></i>
              <span v-if="item.meta&&item.meta.title" class="ml10">{{item.meta.title}}</span>
            </template>
            <template v-for="(child,index) in item.children">
              <router-link v-if="!child.meta.hidden" :to="item.path+'/'+child.path" :key="index">
                <el-menu-item :index="item.path+'/'+child.path">
                  <span v-if="child.meta&&child.meta.title">{{child.meta.title}}</span>
                </el-menu-item>
              </router-link>
            </template>
          </el-submenu>
        </template>
      </el-menu>
    </scroll-bar>
  </div>
</template>

<script>
import scrollBar from '@/components/ScrollBar'
import { mapGetters } from 'vuex'
export default {
  name: 'sideItem',
  components: {
    scrollBar
  },
  data() {
    return {
      ActivePath: this.$route.path
    }
  },
  computed: {
    ...mapGetters(['isCollapse', 'permission'])
  },
  watch: {
    $route() {
      this.$nextTick(() => {
        this.permission.forEach(item => {
          item.children.forEach(el => {
            if (this.$route.path.indexOf(item.path + '/' + el.path) !== -1) {
              this.ActivePath = item.path + '/' + el.path
            }
          })
        })
      })
    }
  },
  methods: {},
  created() {
    this.permission.forEach(item => {
      item.children.forEach(el => {
        if (this.$route.path.indexOf(item.path + '/' + el.path) !== -1) {
          this.ActivePath = item.path + '/' + el.path
        }
      })
    })
  },
  mounted() { }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.logo {
  transition: all 0.28s;
}
</style>
