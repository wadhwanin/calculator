import React, {PropTypes} from 'react';
import {FormGroup, FormControl, ControlLabel, HelpBlock, Col} from 'react-bootstrap';
import {getYearAndMonthObjectFromDate, incrementMonthAndMaybePrefix0} from '../../../utils/util';
import {DateField} from 'react-date-picker';


const Dissaving = (props) => {
  const {
    dissavingGoal,
    indexCategory,
    category,
    secondLevelCategory,
    setInputFieldFirstLevelArraySecondLevelObject
  } = props;
  let startYear,
    startMonth,
    startYearMonth,
    endYear,
    endMonth,
    endYearMonth,
    targetAmount;
  if (dissavingGoal) {
    startYear = dissavingGoal.startYear;
    startMonth = dissavingGoal.startMonth;
    startYearMonth = startMonth ? `${startYear}-${incrementMonthAndMaybePrefix0(startMonth)}-01` : `${startYear}-01-01`;
    endYear = dissavingGoal.endYear;
    endMonth = dissavingGoal.endMonth;
    endYearMonth = endMonth? `${endYear}-${incrementMonthAndMaybePrefix0(endMonth)}-01` : `${endYear}-01-01`;
    targetAmount = dissavingGoal.targetAmount;
  }

  return (
    <div>
      <FormGroup controlId="dissaving">
        <Col componentClass={ControlLabel} sm={2}>
          Dissaving Info (Optional)
        </Col>
        <Col sm={3}>
          <FormControl
            type="text"
            defaultValue={targetAmount}
            placeholder="Enter dissaving end value"
            onChange={(e) => {
            setInputFieldFirstLevelArraySecondLevelObject({
              targetAmount: e.target.value
            }, category, indexCategory, secondLevelCategory);
          }}/>
          <FormControl.Feedback/>
          <HelpBlock>Should be a number</HelpBlock>
        </Col>

        < Col sm={2}>
          <DateField
            dateFormat="YYYY-MM-DD"
            defaultValue={startYearMonth}
            onChange={(e) => {
            const {month, year} = getYearAndMonthObjectFromDate(e);
            setInputFieldFirstLevelArraySecondLevelObject({
              startYear: year,
              startMonth: month
            }, category, indexCategory, secondLevelCategory)
          }}/>
          <FormControl.Feedback/>
          <HelpBlock>Enter start date</HelpBlock>
        </Col>
        <Col sm={2}>
          <DateField
            dateFormat="YYYY-MM-DD"
            defaultValue={endYearMonth}
            onChange={(e) => {
            const {month, year} = getYearAndMonthObjectFromDate(e);
            setInputFieldFirstLevelArraySecondLevelObject({
              endYear: year,
              endMonth: month
            }, category, indexCategory, secondLevelCategory)
          }}/>
          <FormControl.Feedback/>
          <HelpBlock>Enter end date</HelpBlock>
        </Col>
      </FormGroup>
    </div>
  );

}

Dissaving.propTypes = {
  dissavingGoal: PropTypes.object,
  category: PropTypes.string.isRequired,
  indexCategory: PropTypes.number.isRequired,
  secondLevelCategory: PropTypes.string.isRequired,
  setInputFieldFirstLevelArraySecondLevelObject: PropTypes.func.isRequired
}

export default Dissaving;