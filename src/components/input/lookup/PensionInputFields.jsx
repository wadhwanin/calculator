import React, {PropTypes} from 'react';
import {FormGroup, FormControl, ControlLabel, HelpBlock, Col, Panel} from 'react-bootstrap';
import {displayinsurancePremiumRanges} from '../../../utils/insurance';



const PensionInputFields = (props) => {
  const {
    pensionDetailsDk,
    indexCategory,
    category,
    secondLevelCategory,
    setInputFieldFirstLevelArraySecondLevelObject,
    setInputFieldFirstLevelArraySecondLevelObjectThirdLevelArray,
    addInputInsurancePremiumField
  } = props;
  let pensionProductType,
    agreementType,
    accountNumber,
    isPartofEmployment,
    negativPalTaxFromPreviousYear,
    notAttributedReturn,
    insurancePremiumRanges;
  if (pensionDetailsDk) {
    pensionProductType = pensionDetailsDk.pensionProductType;
    agreementType = pensionDetailsDk.agreementType;
    accountNumber = pensionDetailsDk.accountNumber;
    isPartofEmployment = pensionDetailsDk.isPartofEmployment;
    negativPalTaxFromPreviousYear = pensionDetailsDk.negativPalTaxFromPreviousYear;
    notAttributedReturn = pensionDetailsDk.notAttributedReturn;
    insurancePremiumRanges = pensionDetailsDk.insurancePremiumRanges;
  }

  return (
    <div>
      <FormGroup controlId="pensionProductType">
        <Col componentClass={ControlLabel} sm={2}>
          Product Type
        </Col>
        <Col sm={6}>
          <FormControl
            componentClass="select"
            placeholder="Select Pension Product Type"
            defaultValue={pensionProductType}
            onChange={(e) => setInputFieldFirstLevelArraySecondLevelObject({
            pensionProductType: e.target.value
          }, category, indexCategory, secondLevelCategory)}>
            <option value="">--SELECT--</option>
            <option value="OLD_AGE_SAVINGS">Aldersopsparing</option>
            <option value="ENDOWMENT">Kapitalpension</option>
            <option value="PRIVATE">Selvpension</option>
            <option value="INSTALMENT">Ratepension</option>
            <option value="ANNUITY_COMPANY">Ophørspension (§15A)</option>
          </FormControl>
          <FormControl.Feedback/>
          <HelpBlock></HelpBlock>
        </Col>
      </FormGroup>
      <FormGroup controlId="agreementType">
        <Col componentClass={ControlLabel} sm={2}>
          Agreement Type
        </Col>
        <Col sm={6}>
          <FormControl
            componentClass="select"
            placeholder="Select Pension Agreement Type"
            defaultValue={agreementType}
            onChange={(e) => setInputFieldFirstLevelArraySecondLevelObject({
            agreementType: e.target.value
          }, category, indexCategory, secondLevelCategory)}>
            <option value="">--SELECT--</option>
            <option value="PRIVATE">Private</option>
            <option value="EMPLOYER">Employer</option>
            <option value="STATUTORY">Statutory</option>
          </FormControl>
          <FormControl.Feedback/>
          <HelpBlock></HelpBlock>
        </Col>
      </FormGroup>
      <FormGroup controlId="isPartofEmployment">
        <Col componentClass={ControlLabel} sm={2}>
          Is Part Of Employment
        </Col>
        <Col sm={6}>
          <FormControl
            componentClass="select"
            placeholder="Is Part Of Employment"
            defaultValue={isPartofEmployment}
            onChange={(e) => setInputFieldFirstLevelArraySecondLevelObject({
            isPartofEmployment: e.target.value === 'true'
          }, category, indexCategory, secondLevelCategory)}>
            <option value="">--SELECT--</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </FormControl>
          <FormControl.Feedback/>
          <HelpBlock></HelpBlock>
        </Col>
      </FormGroup>
      <FormGroup controlId="accountNumber">
        <Col componentClass={ControlLabel} sm={2}>
          Account Number
        </Col>
        <Col sm={6}>
          <FormControl
            type="text"
            defaultValue={accountNumber}
            placeholder="Enter pension account/agreement number"
            onChange={( e ) =>
            {
                setInputFieldFirstLevelArraySecondLevelObject( {
                  accountNumber: e.target.value
                }, category, indexCategory, secondLevelCategory )
              
            } } />
          <FormControl.Feedback />
          <HelpBlock>Account number</HelpBlock>
        </Col>
      </FormGroup>
      <FormGroup controlId="negativPalTaxFromPreviousYear">
        <Col componentClass={ControlLabel} sm={2}>
          Negative pal tax
        </Col>
        <Col sm={6}>
          <FormControl
            type="text"
            defaultValue={negativPalTaxFromPreviousYear}
            placeholder="Enter negative pal tax"
            onChange={(e) => {
            if (!isNaN(e.target.value)) {
              setInputFieldFirstLevelArraySecondLevelObject({
                negativPalTaxFromPreviousYear: parseFloat(e.target.value)
              }, category, indexCategory, secondLevelCategory)
            }
          }}/>
          <FormControl.Feedback/>
          <HelpBlock>Should be a number</HelpBlock>
        </Col>
      </FormGroup>

      <FormGroup controlId="notAttributedReturn">
        <Col componentClass={ControlLabel} sm={2}>
          Not attributed return
        </Col>
        <Col sm={6}>
          <FormControl
            type="text"
            defaultValue={notAttributedReturn}
            placeholder="Enter not attributed return"
            onChange={(e) => {
            if (!isNaN(e.target.value)) {
              setInputFieldFirstLevelArraySecondLevelObject({
                notAttributedReturn: parseFloat(e.target.value)
              }, category, indexCategory, secondLevelCategory)
            }
          }}/>
          <FormControl.Feedback/>
          <HelpBlock>Should be a number</HelpBlock>
        </Col>
      </FormGroup>

      <Panel header="Insurance Premium (Optional)" expanded={false} bsStyle="primary">
        {displayinsurancePremiumRanges(insurancePremiumRanges, addInputInsurancePremiumField, setInputFieldFirstLevelArraySecondLevelObjectThirdLevelArray, setInputFieldFirstLevelArraySecondLevelObject, category, indexCategory, secondLevelCategory, 'insurancePremiumRanges')}
      </Panel>


    </div>
  );

}

PensionInputFields.propTypes = {

  category: PropTypes.string.isRequired,
  indexCategory: PropTypes.number.isRequired,
  secondLevelCategory: PropTypes.string.isRequired,
  pensionDetailsDk: PropTypes.object,
  setInputFieldFirstLevelArraySecondLevelObject: PropTypes.func.isRequired,
  setInputFieldFirstLevelArraySecondLevelObjectThirdLevelArray: PropTypes.func.isRequired,
  addInputInsurancePremiumField: PropTypes.func.isRequired
}

export default PensionInputFields;