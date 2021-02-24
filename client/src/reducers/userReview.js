export const userReview = (state = false, action) => {
    switch (action.type) {
      case "VISIBLE":
        return action.payload;
      default:
        return state;
    }
  };
  