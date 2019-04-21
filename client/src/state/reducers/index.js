import {combineReducers} from "redux";
import showLeftMenu from "./showLeftMenu";
import setActiveAccount from "./setActiveAccount";

export default combineReducers({
    showLeftMenu,
    setActiveAccount
})