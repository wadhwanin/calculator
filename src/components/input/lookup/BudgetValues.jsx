import React, { PropTypes } from 'react';
import { FormGroup, FormControl, ControlLabel, HelpBlock, Col } from 'react-bootstrap';
import { yearsDropDownInYears } from '../../../utils/util';

const BudgetValues = ( props ) =>
{
  const {data, indexCategory, indexSubCategory, category, customer, subCategory, setInputFieldFirstLevelArraySecondLevelArray} = props;
  let yearStart, yearEnd, value;
  if ( data )
  {
    yearStart = data.yearStart;
    yearEnd = data.yearEnd;
    value = data.value;
  }
  return (
    <FormGroup controlId="amountInKr">
      <Col componentClass={ControlLabel} sm={2}>
        Values
      </Col>
      <Col sm={2} >
        <FormControl
          componentClass="select"
          placeholder="Start Year"
          defaultValue={yearStart}
          onChange={( e ) => setInputFieldFirstLevelArraySecondLevelArray( { yearStart: e.target.value }, category, indexCategory, subCategory, indexSubCategory )}>
          <option value="" />
          {yearsDropDownInYears( customer )} >
        </FormControl> < FormControl.Feedback /> <HelpBlock>Enter start year</HelpBlock>
      </Col>
      <Col sm={2} >
        <FormControl
          componentClass="select"
          placeholder="End Year"
          defaultValue={yearEnd}
          onChange={( e ) => setInputFieldFirstLevelArraySecondLevelArray( { yearEnd: e.target.value }, category, indexCategory, subCategory, indexSubCategory )}>
          <option value="" />
          {yearsDropDownInYears( customer )} >
        </FormControl> < FormControl.Feedback /> <HelpBlock>Enter end year</HelpBlock>
      </Col>
      <Col sm={4}>
        <FormControl
          type="text"
          defaultValue={value}
          placeholder="Value"
          onChange={( e ) => setInputFieldFirstLevelArraySecondLevelArray( { value: e.target.value }, category, indexCategory, subCategory, indexSubCategory )} />
        <HelpBlock>Enter numeric value</HelpBlock>
      </Col>
    </FormGroup>
  );
}

BudgetValues.propTypes = {
  data: PropTypes.object,
  indexCategory: PropTypes.number.isRequired,
  indexSubCategory: PropTypes.number.isRequired,
  customer: PropTypes.object.isRequired,
  category: PropTypes.string.isRequired,
  subCategory: PropTypes.string.isRequired,
  isLast: PropTypes.bool.isRequired,
  setInputFieldFirstLevelArraySecondLevelArray: PropTypes.func.isRequired
}

export default BudgetValues;        