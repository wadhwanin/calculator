import React, { Component, PropTypes } from 'react';
import CustomerDetails from '../components/input/lookup/CustomerDetails';
import Session from '../components/input/lookup/Session';
import Product from '../components/input/lookup/Product';
import { emptyInputLookupObject } from '../utils/constants';
import budgetRequest from '../utils/budget_api'

import { displayBudget } from '../utils/budget';
import {
  Form,
  Row,
  Col,
  Button,
  ButtonToolbar,
  Tabs,
  Tab
} from 'react-bootstrap';
import { submit, setCalculatorURL, setCalculatorBudgetURL, setDebugYear } from '../action/input';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Reset from '../components/input/lookup/Reset';

function mapStateToProps(state) {
  return state.input;
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({ submit, setCalculatorURL, setCalculatorBudgetURL, setDebugYear }), dispatch);
}

class InputLookUp extends Component {
  static contextTypes = {
    router: React.PropTypes.object
  };

  static propTypes = {
    useTaxAndCostTable: PropTypes.bool,
    url: PropTypes.string,
    urlBudget: PropTypes.string,
    submit: PropTypes.func.isRequired,
    setCalculatorURL: PropTypes.func.isRequired,
    setCalculatorBudgetURL: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      input: emptyInputLookupObject(),
      error: [],
      showResetDialog: false,
      currentTab: 1,
      budgetTypes: []
    }

  }

  componentWillReceiveProps() {
    this.getBudgetTypes = () => {
      budgetRequest()
        .then(function (response) {
          if (response.status >= 400) {
            throw new Error("Bad response from server");
          }
          return response.json();
        })
        .then(response => {
          const budgetTypes = response;
          this.setState({
            budgetTypes: budgetTypes
          });

        });
    };
    this.getBudgetTypes();
  }

  toggleReset() {
    const { showResetDialog } = this.state;
    this.setState({
      showResetDialog: !showResetDialog
    });
  }

  validateEmpty(type, field) {
    const { input } = this.state;
    if (!input[type][field]) {
      return;
    }

    if (typeof (input[type][field]) === 'string' && !input[type][field].length) {
      return 'error';
    } else {
      return 'success';
    }
  }

  addInstrument(index) {
    const { input } = this.state;
    const { products } = input;
    const { instruments } = products[index]['custody'];

    const newInstrument = {
      "isin": "",
      "value": 0
    };

    const modifiedInstruments = [
      ...instruments,
      newInstrument
    ];

    this.setInputFieldFirstLevelArraySecondLevelObject({
      instruments: modifiedInstruments
    }, 'products', index, 'custody', );
  }

  addInputProduct() {
    const { input } = this.state;
    const { products } = input;

    const newProduct = {
      "type": "FREE_ASSET"
    };

    this.setInputFieldBaseLevel({
      products: [
        ...products,
        newProduct
      ]
    });
  }

  addPoolInstrument(index) {
    const { input } = this.state;
    const { products } = input;
    const { instruments } = products[index]['pool'];

    const newPoolInstrument = {
      "poolAllocationType": "",
      "value": 0
    };

    const modifiedPoolInstruments = [
      ...instruments,
      newPoolInstrument
    ];

    this.setInputFieldFirstLevelArraySecondLevelObject({
      instruments: modifiedPoolInstruments
    }, 'products', index, 'pool');
  }

  addInputPayInField(category, indexCategory) {
    const { input } = this.state;
    const { products } = input;
    const { payInRanges } = products[indexCategory];

    const newpayInObject = {
      "amount": "",
      "startYearMonth": "",
      "endYearMonth": "",
      "indexed": false
    };

    const modifiedpayInRangesArray = [
      ...payInRanges,
      newpayInObject
    ];

    this.setInputFieldFirstLevelArray({
      payInRanges: modifiedpayInRangesArray
    }, category, indexCategory);
  }

  addInputInsurancePremiumField(category, indexCategory, secondLevelCategory) {
    const { input } = this.state;
    const { products } = input;
    const { pensionDetailsDk } = products[indexCategory];
    const { insurancePremiumRanges } = pensionDetailsDk;

    const newInsurancePremiumObject = {
      "amount": "",
      "startYearMonth": `${new Date().getFullYear()}-01`,
      "endYearMonth": null,
      "indexed": true
    };

    this.setInputFieldFirstLevelArraySecondLevelObject({
      insurancePremiumRanges: [
        ...insurancePremiumRanges,
        newInsurancePremiumObject
      ]
    }, category, indexCategory, secondLevelCategory);
  }

  addInputBudgetField() {
    const { input } = this.state;
    const { budget } = input;


    const newBudgetObject = {
      "baseType": "",
      "name": "",
      "description": "",
      "budgetTypes": "",
      "id": "",
      "values": [
        {
          "yearStart": "",
          "yearEnd": "",
          "value": 0
        }
      ]
    };

    this.setInputFieldBaseLevel({
      budget: [
        ...budget,
        newBudgetObject
      ]
    });
  }
  addInputPayOutField(category, indexCategory) {
    const { input } = this.state;
    const { products } = input;
    const { payOutRanges } = products[indexCategory];

    const newPayOutObject = {
      "amount": "",
      "startYearMonth": "",
      "endYearMonth": ""
    };

    const modifiedPayOutRangesArray = [
      ...payOutRanges,
      newPayOutObject
    ];

    this.setInputFieldFirstLevelArray({
      payOutRanges: modifiedPayOutRangesArray
    }, category, indexCategory);

  }

  addInputEfterloenPeriodField() {
    const { input } = this.state;
    const { customer } = input;
    const { efterloenPeriods } = customer;

    const newEfterloenPeriodObject = {
      "startDate": "",
      "stopDate": "",
      "weeklyHours": ""
    };

    const modifiedEfterloenPeriodArray = [
      ...efterloenPeriods,
      newEfterloenPeriodObject
    ];

    this.setInputFieldFirstLevelObject({
      efterloenPeriods: modifiedEfterloenPeriodArray
    }, 'customer');
  }

  addChildrenField() {
    const { input } = this.state;
    const { customer } = input;
    const { children } = customer;
    const newChildren = {
      "name": "",
      "socialBenefitsReceiverId": "",
      "shareOfSocialBenefit": ""
    };

    const modifiedChildrenArray = [
      ...children,
      newChildren
    ];

    this.setInputFieldFirstLevelObject({
      children: modifiedChildrenArray
    }, 'customer');

  }

  validateNumber(type, field) {
    const { input } = this.state;
    const inputField = input[type][field];
    if (!inputField || isNaN(inputField)) {
      return 'error';
    }
    return 'success';
  }

  validateAssetCategoryPercentValue(index, field) {
    const { input } = this.state;
    const { core } = input;
    const { assetCategories } = core;
    const assetCategoryField = assetCategories[index][field];
    if (!assetCategoryField || isNaN(assetCategoryField)) {
      return 'error';
    }
    if (assetCategoryField > 1.0 || assetCategoryField < -1.0) {
      return 'error';
    }
    return 'success';
  }

  componentWillMount() {
    const pastInput = localStorage.getItem('wip-cal-lookup-input');
    if (pastInput) {
      this.setState({
        input: JSON.parse(pastInput)
      });
    }
  }

  setInputFieldBaseLevel(modifiedInput) {
    const { input } = this.state;

    this.setState({
      input: Object.assign({}, input, modifiedInput)
    });
  }

  setInputFieldFirstLevelObject(modifiedFieldInput, category) {
    const { input } = this.state;
    let modifiedInput = {};
    modifiedInput[category] = Object.assign({}, input[category], modifiedFieldInput);

    this.setInputFieldBaseLevel(modifiedInput);
  }

  setInputFieldFirstLevelArray(modifiedFieldInput, category, indexCategory) {
    const { input } = this.state;
    let modifiedInput = {};
    modifiedInput[category] = input[category].map((i, index) => {
      if (indexCategory !== index) {
        return i;
      }
      return Object.assign({}, i, modifiedFieldInput);
    });
    this.setInputFieldBaseLevel(modifiedInput);
  }

  setInputFieldFirstLevelObjectSecondLevelObject(modifiedFieldInput, category, subCategory) {
    const { input } = this.state;
    const categoryModifiedObject = {};

    categoryModifiedObject[subCategory] = Object.assign({}, input[category][subCategory], modifiedFieldInput);

    this.setInputFieldFirstLevelObject(categoryModifiedObject, category);
  }

  setInputFieldFirstLevelObjectSecondLevelArray(modifiedFieldInput, category, subCategory, indexSubCategory) {

    const { input } = this.state;
    let categoryModifiedObject = {};

    const subCategoryEntryArray = input[category][subCategory].map((i, index) => {
      if (index !== indexSubCategory) {
        return i;
      }
      return Object.assign({}, i, modifiedFieldInput);
    });
    categoryModifiedObject[subCategory] = subCategoryEntryArray;

    this.setInputFieldFirstLevelObject(categoryModifiedObject, category);
  }

  setInputFieldFirstLevelArraySecondLevelObject(modifiedFieldInput, category, index, subCategory) {
    const { input } = this.state;
    let subCategoryModifiedObject = {};
    subCategoryModifiedObject[subCategory] = Object.assign({}, input[category][index][subCategory], modifiedFieldInput);

    const modifiedSubCategoryObject = Object.assign({}, input[category][index], subCategoryModifiedObject);

    this.setInputFieldFirstLevelArray(modifiedSubCategoryObject, category, index)

  }

  setInputFieldFirstLevelArraySecondLevelObjectThirdLevelObject(modifiedFieldInput, category, indexCategory, secondLevelCategory, thirdLevelCategory) {
    const { input } = this.state;
    let thirdCategoryModifiedObject = {};

    thirdCategoryModifiedObject[thirdLevelCategory] = Object.assign({}, input[category][indexCategory][secondLevelCategory][thirdLevelCategory], modifiedFieldInput);

    this.setInputFieldFirstLevelArraySecondLevelObject(thirdCategoryModifiedObject, category, indexCategory, secondLevelCategory);

  }

  setInputFieldFirstLevelArraySecondLevelObjectThirdLevelArray(modifiedFieldInput, category, indexCategory, secondLevelCategory, thirdLevelCategory, thirdLevelCategoryIndex) {
    const { input } = this.state;
    let thirdLevelCategoryModifiedObject = {};
    const thirdLevelCategoryArray = input[category][indexCategory][secondLevelCategory][thirdLevelCategory].map((i, index) => {
      if (index !== thirdLevelCategoryIndex) {
        return i;
      }
      return Object.assign({}, i, modifiedFieldInput);
    });

    thirdLevelCategoryModifiedObject[thirdLevelCategory] = thirdLevelCategoryArray;
    this.setInputFieldFirstLevelArraySecondLevelObject(thirdLevelCategoryModifiedObject, category, indexCategory, secondLevelCategory);

  }

  setInputFieldFirstLevelArraySecondLevelArray(modifiedFieldInput, category, indexCategory, subCategory, indexSubCategory) {
    const { input } = this.state;
    let subCategoryModifiedObject = {};

    const subCategoryEntryArray = input[category][indexCategory][subCategory].map((i, index) => {
      if (index !== indexSubCategory) {
        return i;
      }
      return Object.assign({}, i, modifiedFieldInput);
    });

    subCategoryModifiedObject[subCategory] = subCategoryEntryArray;
    const modifiedSubCategoryObject = Object.assign({}, input[category][indexCategory], subCategoryModifiedObject);

    this.setInputFieldFirstLevelArray(modifiedSubCategoryObject, category, indexCategory);

  }

  showPreviousAndNextButton() {
    const { currentTab } = this.state;
    const disableNext = currentTab === 4; //don't show for final tab
    const disablePrevious = currentTab === 1;

    if (disableNext) {
      return (
        <Row>
          <Col sm={4}>
            <Button
              bsSize="large"
              disabled={disablePrevious}
              onClick={() => this.setState({
                currentTab: currentTab - 1
              })}>Previous</Button>
          </Col>
        </Row>
      )
    }

    if (disablePrevious) {
      return (
        <Row>

          <Col sm={1} smOffset={11}>
            <Button
              bsSize="large"
              disabled={disableNext}
              active
              onClick={() => this.setState({
                currentTab: currentTab + 1
              })}>Next</Button>
          </Col>
        </Row>
      )
    }
    return (
      <Row>
        <ButtonToolbar>
          <Col sm={4}>

            <Button
              bsSize="large"
              disabled={disablePrevious}
              onClick={() => this.setState({
                currentTab: currentTab - 1
              })}>Previous</Button>
          </Col>
          <Col sm={1} smOffset={7}>
            <Button
              bsSize="large"
              disabled={disableNext}
              active
              onClick={() => this.setState({
                currentTab: currentTab + 1
              })}>Next</Button>
          </Col>
        </ButtonToolbar>
      </Row>
    );
  }

  showSubmitAndResetButton() {
    const { currentTab, error } = this.state;
    const submitDisabled = error.length !== 0;
    const showSubmitAndReset = currentTab === 4; // only show for final tab
    if (showSubmitAndReset) {
      return (
        <Row>
          <Col sm={4} smOffset={2}>
            <ButtonToolbar>
              <Button
                bsStyle="primary"
                bsSize="large"
                disabled={submitDisabled}
                onClick={this
                  .goToBudget
                  .bind(this)}>Budget</Button>
              <Button
                bsStyle="info"
                bsSize="large"
                disabled={submitDisabled}
                onClick={this
                  .goToProductPrognosis
                  .bind(this)}>Prognosis</Button>
              <Button
                bsSize="large"
                bsStyle="warning"
                active
                onClick={this
                  .clearFormData
                  .bind(this)}>Clear</Button>
            </ButtonToolbar>
          </Col>
        </Row>
      );
    }
  }

  clearFormData() {
    localStorage.removeItem("wip-cal-lookup-input");
    this.setState({ input: emptyInputLookupObject(), showResetDialog: true });
  }

  saveInBrowserCacheAndSubmit() {
    const { submit } = this.props;
    const { input } = this.state;
    localStorage.setItem("wip-cal-lookup-input", JSON.stringify(input));
    submit(input);
  }

  goToProductPrognosis() {
    this.saveInBrowserCacheAndSubmit();
    const { router } = this.context;
    router.push('/output');
  }

  goToBudget() {
    this.saveInBrowserCacheAndSubmit();
    const { router } = this.context;
    router.push('/budget');
  }

  render() {
    const { setCalculatorURL, url, setCalculatorBudgetURL, urlBudget, debugYear, setDebugYear } = this.props;
    const { input, showResetDialog, currentTab, budgetTypes } = this.state;
    const { customer, products, country, inflation, budget } = input;
    return (
      <div>
        <Form horizontal>
          <Tabs
            activeKey={currentTab}
            onSelect={(key) => this.setState({ currentTab: key })}
            bsStyle="pills"
            id="primary">
            <Tab eventKey={1} title="Customer" tabClassName="calc-input-container">
              <CustomerDetails
                category="customer"
                customer={customer}
                validateEmpty={this
                  .validateEmpty
                  .bind(this)}
                validateNumber={this
                  .validateNumber
                  .bind(this)}
                addInputEfterloenPeriodField={this
                  .addInputEfterloenPeriodField
                  .bind(this)}
                addChildrenField={this
                  .addChildrenField
                  .bind(this)}
                setInputFieldFirstLevelObject={this
                  .setInputFieldFirstLevelObject
                  .bind(this)}
                setInputFieldFirstLevelObjectSecondLevelArray={this
                  .setInputFieldFirstLevelObjectSecondLevelArray
                  .bind(this)}
                setInputFieldFirstLevelObjectSecondLevelObject={this
                  .setInputFieldFirstLevelObjectSecondLevelObject
                  .bind(this)} />
            </Tab>
            <Tab eventKey={2} title="Products" tabClassName="calc-input-container">
              {products.map((i, index) => <Product
                category="products"
                subCategory="custody"
                pool="pool"
                data={i}
                key={index}
                index={index}
                isLast={index === (products.length - 1)}
                addInstrument={this
                  .addInstrument
                  .bind(this)}
                addPoolInstrument={this
                  .addPoolInstrument
                  .bind(this)}
                addInputProduct={this
                  .addInputProduct
                  .bind(this)}
                setInputFieldFirstLevelArray={this
                  .setInputFieldFirstLevelArray
                  .bind(this)}
                setInputFieldFirstLevelArraySecondLevelObject={this
                  .setInputFieldFirstLevelArraySecondLevelObject
                  .bind(this)}
                setInputFieldFirstLevelArraySecondLevelObjectThirdLevelArray={this
                  .setInputFieldFirstLevelArraySecondLevelObjectThirdLevelArray
                  .bind(this)}
                setInputFieldFirstLevelArraySecondLevelObjectThirdLevelObject={this
                  .setInputFieldFirstLevelArraySecondLevelObjectThirdLevelObject
                  .bind(this)}
                addInputPayInField={this
                  .addInputPayInField
                  .bind(this)}
                addInputPayOutField={this
                  .addInputPayOutField
                  .bind(this)}
                addInputInsurancePremiumField={this
                  .addInputInsurancePremiumField
                  .bind(this)}
                setInputFieldFirstLevelArraySecondLevelArray={this
                  .setInputFieldFirstLevelArraySecondLevelArray
                  .bind(this)} />)}
            </Tab>
            <Tab eventKey={3} title="Budget" tabClassName="calc-input-container">
              {displayBudget(budget, customer, 'budget', this.addInputBudgetField.bind(this), this.setInputFieldFirstLevelArray.bind(this), this.setInputFieldBaseLevel.bind(this), this.setInputFieldFirstLevelArraySecondLevelArray.bind(this), budgetTypes)}
            </Tab>
            <Tab eventKey={4} title="Session" tabClassName="calc-input-container">
              <Session
                country={country}
                customer={customer}
                inflation={inflation}
                setInputFieldBaseLevel={this
                  .setInputFieldBaseLevel
                  .bind(this)}
                setCalculatorURL={setCalculatorURL}
                sessionUrl={url}
                setCalculatorBudgetURL={setCalculatorBudgetURL}
                sessionBudgetUrl={urlBudget}
                setDebugYear={setDebugYear}
                debugYear={debugYear} />
            </Tab>

          </Tabs>
          <Reset
            show={showResetDialog}
            toggle={this
              .toggleReset
              .bind(this)} /> {this.showPreviousAndNextButton()}
          {this.showSubmitAndResetButton()}

        </Form>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InputLookUp);