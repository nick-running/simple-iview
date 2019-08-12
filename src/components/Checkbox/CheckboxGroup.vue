<template>
    <div class="s-checkbox-group" :class="{box: box}">
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
      },
      box: {
        type: [String, Number, Boolean],
        default: false
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
          const {value, box} = this
          this.children.forEach(child => {
            child.model = value

            if (update) {
              child.currentValue = value.indexOf(child.label) >= 0
              child.group = true
              if (box) {
                child.box = true
              }
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
    .box{
        border-radius: 0;
        display: flex;
    }
    .box .box{
        flex: 1
    }
</style>