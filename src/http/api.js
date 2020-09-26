const apiURL = "http://119.28.128.52:8001"
const apiURL2 = "http://119.28.128.52:8000"
const api = {
  get_block:apiURL+"/v1/chain/get_block",//
  get_transaction:apiURL+"/v1/history/get_transaction",
  get_info:apiURL+"/v1/chain/get_info",
  get_table_rows:apiURL+"/v1/chain/get_table_rows",
  richList:apiURL2+"/index.php"

}
module.exports = api

