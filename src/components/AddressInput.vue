<template>
  <div class="form-group">
    <vue-google-autocomplete
          ref="address"
          id="map"
          classname="form-control"
          placeholder="Please type your address"
          @placechanged="getAddressData"
          country="au"
      >
      </vue-google-autocomplete>
  </div>
</template>

<script>
import VueGoogleAutocomplete from 'vue-google-autocomplete'
export default {
  name: 'AddressInput',
  components: {
    VueGoogleAutocomplete
  },

  data () {
    return {
      address: ''
    }
  },

  mounted () {
    this.$refs.address.focus()
  },

  methods: {
    getAddressData: function (addressData, placeResultData, id) {
      this.address = placeResultData.formatted_address
      this.$emit('childToForm', this.address)
    }
  }
}
</script>

<style scoped>

</style>
