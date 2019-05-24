import React, {PropTypes, Component} from 'react';
import {
  FormControl,
  FormGroup,
  ControlLabel,
  HelpBlock,
  Col
} from 'react-bootstrap';
import {DateField} from 'react-date-picker';
import 'react-date-picker/index.css';
import {convertPercentToDecimal, yearsDropDownInYears, getYearMonthFromDate} from '../../../utils/util';

const defaultPortfolioPrognosisUrl = 'http://ap-njgoms13t.oneadr.net:8140/simulations/budget';

const defaultBudgetUrl = 'http://ap-njgoms13t.oneadr.net:8140/simulations/budget';

const getURL =  (sessionUrl, defaultUrl) =>   sessionUrl ? sessionUrl : defaultUrl;

export default class Session extends Component {

  static propTypes = {
    sessionUrl: PropTypes.string,
    debugYear: PropTypes.string,
    customer: PropTypes.object.isRequired,
    country: PropTypes.string.isRequired,
    inflation: PropTypes.number.isRequired,
    setInputFieldBaseLevel: PropTypes.func.isRequired,
    setCalculatorURL: PropTypes.func.isRequired,
    setDebugYear: PropTypes.func.isRequired,
    setCalculatorBudgetURL: PropTypes.func.isRequired,
    sessionBudgetUrl: PropTypes.string
  }

  constructor(props) {
    super(props);
    const {sessionUrl, sessionBudgetUrl} = props;
    this
      .props
      .setCalculatorURL(getURL(sessionUrl, defaultPortfolioPrognosisUrl));
    this
      .props
      .setCalculatorBudgetURL(getURL(sessionBudgetUrl, defaultBudgetUrl));
      
  }

  render() {

    const {
      customer,
      country,
      inflation,
      setInputFieldBaseLevel,
      setCalculatorURL,
      sessionUrl,
      sessionBudgetUrl,
      setCalculatorBudgetURL,
      debugYear,
      setDebugYear
    } = this.props;

    const today = new Date();

    return (
      <div className="calc-input-container">
        <FormGroup controlId="country">
          <Col componentClass={ControlLabel} sm={2}>
            Country
          </Col>
          <Col sm={6}>
            <FormControl
              componentClass="select"
              placeholder="Select country"
              defaultValue={country}
              onChange={(e) => setInputFieldBaseLevel({country: e.target.value})}>
              <option value="DK">Denmark</option>
              <option value="SE">Sweden</option>
            </FormControl>
            <FormControl.Feedback/>
            <HelpBlock></HelpBlock>
          </Col>
        </FormGroup>
        <FormGroup controlId="inflation">
          <Col componentClass={ControlLabel} sm={2}>
            Inflation
          </Col>
          <Col sm={6}>
            <FormControl
              type="text"
              defaultValue={inflation * 100}
              placeholder="Enter start value"
              onChange={(e) => setInputFieldBaseLevel({
              inflation: convertPercentToDecimal(e.target.value)
            })}/>
            <HelpBlock>Enter a number in percentage. For example, enter 1.5 for 1.5%</HelpBlock>
          </Col>
        </FormGroup>
        <FormGroup controlId="sessionDate">
          <Col componentClass={ControlLabel} sm={2}>
            Session Date
          </Col>
          <Col sm={6}>
            <DateField
              dateFormat="MM/DD/YYYY"
              defaultValue={today}
              onChange={(v) => setInputFieldBaseLevel({startYearMonth: getYearMonthFromDate(v)})}
              />
            <HelpBlock>Could be today ...
            </HelpBlock>
          </Col>
        </FormGroup>
        <FormGroup controlId="targetURL">
          <Col componentClass={ControlLabel} sm={2}>
            Calculator URL (Portfolio Prognosis)
          </Col>
          <Col sm={6}>
            <FormControl
              type="text"
              defaultValue={getURL( sessionUrl, defaultPortfolioPrognosisUrl )}
              placeholder="Enter WIP Calculator URL (Portfolio Prognosis)"
              onChange={( e ) => setCalculatorURL( e.target.value )}></FormControl>
            <FormControl.Feedback />
            <HelpBlock>If you are testing a specific feature, get this URL from JIRA or developer</HelpBlock>
          </Col>
        </FormGroup>
        <FormGroup controlId="targetBudgetURL">
          <Col componentClass={ControlLabel} sm={2}>
            Calculator URL (Budget)
          </Col>
          <Col sm={6}>
            <FormControl
              type="text"
              defaultValue={getURL( sessionBudgetUrl, defaultBudgetUrl )}
              placeholder="Enter WIP Calculator URL (Budget)"
              onChange={( e ) => setCalculatorBudgetURL( e.target.value )}></FormControl>
            <FormControl.Feedback />
            <HelpBlock>If you are testing a specific feature, get this URL from JIRA or developer</HelpBlock>
          </Col>
        </FormGroup>        
        <FormGroup controlId="debugYear">
          <Col componentClass={ControlLabel} sm={2}>
            Debug Year
          </Col>
          <Col sm={3}>
            <FormControl
              componentClass="select"
              placeholder="Debug Year"
              defaultValue={debugYear}
              onChange={( e ) => setDebugYear(e.target.value)}>
              <option value="" />
              {yearsDropDownInYears( customer )} >
        </FormControl> < FormControl.Feedback />
            <HelpBlock>If you wish to see logging information such as Magnus Input/Output, select year </HelpBlock>
          </Col>
        </FormGroup>
      </div>

    );
  }
}
