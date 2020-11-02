import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import AppDemo from "./AppDemo";
import { BrowserRouter } from "react-router-dom";
import { createStore ,applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import reducer from "./store/reducers/index";
// connect react-redux
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";
import Upload from './WEB1/components/CreatePostUpdate/CreatePostUpdate';

const store = createStore(reducer, applyMiddleware(thunk));

const Web1 = React.lazy(() => import("./WEB1/Home/web1"));
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Provider store={store}>
          {/* <AppDemo /> */}
          <Web1 />
          {/* <Upload/> */}
        </Provider>
      </Suspense>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.unregister();
