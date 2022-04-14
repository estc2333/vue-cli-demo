<template>
  <div>agent
  </div>
</template>

<script>
export default {
  name: "agent",
  components: {
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
