import React, {PropTypes} from 'react';
import {
  FormGroup,
  FormControl,
  ControlLabel,
  HelpBlock,
  Col,
  Panel
} from 'react-bootstrap';
import {DateField} from 'react-date-picker';
import 'react-date-picker/index.css';
import EfterloenPeriod from './EfterloenPeriod';
import {formatDate, setDate} from '../../../utils/util';
import FolkePension from './FolkePension';
import Children from './Children';

function displayEfterloenPeriods(periods, category, setInputFieldFirstLevelObject, addInputEfterloenPeriodField, setInputFieldFirstLevelObjectSecondLevelArray) {
  if (!periods) {
    return (<EfterloenPeriod
      category={category}
      subCategory="efterloenPeriods"
      key={0}
      index={0}
      isLast={true}
      addInputEfterloenPeriodField={addInputEfterloenPeriodField}
      setInputFieldFirstLevelObject={setInputFieldFirstLevelObject}
      setInputFieldFirstLevelObjectSecondLevelArray={setInputFieldFirstLevelObjectSecondLevelArray}/>);
  }
  return periods.map((i, index) => <EfterloenPeriod
    category={category}
    subCategory="efterloenPeriods"
    data={i}
    key={index}
    index={index}
    isLast={index === (periods.length - 1)}
    addInputEfterloenPeriodField={addInputEfterloenPeriodField}
    setInputFieldFirstLevelObject={setInputFieldFirstLevelObject}
    setInputFieldFirstLevelObjectSecondLevelArray={setInputFieldFirstLevelObjectSecondLevelArray}/>);
}

function displayChildren(children, category, setInputFieldFirstLevelObject, addChildrenField, setInputFieldFirstLevelObjectSecondLevelArray) {
  if (!children){

    return(<Children
        category={category}
        subCategory="children"
        key={0}
        index={0}
        isLast={true}
        addChildrenField={addChildrenField}
        setInputFieldFirstLevelObject={setInputFieldFirstLevelObject}
        setInputFieldFirstLevelObjectSecondLevelArray={setInputFieldFirstLevelObjectSecondLevelArray}/>
    )
  }

  return(children.map((i, index) => <Children
      category={category}
      subCategory="children"
      data={i}
      key={index}
      index={index}
      isLast={index === (children.length - 1)}
      addChildrenField={addChildrenField}
      setInputFieldFirstLevelObject={setInputFieldFirstLevelObject}
      setInputFieldFirstLevelObjectSecondLevelArray={setInputFieldFirstLevelObjectSecondLevelArray}/>
    )
  )
}

