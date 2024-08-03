import { toast } from "react-toastify";
import axios from "axios";
import Cookies from "js-cookie";
// import { handleaccesstoken } from "./create-access-token";
import { getData } from "./storage";
// import { error } from "console";
export const makeApiCall = async (
  method: string,
  endpoint: string,
  requestData: any,
  searchParams: any
) => {
  // throw new Error("error")
  try {
    const response = await axios({
      method: method,
      url: `${process.env.REACT_APP_API_HOST}/${endpoint}`,
      data: requestData,
      params: searchParams,
      headers: {
        "Content-Type": "application/json",
        Authorization: `${
          getData("token") !== null ? `Bearer ${getData("token")}` : ""
        }`,
      },
    });
    return response;
  } catch (err: any) {
    throw new Error("error");
  }
};
