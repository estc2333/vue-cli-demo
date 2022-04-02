<template>
  <div>contacts
    <el-button type="primary">add</el-button>
  </div>
</template>

<script>
import {Button} from 'element-ui'
export default {
  name: "contacts",
  components: {
    [Button.name]: Button,
  },
}
</script>

<style scoped>

</style>
