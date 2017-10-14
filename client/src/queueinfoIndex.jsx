import React from 'react';
import ReactDOM from 'react-dom';
import QueueInfo from './components/customer/QueueInfo.jsx';
import '../../node_modules/jquery/dist/jquery.js';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import '../../node_modules/bootstrap/dist/css/bootstrap-theme.css';
import '../../node_modules/bootstrap/dist/js/bootstrap.js';
import '../../node_modules/font-awesome/css/font-awesome.css';

ReactDOM.render((<QueueInfo />), document.getElementById('queueinfo'));
