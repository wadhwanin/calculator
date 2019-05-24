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

const addButton = (isLast, addInputInsurancePremiumField, category, indexCategory, secondLevelCategory) => {
  if (!isLast) {
    return;
  }
  return (
    <Col sm={1}>
      <Button onClick={() => addInputInsurancePremiumField(category, indexCategory, secondLevelCategory)}>
        +</Button>
    </Col>
  )
}

const InsurancePremium = (props) => {
  const {
    data,
    isLast,
    setInputFieldFirstLevelArraySecondLevelObjectThirdLevelArray, setInputFieldFirstLevelArraySecondLevelObject, category, indexCategory, secondLevelCategory, thirdLevelCategory,
    indexThirdLevelCategory,
    addInputInsurancePremiumField
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
  } else {
    startYearMonth = `${new Date().getFullYear()}-01-01`;
    indexed = true;
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
          placeholder="Yearly Insurance Premium"
          onChange={(e) => {
          if (!data) {
            let newInsurancePremiumObject = {};
            const newInsurancePremiumArray = [
              {
                amount: e.target.value,
                "startYearMonth": `${new Date().getFullYear()}-01`,
                "endYearMonth": null,
                "indexed": true
              }
            ];
            newInsurancePremiumObject[thirdLevelCategory] = newInsurancePremiumArray;
            setInputFieldFirstLevelArraySecondLevelObject(newInsurancePremiumObject, category, indexCategory, secondLevelCategory);
          } else {
            setInputFieldFirstLevelArraySecondLevelObjectThirdLevelArray({
              amount: e.target.value
            }, category, indexCategory, secondLevelCategory, thirdLevelCategory,    indexThirdLevelCategory)
          }
        }}/>
        <FormControl.Feedback/>
        <HelpBlock>Should be a number</HelpBlock>
      </Col>
      <Col sm={2}>
        <DateField
          dateFormat="YYYY-MM-DD"
          defaultValue={startYearMonth}
          onChange={(e) => setInputFieldFirstLevelArraySecondLevelObjectThirdLevelArray({
          startYearMonth: getYearMonthFromDate(e)
        }, category, indexCategory, secondLevelCategory, thirdLevelCategory,    indexThirdLevelCategory)}/>
        <FormControl.Feedback/>
        <HelpBlock>Enter start date</HelpBlock>
      </Col>
      <Col sm={2}>
        <DateField
          dateFormat="YYYY-MM-DD"
          defaultValue={endYearMonth}
          onChange={(e) => setInputFieldFirstLevelArraySecondLevelObjectThirdLevelArray({
          endYearMonth: getYearMonthFromDate(e)
        }, category, indexCategory, secondLevelCategory, thirdLevelCategory,    indexThirdLevelCategory)}/>
        <FormControl.Feedback/>
        <HelpBlock>
          Enter end date</HelpBlock>
      </Col>
      <Col sm={2}>
        <FormControl
          componentClass="select"
          placeholder="Indexed"
          defaultValue={indexed}
          onChange={(e) => setInputFieldFirstLevelArraySecondLevelObjectThirdLevelArray({
          indexed: e.target.value === 'true'
        }, category, indexCategory, secondLevelCategory, thirdLevelCategory,    indexThirdLevelCategory)}>
          <option value={true}>YES</option>
          <option value={false}>NO</option>
        </FormControl>
        <FormControl.Feedback/>
        <HelpBlock>Follow Inflation?</HelpBlock>
      </Col>
      {addButton(isLast, addInputInsurancePremiumField, category, indexCategory, secondLevelCategory)}
    </FormGroup>
  )
}

InsurancePremium.propTypes = {
  category: PropTypes.string.isRequired,
  data: PropTypes.object,
  indexCategory: PropTypes.number.isRequired,
  secondLevelCategory: PropTypes.string.isRequired,
  thirdLevelCategory: PropTypes.string.isRequired,
  indexThirdLevelCategory: PropTypes.number.isRequired,
  isLast: PropTypes.bool.isRequired,
  setInputFieldFirstLevelArraySecondLevelObject: PropTypes.func.isRequired,
  setInputFieldFirstLevelArraySecondLevelObjectThirdLevelArray: PropTypes.func.isRequired,
  addInputInsurancePremiumField: PropTypes.func.isRequired
}

export default InsurancePremium;