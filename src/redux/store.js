import {createStore, combineReducers, applyMiddleware} from "redux"
import { composeWithDevTools } from '@redux-devtools/extension';
import TodoReducers from "./reducers/TodoReducers";

const reducer = combineReducers({
    TodoReducers
})

const initialState = {}

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware())
)

export default store