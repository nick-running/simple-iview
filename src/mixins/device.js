import { mapActions } from 'vuex'
export default {
  data () {
    return {
    
    }
  },
  methods: {
    ...mapActions({
      vibrate: 'vibrateShort',
      vibrateLong: 'vibrateLong'
    }),
  },
  mounted () {
  }
}