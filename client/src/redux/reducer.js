
import { combineReducers } from "redux";
import { friendsAndWannabesReducer } from "./friends-and-wannabes/slice.js";

const rootReducer = combineReducers({
    friendsAndWannabees: friendsAndWannabesReducer,
    // Reducer
    // Dealing with all 3 possible actions in 3 different if/else blocks

    // "friendsAndWannabes/received" - should contain all friends and wannabees and set the initial state

    // "friendsAndWannabes/accepted" - one of the users in the existing array of friends and wannabees should have their accepted property set to true. You probably want to use .map()

    // "friendsAndWannabees/unfriended" - one of the users in the existing array of friends and wannabees should be removed. You probably want to use .filter()
    
    // (Bonus friendaAndWannabees/rejected)



});




export default rootReducer; 