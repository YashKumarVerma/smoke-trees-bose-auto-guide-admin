import axios from "axios";
import config from "./config";

class Post {
  // this function is used to authenticate user from server
  static CreateNewPost(param) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${config.host}/post/create`, param, {
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

export const CreateNewPost = Post.CreateNewPost;
