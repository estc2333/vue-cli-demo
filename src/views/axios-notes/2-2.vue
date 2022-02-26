<template>
  <div>
    axios request methods
    <section>
      <li>get</li>
      <li>post</li>
      <li>put：更新数据，将所有数据推给后端</li>
      <li>patch：更新数据，只将修改的数据推给后端（如果表单的数据量很大，有很多项，全部推送耗费性能，考虑patch）</li>
      <li>delete</li>
    </section>
  </div>
</template>

<script>
export default {
  name: "2-2.vue"
}
</script>

<style scoped>

</style>
