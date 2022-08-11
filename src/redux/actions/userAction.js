import http from "../../database/mockApi";

export const loginAction = (params) => {
  return async (dispatch) => {
    try {
      const createTimestamp = () => {
        params.candidate.time_start = new Date();
        datejs
        return { ...params };
      };
      const result = await http.post("/begintest", createTimestamp);
      console.log(params);
      console.log(createTimestamp());
      console.log(result);
    } catch (errors) {
      console.log(errors);
    }
  };
};
