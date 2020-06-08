<template>
  <div id="overview">
    <div class="section">
      <div class="box">
        <div class="title">Overview</div>
      </div>
    </div>
    <div class="section">
      <div class="box">
        <div class="title">Components</div>
        <div class="tile">
          <!-- <div class="tile is-parent">
            <article class="tile is-child notification is-primary" v-on:click="onTileClick('create-coffee')">
              <p class="title">Create Recipe</p>
            </article>
          </div> -->
          <div class="tile is-parent">
            <article class="tile is-child notification is-primary" v-on:click="onTileClick('recipe')">
              <p class="title">Recipe</p>
            </article>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Overview',
  methods: {
    onTileClick(id) {
      switch(id) {
        case 'recipe':
          console.log('here');
          this.$router.push("/dashboard/recipe");
          break;
        default:
          this.$router.push("/");
          break;
      }
    }
  }
}
</script>

<style lang="scss">
.tile:hover {
  cursor: pointer;
}
.section {
  & + & {
    padding-top: 0rem;
  }
}
</style>