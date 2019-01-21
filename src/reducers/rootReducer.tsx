import { combineReducers } from "redux";

import loginReducer from "./loginReducer";
import orgReducer from "./organizationReducer";

export default combineReducers({
  loginReducer,
  orgReducer
});