<template>
  <div class="content">
    <div class="pc_richList">
      <div class="header">
        <p>Rich List</p>
        <p>Accounts:{{ richListData.total }}</p>
      </div>
      <div class="table">
        <div class="table_header">
          <div>Rank</div>
          <div>Account</div>
          <div>Total assets</div>
          <!-- <div>占比</div> -->
        </div>
        <div
          class="table_main"
          v-for="(item, index) in richListData.rows"
          :key="index"
        >
          <div>{{ index + 1 }}</div>
          <div>{{ item.a }}</div>
          <div>{{ item.v - 0 }} DNC</div>
          <!-- <div>131313</div> -->
        </div>
        <div class="more">
          <router-link to="richList" tag="p">more…</router-link>
        </div>
      </div>
    </div>
    <div class="app_richList">
      <div class="header">
        <p>Rich List</p>
        <p>Accounts:{{ richListData.total }}</p>
      </div>
      <div class="table">
        <div class="table_header">
          <div>Rank</div>
          <div>Account</div>
          <div>Total assets</div>
        </div>
        <div
          class="table_main"
          v-for="(item, index) in richListData.rows"
          :key="index"
        >
          <div>{{ index + 1 }}</div>
          <div>{{ item.a }}</div>
          <div>{{ item.v - 0 }} DNC</div>
        </div>
        <div class="more">
          <router-link to="richList" tag="p">more…</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { richList } from "@/http/api.js";
export default {
  name: 'richList',

  props: {
    msg: String
  },
  components: {
  },
  data () {
    return {
      richListData: { total: 0 }
    }
  },
  created () {
    this._richList();
  },
  methods: {

    _richList () {
      this.$http
        .post(richList, {
          "scope": "eosio",
          "code": "eosio",
          "table": "accounts",
          "pageno": 1,
          "pagesize": 10,
        })
        .then(({ data }) => {
          this.richListData = data;
        });
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.content {
  // background: #efefef;
  width: 100%;
}
@media (min-width: 600px) {
  .app_richList {
    display: none;
  }
  .pc_richList {
    width: 1200px;
    margin: 50px auto;
    background: rgba(255, 255, 255, 1);
    > .header {
      padding: 20px;
      display: flex;
      height: 45px;
      line-height: 45px;
      justify-content: space-between;
      > p:nth-child(1) {
        background: url("../../assets/imgs/dnc_8.png") no-repeat;
        background-size: 29px 25px;
        background-position: center left;
        padding-left: 34px;
        font-size: 21px;
        font-weight: normal;
        color: rgba(28, 28, 28, 1);
      }
      > p:nth-child(2) {
        background: url("../../assets/imgs/dnc_9.png") no-repeat;
        background-size: 53px 45px;
        background-position: center left;
        padding-left: 64px;
        font-size: 26px;
        font-weight: normal;
        color: rgba(28, 28, 28, 1);
      }
    }
    > .table {
      width: 100%;

      > .table_header {
        height: 75px;
        line-height: 75px;
        padding: 0 20px;
        display: flex;
        font-size: 14px;
        font-weight: bold;
        color: rgba(101, 101, 101, 1);
        > div {
          flex: 1;
        }
        > div:nth-child(1),
        div:nth-child(2),
        div:nth-child(3) {
          flex: 2;
        }
      }
      .table_main {
        border-top: 1px solid rgba(197, 197, 197, 1);
      }
      .table_main:hover {
        background: #f4f4f4;
      }
      > .table_main {
        margin: auto 20px;
        display: flex;
        border-bottom: 1px solid rgba(197, 197, 197, 1);
        > div {
          flex: 1;
          font-size: 14px;
          font-weight: 400;
          color: rgba(101, 101, 101, 1);
          height: 70px;
          line-height: 70px;
        }
        > div:nth-child(2) {
          color: #225ac2;
        }
        > div:nth-child(1),
        div:nth-child(2),
        div:nth-child(3) {
          flex: 2;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      .more {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 80px;
        > p {
          border-radius: 11px;
          font-size: 21px;
          font-family: PingFang TC;
          font-weight: bold;
          color: rgba(28, 28, 28, 1);
          cursor: pointer;
        }
      }
    }
  }
}
@media (max-width: 600px) {
  .pc_richList {
    display: none;
  }
  .app_richList {
    width: 100%;
    margin: 50px auto;
    background: rgba(255, 255, 255, 1);
    > .header {
      padding: 0 20px;
      display: flex;
      height: 45px;
      line-height: 45px;
      justify-content: space-between;
      > p:nth-child(1) {
        background: url("../../assets/imgs/dnc_8.png") no-repeat;
        background-size: 23px 20px;
        background-position: center left;
        padding-left: 34px;
        font-size: 18px;
        font-weight: bold;
        color: rgba(28, 28, 28, 1);
      }
      > p:nth-child(2) {
        background: url("../../assets/imgs/dnc_9.png") no-repeat;
        background-size: 23px 20px;
        background-position: center left;
        padding-left: 35px;
        font-size: 16px;
        font-weight: bold;
        color: rgba(28, 28, 28, 1);
      }
    }
    > .table {
      width: 100%;

      > .table_header {
        height: 75px;
        line-height: 75px;
        padding: 0 20px;
        display: flex;
        font-size: 14px;
        font-weight: bold;
        color: rgba(101, 101, 101, 1);
        > div {
          flex: 1;
        }
        > div:nth-child(1),
        div:nth-child(2),
        div:nth-child(3) {
          flex: 2;
        }
      }
      .table_main {
        border-top: 1px solid rgba(197, 197, 197, 1);
      }
      .table_main:hover {
        background: #f4f4f4;
      }
      > .table_main {
        margin: auto 20px;
        display: flex;
        border-bottom: 1px solid rgba(197, 197, 197, 1);
        > div {
          flex: 1;
          font-size: 14px;
          font-weight: 400;
          color: rgba(101, 101, 101, 1);
          height: 70px;
          line-height: 70px;
        }
        > div:nth-child(2) {
          color: #225ac2;
        }
        > div:nth-child(1),
        div:nth-child(2),
        div:nth-child(3) {
          flex: 2;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      .more {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 80px;
        > p {
          border-radius: 5px;
          font-size: 16px;
          font-family: PingFang TC;
          font-weight: bold;
          color: white;
          background: #225ac2;
          padding: 10px 15px;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
