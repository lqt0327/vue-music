<template>
  <transition>
    <div class="rank">
      <scroll class="topList">
        <ul>
          <li v-for="item of rankList" :key="item.id" class="item">
            <div class="icon">
              <img :src="item.coverImgUrl" width="100" height="100" alt />
            </div>
            <ul class="song-list">
              <li class="song" v-for="(song,index) of item.rank" :key="index">
                <span>{{index+1}}</span>
                <span>{{song.name}} - {{song.ar[0].name}}</span>
              </li>
            </ul>
          </li>
        </ul>
      </scroll>
    </div>
  </transition>
</template>

<script>
import { getRank } from "api/rank";
import Scroll from "base/scroll/scroll";

const RANK_NUMBER = [
  2884035,
  3778678,
  991319590,
  71384707,
  1978921795,
  2250011882,
  2617766278,
];
export default {
  name: "rank",
  data() {
    return {
      rankList: [],
    };
  },
  created() {
    this._getRank();
  },
  methods: {
    _getRank() {
      for (let i = 0; i < RANK_NUMBER.length; i++) {
        getRank(RANK_NUMBER[i]).then((res) => {
          let list = res.data.playlist;
          this.rankList.push(list);
          list.rank = res.data.playlist.tracks.slice(0, 3);
        });
      }
    },
  },
  components: {
    Scroll,
  },
};
</script>

<style scoped lang="stylus">
@import '~common/stylus/variable';
.v-enter-active,.v-leave-active
  transition all 0.1s
.v-enter,.v-leave-to
  transform translate3d(50%,0,0)
  opacity: 0
.rank {
  top: 88px;
  position: fixed;
  bottom: 0;
  width: 100%;

  .topList {
    height: 100%;
    padding-top: 5px;
    overflow: hidden;

    .item {
      display: flex;
      margin: 0 10px;
      padding: 3px 0;
      border-bottom: 1px solid #e4e4e4;

      .icon {
        height: 100%;
        width: 100%;
        flex: 0 0 100px;
      }

      .song-list {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 0 20px;
        height: 100px;
        color: $color-text;
        font-size: $font-size-small-x;

        .song {
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          width: 60vw;
          line-height: 30px;
        }
      }
    }
  }
}
</style>