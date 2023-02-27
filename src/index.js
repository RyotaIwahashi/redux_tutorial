import React from 'react'
import ReactDOM from 'react-dom/client'

// import { createStore } from 'redux'
import { configureStore, createSlice } from '@reduxjs/toolkit'

// const counterReducer = (state = 0, action) => {
//   switch (action.type) {
//     case 'INCREMENT':
//       return state + 1
//     case 'DECREMENT':
//       return state - 1
//     case 'ZERO':
//       return 0
//     default:
//       return state
//   }
// }

// createSliceを使って上記を書き換える
// createSlice は下記を返す関数
// {
//    name : string,
//    reducer : ReducerFunction,
//    actions : Object<string, ActionCreator>,
// }
const counterSlice = createSlice({
  name: 'counter', // reducers名
  initialState: 0, // initialState
  reducers: { // reducers
    increment: state => state + 1,
    decrement: state => state - 1,
    zero: () => 0
  }
})

// createStore は、 @reduxjs/toolkit パッケージの configureStore メソッドを代わりに使用するのが良い。
// Redux Toolkit は、ストアのセットアップ、リデューサー、データ フェッチなどを含む、Reduxロジックを記述するための推奨されるアプローチ
// const store = createStore(counterReducer)
const store = configureStore({
  reducer: counterSlice.reducer
})
// configureStore を使用、middleware や devTools の設定済み

const App = () => {
  return (
    <div>
      <div>
        {store.getState()}
      </div>
      <button 
        onClick={e => store.dispatch(counterSlice.actions.increment())}
      >
        plus
      </button>
      <button
        onClick={e => store.dispatch(counterSlice.actions.decrement())}
      >
        minus
      </button>
      <button 
        onClick={e => store.dispatch(counterSlice.actions.zero())}
      >
        zero
      </button>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(<App />)
}

renderApp()

// ストアの状態が変更された場合、React はアプリケーションを自動的に再レン​​ダリングできない。
// したがって、ストア内の変更をstore.subscribeメソッドでリッスンするために、
// アプリ全体をレンダリングする関数renderAppを登録する。
store.subscribe(renderApp)
