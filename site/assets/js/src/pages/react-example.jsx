var React                   = require('react');
var ReactDOM                = require('react-dom');
var ColorComponent 		 	= require("../react-components/ColorComponent.jsx");

ReactDOM.render(
	<ColorComponent color="green" />, // not html!!
	document.getElementById('container')
);
