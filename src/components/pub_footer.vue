<template>
  <div>
    <div class="footer_box">
      <div class="footer">
        <img src="../assets/imgs/1.png" alt="" />
        <p>A project from NASA in 1983,in the 1960,</p>
        <p>ARPAnet appeared in the United States</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'pubFooter',
  props: {
    msg: String
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@media (min-width: 600px) {
  .footer_box {
    height: 150px;
    width: 100%;
    background: url("../assets/imgs/7.png") no-repeat center;
    background-size: 100% 169px;
    display: block;
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
}
@media (max-width: 600px) {
  .footer_box {
    margin-top: 70px;
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
}
</style>
