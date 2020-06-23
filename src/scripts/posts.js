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

  /** get all posts page wise */
  static GetAllPosts(param) {
    return new Promise((resolve, reject) => {
      axios
        .get(`${config.host}/post/list/${param}`, {
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

  /** delete post by id */
  static DeletePost(param) {
    return new Promise((resolve, reject) => {
      axios
        .delete(`${config.host}/post`, {
          data: {
            post: {
              id: param,
            },
          },
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
export const GetAllPosts = Post.GetAllPosts;
export const DeletePost = Post.DeletePost;
