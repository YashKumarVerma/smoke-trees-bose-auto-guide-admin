import axios from "axios";
import config from "./config";

class Testimonial {
  // this function is used to authenticate user from server
  static CreateNewTestimonial(param) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${config.host}/testimonial/create`, param, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((resp) => {
          resolve(resp.data);
        })
        .catch((error) => {
          reject(error.response.data);
        });
    });
  }

  /** get all posts page wise */
  static GetAll() {
    return new Promise((resolve, reject) => {
      axios
        .get(`${config.host}/testimonial/read`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((resp) => {
          resolve(resp.data);
        })
        .catch((error) => {
          reject(error.response.data);
        });
    });
  }

  /** delete post by id */
  static Delete(param) {
    return new Promise((resolve, reject) => {
      axios
        .delete(`${config.host}/testimonial/delete`, {
          data: {
            testimonial: {
              id: param,
            },
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((resp) => {
          resolve(resp.data);
        })
        .catch((error) => {
          reject(error.response.data);
        });
    });
  }
}

export const CreateNewTestimonial = Testimonial.CreateNewTestimonial;
export const GetAllTestimonials = Testimonial.GetAll;
export const DeleteTestimonial = Testimonial.Delete;
