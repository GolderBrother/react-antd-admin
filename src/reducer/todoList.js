import { handleActions } from 'redux-actions'

const todo = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        id: action.id,
        text: action.text,
        completed: false // 刚传入的待办项未完成
      }
    case 'TOGGLE_TODO':
      if (state.id !== action.id) {
        return state
      }
      //不能修改一个对象，须新建一个对象，因为react不好判断一个对象是否改变
      return Object.assign({}, state, {
        completed: !state.completed
      })
    default:
      return state
  }
}
//初始值--state
const todoListInit = [{
    id: -3,
    text: 'coding',
    completed: false,
  }, {
    id: -2,
    text: '打篮球',
    completed: false,
  }, {
    id: -1,
    text: 'reading',
    completed: true,
  }]

export const todoList = handleActions({
  'ADD_TODO'(state, action) {
    return [
      ...state,
      todo(undefined, action.payload)
    ]
  },
  'TOGGLE_TODO'(state, action) {
    return state.map(t => todo(t, action.payload))
  },
  'DEL_TODO'(state, action) {
    return state.filter(t => t.id !== action.payload.id)
  }
}, todoListInit)

//初始值--state
const setVisibilityInit = {
  filter: 'SHOW_ALL',
}

export const setVisibility = handleActions({
  'SET_VISIBILITY'(state, action) {
    console.log({ ...state})
    console.log({...action.payload})
    console.log({ ...state, ...action.payload})
    //注意，后面的属性会把前面的覆盖掉
    return { ...state, ...action.payload}
  }
}, setVisibilityInit)
