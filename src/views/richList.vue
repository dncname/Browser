<template>
  <div class="content">
    <div class="pc_richList">
      <div class="tokenDetails">
        <p class="details_h">Token details</p>
        <div class="details_c">
          <div>
            <p>Name</p>
            <p>DNC</p>
          </div>
          <div>
            <p>Accounts</p>
            <p>{{ richListData.total }}</p>
          </div>
          <div>
            <p>Circulation</p>
            <p>770,000,000</p>
          </div>
          <div>
            <p>Available quantity</p>
            <p>10,000,000</p>
          </div>
        </div>
      </div>
      <div class="header">
        <p>Rich List</p>
        <p>Number of accounts:{{ richListData.total }}</p>
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
          <div>{{ index + 1 + (pageno - 1) * 10 }}</div>
          <div>{{ item.a }}</div>
          <div>{{ item.v - 0 }}</div>
          <!-- <div>131313</div> -->
        </div>
        <div class="more">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="richListData.total - 0"
            :page-size="10"
            @current-change="current_change"
            @prev-click="prev_click"
            @next-click="next_click"
          >
          </el-pagination>
        </div>
      </div>
    </div>
    <div class="app_richList">
      <div class="tokenDetails">
        <p class="details_h"><span>Token details</span></p>
        <div class="details_c">
          <div>
            <p>Name</p>
            <p>DNC</p>
          </div>
          <div>
            <p>Accounts</p>
            <p>{{ richListData.total }}</p>
          </div>
        </div>
        <div class="details_c">
          <div>
            <p>Circulation</p>
            <p>770,000,000</p>
          </div>
          <div>
            <p>Circulate</p>
            <p>10,000,000</p>
          </div>
        </div>
      </div>
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
          v-for="(item, index) in richListData_app"
          :key="index"
        >
          <div>{{ index + 1 }}</div>
          <div>{{ item.a }}</div>
          <div>{{ item.v - 0 }}</div>
        </div>
        <div class="more">
          <p @click="_richList_app">more…</p>
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
      richListData: { total: 0 },
      pageno: 1,
      richListData_app: [],
      pageno_app: 1
    }
  },
  created () {
    this._richList();
    this._richList_app();
  },
  methods: {
    current_change (index) {
      this.pageno = index;
      this._richList();
    },
    prev_click (index) {
      this.pageno = index;
      this._richList();
    },
    next_click (index) {
      this.pageno = index;
      this._richList();
    },
    _richList () {
      this.$http
        .post(richList, {
          "scope": "eosio",
          "code": "eosio",
          "table": "accounts",
          "pageno": this.pageno,
          "pagesize": 10,
        })
        .then(({ data }) => {
          this.richListData = data;
        });
    },
    _richList_app () {
      this.$http
        .post(richList, {
          "scope": "eosio",
          "code": "eosio",
          "table": "accounts",
          "pageno": this.pageno_app,
          "pagesize": 10,
        })
        .then(({ data }) => {
          data.rows.map(item => {
            this.richListData_app.push(item)
          })
          this.pageno_app += 1
        });
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.content {
  width: 100%;
  background: #efefef;
  padding: 50px 0px;
}
@media (min-width: 600px) {
  .app_richList {
    display: none;
  }
  .pc_richList {
    width: 1200px;
    margin: 0px auto;
    background: rgba(255, 255, 255, 1);
    .tokenDetails {
      .details_h {
        margin: auto 20px;
        height: 90px;
        line-height: 90px;
        background: url("../assets/imgs/dnc_10.png") no-repeat;
        background-size: 29px 25px;
        background-position: center left;
        padding-left: 34px;
        font-size: 21px;
        font-weight: normal;
        color: rgba(28, 28, 28, 1);
      }
      .details_c {
        display: flex;
        justify-content: space-between;
        height: 123px;
        background: rgba(163, 212, 255, 0.26);
        padding: 0 20px 0 30px;
        > div {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;

          > p:nth-child(1) {
            font-size: 14px;
            font-family: PingFang TC;
            font-weight: bold;
            color: rgba(101, 101, 101, 1);
            margin-bottom: 23px;
          }
          > p:nth-child(2) {
            font-weight: bold;
            font-size: 21px;
            font-family: PingFang TC;
            font-weight: 500;
            line-height: 29px;
            color: rgba(34, 90, 194, 1);
          }
        }
      }
    }
    > .header {
      padding: 20px 20px 0px 20px;
      display: flex;
      height: 45px;
      line-height: 45px;
      justify-content: space-between;
      > p:nth-child(1) {
        background: url("../assets/imgs/dnc_8.png") no-repeat;
        background-size: 29px 25px;
        background-position: center left;
        padding-left: 34px;
        font-size: 21px;
        font-weight: normal;
        color: rgba(28, 28, 28, 1);
      }
      > p:nth-child(2) {
        background: url("../assets/imgs/dnc_9.png") no-repeat;
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
    background: rgba(255, 255, 255, 1);
    .tokenDetails {
      .details_h {
        margin: auto 20px;
      
        height: 70px;
        line-height: 70px;
        background: url("../assets/imgs/dnc_10.png") no-repeat;
        background-size: 29px 25px;
        background-position: center left;
        padding-left: 34px;
        font-size: 21px;
        font-weight: normal;
        color: rgba(28, 28, 28, 1);
      }
      .details_c {
        display: flex;
        justify-content: space-between;
        height: 123px;
        background: rgba(163, 212, 255, 0.26);
        padding: 0 20px 0 30px;
        > div {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;

          > p:nth-child(1) {
            font-size: 14px;
            font-family: PingFang TC;
            font-weight: bold;
            color: rgba(101, 101, 101, 1);
            margin-bottom: 23px;
          }
          > p:nth-child(2) {
            font-weight: bold;
            font-size: 21px;
            font-family: PingFang TC;
            font-weight: 500;
            line-height: 29px;
            color: rgba(34, 90, 194, 1);
          }
        }
      }
    }
    > .header {
      padding: 0 20px;
      display: flex;
      height: 49px;
      line-height: 45px;
      justify-content: space-between;
      border-top: 20px solid #efefef;
      // margin-top: 50px;
      > p:nth-child(1) {
        background: url("../assets/imgs/dnc_8.png") no-repeat;
        background-size: 23px 20px;
        background-position: center left;
        padding-left: 34px;
        font-size: 18px;
        font-weight: bold;
        color: rgba(28, 28, 28, 1);
      }
      > p:nth-child(2) {
        background: url("../assets/imgs/dnc_9.png") no-repeat;
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
        height: 45px;
        line-height: 45px;
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
        }
      }
      .more {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 80px;
      }
    }
  }
}
</style>
