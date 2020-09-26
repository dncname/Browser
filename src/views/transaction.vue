<template>
  <div class="content">
    <div class="pc_content">
      <div class="Latest_block">
        <p>
          <span>Trading Hash:</span>
          <span>{{ currentBlock.id }}</span>
        </p>
        <p>
          <span>Block time:</span>
          <span>{{ currentBlock.beijingTime }}</span>
        </p>
        <p class="status">
          <span>status:</span>
          <span>executed</span>
        </p>
        <p>
          <span>Current Block:</span>
          <span class="blue" @click="jump(currentBlock.block_num)"
            >#{{ currentBlock.block_num }}</span
          >
        </p>
        <p>
          <span>Block Hash:</span>
          <span>{{ currentBlock.traces[0].producer_block_id }}</span>
        </p>
      </div>
      <div class="block_data">
        <el-tabs v-model="activeName">
          <el-tab-pane :label="text" name="first">
            <div class="transactions">
              <div
                class="list"
                v-for="(items, index) in currentBlock.trx.trx.actions"
                :key="index"
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
                    <span>{{ trxAccount }}</span>
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
                    <div class="name3_bottom" v-show="items.name == 'transfer'">
                      <json-view :data="items.data" />
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
    </div>
    <div class="app_content">
      <div class="Latest_block">
        <p>
          <span>Trading Hash:</span>
          <span>{{ currentBlock.id }}</span>
        </p>
        <p>
          <span>Block time:</span>
          <span>{{ currentBlock.beijingTime }}</span>
        </p>
        <p class="status">
          <span>status:</span>
          <span>executed</span>
        </p>
        <p>
          <span>Current Block:</span>
          <span class="blue" @click="jump(currentBlock.block_num)"
            >#{{ currentBlock.block_num }}</span
          >
        </p>
        <p>
          <span>Block Hash:</span>
          <span>{{ currentBlock.traces[0].producer_block_id }}</span>
        </p>
      </div>
      <div class="block_data">
        <el-tabs v-model="activeName">
          <el-tab-pane :label="text" name="first">
            <div class="transactions">
              <div
                class="list"
                v-for="(items, index) in currentBlock.trx.trx.actions"
                :key="index"
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
                    <span>{{ trxAccount }}</span>
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
                  <div class="name1">
                    <span>{{ items.data.from }}</span>
                    <span>@active</span>
                  </div>
                  <div class="name3">
                    <div class="name3_top">
                      <p>
                        <span>{{ items.data.from }}</span>

                        <span>→{{ items.data.to }}</span>
                      </p>
                      <p>
                        <span>{{ items.data.quantity }}</span>
                        <span>dncio.token</span>
                      </p>
                    </div>
                    <div class="name3_bottom" v-show="items.name == 'transfer'">
                      <json-view :data="items.data" />
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
    </div>
  </div>
</template>

