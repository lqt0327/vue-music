<template>
  <scroll class="singer-list" :data="data" ref="singerList">
    <ul>
      <li v-for="list of data" class="list" ref="list">
        <h1 class="list-title">{{list.title}}</h1>
        <ul>
          <li v-for="item of list.lists" class="list-item" @click="selectItem(item)">
            <img :src="item.avatar" class="avatar" alt />
            <span class="name">{{item.name}}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div
      class="list-scroll"
      @touchstart="scrollTouchStart"
      @touchmove.stop.prevent="scrollTouchMove"
    >
      <ul>
        <li class="item" v-for="(item,index) of scrollList" :data-index="index">{{item}}</li>
      </ul>
    </div>
  </scroll>
</template>

<script>
import Scroll from "base/scroll/scroll";
import { getIndex } from "common/js/dom";

export default {
  name: "singer-list",
  props: {
    data: {
      type: Array,
      default: [],
    },
  },
  created(){
    this.touch = {}
  },
  computed: {
    scrollList() {
      return this.data.map((item) => {
        return item.title.substr(0, 1);
      });
    },
  },
  components: {
    Scroll,
  },
  methods: {
    scrollTouchStart(e) {
      let targetIndex = getIndex(e.target, "index");
      let firstPlace = e.touches[0]
      this.touch.one = firstPlace.pageY
      this.touch.targetIndex = targetIndex
      this.$refs.singerList.scrollToElement(this.$refs.list[targetIndex], 0);
    },
    scrollTouchMove(e) {
      let firstPlace = e.touches[0]
      this.touch.two = firstPlace.pageY
      let delta = (this.touch.two - this.touch.one) / 18 | 0
      let targetIndex = parseInt(this.touch.targetIndex) + delta
      // let targetIndex = this.touch.targetIndex + delta  // 错误写法
      this.$refs.singerList.scrollToElement(this.$refs.list[targetIndex], 0);
      console.log(targetIndex);
    },
  },
};
</script>

<style scoped lang="stylus">
@import '~common/stylus/variable';

.singer-list {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: $color-background;

  .list {
    .list-title {
      height: 25px;
      padding-left: 13px;
      margin-bottom: 9px;
      font-size: $font-size-small;
      color: white;
      line-height: 25px;
      background: rgba(0, 0, 0, 0.1);
    }

    .list-item {
      display: flex;
      align-items: center;
      margin: 0 5px;
      padding: 5px 0;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);

      &:last-child {
        border: none;
        margin-bottom: 10px;
      }

      .avatar {
        width: 50px;
        height: 50px;
        border-radius: 3px;
      }

      .name {
        font-size: $font-size-medium;
        margin-left: 20px;
        color: $color-text;
      }
    }
  }

  .list-scroll {
    position: absolute;
    z-index: 30;
    right: 3px;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    padding: 200px 0;
    border-radius: 3px;
    text-align: center;

    .item {
      padding: 5px;
      line-height: 1;
      color: $color-text-g;
      font-size: $font-size-small;
      font-weight: bold;

      &.currentIndex {
        color: $color-theme;
      }
    }
  }
}
</style>
