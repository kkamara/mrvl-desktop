import ReactDOM from 'react-dom'

import App from './App'
import { applyMiddleware, createStore } from 'redux'
import { createRoot, } from 'react-dom/client'
import reducers from './redux/reducers/index'
import thunk from 'redux-thunk'

import { Provider } from 'react-redux'

import flagsmith from 'flagsmith'
import { FlagsmithProvider, } from 'flagsmith/react'

import { FLAGSMITH_ENVIRONMENT_KEY, } from './constants'

const container = document.getElementById('root')
const root = createRoot(container)

const middleware = applyMiddleware(thunk)
const store = createStore(reducers, middleware)

root.render(
    // <FlagsmithProvider 
    //     options={{ environmentID: FLAGSMITH_ENVIRONMENT_KEY, }} 
    //     flagsmith={flagsmith}
    // >
        <Provider store={store}>
            <App />
        </Provider>
    // </FlagsmithProvider>
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
