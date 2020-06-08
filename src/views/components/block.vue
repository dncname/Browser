<template>
  <div class="transactions">
    <div
      class="list"
      v-for="(item, index) in currentBlocks.transactions"
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
          <div class="name3">
            <div class="name3_top">
              <span>{{ items.authorization[0].actor }}</span>
              <span>创建了账户</span>
              <span ref="traces">{{ item.trx.traces }}</span>
              
              <!-- <span>{{
                          item.traces[0].account_ram_deltas[0].account
                        }}</span> -->
            </div>
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
              <!-- <json-view :data="items.data" /> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import jsonView from 'vue-json-views'
export default {
  name: 'block',
  components: {
    // jsonView
  },
  props:["currentBlocks"],
  data () {
    return {
      
    }
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event);
    },
    // 1035332    1034432
    // http://www.dncpark.com/block/103533.html
  },
  created () {
  },
  activated () {
  },
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

}
@media (max-width: 600px) {

}
</style>
