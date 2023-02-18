import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Firebase, { FirebaseContext } from './Firebase';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './home';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/in-progress",
    element: <App />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <FirebaseContext.Provider value={new Firebase()}>
      <>
        <nav className="bg-gray-800 text-white">
          <div className="container mx-auto px-6 py-3 flex justify-center items-center">
            <a className="text-2xl lg:text-3xl font-medium tracking-wider" href="/" style={{ fontFamily: 'Inconsolata, monospace' }}>
              KinoTracker
            </a>
          </div>
        </nav>
        <RouterProvider router={router} />
      </>
    </FirebaseContext.Provider>
  </React.StrictMode >
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
