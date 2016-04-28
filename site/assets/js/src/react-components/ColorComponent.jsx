var React = require('react');

var ColorComponent = React.createClass({
  propTypes: {
  	color: React.PropTypes.string
  },
  getDefaultProps() {
  	return {
  		color: "red"
  	};
  },
  render: function() {
  	var style = {
  		backgroundColor: this.props.color,
  		height: 200,
  		width: 200,
  	};

    return (
    	<div style={style} />
    );

  }
});

module.exports = ColorComponent