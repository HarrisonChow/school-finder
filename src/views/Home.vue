<template>
  <div>
    <LeadParagraph />
    <ImageWithCaption />
    <SearchForm />
  </div>
</template>

<script>

import LeadParagraph from '../components/LeadParagraph.vue'
import ImageWithCaption from '../components/ImageWithCaption.vue'
import SearchForm from '../components/SearchForm.vue'

export default {
  name: 'Home',
  components: {
    LeadParagraph,
    ImageWithCaption,
    SearchForm
  }
}
</script>
