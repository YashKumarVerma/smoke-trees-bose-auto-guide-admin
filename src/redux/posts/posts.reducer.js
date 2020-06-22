import PostActionTypes from "./posts.types";

const INITIAL_STATE = {
  posts: [],
  activePost: null,
  attachedImage: undefined,
};

const PostReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    //   handle creation of new posts
    case PostActionTypes.ADD_POST: {
      return Object.assign({}, state, {
        posts: state.posts.concat(action.payload),
      });
    }

    /** handle attaching image to post */
    case PostActionTypes.ATTACH_IMAGE: {
      console.log("Image carrier tirggered");
      return Object.assign({}, state, {
        attachedImage: action.payload,
      });
    }

    default:
      return state;
  }
};

export default PostReducer;
