import React, {PropTypes} from 'react';
import {
  Button,
  FormGroup,
  FormControl,
  ControlLabel,
  HelpBlock,
  Col
} from 'react-bootstrap';
import {getYearMonthFromDate} from '../../../utils/util';
import {DateField} from 'react-date-picker';

const addButton = (isLast, addInputPayOutField, category, indexCategory) => {
  if (!isLast) {
    return;
  }
  return (
    <Col sm={1}>
      <Button onClick={() => addInputPayOutField(category, indexCategory)}>
        +</Button>
    </Col>
  )
}

const PayOut = (props) => {
  const {
    data,
    isLast,
    setInputFieldFirstLevelArraySecondLevelArray, setInputFieldFirstLevelArray,
    addInputPayOutField,
    category, indexCategory, subCategory, indexSubCategory
  } = props;
  let amount,
    startYearMonth,
    endYearMonth,
    indexed;
  if (data) {
    amount = data.amount;
    startYearMonth = `${data.startYearMonth}-01`;
    endYearMonth = `${data.endYearMonth}-01`;
    indexed = data.indexed;
  }

  return (
    <FormGroup controlId="amount">
      <Col componentClass={ControlLabel} sm={2}>
        Amount
      </Col>
      <Col sm={3}>
        <FormControl
          type="text"
          defaultValue={amount}
          placeholder="Enter pay out amount"
          onChange={(e) => {
          if (!data) {
            let newPayObject = {};
            const newPayOutArray = [
              {
                amount: e.target.value,
                "startYearMonth": "",
                "endYearMonth": ""
              }
            ];
            newPayObject[subCategory] = newPayOutArray;
            setInputFieldFirstLevelArray(newPayObject, category, indexCategory, subCategory, indexSubCategory);
          } else {
            setInputFieldFirstLevelArraySecondLevelArray( { amount: e.target.value }, category, indexCategory, subCategory, indexSubCategory)
          }
        }}/>
        <FormControl.Feedback/>
        <HelpBlock>Should be a number</HelpBlock>
      </Col>
      <Col sm={2}>
        <DateField
          dateFormat="YYYY-MM-DD"
          defaultValue={startYearMonth}
          onChange={(e) => setInputFieldFirstLevelArraySecondLevelArray({
          startYearMonth: getYearMonthFromDate(e)
        }, category, indexCategory, subCategory, indexSubCategory)}/>
        <FormControl.Feedback/>
        <HelpBlock>Enter start date</HelpBlock>
      </Col>
      <Col sm={2}>
        <DateField
          dateFormat="YYYY-MM-DD"
          defaultValue={endYearMonth}
          onChange={(e) => setInputFieldFirstLevelArraySecondLevelArray({
          endYearMonth: getYearMonthFromDate(e)
        }, category, indexCategory, subCategory, indexSubCategory)}/>
        <FormControl.Feedback/>
        <HelpBlock>
          Enter end date</HelpBlock>
      </Col>
      <Col sm={2}>
        <FormControl
          componentClass="select"
          placeholder="Indexed"
          defaultValue={indexed}
          onChange={(e) => setInputFieldFirstLevelArraySecondLevelArray({
          indexed: e.target.value === 'true'
        }, category, indexCategory, subCategory, indexSubCategory)}>
          <option value={false}>NO</option>
          <option value={true}>YES</option>
        </FormControl>
        <FormControl.Feedback/>
        <HelpBlock>Should be indexed?</HelpBlock>
      </Col>
      {addButton(isLast, addInputPayOutField, category, indexCategory)}
    </FormGroup>
  )
}

PayOut.propTypes = {
  category: PropTypes.string.isRequired,
  data: PropTypes.object,
  indexCategory: PropTypes.number.isRequired,
  subCategory: PropTypes.string.isRequired,
  indexSubCategory: PropTypes.number.isRequired,
  isLast: PropTypes.bool.isRequired,
  setInputFieldFirstLevelArray: PropTypes.func.isRequired,
  setInputFieldFirstLevelArraySecondLevelArray: PropTypes.func.isRequired,
  addInputPayOutField: PropTypes.func.isRequired
}

export default PayOut;