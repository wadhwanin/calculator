import React, { PropTypes } from 'react';
import {
  Button,
  FormGroup,
  FormControl,
  ControlLabel,
  HelpBlock,
  Col,
  Panel
} from 'react-bootstrap';

import BudgetValues from './BudgetValues';

const addButton = (isLast, addInputBudgetField) => {
  if (!isLast) {
    return;
  }
  return (
    <Col lg={2} lgOffset={2}>
      <Button bsStyle="info" onClick={() => addInputBudgetField()}>Add another budget entry
      </Button>
    </Col>
  );

}
function displayValues(values, customer, category, subCategory, setInputFieldFirstLevelArraySecondLevelArray, indexCategory) {

  if (!values) {
    return (<BudgetValues
      category={category}
      customer={customer}
      subCategory={subCategory}
      key={0}
      indexCategory={0}
      indexSubCategory={0}
      isLast={true}
      setInputFieldFirstLevelArraySecondLevelArray={setInputFieldFirstLevelArraySecondLevelArray} />);
  }
  return values.map((i, index) => <BudgetValues
    category={category}
    customer={customer}
    subCategory={subCategory}
    data={i}
    key={index}
    indexCategory={indexCategory}
    indexSubCategory={index}
    isLast={index === (values.length - 1)}
    setInputFieldFirstLevelArraySecondLevelArray={setInputFieldFirstLevelArraySecondLevelArray} />);
}

const Budget = (props) => {
  const {
    data,
    index,
    isLast,
    customer,
    setInputFieldFirstLevelArray,
    setInputFieldFirstLevelArraySecondLevelArray,
    setInputFieldBaseLevel,
    addInputBudgetField,
    category,
    budgetTypes
  } = props;

  let baseType,
    name,
    description,
    id,
    budgetType,
    values;

  if (data) {
    baseType = data.baseType;
    name = data.name;
    description = data.description;
    id = data.id;
    values = data.values;
    budgetType = data.budgetType;
  }

  const heading = `Add budget # ${index + 1}`;
  return (
    <div>
      <Panel
        header={heading}
        collapsible={true}
        defaultExpanded={true}
        bsStyle="warning"
        eventKey={index}>
        <FormGroup controlId="budgetType">
          <Col componentClass={ControlLabel} sm={2}>
            Budget
          </Col>
          <Col sm={6}>
            <FormControl
              componentClass="select"
              placeholder="Select Budget Type"
              value={budgetType}
              onChange={(e) => {
                if (!data) {
                  let newBudgetObject = {};
                  const newBudgetArray = [
                    {
                      "baseType": "",
                      "budgetType": e.target.value,
                      "name": "",
                      "description": "",
                      "id": "",
                      "values": [
                        {
                          "yearStart": "",
                          "yearEnd": "",
                          "value": 0
                        }
                      ]
                    }
                  ];
                  newBudgetObject[category] = newBudgetArray;
                  setInputFieldBaseLevel(newBudgetObject);
                } else {
                  setInputFieldFirstLevelArray({
                    budgetType: e.target.value
                  }, category, index)
                }
              }}>
              <option value=""></option>
              {budgetTypes.map((v, index) => { return <option key={index} value={v.budgetType}>{v.name}</option> })}
            </FormControl>
            <FormControl.Feedback />
            <HelpBlock></HelpBlock>
          </Col>
        </FormGroup>
        <FormGroup controlId="baseType">
          <Col componentClass={ControlLabel} sm={2}>
            Base Type
          </Col>
          <Col sm={6}>
            <FormControl
              componentClass="select"
              placeholder="Select Base Type"
              defaultValue={baseType}
              onChange={(e) => {
                if (!data) {
                  let newBudgetObject = {};
                  const newBudgetArray = [
                    {
                      "baseType": e.target.value,
                      "budgetType": "",
                      "name": "",
                      "description": "",
                      "id": "",
                      "values": [
                        {
                          "yearStart": "",
                          "yearEnd": "",
                          "value": 0
                        }
                      ]
                    }
                  ];
                  newBudgetObject[category] = newBudgetArray;
                  setInputFieldBaseLevel(newBudgetObject);
                } else {
                  setInputFieldFirstLevelArray({
                    baseType: e.target.value
                  }, category, index)
                }
              }}>
              <option value=""></option>
              <option value="INCOME">Income</option>
              <option value="EXPENSE">Expense</option>
            </FormControl>
            <FormControl.Feedback />
            <HelpBlock></HelpBlock>
          </Col>
        </FormGroup>
        <FormGroup controlId="id">
          <Col componentClass={ControlLabel} sm={2}>
            Id
          </Col>
          <Col sm={6}>
            <FormControl
              type="text"
              defaultValue={id}
              placeholder="Enter budget id"
              onChange={(e) => setInputFieldFirstLevelArray({
                id: e.target.value
              }, category, index)} />
            <HelpBlock>Enter any numeric id</HelpBlock>
          </Col>
        </FormGroup>

        <FormGroup controlId="name">
          <Col componentClass={ControlLabel} sm={2}>
            Name
          </Col>
          <Col sm={6}>
            <FormControl
              type="text"
              defaultValue={name}
              placeholder="Enter budget name"
              onChange={(e) => setInputFieldFirstLevelArray({
                name: e.target.value
              }, category, index)} />
            <HelpBlock>What would you like to call this budget?</HelpBlock>
          </Col>
        </FormGroup>

        <FormGroup controlId="description">
          <Col componentClass={ControlLabel} sm={2}>
            Description
          </Col>
          <Col sm={6}>
            <FormControl
              type="text"
              defaultValue={description}
              placeholder="Enter budget description"
              onChange={(e) => setInputFieldFirstLevelArray({
                description: e.target.value
              }, category, index)} />
            <HelpBlock>Short description about budget such as 'SALARY'</HelpBlock>
          </Col>
        </FormGroup>
        {displayValues(values, customer, category, "values", setInputFieldFirstLevelArraySecondLevelArray, index)}

        {addButton(isLast, addInputBudgetField)}
      </Panel>

    </div>
  );
}

Budget.propTypes = {
  category: PropTypes.string.isRequired,
  data: PropTypes.object,
  index: PropTypes.number.isRequired,
  isLast: PropTypes.bool.isRequired,
  customer: PropTypes.object.isRequired,
  setInputFieldBaseLevel: PropTypes.func.isRequired,
  setInputFieldFirstLevelArray: PropTypes.func.isRequired,
  addInputBudgetField: PropTypes.func.isRequired,
  setInputFieldFirstLevelArraySecondLevelArray: PropTypes.func.isRequired
}

export default Budget;