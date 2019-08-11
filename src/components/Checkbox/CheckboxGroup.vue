<template>
    <div class="s-checkbox-group">
        <slot></slot>
    </div>
</template>

<script>
  import {findComponentsDownward} from '@/utils/assist'

  export default {
    name: "sCheckboxGroup",
    // model: {
    //
    // },
    props: {
      min: {
        type: Number,
        default: 0,
      },
      value: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        currentValue: this.value,
        children: []
      }
    },
    methods: {
      updateModel(update) {
        this.children = findComponentsDownward(this, 'sCheckbox')
        if (this.children) {
          const {value} = this
          this.children.forEach(child => {
            child.model = value

            if (update) {
              child.currentValue = value.indexOf(child.label) >= 0
              child.group = true
            }
          })
        }
      },
      change(data) {
        this.currentValue = data
        this.$emit('input', data)
        this.$emit('on-change', data)
      }
    },
    watch: {
      value(nVal, oVal) {
        // console.log(`nVal is: ${JSON.stringify(nVal)}`)
        // console.log(`oVal is: ${JSON.stringify(oVal)}`)
        // console.log(`nVal.length is: ${JSON.stringify(nVal.length)}`)
        this.updateModel(true)
        // if(nVal.length<this.min){
        //   this.change(oVal)
        // }
      }
    },
    mounted() {
      this.updateModel(true)
    },
    created() {

    }
  }
</script>

<style scoped>

</style>