import { mapGetters } from 'vuex'
// import * as m from 'moment'
// import * as s from '@/utils/sessionStorage'
export default {
  components: {},
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters(['role', 'userInfo'])
  },
  methods: {
  }
}