const CustomerDetails = (props) => {

  const {
    category,
    customer,
    validateEmpty,
    validateNumber,
    addInputEfterloenPeriodField,
    addChildrenField,
    setInputFieldFirstLevelObject,
    setInputFieldFirstLevelObjectSecondLevelArray,
    setInputFieldFirstLevelObjectSecondLevelObject
  } = props;
  const {
    birthDate,
    lifeExpectancy,
    yearsInCountry,
    maritalStatus,
    churchTax,
    municipalityCode,
    efterlonFleksydelse,
    efterloenStart,
    efterloenStop,
    efterloenPeriods,
    folkePensionFields,
    children
  } = customer;
  const dateString = formatDate(birthDate);

  return (
    <div className="calc-input-container">
      <FormGroup
        controlId="birthDate"
        validationState={validateEmpty(category, 'birthDate')}>
        <Col componentClass={ControlLabel} sm={2}>
          Birth Date
        </Col>
        <Col sm={6}>
          <DateField
            defaultValue={dateString}
            dateFormat="MM/DD/YYYY"
            onChange={(v) => setInputFieldFirstLevelObject({
            birthDate: setDate(v)
          }, category)}/>
        </Col>
      </FormGroup>

      <FormGroup
        controlId="lifeExpectancy"
        validationState={validateNumber(category, 'lifeExpectancy')}>
        <Col componentClass={ControlLabel} sm={2}>
          Life Expectancy
        </Col>
        <Col sm={6}>
          <FormControl
            type="text"
            defaultValue={lifeExpectancy}
            placeholder="Enter lifeExpectancy"
            onChange={(e) => {
            if (!isNaN(e.target.value)) {
              setInputFieldFirstLevelObject({
                lifeExpectancy: parseInt(e.target.value, 10)
              }, category)
            }
          }}/>
          <FormControl.Feedback/>
          <HelpBlock>Should be a number</HelpBlock>
        </Col>
      </FormGroup>
       <FormGroup
        controlId="yearsInCountry"
        validationState={validateNumber(category, 'yearsInCountry')}>
        <Col componentClass={ControlLabel} sm={2}>
          Years lived in country
        </Col>
        <Col sm={6}>
          <FormControl
            type="text"
            defaultValue={yearsInCountry}
            placeholder="Enter years lived in country"
            onChange={(e) => {
            if (!isNaN(e.target.value)) {
              setInputFieldFirstLevelObject({
                yearsInCountry: parseInt(e.target.value, 10)
              }, category)
            }
          }}/>
          <FormControl.Feedback/>
          <HelpBlock>Minimum 1 and Maximum 40</HelpBlock>
        </Col>
      </FormGroup>

      <FormGroup controlId="maritalStatus">
        <Col componentClass={ControlLabel} sm={2}>
          Marital Status
        </Col>
        <Col sm={6}>
          <FormControl
            componentClass="select"
            placeholder="Select marital status"
            defaultValue={maritalStatus}
            onChange={(e) => setInputFieldFirstLevelObject({
            maritalStatus: e.target.value
          }, category)}>
            <option value="SINGLE">SINGLE</option>
            <option value="MARRIED">MARRIED</option>
            <option value="COHABITANT">COHABITANT</option>
          </FormControl>
          <FormControl.Feedback/>
          <HelpBlock></HelpBlock>
        </Col>
      </FormGroup>

      <FormGroup controlId="churchTax">
        <Col componentClass={ControlLabel} sm={2}>
          Church Tax
        </Col>
        <Col sm={6}>
          <FormControl
            componentClass="select"
            placeholder="Select Church Tax"
            defaultValue={churchTax}
            onChange={(e) => setInputFieldFirstLevelObject({
            churchTax: e.target.value === 'true'
          }, category)}>
            <option value={false}>NO</option>
            <option value={true}>YES</option>
          </FormControl>
          <FormControl.Feedback/>
          <HelpBlock></HelpBlock>
        </Col>
      </FormGroup>
      <FormGroup
        controlId="municipalityCode"
        validationState={validateNumber(category, 'municipalityCode')}>
        <Col componentClass={ControlLabel} sm={2}>
          Municipality Code
        </Col>
        <Col sm={6}>
          <FormControl
            type="text"
            value={municipalityCode}
            placeholder="Enter Municipality Code"
            onChange={(e) => setInputFieldFirstLevelObject({
            municipalityCode: e.target.value
          }, category)}/>
          <FormControl.Feedback/>
          <HelpBlock>Enter numeric muncipality code. For example 101 for København, 169
            for Høje Taastrup</HelpBlock>
        </Col>
      </FormGroup>
      <FolkePension
        category={category}
        subCategory="folkePensionFields"
        data={folkePensionFields}
        setInputFieldFirstLevelObjectSecondLevelObject={setInputFieldFirstLevelObjectSecondLevelObject}/>
      <Panel header="Efterloen" bsStyle="success">
        <FormGroup controlId="efterlonFleksydelse">
          <Col componentClass={ControlLabel} sm={2}>
            Early Retirement
          </Col>
          <Col sm={6}>
            <FormControl
              componentClass="select"
              placeholder="Select Early Retirement"
              defaultValue={efterlonFleksydelse}
              onChange={(e) => setInputFieldFirstLevelObject({
              efterlonFleksydelse: e.target.value
            }, category)}>
              <option value="NO">NO</option>
              <option value="EFTERLON_HELTID">EFTERLON_HELTID</option>
              <option value="EFTERLON_DELTID">EFTERLON_DELTID</option>
              <option value="FLEKSYDELSE">FLEKSYDELSE</option>
            </FormControl>
            <FormControl.Feedback/>
            <HelpBlock></HelpBlock>
          </Col>
        </FormGroup>

        <FormGroup
          controlId="efterloenStart"
          validationState={validateEmpty(category, 'efterloenStart')}>
          <Col componentClass={ControlLabel} sm={2}>
            Efterloen start (Optional)
          </Col>
          <Col sm={6}>
            <DateField
              dateFormat="MM/DD/YYYY"
              defaultValue={formatDate(efterloenStart)}
              onChange={(v) => setInputFieldFirstLevelObject({
              efterloenStart: setDate(v)
            }, category)}/>
            <FormControl.Feedback/>
            <HelpBlock>Customer wish to start receiving Efterloen</HelpBlock>
          </Col>
        </FormGroup>
        <FormGroup
          controlId="efterloenStop"
          validationState={validateEmpty(category, 'efterloenStop')}>
          <Col componentClass={ControlLabel} sm={2}>
            Efterloen stop (Optional)
          </Col>
          <Col sm={6}>
            <DateField
              dateFormat="MM/DD/YYYY"
              defaultValue={formatDate(efterloenStop)}
              onChange={(v) => setInputFieldFirstLevelObject({
              efterloenStop: setDate(v)
            }, category)}/>
            <FormControl.Feedback/>
            <HelpBlock>Customer wish to stop receiving Efterloen</HelpBlock>
          </Col>
        </FormGroup>
        <Panel header="Efterloen Period (Optional)" bsStyle="primary">
          {displayEfterloenPeriods(efterloenPeriods, category, setInputFieldFirstLevelObject, addInputEfterloenPeriodField, setInputFieldFirstLevelObjectSecondLevelArray)}
        </Panel>
      </Panel>
      <Panel header="Children (Optional)" bsStyle="info">
        {displayChildren(children, category, setInputFieldFirstLevelObject, addChildrenField, setInputFieldFirstLevelObjectSecondLevelArray)}
      </Panel>
    </div>

  );

};

CustomerDetails.propTypes = {
  category: PropTypes.string.isRequired,
  customer: PropTypes.object.isRequired,
  validateEmpty: PropTypes.func.isRequired,
  validateNumber: PropTypes.func.isRequired,
  addInputEfterloenPeriodField: PropTypes.func.isRequired,
  addChildrenField: PropTypes.func.isRequired,
  setInputFieldFirstLevelObject: PropTypes.func.isRequired,
  setInputFieldFirstLevelObjectSecondLevelObject: PropTypes.func.isRequired,
  setInputFieldFirstLevelObjectSecondLevelArray: PropTypes.func.isRequired
}

export default CustomerDetails;