import React, {Component} from 'react';
import {Nav, NavItem} from 'react-bootstrap';

export default class Navigation extends Component {

  static contextTypes = {
    router: React.PropTypes.object
  };

  render() {
    const {router} = this.context;
    return (
      <Nav
        bsStyle="tabs"
        activeKey="1"
        onSelect={(eventKey) => {
        event.preventDefault();
        router.push(eventKey);
      }}>
        <NavItem eventKey="/">Home</NavItem>
        <NavItem eventKey="inputlookup" title="Item">Lookup Input</NavItem>
        <NavItem eventKey="output">Output</NavItem>
        <NavItem eventKey="budget">Budget</NavItem>
      </Nav>
    );
  }
}
