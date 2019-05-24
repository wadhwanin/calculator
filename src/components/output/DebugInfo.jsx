import React, {PropTypes, Component} from 'react';

import {
  Well,
  Collapse,
  Button,
  FormControl,
  HelpBlock,
  Col,
  FormGroup,
  ControlLabel,
  Grid,
  Row
} from 'react-bootstrap';
import vkbeautify from 'vkbeautify';
import {yearsDropDownInYears} from '../../utils/util';
import {setDebugYear, setCurrentTab} from '../../action/output';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({setDebugYear, setCurrentTab}), dispatch);
}

class DebugInfo extends Component {

  static propTypes = {
    socialBenefitsDebugInfo: PropTypes.object.isRequired,
    taxDebugInfo: PropTypes.object.isRequired,
    debugYear: PropTypes.string,
    setDebugYear: PropTypes.func.isRequired,
    setCurrentTab: PropTypes.func.isRequired,
    customer: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);

    this.state = {
      inputSection: false,
      outputSection: false,
      selectedSource: 'socialBenefits'
    }
  }

  getSourceDataFromString(source) {
    const {socialBenefitsDebugInfo, taxDebugInfo} = this.props;

    if (source === 'socialBenefits') {
      return socialBenefitsDebugInfo;
    }

    return taxDebugInfo;
  }

  reSubmitWithDifferentYear(year) {
    const {setDebugYear, setCurrentTab} = this.props;
    setDebugYear(year);
    setCurrentTab('socialBenefitsDebugInfo');
  }

  render() {

    const {debugYear, customer} = this.props;
    const {inputSection, outputSection, selectedSource} = this.state;
    const {externalSystemInput, externalSystemOutput} = this.getSourceDataFromString(selectedSource);
    return (
      <Grid className="margin-around">

        <Row>
          <FormGroup controlId="debugYear">
            <Col componentClass={ControlLabel} sm={2}>
              Change Debug Year
            </Col>
            <Col sm={3}>
              <FormControl
                componentClass="select"
                placeholder="Debug Year"
                defaultValue={debugYear}
                onChange={(e) => this.reSubmitWithDifferentYear(e.target.value)}>
                <option value=""/> {yearsDropDownInYears(customer)}
                >
              </FormControl>
              < FormControl.Feedback/>
              <HelpBlock>Change the Magnus I/O year
              </HelpBlock>
            </Col>
          </FormGroup>
        </Row>

        <Row>
          <FormGroup controlId="selectedSource">

            <Col componentClass={ControlLabel} sm={2}>
              Select Source
            </Col>
            <Col sm={3}>
              <FormControl
                componentClass="select"
                placeholder="Selected Source"
                defaultValue={selectedSource}
                onChange={(e) => this.setState({selectedSource: e.target.value})}>
                <option value="socialBenefits">Social Benefits</option>
                <option value="tax">Tax</option>
                >
              </FormControl>
              < FormControl.Feedback/>
              <HelpBlock>Select source
              </HelpBlock>
            </Col>
          </FormGroup>
        </Row>

        <Row>
          <Col sm={2}>
            <Button
              bsStyle="primary"
              bsSize="large"
              className="margin-around"
              onClick={() => this.setState({
              inputSection: !inputSection
            })}>
              {inputSection
                ? 'Hide '
                : 'Show '}
              Input
            </Button>
          </Col>
        </Row>

        <Row>
          <Col sm={12}>
            <Collapse in={inputSection} className="margin-around">
              <Well bsSize="large">
                <pre>
              {vkbeautify.xml(atob(externalSystemInput))}
          </pre>
              </Well>
            </Collapse>
          </Col>
        </Row>

        <Row>
          <Col sm={2}>
            <Button
              bsStyle="info"
              bsSize="large"
              className="margin-around"
              onClick={() => this.setState({
              outputSection: !outputSection
            })}>
              {outputSection
                ? 'Hide '
                : 'Show '}
              Output
            </Button>
          </Col>
        </Row>

        <Row>
          <Col sm={12}>

            <Collapse in={outputSection} className="margin-around">
              <Well bsSize="large">
                <pre>
              {vkbeautify.xml(atob(externalSystemOutput))}
          </pre>
              </Well>
            </Collapse>
          </Col>
        </Row>
      </Grid>);
  }
}

export default connect(null, mapDispatchToProps)(DebugInfo);