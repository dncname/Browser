<template>
  <div>

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
    }
  },
  methods: {

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

}
</style>
