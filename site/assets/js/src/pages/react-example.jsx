var React                   = require('react');
var ReactDOM                = require('react-dom');
var ColorComponent 		 	= require("../react-components/ColorComponent.jsx");

ReactDOM.render(
	<ColorComponent color="blue" />,
	document.getElementById('container')
);
