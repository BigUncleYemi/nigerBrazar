import { applyMiddleware, createStore, compose } from "redux";
import thunkMiddleware from "redux-thunk";

import rootReducer from "./reducer";

// Middlewares
const middlewares = [thunkMiddleware];

const enhancer = applyMiddleware(...middlewares);

const store = createStore(rootReducer(), {}, enhancer);

export default store;