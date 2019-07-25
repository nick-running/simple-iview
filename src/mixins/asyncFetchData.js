import { mapActions } from 'vuex'
export default {
  data () {
    return {
    
    }
  },
  methods: {
    ...mapActions({
      asyncGet: 'asyncGetData',
      asyncPost: 'asyncPostData',
    }),
  },
  mounted () {
  }
}