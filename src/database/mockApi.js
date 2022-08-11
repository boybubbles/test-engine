import axios from "axios";

import MockAdapter from "axios-mock-adapter";

let http = axios.create({
  baseURL: "127.0.0.1:3000",
  timeout: 10000,
});

let mock = new MockAdapter(http);

mock.onPost("/begintest").reply(200, {
  success: true,
  status: 200,
});
export default http;
