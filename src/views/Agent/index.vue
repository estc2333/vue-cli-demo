<template>
  <div>agent
    <Tree v-for="node in treeData" :key="node.label" :treeData="treeData" />
  </div>
</template>

<script>
import Tree from '../../components/Tree'
export default {
  name: "agent",
  components: {
    Tree,
  },
  data () {
    return {
      treeData: [
        {
          label: 'Level1 a',
          children: [
            {
              label: 'Level2 a',
              children: [
                {
                  label: 'Level3 a',
                },
              ],
            },
          ],
        },
        {
          label: 'Level1 b',
          children: [
            {
              label: 'Level2 b',
              children: [
                {
                  label: 'Level3 b',
                },
              ],
            },
          ],
        },
      ],
    }
  },
}
</script>

<style scoped>

</style>
