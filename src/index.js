import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App/App";
import { Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { todosReducer, fitlerReducer, fetchTodos } from "./components/store";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware));
const rootReducer = combineReducers({
  todos: todosReducer,
  filterActive: fitlerReducer,
});

const todosStore = createStore(rootReducer, composedEnhancer);

todosStore.dispatch(fetchTodos);

ReactDOM.render(
  <Provider store={todosStore}>
    <App />
  </Provider>,
  document.querySelector("#root")
);
