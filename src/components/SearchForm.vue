<template>
  <form action="">
    <div class="gel-form col-lg-7 col-md-10 no-gutters" id="frm01">
      <fieldset>

        <label>Enter your address</label>
        <AddressInput @childToForm="onAddressInputed"/>
        <small class="form-text">Start typing your address and select.</small>

        <label for="component-dropdown">Enter your level: </label>
        <Dropdown id="component-dropdown" :defaultLabel="defaultLabel" :options="levelOptions" v-model="selectedLevel" @childToForm="onLevelSelected"></Dropdown>
        <small class="form-text">Select your child’s starting year level.</small>

        <button class="btn gel-button gel-button-primary gel-button-small" @click="searchSchool">Find schools</button>
      </fieldset>
    </div>
  </form>
</template>

<script>
import AddressInput from './AddressInput'
import Dropdown from './Dropdown'
import router from '../router'

export default {

  name: 'SearchForm',

  components: {
    AddressInput,
    Dropdown
  },

  data () {
    return {
      address: '',
      level: '',
      selectedLevel: '',
      defaultLabel: 'Please select year level',
      levelOptions: {
        'Primary school student': 'Primary school student',
        'High school student': 'High school student'
      }
    }
  },

  methods: {
    onAddressInputed (value) {
      this.address = value
    },
    onLevelSelected (value) {
      this.level = value
    },
    searchSchool () {
      this.$axios
        .get('https://picsum.photos/v2/list?page=2&limit=10')
        .then(response => {
          console.log(this.selectedLevel)
          console.log(this.address)
          router.push({ path: 'Search', query: { q: this.address } })
        })
        .catch(error => console.log(error))
    }
  }
}
</script>

<style scoped>

</style>
