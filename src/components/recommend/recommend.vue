<template>
  <div class="recommend">
    <scroll class="recommend-content">
      <div>
        <div class="slider-wrapper">
          <slider></slider>
        </div>
        <div class="recommend-list">
          <div class="list-title">推荐歌单</div>
          <ul>
            <li class="item" v-for="item of recommendList" :key="item.id">
              <div class="icon">
                <img :src="item.picUrl" alt />
              </div>
              <p class="count">
                <i class="iconfont icon-search">{{Math.floor(item.playCount / 10000)}}万</i>
              </p>
              <div class="text">
                <p class="name">{{item.name}}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
import Slider from "base/slider/slider";
import { getRecommendList, getRecommendMusic } from "api/recommend";
import { ERR_OK } from "../../common/js/config";
import Scroll from "base/scroll/scroll";
export default {
  name: "recommend",
  data() {
    return {
      recommendList: [],
      recommendMusic:[]
    };
  },
  components: {
    Slider,
    Scroll
  },
  created() {
    this._getRecommendList();
    this._getRecommendMusic();
  },
  methods: {
    _getRecommendList() {
      getRecommendList().then(res => {
        if (res.status === ERR_OK) {
          this.recommendList = res.data.result;
        }
      });
    },
    _getRecommendMusic() {
      getRecommendMusic().then(res=>{
        if(res.status === ERR_OK) {
          this.recommendMusic = res.data.result
          console.log(this.recommendMusic)
        }
      })
    }
  }
};
</script>

<style scoped lang="stylus">
@import '~common/stylus/variable';

.recommend {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;
  z-index: 100;

  .recommend-content {
    width: 100%;
    height: 100%;
    overflow: hidden;

    .slider-wrapper {
      width: 100%;
      margin: 0 auto;
      border-radius: 5px;
      overflow: hidden;
      background-color: $co$color-background;
    }

    .recommend-list {
      position: relative;
      box-sizing: border-box;
      width: 100%;
      text-align: center;

      .list-title {
        height: 65px;
        line-height: 65px;
        padding-left: 1.5%;
        text-align: left;
        font-size: $font-size-medium;
        font-weight: bold;
        color: $color-text;
      }

      .item {
        display: inline-block;
        position: relative;
        box-sizing: border-box;
        width: 33%;
        padding: 0 1%;

        .icon {
          position: relative;
          display: inline-block;
          width: 100%;
          margin-bottom: 5px;

          img {
            width: 100%;
            height: 100%;
            border-radius: 3px;
          }
        }

        .count {
          position: absolute;
          top: 5px;
          right: 8px;
          font-size: $font-size-small;
          color: $color-text-l;
        }

        .text {
          height: 40px;
          text-align: left;
          margin-bottom: 10px;
          font-size: $font-size-small;
          float: left;
          overflow: hidden;
          line-height: 16px;
        }
      }
    }
  }
}
</style>