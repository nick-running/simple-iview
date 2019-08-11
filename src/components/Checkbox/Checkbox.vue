<template>
    <div class="s-checkbox">
        <label>
            <input v-if="group"
                    type="checkbox"
                    :disabled="disabled"
                    :value="label"
                    v-model="model"
                    @change="change">
            <input v-else
                   type="checkbox"
                   :disabled="disabled"
                   :checked="currentValue"
                   @change="change">
            <slot></slot>
        </label>
    </div>
</template>

<script>
    import {findComponentUpward} from '@/utils/assist'
  export default {
    name: "sCheckbox",
    // model: {
    //   prop: 'value',
    //   event: 'on-change'
    // },
    props: {
      disabled: {
        type: Boolean,
        default: false
      },
      value: {
        type: [String, Number, Boolean],
        default: false
      },
      trueValue: {
        type: [String, Number, Boolean],
        default: true
      },
      falseValue: {
        type: [String, Number, Boolean],
        default: false
      },
      label: {
        type: [String, Number, Boolean]
      }
    },
    data() {
      return {
        currentValue: this.value,
        model: [],
        group: false,
        parent: null
      }
    },
    methods: {
      change(event) {
        if(this.disabled) {
          return false
        }
        const checked = event.target.checked
        this.currentValue = checked
        const value = checked?this.trueValue: this.falseValue
        this.$emit('input', value)

        if(this.group) {
          this.parent.change(this.model)
        }else{
            this.$emit('on-change', value)
        }
      },
      updateModel () {
        this.currentValue = this.value === this.trueValue;
      }
    },
    watch: {
      value(val){
        if(val===this.trueValue||val===this.falseValue) {
          this.updateModel()
        }else{
          throw 'lue should be trueValue or falseValue.'
        }
      }
    },
    mounted() {
        this.parent = findComponentUpward(this, 'sCheckboxGroup')
      if(this.parent) {
        this.group = true
      }
      if(this.group) {
        this.parent.updateModel(true)
      }else{
          this.updateModel()
      }
    },
    created() {

    }
  }
</script>

<style scoped>

</style>