<template>
  <section id="container" :class="[isCollapse?'ml64':'ml200']">
    <navbar></navbar>
    <tags-view></tags-view>
    <transition name="fade" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view class="content"></router-view>
      </keep-alive>
    </transition>
  </section>
</template>

<script>
import navbar from './Navbar'
import tagsView from '@/components/TagsView'
import { mapGetters } from 'vuex'
export default {
  name: 'container',
  components: {
    navbar, tagsView
  },
  data() {
    return {

    }
  },
  computed: {
    key() {
      return this.$route.path + Math.random() * 9999
    },
    ...mapGetters(['isCollapse', 'cachedViews'])

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
.content {
  min-height: calc(100vh - 84px);
  position: relative;
}
</style>
