/**
 * Created by james on 2018/5/30.
 */
import { combineReducers } from 'redux';
import * as type from '../action/type';
import * as todoList from './todoList'

const handleData = (state = {isFetching: true, data: {}}, action) => {
    switch (action.type) {
        case type.REQUEST_DATA:
            return {...state, isFetching: true};
        case type.RECEIVE_DATA:
            return {...state, isFetching: false, data: action.data};
        default:
            return {...state};
    }
};
const httpData = (state = {}, action) => {
    switch (action.type) {
        case type.RECEIVE_DATA:
        case type.REQUEST_DATA:
            return {
                ...state,
                [action.category]: handleData(state[action.category], action)
            };
        default:
            return {...state};
    }
};

export default combineReducers({
    ...todoList,
    httpData
});


// import { combineReducers } from 'redux'
// import * as todoList from './todoList'

// const rootReducer = combineReducers({
//   ...todoList,
// })

// export default rootReducer