<template>
  <div v-if="treeData.length">
    <div v-for="node in treeData" :key="node.label">
      <span>{{node.label}}</span>
      <ul>
        <Tree :treeData="node.children" :key="node.label" />
      </ul>
    </div>
  </div>

</template>

<script>
export default {
  name: "Tree",
  props: {
    treeData: {
      type: {
        Array,
        default: () => ([])
      }
    },
  },
  data () {
    return {

    }
  }
}
</script>

<style scoped>

</style>
