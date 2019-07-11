import React from 'react'
import ReactDOM from 'react-dom'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSortAlphaDown, faSortAlphaDownAlt, faAddressBook } from '@fortawesome/free-solid-svg-icons'

import './index.css';
import 'bootstrap/dist/css/bootstrap.css'

import App from './App';
import * as serviceWorker from './serviceWorker'

library.add(faSortAlphaDown, faSortAlphaDownAlt, faAddressBook)

ReactDOM.render(<App />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