<script>
import { get_transaction, } from "@/http/api.js";
import jsonView from 'vue-json-views'
import { timeConversion } from "@/method/method.js"
export default {
  name: 'blocke',
  components: {
    jsonView,
  },
  data () {
    return {
      text: "Actions(0)",
      activeName: 'first',
      currentBlock: {
        trx: {
          trx: {
            actions: [{
              account: "",
              name: "",
              authorization: [{
                actor: "",
                "permission": ""
              }],
              data: {
                from: "",
                to: "",
                quantity: "",
                memo: ""
              },
              hex_data: "",
            }
            ]
          }
        },
        traces: [{ producer_block_id: "" }]
      },
      trx: [],
      changeTrx: [],
      flag: false,
      trxAccount: "",

    }
  },
  methods: {
    // tx/4272b847986816db475fae8159ed146151884f5273a4c101c06d382926de1d8c.html 创建账号
    get_transaction () {
      this.$http
        .post(get_transaction, { id: this.$route.params.id })
        .then(({ data }) => {
          let obj = data;
          obj = JSON.stringify(obj).replace(/EOS/g, "DNC").replace(/eos/g, "dnc");
          obj = JSON.parse(obj)
          obj.beijingTime = timeConversion(data.block_time);
          this.text = "Actions(" + obj.trx.trx.actions.length + ")"
          this.currentBlock = Object.assign({}, this.currentBlock, obj);
          if (this.currentBlock.traces[0].account_ram_deltas[0]) {
            this.trxAccount = this.currentBlock.traces[0].account_ram_deltas[0].account;
          }
        }).catch(() => {
          this.$message({
            showClose: true,
            message: 'No transaction information found',
            type: 'error'
          });
          setTimeout(() => {
            this.$router.go(-1);
          }, 1)
        });


    },
    jump (id) {
      this.$router.push({ path: "/block/" + id + ".html" })
    }
  },
  created () {
    this.get_transaction(this.$route.params.id);
  },
  mounted () {
  },
  watch: {
    '$route' () { //监听路由是否变化
      window.location.reload();
    },
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
      padding: 50px 0 70px 0;
      .Latest_block {
        width: 1200px;
        padding: 23px;
        box-sizing: border-box;
        margin: 0 auto;
        background: white;
        text-align: left;
        > p {
          display: flex;
          margin: 15px 0;
          > span {
            font-size: 14px;
            color: #909090;
          }
          > span:nth-child(1) {
            color: black;
            font-weight: bold;
            margin-right: 10px;
          }
        }
        > .status {
          align-items: center;
          > span:nth-child(2) {
            background-color: rgba(82, 196, 26, 0.8);
            display: inline-block;
            line-height: 20px;
            padding: 0 6px;
            font-size: 12px;
            text-align: center;
            white-space: nowrap;
            border-radius: 100px;
            color: #fff !important;
          }
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

          > div {
            padding: 20px 10px;
            display: flex;
            .transfer {
              display: flex;
              align-items: center;
              justify-content: center;
              margin-right: 30px;
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
    position: relative;
    left: 0;
    bottom: 0;
    top: 0;
    right: 0;
  }
  .app_content {
    .Latest_block {
      width: 100%;
      padding: 23px;
      box-sizing: border-box;
      margin: 0 auto;
      background: white !important;
      margin-top: 30px;
      text-align: left;

      > p {
        display: flex;
        flex-direction: column;
        margin: 15px 0;
        > span {
          font-size: 14px;
          color: #909090;
          display: block;
          overflow: hidden;
          word-break: break-all;
        }
        > span:nth-child(1) {
          display: inline-block;
          color: black;
          font-weight: bold;
          margin-right: 10px;
          height: 30px;
          line-height: 30px;
        }
      }
      .status {
        flex-direction: row;
        align-items: center;
        > span:nth-child(2) {
          background-color: rgba(82, 196, 26, 0.8);
          display: inline-block;
          line-height: 25px;
          height: 25px;
          padding: 0 6px;
          font-size: 12px;
          text-align: center;
          white-space: nowrap;
          border-radius: 100px;
          color: #fff !important;
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
        > div {
          padding: 20px 10px;
          .transfer {
            display: flex;
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
          .name1 {
            display: flex;
            margin-right: 20px;
            margin-top: 12px;
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
            display: flex;
            margin-right: 20px;
            margin-top: 12px;
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
            margin-top: 12px;
            .name3_top {
              > p:nth-child(1) {
                > span:nth-child(1) {
                  color: #1890ff;
                }
              }
              > p:nth-child(2) {
                margin-top: 12px;
                > span:nth-child(1) {
                  color: black;
                  font-size: 20px;
                  font-weight: bold;
                }
                > span:nth-child(2) {
                  color: #909090;
                }
              }
            }
            .name3_bottom {
              margin-top: 20px;
            }
          }
          .name4 {
            display: flex;
            align-items: center;
            margin-top: 20px;
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
    .rawData {
      min-height: 100px;
    }
  }
}
.blue {
  color: #1890ff !important;
  cursor: pointer;
}
</style>
