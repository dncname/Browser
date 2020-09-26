<template>
  <div>
    <div class="headerBox">
      <div class="header_main">
        <router-link to="/" tag="div">
          <img src="../assets/imgs/1.png" alt="" />
          <p>The most professional DNC data service provider</p>
        </router-link>
        <div>
          <input
            type="text"
            placeholder="transaction"
            @keyup.enter="get_transaction"
            v-model="hashId"
          />
          <div @click="get_transaction">
            <img src="../assets/imgs/6.png" alt="" />
          </div>
        </div>
      </div>
    </div>
    <div class="app_headerBox">
      <div class="header_main">
        <router-link to="/" tag="div">
          <img src="../assets/imgs/1.png" alt="" />
        </router-link>
        <div>
          <input type="text" placeholder="transaction"  v-model="hashId" />
           <div @click="get_transaction">
            <img src="../assets/imgs/6.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'publicHeader',
  props: {
    msg: String
  },
  components: {
  },
  data () {
    return {
      hashId: ""
    }
  },
  methods: {

    get_transaction () {
      if (!this.hashId) {
        this.$message({
          showClose: true,
          message: 'Please enter valid transaction information',
          type: 'error'
        });
        return;
      }
      this.$router.push("/tx/" + this.hashId + ".html")
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@media (min-width: 600px) {
  .app_headerBox {
    display: none;
  }
  .headerBox {
    display: block;
    width: 100%;
    height: 117px;
    background: rgba(34, 90, 194, 1);
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
        cursor: pointer;
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
          cursor: pointer;
        }
      }
    }
  }
}
@media (max-width: 600px) {
  .headerBox {
    display: none;
  }
  .app_headerBox {
    display: block;
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
}
</style>
