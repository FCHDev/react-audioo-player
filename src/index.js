import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <div className="min-h-screen md:grid md:columns-1 md:content-center">
        <App/>
    </div>
);

