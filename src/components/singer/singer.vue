<template>
  <div class="singer">
    <singer-list :data="singerList"></singer-list>
  </div>
</template>

<script>
import { getSingerList } from "api/singer";
import Singer from "common/js/singer";
import { ERR_OK } from "common/js/config";
import SingerList from 'base/singer-list/singer-list';

const HOT_NAME = "热门";
const HOT_NAME_LENGTH = 10;

const pinyin = require('pinyin')
export default {
  name: "singer",
  data() {
    return {
      singerList: [],
    };
  },
  created() {
    this._getSingerList();
  },
  methods: {
    _getSingerList() {
      getSingerList().then((res) => {
        if (res.status === ERR_OK) {
            let list = res.data.artists
            list.map(item=>{
                // console.log(item.name[0])
                let py = pinyin(item.name[0],{
                    style:pinyin.STYLE_FIRST_LETTER
                })
                // console.log(py);
                item.Findex = py[0][0].toUpperCase()
            })
          this.singerList = this._singerListSettings(list);
        //   console.log(this.singerList);
        }
      });
    },
    _singerListSettings(list) {
      let page = {
        hot: {
          title: HOT_NAME,
          lists: [],
        },
      };
      list.forEach((item, index) => {
        if (index < HOT_NAME_LENGTH) {
          page.hot.lists.push(
            new Singer({
              id: item.id,
              name: item.name,
              avatar: item.img1v1Url,
            })
          );
        }
        const key = item.Findex;
        if (!page[key]) {
          page[key] = {
            title: key,
            lists: [],
          };
        }
        page[key].lists.push(
          new Singer({
            id: item.id,
            name: item.name,
            avatar: item.img1v1Url,
          })
        );
      });
      console.log(page, "+++++++++");
      let hot = [];
      let nohot = [];
      for (let k in page) {
        let value = page[k];
        if (value.title.match(/[a-zA-Z]/)) {
          nohot.push(value);
        } else if (value.title === HOT_NAME) {
          hot.push(value);
        }
      }
      nohot.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0);
      });
      return hot.concat(nohot);
    },
  },
  components:{
    SingerList
  }
};
</script>

<style scoped lang="stylus">
  .v-enter-active, .v-leave-active
    transition all 0.1s

  .v-enter, .v-leave-to
    transform translate3d(50%, 0, 0)
    opacity 0

  .singer
    position fixed
    top 88px
    bottom 0
    width 100%
</style>