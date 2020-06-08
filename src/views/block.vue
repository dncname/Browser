<template>
  <div class="content">
    <div class="pc_content">
      <div class="headerBox">
        <div class="header_main">
          <div>
            <img src="../assets/imgs/1.png" alt="" />
            <p>The most professional DNC data service provider</p>
          </div>
          <div>
            <input
              type="text"
              placeholder="Transaction / account / contract / address / block height"
              readonly
            />
            <div>
              <img src="../assets/imgs/6.png" alt="" />
            </div>
          </div>
        </div>
      </div>
      <div class="Latest_block">
        <h2>Current block #{{ $route.params.id }}</h2>
        <!-- <div><p>状态: 不可逆</p></div> -->
        <div class="block_1">
          <p>Block time:{{ currentBlock.beijingTime }}</p>
          <p>
            Previous block:
            <span @click="jump($route.params.id - 1)"
              >#{{ this.$route.params.id - 1 }}</span
            >
          </p>
        </div>
        <div class="block_1">
          <p>Block node : {{ currentBlock.producer }}</p>
          <p>
            Next block:
            <span @click="jump(Number($route.params.id) + 1)"
              >#{{ Number(this.$route.params.id) + 1 }}</span
            >
          </p>
        </div>
        <p class="block_2">block Hash:{{ currentBlock.id }}</p>
      </div>
      <div class="block_data">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane :label="text" name="first">
            <div class="transactions">
              <div
                class="list"
                v-for="(item, index) in currentBlock.transactions"
                :key="index"
              >
                <div class="list_l">
                  <p>{{ item.trx.id }}</p>
                  <span>executed</span>
                </div>
                <div
                  class="list_r"
                  v-for="(items, i) in item.trx.transaction.actions"
                  :key="i"
                >
                  <div v-show="items.name == 'newaccount'">
                    <div class="transfer">
                      <p>{{ items.name }}</p>
                    </div>
                    <div class="name2">
                      <span>{{ items.authorization[0].actor }}</span>
                      <span>@{{ items.authorization[0].permission }}</span>
                    </div>
                    <div class="name4">
                      <span>{{ items.authorization[0].actor }}</span>
                      <span>created an account</span>
                      <span>{{ trx[item.trx.id] }}</span>
                    </div>
                  </div>
                  <div v-show="items.name == 'transfer'">
                    <div class="transfer">
                      <p>{{ items.name }}</p>
                    </div>
                    <div class="name1">
                      <span>{{ items.data.from }}</span>
                      <span>::{{ items.data.to }}</span>
                    </div>
                    <div class="name2">
                      <span>{{ items.data.from }}</span>
                      <span>@active</span>
                    </div>
                    <div class="name3">
                      <div class="name3_top">
                        <span>{{ items.data.from }}</span>
                        <span>→</span>
                        <span>{{ items.data.to }}</span>
                        <span>{{ items.data.quantity }}</span>
                        <span>dncio.token</span>
                      </div>
                      <div
                        class="name3_bottom"
                        v-show="items.name == 'transfer'"
                      >
                        <json-view :data="items.data" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="RAW data" name="second">
            <div class="rawData">
              <json-view :data="currentBlock" />
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="footer_box">
        <div class="footer">
          <img src="../assets/imgs/1.png" alt="" />
          <p>A project from NASA in 1983，in the 1960，</p>
          <p>ARPAnet appeared in the United States</p>
        </div>
      </div>
    </div>
    <div class="app_content">
      <div class="headerBox">
        <div class="header_main">
          <div>
            <img src="../assets/imgs/1.png" alt="" />
          </div>
          <div>
            <input
              type="text"
              placeholder="Transaction / account / contract / address / block height"
              readonly
            />
            <div>
              <img src="../assets/imgs/6.png" alt="" />
            </div>
          </div>
        </div>
      </div>
      <div class="Latest_block">
        <h2>Current block #{{ this.$route.params.id }}</h2>
        <!-- <div><p>状态: 不可逆</p></div> -->
        <div class="block_1">
          <p>Block time :{{ currentBlock.beijingTime }}</p>
          <p>Block node :{{ currentBlock.producer }}</p>
          <p class="p1">
            Previous block:
            <span @click="jump(this.$route.params.id - 1)"
              >#{{ this.$route.params.id - 1 }}</span
            >
          </p>
          <p class="p1">
            Next block:
            <span @click="jump(Number($route.params.id) + 1)"
              >#{{ Number(this.$route.params.id) + 1 }}</span
            >
          </p>
          <p>block Hash:{{ currentBlock.id }}</p>
        </div>
      </div>
      <div class="block_data">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane :label="text" name="first">
            <div class="transactions">
              <div
                class="list"
                v-for="(item, index) in currentBlock.transactions"
                :key="index"
              >
                <div class="list_l">
                  <p>{{ item.trx.id }}</p>
                  <span>executed</span>
                </div>
                <div
                  class="list_r"
                  v-for="(items, i) in item.trx.transaction.actions"
                  :key="i"
                >
                  <div v-show="items.name == 'newaccount'">
                    <div class="transfer">
                      <p>{{ items.name }}</p>
                    </div>
                    <div class="name2">
                      <span>{{ items.authorization[0].actor }}</span>
                      <span>@{{ items.authorization[0].permission }}</span>
                    </div>
                    <div class="name4">
                      <span>{{ items.authorization[0].actor }}</span>
                      <span>created an account </span>
                      <span>{{ trx[item.trx.id] }}</span>
                    </div>
                  </div>
                  <div v-show="items.name == 'transfer'">
                    <div class="transfer">
                      <p>{{ items.name }}</p>
                    </div>
                    <div class="name1">
                      <span>{{ items.data.from }}</span>
                      <span>::{{ items.data.to }}</span>
                    </div>
                    <div class="name2">
                      <span>{{ items.data.from }}</span>
                      <span>@active</span>
                    </div>
                    <div class="name3">
                      <div class="name3_top">
                        <span>{{ items.data.from }}</span>
                        <span>→</span>
                        <span>{{ items.data.to }}</span>
                      </div>
                      <div class="name3_c">
                        <span>{{ items.data.quantity }}</span>
                        <span>dncio.token</span>
                      </div>
                      <div
                        class="name3_bottom"
                        v-show="items.name == 'transfer'"
                      >
                        <json-view :data="items.data" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="RAW data" name="second">
            <div class="rawData">
              <json-view :data="currentBlock" />
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="footer_box">
        <div class="footer">
          <img src="../assets/imgs/1.png" alt="" />
          <p>A project from NASA in 1983，in the 1960，</p>
          <p>ARPAnet appeared in the United States</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import jsonView from 'vue-json-views'
