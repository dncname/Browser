<template>
  <div class="content">
    <div class="pc_content">
      <div class="Latest_block">
        <div class="Latest_header">
          <div>Latest block</div>
          <div></div>
        </div>
        <div class="table_1">
          <div class="table_header">
            <div>Ledger</div>
            <div>UTC/GMT+08:00</div>
            <div>Time</div>
            <div>Hash</div>
          </div>
          <div
            class="table_main"
            v-for="(item, index) in tableData"
            :key="index"
          >
            <div @click="jump(item.block_num)">
              <span>{{ item.block_num }}</span>
            </div>
            <div>{{ item.beijingTime }}</div>
            <div>{{ item.beijingTime | agoTimeFormat }}</div>
            <div @click="jump(item.block_num)">
              <span>{{ item.id }}</span>
            </div>
          </div>
        </div>
      </div>
      <RichList></RichList>
      <div class="Super_pole">
        <div class="Super_pole_header">
          <div>Super pole</div>
          <div></div>
        </div>
        <div class="table_2">
          <div class="table_header">
            <!-- 排名 -->
            <div>Rank</div>
            <!-- 名称 -->
            <div>Name</div>
            <!-- 投票账户数	已生产区块数	待申领奖励 (EOS) -->
            <div>Number of voting accounts</div>
            <div>Rewards to be claimed (DNC)</div>
          </div>
          <div
            class="table_main"
            v-for="(item, index) in SuperPoleData"
            :key="index"
          >
            <!-- 排名 -->
            <div>
              <span>{{ index + 1 }}</span>
            </div>
            <!-- 名称 -->
            <div>{{ item.name }}</div>
            <!-- 投票账户数	已生产区块数	待申领奖励 (EOS) -->
            <div>{{ item.total_staked }}</div>
            <div>{{ item.rewards_pool | replaceDNC }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="app_content">
      <!-- <pubHeader></pubHeader> -->
      <div class="Latest_block">
        <div class="Latest_header">
          <div>Latest block</div>
          <div></div>
        </div>
        <div class="table_1">
          <div class="table_header">
            <div>Ledger</div>
            <div>UTC/GMT</div>
            <!-- <div>Time</div> -->
            <div>Hash</div>
          </div>
          <div
            class="table_main"
            v-for="(item, index) in tableData"
            :key="index"
          >
            <div @click="jump(item.block_num)">
              <span>{{ item.block_num }}</span>
            </div>
            <div>{{ item.appBeiJingTime }}</div>
            <!-- <div>{{ item.beijingTime | appAgoTimeFormat }}</div> -->
            <div @click="jump(item.block_num)">
              <span>{{ item.id }}</span>
            </div>
          </div>
        </div>
      </div>
       <RichList></RichList>
      <div class="Super_pole">
        <div class="Super_pole_header">
          <div>Super pole</div>
          <div></div>
        </div>
        <div class="table_2">
          <div class="table_header">
            <!-- 排名 -->
            <div>Rank</div>
            <!-- 名称 -->
            <div>Name</div>
            <!-- 投票账户数	已生产区块数	待申领奖励 (EOS) -->
            <div>Votes</div>
            <div>Rewards(DNC)</div>
          </div>
          <div
            class="table_main"
            v-for="(item, index) in SuperPoleData"
            :key="index"
          >
            <!-- 排名 -->
            <div>
              <span>{{ index + 1 }}</span>
            </div>
            <!-- 名称 -->
            <div>{{ item.name }}</div>
            <!-- 投票账户数	已生产区块数	待申领奖励 (EOS) -->
            <div>{{ item.total_staked }}</div>
            <div>{{ item.rewards_pool | replaceDNC }}</div>
          </div>
        </div>
      </div>
      <!-- <pubFooter></pubFooter> -->
    </div>
  </div>
</template>

<script>
import { get_info, get_block, get_table_rows } from "@/http/api.js";
import RichList from "./index/richList.vue"
export default {
  name: 'index',
  components: {
    RichList,
  },
  data () {
    return {
      tableData: [],
      SuperPoleData: [],

    }
  },
  methods: {
    get_info () {
      this.$http
        .post(get_info)
        .then(({ data }) => {
          if (data) {
            let obj = data;
            let num;
            if (this.tableData.length == 0) {
              for (var i = 0; i < 10; i++) {
                this.get_block(Number(obj.last_irreversible_block_num - i));
              }
            } else {
              num = this.tableData[0].block_num;
            }
            if ((obj.last_irreversible_block_num) - num > 10) {
              for (var x = 0; x < 10; x++) {
                this.get_block(Number(obj.last_irreversible_block_num - x));
              }
            } else {
              for (var j = 0; j < (obj.last_irreversible_block_num) - num; j++) {
                this.get_block(Number(obj.last_irreversible_block_num - j))
              }
            }
          }
        });
    },

    async get_block (id) {
      await this.$http
        .post(get_block, { block_num_or_id: id })
        .then(({ data }) => {
          let obj = Object.assign(data);
          let timeData = data.timestamp;
          timeData = timeData.replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '').replace(/(-)/g, '/').substring(0, timeData.length - 4);
          let getDate = Number(new Date(timeData)) + 28800000; //获取到的时间加8个小时 得到北京时间
          let currentTimeRub = new Date(getDate);
          let Y = currentTimeRub.getFullYear();
          let M = currentTimeRub.getMonth() + 1;
          let D = currentTimeRub.getDate();
          let h = Number(currentTimeRub.getHours()) < 10 ? "0" + currentTimeRub.getHours() : currentTimeRub.getHours();
          let m = Number(currentTimeRub.getMinutes()) < 10 ? "0" + currentTimeRub.getMinutes() : currentTimeRub.getMinutes();
          let s = Number(currentTimeRub.getSeconds()) < 10 ? "0" + currentTimeRub.getSeconds() : currentTimeRub.getSeconds();
          let beijingTime = Y + "-" + M + "-" + D + " " + h + ":" + m + ":" + s;
          let appBeiJingTime = h + ":" + m + ":" + s;
          obj.beijingTime = beijingTime;
          obj.appBeiJingTime = appBeiJingTime;
          obj.getDate = getDate;
          while (this.tableData.length >= 10) {
            this.tableData.pop();
          }
          this.tableData.push(obj);
          // 对象排序
          this.tableData.sort(function (a, b) {
            return b.block_num - a.block_num;
          })
        });
    },
    get_table_rows () {
      this.$http
        .post(get_table_rows, {
          "scope": "eosio",
          "code": "eosio",
          "table": "schedules",
          "json": true,
          "limit": 1000
        }
        )
        .then(({ data }) => {
          console.log(data)
        });
    },

    get_bps_table () {
      this.$http
        .post(get_table_rows, {
          "scope": "eosio",
          "code": "eosio",
          "table": "bps",
          "json": true,
          "limit": 1000
        }
        )
        .then(({ data }) => {
          this.SuperPoleData = data.rows;
          // 对象排序
          this.SuperPoleData.sort(function (a, b) {
            return b.total_staked - a.total_staked;
          })
        });
    },
    jump (id) {
      this.$router.push({ path: "/block/" + id + ".html" })
    }
  },
  created () {
    this.get_info();
    setInterval(() => {
      setTimeout(() => {
        this.get_info();
      }, 0)
    }, 3000)
    this.get_table_rows();
    this.get_bps_table();
  },
  filters: {
    agoTimeFormat: function (value) {
      let currentTimeRub = Number(new Date(value));
      let nowTime = Number(new Date());
      let agoTime = parseInt((nowTime - currentTimeRub) / 1000);
      if (agoTime < 60) {
        return agoTime + " seconds ago";
      } else if (agoTime >= 60 && agoTime <= 3600) {
        return parseInt(agoTime / 60) + " minutes ago";
      } else if (agoTime >= 3600) {
        return parseInt(agoTime / 3600) + " hours ago"
      }
    },

    replaceDNC (value) {
      return value.replace("EOS", "DNC")
    }
  }
}
</script>
<style lang="scss" scoped>
@media (min-width: 600px) {
  ::placeholder {
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: rgba(176, 178, 180, 1);
    opacity: 1;
  }
  .app_content {
    display: none;
  }
  .content {
    background: #efefef;
    min-width: 1200px;
  }

  .pc_content {
    width: 100%;
    padding: 50px 0;
    .Latest_block,
    .Super_pole {
      width: 1200px;
      margin: 0 auto;
      border: 1px solid rgba(0, 0, 0, 0.125);
      padding: 0 15px;
      box-sizing: border-box;
      background: #fff;
      .Latest_header,
      .Super_pole_header {
        height: 50px;
        line-height: 50px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.125);
        > div:nth-child(1) {
          text-align: left;
          font-weight: bold;
          font-size: 20px;
        }
      }
      .Latest_header > div:nth-child(1) {
        background: url("../assets/imgs/2.png") no-repeat;
        background-size: 23px 26px;
        background-position: center left;
        padding-left: 32px;
      }
      .Super_pole_header > div:nth-child(1) {
        background: url("../assets/imgs/4.png") no-repeat;
        background-size: 17px 17px;
        background-position: center left;
        padding-left: 32px;
      }
    }
    .table_1 {
      .table_header {
        display: flex;
        border-bottom: 1px solid #ebeef5;
        > div {
          color: #909399;
          text-align: left;
          font-size: 14px;
          font-weight: bold;
          height: 60px;
          line-height: 60px;
        }
        > div:nth-child(1) {
          flex: 1;
        }
        > div:nth-child(2) {
          flex: 1;
        }
        > div:nth-child(3) {
          flex: 1;
        }
        > div:nth-child(4) {
          flex: 3;
        }
      }
      .table_main:hover {
        background: #f4f4f4;
      }
      .table_main {
        display: flex;
        border-bottom: 1px solid #ebeef5;
        > div {
          color: #909399;
          text-align: left;
          font-size: 14px;
          height: 60px;
          line-height: 60px;
          > span {
            color: #106ba3;
          }
          > span:hover {
            color: #007bff;
          }
        }
        > div:nth-child(1) {
          flex: 1;
          cursor: pointer;
        }
        > div:nth-child(2) {
          flex: 1;
        }
        > div:nth-child(3) {
          flex: 1;
        }
        > div:nth-child(4) {
          flex: 3;
          cursor: pointer;
        }
      }
    }
    .table_2 {
      .table_header {
        display: flex;
        border-bottom: 1px solid #ebeef5;
        > div {
          color: #909399;
          text-align: left;
          font-size: 14px;
          font-weight: bold;
          height: 60px;
          line-height: 60px;
        }
        > div:nth-child(1),
        > div:nth-child(2) {
          flex: 1;
        }
        > div:nth-child(3),
        > div:nth-child(4) {
          flex: 1;
          text-align: center;
        }
      }
      .table_main:hover {
        background: #f4f4f4;
      }
      .table_main {
        display: flex;
        border-bottom: 1px solid #ebeef5;
        > div {
          color: #909399;
          text-align: left;
          font-size: 14px;
          height: 60px;
          line-height: 60px;
          > span {
            color: #106ba3;
          }
          > span:hover {
            color: #007bff;
          }
        }
        > div:nth-child(1) {
          flex: 1;
          > span {
            display: inline-block;
            background: rgba(68, 197, 142, 0.1);
            color: #44c58e;
            height: 25px;
            width: 35px;
            text-align: center;
            line-height: 25px;
            border-radius: 7px;
          }
        }
        > div:nth-child(2) {
          flex: 1;
        }
        > div:nth-child(3),
        > div:nth-child(4) {
          flex: 1;
          text-align: center;
        }
      }
    }
  }
}
@media (max-width: 600px) {
  .pc_content {
    display: none;
  }
  .app_content {
    width: 100%;
    position: relative;
    left: 0;
    bottom: 0;
    top: 0;
    right: 0;

    .Latest_block,
    .Super_pole {
      width: 100%;
      margin: 0 auto;
      margin-top: 50px;
      border: 1px solid rgba(0, 0, 0, 0.125);
      padding: 0 15px;
      box-sizing: border-box;
      background: #fff;
      .Latest_header,
      .Super_pole_header {
        height: 50px;
        line-height: 50px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.125);
        > div:nth-child(1) {
          text-align: left;
          font-weight: bold;
          font-size: 20px;
        }
      }
      .Latest_header > div:nth-child(1) {
        background: url("../assets/imgs/2.png") no-repeat;
        background-size: 23px 26px;
        background-position: center left;
        padding-left: 32px;
      }
      .Super_pole_header > div:nth-child(1) {
        background: url("../assets/imgs/4.png") no-repeat;
        background-size: 17px 17px;
        background-position: center left;
        padding-left: 32px;
      }
    }
    .table_1 {
      > .table_header {
        display: flex;
        border-bottom: 1px solid #ebeef5;
        > div {
          color: #909399;
          text-align: left;
          font-size: 14px;
          font-weight: bold;
          height: 60px;
          line-height: 60px;
        }
        > div:nth-child(1) {
          flex: 1;
        }
        > div:nth-child(2) {
          flex: 1;
        }
        > div:nth-child(3) {
          flex: 3;
          text-align: center;
        }
        > div:nth-child(4) {
          flex: 1;
        }
      }
      > .table_main:hover {
        background: #f4f4f4;
      }
      > .table_main {
        display: flex;
        border-bottom: 1px solid #ebeef5;
        > div {
          color: #909399;
          text-align: left;
          font-size: 14px;
          height: 60px;
          line-height: 60px;
          > span {
            color: #106ba3;
          }
          > span:hover {
            color: #007bff;
          }
        }
        > div:nth-child(1) {
          flex: 1;
          cursor: pointer;
        }
        > div:nth-child(2) {
          flex: 1;
          overflow: hidden;
        }
        > div:nth-child(3) {
          flex: 3;
          overflow: hidden;
        }
        > div:nth-child(4) {
          flex: 1;
          cursor: pointer;
        }
      }
    }
    .table_2 {
      > .table_header {
        display: flex;
        border-bottom: 1px solid #ebeef5;
        > div {
          color: #909399;
          text-align: left;
          font-size: 14px;
          font-weight: bold;
          height: 60px;
          line-height: 60px;
        }
        > div:nth-child(1),
        > div:nth-child(3) {
          flex: 2;
        }
        > div:nth-child(2) {
          flex: 3;
        }
        > div:nth-child(4) {
          text-align: center;
          flex: 5;
        }
      }
      > .table_main:hover {
        background: #f4f4f4;
      }
      > .table_main {
        display: flex;
        border-bottom: 1px solid #ebeef5;
        justify-content: space-between;

        > div {
          color: #909399;
          text-align: left;
          font-size: 14px;
          height: 60px;
          line-height: 60px;
          > span {
            color: #106ba3;
          }
          > span:hover {
            color: #007bff;
          }
        }

        > div:nth-child(1) {
          flex: 2;
          > span {
            display: inline-block;
            background: rgba(68, 197, 142, 0.1);
            color: #44c58e;
            height: 25px;
            width: 35px;
            text-align: center;
            line-height: 25px;
            border-radius: 7px;
          }
        }
        > div:nth-child(2) {
          flex: 3;
        }
        > div:nth-child(3) {
          flex: 2;
        }
        > div:nth-child(4) {
          flex: 5;
          text-align: center;
        }
      }
    }
  }
}
</style>