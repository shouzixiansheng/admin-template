<script>
import { mapGetters } from 'vuex'
import { getChannelTypeList } from '@/api/public'
import * as s from '@/utils/sessionStorage'
import login from '@/views/login'
export default {
  name: 'App',
  components: { login },
  computed: {
    ...mapGetters(['isLogin'])
  },
  watch: {
    $route() {
      const ysfHold = document.querySelector('#YSF-BTN-HOLDER')
      const ysfInfo = document.querySelector('#YSF-PANEL-INFO')
      if (ysfHold) {
        if (this.$route.name !== 'dashboard') {
          ysfHold.style.display = 'none'
          ysfInfo.classList.remove('ysf-chat-layeropen')
        } else {
          ysfHold.style.display = 'block'
        }
      }
    }
  },
  methods: {
    async getChannelTypeList() {
      const res = await getChannelTypeList()
      s.set('filterChannels', res.data)
    }
  },
  mounted() {
  },
  render(h) {
    if (this.isLogin) {
      if (this.$route.name === 'dashboard') {
        const ysfHold = document.querySelector('#YSF-BTN-HOLDER')
        if (ysfHold) {
          ysfHold.style.display = 'block'
        }
      }
      return h('router-view')
    } else {
      return h(login)
    }
  },
  created() {
    if (this.isLogin) {
      this.getChannelTypeList()
    }
  }
}
</script>

<style>
#YSF-IFRAME-LAYER {
  bottom: 50px !important;
}
</style>