import { get_block ,get_transaction } from "@/http/api.js";
export default {
  name: 'blocke',
  components: {
    jsonView
  },
  data () {
    return {
      text: "transaction(0)",
      tableData: [],
      SuperPoleData: [],
      activeName: 'first',
      currentBlock: {

      },
      trx: [],
      changeTrx: [],
      flag: false,
      count: 0,
    }
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event);
    },
    // 1035332    1034432  103533
    async   get_block (id) {
      this.$http
        .post(get_block, { block_num_or_id: id })
        .then(({ data }) => {
          let obj = Object.assign(data);
          obj = JSON.stringify(obj).replace(/EOS/g, "DNC").replace(/eos/g, "dnc");
          obj = JSON.parse(obj)
          let getDate = Number(new Date(data.timestamp)) + 28800000; //获取到的时间加8个小时 得到北京时间
          let currentTimeRub = new Date(getDate);
          let Y = currentTimeRub.getFullYear();
          let M = currentTimeRub.getMonth() + 1;
          let D = currentTimeRub.getDate();
          let h = Number(currentTimeRub.getHours()) < 10 ? "0" + currentTimeRub.getHours() : currentTimeRub.getHours();
          let m = Number(currentTimeRub.getMinutes()) < 10 ? "0" + currentTimeRub.getMinutes() : currentTimeRub.getMinutes();
          let s = Number(currentTimeRub.getSeconds()) < 10 ? "0" + currentTimeRub.getSeconds() : currentTimeRub.getSeconds();
          let beijingTime = Y + "-" + M + "-" + D + " " + h + ":" + m + ":" + s;
          obj.beijingTime = beijingTime;
          obj.getDate = getDate;
          this.count = 0;
          let a = [];
          obj.transactions.map((items) => {
            if (items.trx.transaction.actions[0].name == "newaccount") {
              this.get_transaction(items.trx.id).then((resolve) => { // resolve
                this.changeTrx = items.trx.id;

                a[items.trx.id] = resolve[0].account_ram_deltas[0].account;
              })
            }
            // items.trx.transaction.actions.map((item, index) => {
            // })
            this.count += items.trx.transaction.actions.length;
          })
          setTimeout(() => {
            this.trx = a;
          }, 800)
          this.text = "transaction(" + this.count + ")";
          this.currentBlock = Object.assign(obj, this.currentBlock, this.currentBlock.traces);
        });
    },
    async get_transaction (id) {
      return await new Promise(resolve => {
        this.$http
          .post(get_transaction, { id: id })
          .then(({ data }) => {
            resolve(data.traces);
          });
      });
    },
    jump (id) {
      this.$router.push({ path: "/block/" + id + ".html" })
    }
  },
  created () {
    this.get_block(this.$route.params.id);
  },
  mounted () {
  },
  watch: {
    '$route' () { //监听路由是否变化
      this.get_block(this.$route.params.id)
    }
  },
  filters: {

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
    width: 100%;
  }
  .content {
    background: #efefef;
    min-width: 1200px;
    .pc_content {
      width: 100%;
      .headerBox {
        width: 100%;
        height: 117px;
        background: rgba(34, 90, 194, 1);
        min-width: 1200px;
        .header_main {
          height: 117px;
          width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;

          > div:nth-child(1) {
            font-size: 14px;
            font-weight: 400;
            border-radius: 4px;
            color: #fff;
            text-decoration: unset;
            white-space: pre;
            display: flex;
            align-items: center;
            > p {
              margin-left: 10px;
            }
          }
          > div:nth-child(2) {
            padding-top: 15px;
            display: flex;
            input {
              border: none;
              padding-left: 17px;
              width: 414px;
              height: 45px;
              background: rgba(255, 255, 255, 1);
              box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
              opacity: 1;
              border-radius: 11px;
            }
            > div {
              margin-left: 15px;
              width: 65px;
              height: 45px;
              background: rgba(255, 255, 255, 1);
              border-radius: 11px;
              display: flex;
              align-items: center;
              justify-content: center;
            }
          }
        }
      }
      .footer_box {
        margin-top: 70px;
        height: 150px;
        width: 100%;
        background: url("../assets/imgs/7.png") no-repeat center;
        background-size: 100% 169px;
        > .footer {
          width: 1200px;
          height: 100%;
          margin: 0 auto;
          color: white;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          p {
            text-align: center;
            line-height: 30px;
            height: 30px;
          }
        }
      }
      .Latest_block {
        width: 1200px;
        padding: 23px;
        box-sizing: border-box;
        margin: 0 auto;
        background: white;
        margin-top: 50px;
        text-align: left;
        > h2 {
          margin-bottom: 28px;
          font-size: 14px;
        }
        .block_1 {
          display: flex;
          margin-bottom: 10px;
          font-size: 14px;
          color: #000;
          > p:nth-child(1) {
            width: 400px;
          }
          > p:nth-child(2) {
            > span {
              color: #1890ff;
              cursor: pointer;
            }
          }
        }
        .block_2 {
          font-size: 14px;
          color: #000;
        }
      }
      .block_data {
        width: 1200px;
        padding: 23px;
        box-sizing: border-box;
        margin: 0 auto;
        background: white;
        margin-top: 20px;
      }
      .transactions {
        background: #f8f8f8;
        min-height: 300px;
        > .list {
          display: flex;

          border-bottom: 10px solid white;
          > .list_l {
            background: hsla(0, 0%, 60%, 0.04);
            width: 120px;
            display: flex;
            justify-content: center;
            flex-direction: column;
            align-items: center;
            padding: 20px 10px;
            > p:nth-child(1) {
              text-align: center;
              color: #1890ff;
              display: block;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
              width: 120px;
            }
            > span:nth-child(2) {
              text-align: center;
              background-color: rgba(82, 196, 26, 0.8);
              display: inline-block;
              line-height: 20px;
              padding: 0 6px;
              font-size: 12px;
              text-align: center;
              white-space: nowrap;
              border-radius: 100px;
              color: #fff;
            }
          }
          .list_r {
            > div {
              padding: 20px 10px;
              display: flex;
              .transfer {
                display: flex;
                align-items: center;
                width: 200px;
                justify-content: center;
                > p {
                  display: inline-block;
                  border: 1px solid #40a9ff;
                  height: 28px;
                  line-height: 30px;
                  padding: 0 8px;
                  white-space: pre;
                  border-radius: 4px;
                  cursor: default;
                  font-family: Consolas, Menlo, Courier, monospace;
                  background-color: hsla(0, 0%, 100%, 0.8);
                }
              }
              .name1,
              .name2 {
                display: flex;
                align-items: center;
                justify-content: center;
                margin-right: 20px;
                > span:nth-child(1) {
                  color: #1890ff;
                  background-color: transparent;
                  text-decoration: none;
                  outline: none;
                  -webkit-transition: color 0.3s;
                  transition: color 0.3s;
                  -webkit-text-decoration-skip: objects;
                }
              }
              .name2 {
                // width: 300px;
              }
              .name3 {
                display: flex;
                flex-direction: column;
                .name3_top {
                  display: flex;
                  align-items: center;
                  > span {
                    margin-left: 12px;
                  }
                  > span:nth-child(1),
                  > span:nth-child(3) {
                    color: #1890ff;
                  }
                  > span:nth-child(4) {
                    color: black;
                    font-size: 20px;
                    font-weight: bold;
                  }
                  > span:nth-child(5) {
                    color: #909090;
                  }
                }
                .name3_bottom {
                  margin-top: 20px;
                }
              }
              .name4 {
                display: flex;
                align-items: center;
                > span {
                  margin-left: 12px;
                }
                > span:nth-child(1),
                > span:nth-child(3) {
                  color: #1890ff;
                }
              }
            }
          }
        }
      }
      .rawData {
        min-height: 600px;
      }
    }
  }
}
@media (max-width: 600px) {
  .pc_content {
    width: 100%;
    display: none;
  }
  .content {
    background: #efefef;
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 0;
    top: 0;
    right: 0;
  }
  .app_content {
    .headerBox {
      width: 100%;
      background: rgba(34, 90, 194, 1);
      .header_main {
        width: 100%;
        margin: 0 auto;
        padding: 19px 15px 10px 15px;
        box-sizing: border-box;
        > div:nth-child(1) {
          font-size: 14px;
          font-weight: 400;
          border-radius: 4px;
          color: #fff;
          text-decoration: unset;
          white-space: pre;
          display: flex;
          align-items: center;
          > p {
            margin-left: 10px;
          }
        }
        > div:nth-child(2) {
          padding-top: 15px;
          display: flex;
          input {
            border: none;
            padding-left: 17px;
            height: 45px;
            background: rgba(255, 255, 255, 1);
            box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
            opacity: 1;
            border-radius: 11px;
            width: 100%;
          }
          > div {
            margin-left: 15px;
            width: 65px;
            height: 45px;
            background: rgba(255, 255, 255, 1);
            border-radius: 11px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }
      }
    }
    .footer_box {
      height: 150px;
      width: 100%;
      background: url("../assets/imgs/7.png") no-repeat center;
      background-size: 100% 169px;
      > .footer {
        width: 100%;
        height: 100%;
        margin: 0 auto;
        color: white;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        p {
          text-align: center;
          line-height: 30px;
          height: 30px;
        }
      }
    }
    .Latest_block {
      width: 100%;
      padding: 23px;
      box-sizing: border-box;
      margin: 0 auto;
      background: white !important;
      margin-top: 30px;
      text-align: left;
      > h2 {
        margin-bottom: 28px;
        font-size: 14px;
      }
      .block_1 {
        margin-bottom: 10px;
        font-size: 14px;
        color: #000;
        > p {
          margin-top: 15px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        > .p1 {
          > span {
            color: #1890ff;
            cursor: pointer;
          }
        }
      }
    }
    .block_data {
      width: 100%;
      padding: 10px 23px 23px 23px;
      box-sizing: border-box;
      margin: 0 auto;
      background: white;
      margin-top: 20px;
    }
    .transactions {
      background: #f8f8f8;
      min-height: 300px;

      > .list {
        border-bottom: 10px solid white;
        > .list_l {
          background: hsla(0, 0%, 60%, 0.04);
          width: 100%;
          display: flex;
          justify-content: center;
          flex-direction: column;
          align-items: center;
          padding: 20px 10px;
          > p:nth-child(1) {
            text-align: center;
            color: #1890ff;
            display: block;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            width: 120px;
          }
          > span:nth-child(2) {
            text-align: center;
            background-color: rgba(82, 196, 26, 0.8);
            display: inline-block;
            line-height: 20px;
            padding: 0 6px;
            font-size: 12px;
            text-align: center;
            white-space: nowrap;
            border-radius: 100px;
            color: #fff;
            margin-top: 5px;
          }
        }
        .list_r {
          > div {
            padding: 20px 10px;
            .transfer {
              display: flex;
              align-items: center;
              > p {
                display: inline-block;
                border: 1px solid #40a9ff;
                height: 28px;
                line-height: 30px;
                padding: 0 8px;
                white-space: pre;
                border-radius: 4px;
                background-color: hsla(0, 0%, 100%, 0.8);
              }
            }
            .name1,
            .name2 {
              margin-right: 20px;
              margin-top: 10px;
              > span:nth-child(1) {
                color: #1890ff;
                background-color: transparent;
                text-decoration: none;
                outline: none;
                -webkit-transition: color 0.3s;
                transition: color 0.3s;
                -webkit-text-decoration-skip: objects;
              }
            }
            .name3 {
              display: flex;
              flex-direction: column;
              .name3_top {
                display: flex;
                align-items: center;
                margin-top: 10px;
                > span:nth-child(1),
                > span:nth-child(3) {
                  color: #1890ff;
                }
              }
              .name3_c {
                margin-top: 10px;
                > span:nth-child(1) {
                  color: black;
                  font-size: 20px;
                  font-weight: bold;
                }
                > span:nth-child(2) {
                  color: #909090;
                }
              }
              .name3_bottom {
                margin-top: 20px;
              }
            }
            .name4 {
              display: flex;
              align-items: center;
              margin-top: 10px;
              > span {
                margin-right: 12px;
              }
              > span:nth-child(1),
              > span:nth-child(3) {
                color: #1890ff;
              }
            }
          }
        }
      }
    }
    .rawData {
      min-height: 600px;
    }
  }
}
</style>
