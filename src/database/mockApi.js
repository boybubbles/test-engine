import axios from "axios";

import MockAdapter from "axios-mock-adapter";

let http = axios.create({
  baseURL: "127.0.0.1:3000",
  timeout: 10000,
});

let mock = new MockAdapter(http);

mock.onPost("/api/v1/?id=1").reply(200, {
  success: true,
  status: 200,
});
mock.onPost("/api/v1/?id=2").reply(200, {
  success: true,
  status: 200,
});

export default http;
// [
//   {
//     answer: "bal bla",
//     position: 1,
//     result: true,
//   },
//   {
//     answer: "Sven",
//     position: 0,
//     result: false,
//   },
// ]
