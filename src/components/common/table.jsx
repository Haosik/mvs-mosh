import React, { Component } from 'react';

class Table extends Component {
  state = {};
  render() {
    return <table>{this.props.children}</table>;
  }
}

export default Table;
