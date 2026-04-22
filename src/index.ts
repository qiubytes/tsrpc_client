import { HttpClient, WsClient } from 'tsrpc';
import { serviceProto } from './shared/protocols/serviceProto';

// 创建全局唯一的 apiClient，需要时从该文件引入
let apiClient = new HttpClient(serviceProto, {
  server: 'http://localhost:3000/',
  json: true,
});

// 创建客户端
export const wsclient = new WsClient(serviceProto, {
  server: 'ws://localhost:3001/',
  json: true,
});
wsclient.listenMsg("Hello", (h) => {
  console.log('rec:');
  console.log(h.username);
});
async function main() {
  // let re = await apiClient.callApi("Login", { username: "1", password: "1" });
  // console.log(re);
  // console.log(re.res?.user);



  let conn = await wsclient.connect();
  console.log(conn);
  let re1 = await wsclient.sendMsg("Hello", { username: "t1" });
  console.log(re1);
}
main();

//while(1){};
