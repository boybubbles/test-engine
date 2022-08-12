import http from "../../database/mockApi";
import { Begintest } from "../reducers/userReducer";

export const BeginAction = (params) => {
  return async (dispatch) => {
    try {
      const result = await http.post("/begintest", params);
      console.log(params);
      localStorage.setItem("user_info", JSON.stringify(params));
      dispatch(Begintest(result.data));
    } catch (errors) {
      console.log(errors);
    }
  };
};
