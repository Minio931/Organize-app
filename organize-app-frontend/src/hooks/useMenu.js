import { useReducer } from "react";

const useMenu = (items) => {
  const initialState = {};

  for (const item of items) {
    initialState[item] = false;
  }
  initialState[items[0]] = true;
  const reducer = (state, action) => {
    let newState = { ...state };
    for (const item of items) {
      if (action.item !== item) newState[item] = false;
    }
    if (action.type === "ACTIVE") {
      return { ...newState, [action.item]: true };
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const activeHandler = (item) => {
    dispatch({ type: "ACTIVE", item: item });
  };

  return {
    state,
    activeHandler,
  };
};

export default useMenu;
