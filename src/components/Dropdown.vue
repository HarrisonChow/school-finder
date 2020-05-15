<template>
  <div class="dropdown">
    <select
      v-model="selectedOption"
      @input="event => { $emit('input', event.target.value) }"
      >
      <option disabled value="">{{defaultLabel}}</option>
      <option v-for="(option, name) in options" :value="option" v-bind:key=name>{{ name }}</option>
    </select>
  </div>

</template>

<script>
export default {
  data () {
    return {
      selectedOption: null
    }
  },

  props: {
    value: null,
    defaultLabel: String,
    options: {
      type: Object,
      required: true
    }
  },

  mounted () {
    this.selectedOption = this.value
  },

  methods: {
    emitToForm (event) {
      this.$emit('childToForm', this.value)
    }
  },

  watch: {
    value: function (newValue) {
      this.selectedOption = newValue
    }
  }
}
</script>
