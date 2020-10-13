<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <input type="text" :value="value" @input="updateValue" v-bind="$attrs" v-on="listeners" />
  </div>
</template>

<script>
import { formField } from '@/mixins/formField'
export default {
  name: 'BaseInput',
  mixins: [formField],
  computed: {
    listeners() {
      return {
        ...this.$listeners,
        input: this.updateValue
      }
    }
  }
}
</script>
