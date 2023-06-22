import ReactDOM from 'react-dom'
import App from './App'
import { applyMiddleware, createStore } from 'redux'
import { createRoot, } from 'react-dom/client'
import reducers from './redux/reducers/index'
import thunk from 'redux-thunk'

import { Provider } from 'react-redux'

const container = document.getElementById('root')
const root = createRoot(container)

const middleware = applyMiddleware(thunk)
const store = createStore(reducers, middleware)

root.render(
    <Provider store={store}>
        <App />
    </Provider>
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
