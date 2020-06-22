import PostActionTypes from "./posts.types";

export const addNewPost = (payload) => ({
  type: PostActionTypes.ADD_POST,
  payload: payload,
});

export const attachImage = (payload) => ({
  type: PostActionTypes.ATTACH_IMAGE,
  payload: payload,
});
