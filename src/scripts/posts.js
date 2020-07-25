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

  // this function is used to authenticate user from server
  static EditPost(param) {
    return new Promise((resolve, reject) => {
      axios
        .put(`${config.host}/post/update`, param, {
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
  static GetAllPosts(param, category) {
    return new Promise((resolve, reject) => {
      axios
        .get(`${config.host}/post/list/${category}/${param}`, {
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
  static SearchPosts(slug, page, category) {
    return new Promise((resolve, reject) => {
      if (slug === "") {
        slug = " ";
      }
      console.log(
        `${config.host}/post/search/${category}/${slug}?page=${page}`
      );
      axios
        .get(`${config.host}/post/search/${category}/${slug}?page=${page}`, {
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
export const SearchPosts = Post.SearchPosts;
export const EditPost = Post.EditPost;
