<template>
  <div id="app">
    <music-header />
    <tab></tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import MusicHeader from 'components/music-header/music-header'
import Tab from 'components/tab/tab'
export default {
  name: 'App',
  components: {
    MusicHeader,
    Tab
  }
}
</script>

<style>

</style>
