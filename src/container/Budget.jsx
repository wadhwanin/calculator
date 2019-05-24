import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import calculateRequest from '../utils/api';
// import {pension} from '../utils/tempBudget.js';
import {
  Panel,
  ProgressBar,
  Alert,
  Button,
  Glyphicon,
  PageHeader,
  ListGroup,
  ListGroupItem
} from 'react-bootstrap';
import PensionOutput from '../components/output_budget/PensionOutput';
import SummaryRow from '../components/output_budget/SummaryRow';
import TaxDetails from '../components/output_budget/TaxDetails';
import ExpenseDetails from '../components/output_budget/ExpenseDetails';
import YearControls from '../components/output_budget/YearControls';
import {MAX_NUMBER_OF_COLUMNS} from '../utils/constants';
import {getEndIndexForDisplay} from '../utils/util';
import {getTaxOnIncome, getTotalExpense, getTotalIncome, getCashFlow} from '../utils/budget';

function mapStateToProps(state) {
  const {input} = state;
  const {data, urlBudget, debugYear} = input;
  return Object.assign({}, {data, urlBudget, debugYear});
}

class Budget extends Component {

  static propTypes = {
    data: PropTypes.object.isRequired,
    urlBudget: PropTypes.string.isRequired,
    debugYear: PropTypes.string
  }

  constructor(props) {
    super(props);
    this.state = {
      annualBudgets: [],
      error: '',
      alertVisible: false,
      showPensionDetails: false,
      showTaxDetails: false,
      showExpenses: false,
      startIndex: 0
    };
  }

  submitAndSetState(props) {
    this.setState( { annualBudgets: [] });
    const {data, urlBudget, debugYear} =
      props; const questionMarkOrAmpersand = urlBudget.indexOf( '?' ) > -1 ? '&' :
        '?'; const finalUrl = debugYear ?
          `${urlBudget}${questionMarkOrAmpersand}isDebugMode=true&debugInfoYear=${debugYear}` : urlBudget;

    if ( !data )
    {
      this.setState( { error: 'Input is null' });
    } calculateRequest( finalUrl, data ).then( r =>
    {
      if ( !r.ok )
      {
        const
          errorMessage = `error occured during REST Call: r.status: ${r.status} and
        r.statusText: ${r.statusText}`; console.error( errorMessage );
        this.setState( { error: errorMessage }); return;
      } r.json()
        .then(( out ) =>
        {
          const {annualBudgets} = out;
          this.setState( { annualBudgets });
        });
    });
    // const {annualBudgets} = pension;
    // this.setState( { annualBudgets });
  }

  componentWillMount() {
    this.submitAndSetState(this.props);
  }

  componentWillReceiveProps(newProps) {
    this.submitAndSetState(newProps);
  }

  handleAlertDismiss() {
    this.setState({alertVisible: false});
  }

  decrement() {
    const {startIndex} = this.state;
    this.setState({
      startIndex: startIndex - MAX_NUMBER_OF_COLUMNS < 0
        ? 0
        : startIndex - MAX_NUMBER_OF_COLUMNS
    })
  }

  increment() {
    const {startIndex, annualBudgets} = this.state;
    this.setState({
      startIndex: startIndex + MAX_NUMBER_OF_COLUMNS >= annualBudgets.length
        ? startIndex
        : startIndex + MAX_NUMBER_OF_COLUMNS
    })
  }

  render() {
    console.log('inside Budget o/p');

    const {
      error,
      annualBudgets,
      alertVisible,
      showPensionDetails,
      showTaxDetails,
      showExpenses,
      startIndex
    } = this.state;
    const endIndex = getEndIndexForDisplay(startIndex, annualBudgets);
    const budgetForSelectedPeriod = annualBudgets.slice(startIndex, endIndex);

    if (alertVisible) {
      return (
        <Alert bsStyle="danger" onDismiss={this.handleAlertDismiss}>
          <h4>Oh snap! You got an error!</h4>
          <p>{error}</p>
          <p>
            <Button
              onClick={this
              .handleAlertDismiss
              .bind(this)}>Hide</Button>
          </p>
        </Alert>
      );
    }

    if (!annualBudgets.length) {
      return (
        <Panel header="Loading Results" bsStyle="warning">
          <ProgressBar active now={45}/>
        </Panel>
      );
    }

    return (
      <div>
        <PageHeader>Budget</PageHeader>
        <Panel header="Income" bsStyle="success">
          <ListGroup>
            <YearControls
              budgetForSelectedPeriod={budgetForSelectedPeriod}
              increment={this
              .increment
              .bind(this)}
              decrement={this
              .decrement
              .bind(this)}/>
            <ListGroupItem header="Salary"></ListGroupItem>
            <ListGroupItem
              onClick={() => this.setState({
              showPensionDetails: !showPensionDetails
            })}>
              <Glyphicon
                glyph={showPensionDetails
                ? "minus"
                : "plus"}/>
              <b>  Pension Income</b>
            </ListGroupItem>
            <PensionOutput
              showPension={showPensionDetails}
              budgetForSelectedPeriod={budgetForSelectedPeriod}/>
            <SummaryRow
              budgetForSelectedPeriod={budgetForSelectedPeriod}
              summaryFunction={getTotalIncome}/>

          </ListGroup>

        </Panel>
        <Panel header="Tax" bsStyle="warning">
          <ListGroup>
            <ListGroupItem
              onClick={() => this.setState({
              showTaxDetails: !showTaxDetails
            })}>
              <Glyphicon
                glyph={showTaxDetails
                ? "minus"
                : "plus"}/>
              <b>  Income Tax</b>
            </ListGroupItem>
            <TaxDetails
              budgetForSelectedPeriod={budgetForSelectedPeriod}
              showTaxDetails={showTaxDetails}/>
            <SummaryRow
              budgetForSelectedPeriod={budgetForSelectedPeriod}
              summaryFunction={getTaxOnIncome}/>
          </ListGroup>
        </Panel>

        <Panel header="Expenses" bsStyle="danger">
          <ListGroup>
            <ListGroupItem
              onClick={() => this.setState({
              showExpenses: !showExpenses
            })}>
              <Glyphicon
                glyph={showExpenses
                ? "minus"
                : "plus"}/>
              <b>  Expenses</b>
            </ListGroupItem>
            <ExpenseDetails
              budgetForSelectedPeriod={budgetForSelectedPeriod}
              showExpenses={showExpenses}/>
            <SummaryRow
              budgetForSelectedPeriod={budgetForSelectedPeriod}
              summaryFunction={getTotalExpense}/>
          </ListGroup>
        </Panel>


        <Panel header="Cash Flow" bsStyle="info">
            <SummaryRow
              budgetForSelectedPeriod={budgetForSelectedPeriod}
              summaryFunction={getCashFlow}/>
        </Panel>        

      </div>
    );

  }
}

export default connect(mapStateToProps)(Budget);
