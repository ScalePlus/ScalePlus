import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import reducers from "./reducers";
import { rootSaga } from "./rootSaga";
import reduxReset from "redux-reset";

const sagaMiddleware = createSagaMiddleware();

const configureStore = (initialState) => {
  const enhancer = compose(
    applyMiddleware(thunkMiddleware, sagaMiddleware),
    reduxReset()
  );
  return createStore(reducers, initialState, enhancer);
};

const store = configureStore({});
sagaMiddleware.run(rootSaga);
export default store;
