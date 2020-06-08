<template>
  <div>Recipe</div>
</template>

<script>
import api from '../../../services/api.service';
export default {
  name: 'recipe',
  created: async function() {
    const resp = await api.get('/api/recipe');
    console.log(resp);
  }
}
</script>

<style lang="scss" scoped>

</style>