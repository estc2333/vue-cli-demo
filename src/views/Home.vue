<template>
  <div>home</div>
</template>

<script>
import axios from 'axios'

export default {
  name: "Home",
  created() {
    axios.get('/data.json')
        .then(res => console.log(res))
  }
}
</script>

<style scoped>

</style>
