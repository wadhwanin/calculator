import React, {PropTypes} from 'react';
import {FormGroup, FormControl, ControlLabel, HelpBlock, Col, Panel} from 'react-bootstrap';
import {getYearMonthFromDate} from '../../../utils/util';
import {DateField} from 'react-date-picker';
function showPostponedFolkePensionFields(postponedFolkePension, postponedFolkePensionStart, postponedFolkePensionStop, setInputFieldFirstLevelObjectSecondLevelObject, category, subCategory) {
  if (!postponedFolkePension) {
    return;
  }

  return (
    <div>
      <FormGroup controlId="postponedFolkePensionStart">
        <Col componentClass={ControlLabel} sm={2}>
          Postponed FolkePension Start
        </Col>
        <Col sm={6}>
          <DateField
            dateFormat="YYYY-MM-DD"
            defaultValue={postponedFolkePensionStart}
            onChange={(v) => setInputFieldFirstLevelObjectSecondLevelObject({
            postponedFolkePensionStart: getYearMonthFromDate(v)
          }, category, subCategory)}/>
          <FormControl.Feedback/>
          <HelpBlock>Enter postponed Folke pension start date</HelpBlock>
        </Col>
      </FormGroup>
      <FormGroup controlId="postponedFolkePensionStop">
        <Col componentClass={ControlLabel} sm={2}>
          Postponed FolkePension Stop
        </Col>
        <Col sm={6}>
          <DateField
            dateFormat="YYYY-MM-DD"
            defaultValue={postponedFolkePensionStop}
            onChange={(v) => setInputFieldFirstLevelObjectSecondLevelObject({
            postponedFolkePensionStop: getYearMonthFromDate(v)
          }, category, subCategory)}/>
          <FormControl.Feedback/>
          <HelpBlock>Enter postponed Folke pension stop date</HelpBlock>
        </Col>
      </FormGroup>
    </div>
  );
}

const FolkePension = (props) => {
  const {data, category, subCategory, setInputFieldFirstLevelObjectSecondLevelObject} = props;
  let includeFolkePension,
    postponedFolkePension,
    postponedFolkePensionStart,
    postponedFolkePensionStop,
    includeFoertidsPension;

  if (data) {
    includeFolkePension = data.includeFolkePension;
    postponedFolkePension = data.postponedFolkePension;
    postponedFolkePensionStart = `${data.postponedFolkePensionStart}-01`;
    postponedFolkePensionStop = `${data.postponedFolkePensionStop}-01`;
    includeFoertidsPension = data.includeFoertidsPension;
  }
  return (
    <Panel header="Folke Pension" bsStyle="warning">
      <FormGroup controlId="includeFolkePension">
        <Col componentClass={ControlLabel} sm={2}>
          Include FolkePension?
        </Col>
        <Col sm={6}>
          <FormControl
            componentClass="select"
            placeholder="Include FolkePension"
            defaultValue={includeFolkePension}
            onChange={(e) => setInputFieldFirstLevelObjectSecondLevelObject({
            includeFolkePension: e.target.value
          }, category, subCategory)}>
            <option value="NO"></option>
            <option value="YES">YES</option>
            <option value="ONLY_GRUNDBELOB">Only grundbeløb</option>
            <option value="NO">NO</option>
          </FormControl>
          <FormControl.Feedback/>
          <HelpBlock></HelpBlock>
        </Col>
      </FormGroup>
      <FormGroup controlId="postponedFolkePension">
        <Col componentClass={ControlLabel} sm={2}>
          OpsatFolkepension
        </Col>
        <Col sm={6}>
          <FormControl
            componentClass="select"
            placeholder="OpsatFolkepension"
            defaultValue={postponedFolkePension}
            onChange={(e) => setInputFieldFirstLevelObjectSecondLevelObject({
            postponedFolkePension: e.target.value === 'true'
          }, category, subCategory)}>
            <option value=""></option>
            <option value={false}>NO</option>
            <option value={true}>YES</option>
          </FormControl>
          <FormControl.Feedback/>
          <HelpBlock></HelpBlock>
        </Col>
      </FormGroup>
      {showPostponedFolkePensionFields(postponedFolkePension, postponedFolkePensionStart, postponedFolkePensionStop, setInputFieldFirstLevelObjectSecondLevelObject, category, subCategory)}
      <FormGroup controlId="includeFoertidsPension">
        <Col componentClass={ControlLabel} sm={2}>
          Include førtidspension (rules after 2003)?
        </Col>
        <Col sm={6}>
          <FormControl
            componentClass="select"
            placeholder="Include førtidspension (rules after 2003)?"
            defaultValue={includeFoertidsPension}
            onChange={(e) => setInputFieldFirstLevelObjectSecondLevelObject({
            includeFoertidsPension: e.target.value === 'true'
          }, category, subCategory)}>
            <option value=""></option>
            <option value={false}>NO</option>
            <option value={true}>YES</option>
          </FormControl>
          <FormControl.Feedback/>
          <HelpBlock></HelpBlock>
        </Col>
      </FormGroup>
    </Panel>

  );

}

FolkePension.propTypes = {
  data: PropTypes.object,
  category: PropTypes.string.isRequired,
  subCategory: PropTypes.string.isRequired,
  setInputFieldFirstLevelObjectSecondLevelObject: PropTypes.func.isRequired
}

export default FolkePension;