import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from 'react-redux';
import LikeStore from './components/interact/likeInteract';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={LikeStore}>
      <App />
    </Provider>
  </React.StrictMode>,
)
