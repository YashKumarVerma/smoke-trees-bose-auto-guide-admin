import axios from "axios";
import config from "./config";

class User {
  /** get all posts page wise */
  static GetAllUsers(param) {
    return new Promise((resolve, reject) => {
      axios
        .get(`${config.host}/user/list/${param}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((resp) => {
          // save the items in local storage
          resolve(resp.data);
        })
        .catch((error) => {
          reject(error.response.data);
        });
    });
  }

  /** get all posts page wise */
  static SearchUser(slug) {
    return new Promise((resolve, reject) => {
      console.log(`${config.host}/user/search/${slug}`);
      axios
        .get(`${config.host}/post/search/${slug}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((resp) => {
          // save the items in local storage
          resolve(resp.data);
        })
        .catch((error) => {
          reject(error.response.data);
        });
    });
  }
}

export const GetAllUsers = User.GetAllUsers;
export const GetUserDetails = User.SearchUser;
