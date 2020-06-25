import axios from "axios";
import config from "./config";

class User {
  /** get all posts page wise */
  static GetAllUsers(param) {
    return new Promise((resolve, reject) => {
      axios
        .get(`${config.host}/list/user/${param}`, {
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
  static SearchUser(slug, page) {
    return new Promise((resolve, reject) => {
      axios
        .get(`${config.host}/list/user/search/${slug}`, {
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

export const GetAllUsersFromDatabase = User.GetAllUsers;
export const SearchUserFromDatabase = User.SearchUser;
