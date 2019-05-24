import React, {Component} from 'react';
import {Jumbotron, Button} from 'react-bootstrap';
import '../css/jumbotron-narrow.css';
import Reset from '../components/input/lookup/Reset';

export default class Welcome extends Component {

  static contextTypes = {
    router: React.PropTypes.object
  };
  constructor(props) {
    super(props);
    this.state = {
      showResetDialog: false
    }
  }

  toggleReset() {
    const {showResetDialog} = this.state;
    this.setState({
      showResetDialog: !showResetDialog
    });
  }

  render() {
    const {router} = this.context;
    const {showResetDialog} = this.state;
    return (
      <div>
        <Jumbotron>
          <h1>Income Prognosis
          </h1>
          <p>To get started please enter custodies information by clicking button below</p>

          <Button
            bsStyle="primary"
            onClick={() => {
            router.push('inputlookup');
          }}>
            Yeah sure!
          </Button>

        </Jumbotron>
        <div className="align-items-right">
          <div>if you are facing trouble navigating to Input screen &nbsp;</div> 
          <Button
            bsStyle="info"
            bsSize="small"
            onClick={() => {
            localStorage.removeItem("wip-cal-lookup-input");
            this.setState({showResetDialog: true});
          }}>
            click here
          </Button> 
        </div>
        <Reset
          show={showResetDialog}
          toggle={this
          .toggleReset
          .bind(this)}/>
      </div>
    );
  }
}
