import React, {PropTypes} from 'react';
import {FormGroup, FormControl, ControlLabel, Col, Button} from 'react-bootstrap';
import {DateField} from 'react-date-picker';
import {formatDate, setDate} from '../../../utils/util';

const addButton = (isLast, addInputEfterloenPeriodField) => {
  if (!isLast) {
    return;
  }
  return (
    <Col sm={1}>
      <Button onClick={() => addInputEfterloenPeriodField()}>
        +</Button>
    </Col>
  )
}

const EfterloenPeriod = (props) => {
  const {
    data,
    index,
    isLast,
    category,
    subCategory,
    addInputEfterloenPeriodField,
    setInputFieldFirstLevelObject,
    setInputFieldFirstLevelObjectSecondLevelArray
  } = props;
  let startDate,
    stopDate,
    weeklyHours;
  if (data) {
    startDate = formatDate(data.startDate);
    stopDate = formatDate(data.stopDate);
    weeklyHours = data.weeklyHours;
  }

  return (
    <div>
      <FormGroup controlId="dissaving">
        <Col componentClass={ControlLabel} sm={2}>
          Start
        </Col>
        <Col sm={2}>
          <DateField
            dateFormat="MM/DD/YYYY"
            defaultValue={startDate}
            onChange={(v) => {
              
            if (!data) {
              let newEfterloenPeriodObject = {};
              const newEfterloenPeriodArray = [
                {
                  "startDate": setDate(v),
                  "stopDate": "",
                  "weeklyHours": ""
                }
              ];
              newEfterloenPeriodObject[subCategory] = newEfterloenPeriodArray;
              setInputFieldFirstLevelObject(newEfterloenPeriodObject, category);
            } else {
              setInputFieldFirstLevelObjectSecondLevelArray({
                startDate: setDate(v)
              }, category, subCategory, index);
            }
          }}/>
        </Col>
        <Col componentClass={ControlLabel} sm={2}>
          Stop
        </Col>
        <Col sm={2}>
          <DateField
            dateFormat="MM/DD/YYYY"
            defaultValue={stopDate}
            onChange={(v) => setInputFieldFirstLevelObjectSecondLevelArray({
            stopDate: setDate(v)
          }, category, subCategory, index)}/>
        </Col>

        <Col sm={3}>
          <FormControl
            type="text"
            defaultValue={weeklyHours}
            placeholder="Enter weekly hours worked"
            onChange={(e) => {
            if (!isNaN(e.target.value)) {
              setInputFieldFirstLevelObjectSecondLevelArray({
                weeklyHours: parseInt(e.target.value, 10)
              }, category, subCategory, index)
            }
          }}/>
        </Col>
        {addButton(isLast, addInputEfterloenPeriodField)}
      </FormGroup>
    </div>
  );

}

EfterloenPeriod.propTypes = {
  data: PropTypes.object,
  index: PropTypes.number.isRequired,
  isLast: PropTypes.bool.isRequired,
  category: PropTypes.string.isRequired,
  subCategory: PropTypes.string.isRequired,
  addInputEfterloenPeriodField: PropTypes.func.isRequired,
  setInputFieldFirstLevelObject: PropTypes.func.isRequired,
  setInputFieldFirstLevelObjectSecondLevelArray: PropTypes.func.isRequired
}

export default EfterloenPeriod;