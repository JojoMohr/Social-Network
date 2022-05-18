import { combineReducers } from "redux";
import { friendsAndWannabesReducer } from "./friends-and-wannabes/slice.js";

const rootReducer = combineReducers({
    friendsAndWannabees: friendsAndWannabesReducer,
});

export default rootReducer;