import React, {Component, PropTypes} from 'react';
import Navigation from './Navigation';
import '../css/jumbotron-narrow.css';

export default class Home extends Component {

  static propTypes = {
    children: PropTypes.object.isRequired
  };

  render() {
    const {children} = this.props;

    return (
      <div>

        <div className="header clearfix">
          <nav className="nav nav-pills pull-right">
            <Navigation/>
          </nav>
          <h3 className="text-muted">WIP Calculator</h3>
        </div>

        {children}

      </div>
    );
  }
}
