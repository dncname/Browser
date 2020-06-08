const apiURL = "http://119.28.128.52:8888"
const api = {
  get_block:apiURL+"/v1/chain/get_block",//
  get_transaction:apiURL+"/v1/history/get_transaction",
  get_info:apiURL+"/v1/chain/get_info",
  get_table_rows:apiURL+"/v1/chain/get_table_rows",

}
module.exports = api

