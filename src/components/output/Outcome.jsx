import React, {PropTypes} from 'react';
import {Table, Panel} from 'react-bootstrap';
import {FormattedNumber} from 'react-intl';
import {roundOff} from '../../utils/util';

function getAttributeValueFromCategory(a, category, attribute) {
  if (Array.isArray(a)) {
    let c = a.map(b => b.assetCategoryPrognoses.filter(b => {
      const assetClass = b.taxClass || b.assetClass;
      return assetClass === category;
    }).map(b => b[attribute]).reduce((prev, curr) => {
      return prev + curr;
    }, 0));
    if (Array.isArray(c)) {
      return c.reduce((prev, curr) => {
        return prev + curr;
      }, 0);
    } else 
      return c;
    }
  else 
    return 0;
  }

/* TODO: This function will be removed after adding the age to the toplevel object */
function displayAge(freeAssetSummary, pensionSummary) {
  if (Array.isArray(freeAssetSummary.prognoses)) {

    return freeAssetSummary.prognoses[0].age;
  } else if (Array.isArray(pensionSummary.prognoses)) {

    return pensionSummary.prognoses[0].age;
  } else {
    return 0;
  }
}

function sumAtribute(a, attribute) {
  if (!Array.isArray(a) || !attribute.length) 
    return 0;
  
  if (Array.isArray(a)) {

    return a.reduce((s, val) => {
      return s + val[attribute]
    }, 0);
  }
}

function calculateSecondLevel(a, b, category, attribute) {
  let aSum,
    bSum,
    totatl = 0;

  if (Array.isArray(a)) 
    aSum = getAttributeValueFromCategory(a, category, attribute);
  if (Array.isArray(b)) 
    bSum = getAttributeValueFromCategory(b, category, attribute);
  
  if (typeof aSum === 'number') 
    totatl += aSum;
  if (typeof bSum === 'number') 
    totatl += bSum;
  
  return totatl;
}

function calculateSecondLevelSingleType(yearly, category, attribute) {
  if (Array.isArray(yearly)) 
    return getAttributeValueFromCategory(yearly, category, attribute) || 0;
  }

function calculate(a, b, attribute) {
  return sumAtribute(a, attribute) + sumAtribute(b, attribute);
}

function calculateSingleType(yearlyPrognoses, attribute) {
  return sumAtribute(yearlyPrognoses, attribute);
}

function renderPensionColumn(isPensionCustody, columnValue) {
  if (!isPensionCustody) {
    return;
  }
  return (
    <td><FormattedNumber value={roundOff(columnValue)}/></td>
  );
}

function renderFreeAssetColumn(isPensionCustody, columnValue) {
  if (isPensionCustody) {
    return;
  }
  return (
    <td><FormattedNumber value={roundOff(columnValue)}/></td>
  );
}

// Print the final table with the result
function printOutput(yearlyPrognoses, isPensionCustody) {
  return yearlyPrognoses.map(i => {
    const {year, freeAssetSummary, pensionSummary} = i;
    return (
      <tr key={year} className="align-right">
        <td>{year}</td>
        <td>{displayAge(freeAssetSummary, pensionSummary)}</td>
        <td>
          <FormattedNumber
            value={roundOff(calculate(freeAssetSummary.prognoses, pensionSummary.prognoses, 'startValue'))}/>
        </td>
        {renderPensionColumn(isPensionCustody, calculateSingleType(pensionSummary.prognoses, 'insurancePremiumValue'))}
        <td>
          <FormattedNumber value={roundOff(calculate(freeAssetSummary.prognoses, pensionSummary.prognoses, 'payInValue'))}/>
        </td>
        <td>
          <FormattedNumber value={roundOff(calculate(freeAssetSummary.prognoses, pensionSummary.prognoses, 'payOutFutureValue'))}/>
        </td>
        <td>
          <FormattedNumber value={roundOff(calculate(freeAssetSummary.prognoses, pensionSummary.prognoses, 'payOutPresentValue'))}/>
        </td>
        <td>
          <FormattedNumber value={roundOff(calculate(freeAssetSummary.prognoses, pensionSummary.prognoses, 'dissavingFutureValue'))}/>
        </td>
        <td>
          <FormattedNumber value={roundOff(calculate(freeAssetSummary.prognoses, pensionSummary.prognoses, 'dissavingPresentValue'))}/>
        </td>
        <td>
          <FormattedNumber value={roundOff(calculateSecondLevel(freeAssetSummary.prognoses, pensionSummary.prognoses, 'CAPITAL_INCOME', 'netReturnB4Tax'))}/>
        </td>
        {renderFreeAssetColumn(isPensionCustody, calculateSecondLevelSingleType(freeAssetSummary.prognoses, 'CAPITAL_INCOME', 'taxAmount'))}
        <td>
          <FormattedNumber value={roundOff(calculateSecondLevel(freeAssetSummary.prognoses, pensionSummary.prognoses, 'EQUITIES', 'netReturnB4Tax'))}/>
        </td>
        {renderPensionColumn(isPensionCustody, calculateSingleType(pensionSummary.prognoses, 'negativePalTaxBalance'))}
        {renderPensionColumn(isPensionCustody, calculateSingleType(pensionSummary.prognoses, 'possiblePalTax'))}
        {renderPensionColumn(isPensionCustody, calculateSingleType(pensionSummary.prognoses, 'actualTax'))}
        {renderFreeAssetColumn(isPensionCustody, calculateSecondLevelSingleType(freeAssetSummary.prognoses, 'EQUITIES', 'taxAmount'))}
        {renderFreeAssetColumn(isPensionCustody, calculateSingleType(freeAssetSummary.prognoses, 'netReturnAfterTax'))}
        <td>
          <FormattedNumber value={roundOff(calculate(freeAssetSummary.prognoses, pensionSummary.prognoses, 'endValue'))}/></td>
        <td>
          <FormattedNumber value={roundOff(calculate(freeAssetSummary.prognoses, pensionSummary.prognoses, 'presentValue'))}/></td>
      </tr>
    );
  });
}

const renderPensionHeader = (isPensionCustody, headerPension) => {
  if (!isPensionCustody) {
    return;
  }
  return <th>{headerPension}</th>;
}

const renderFreeAssetHeader = (isPensionCustody, headerFreeAsset) => {
  if (isPensionCustody) {
    return;
  }
  return <th>{headerFreeAsset}</th>;
}

const isProductTypePension = (type) => {

  return (type === 'pension')
}

const Outcome = (props) => {
  const {yearlyPrognoses} = props;
  const {productType} = props;
  const isPensionCustody = isProductTypePension(productType);

  return (
    <Panel header='Calculation Result' bsStyle="success" className="tab-spacing">

      <Table responsive striped bordered condensed hover>
        <thead>
          <tr>
            <th>Year</th>
            <th>Age</th>
            <th>Start Value</th>
            {renderPensionHeader(isPensionCustody, 'Insurance Premium')}
            <th>Pay-in</th>
            <th>Pay-out (Future value)</th>
            <th>Pay-out (Present value)</th>
            <th>Dissaving (Future value)</th>
            <th>Dissaving (Present value)</th>
            <th>Capital income before tax</th>
            {renderFreeAssetHeader(isPensionCustody, 'Capital income tax')}
            <th>Equity income before tax</th>
            {renderPensionHeader(isPensionCustody, 'Negative PAL tax (balance)')}
            {renderPensionHeader(isPensionCustody, 'Possible PAL Taxation')}
            {renderPensionHeader(isPensionCustody, 'Actual PAL Taxation Paid')}
            {renderFreeAssetHeader(isPensionCustody, 'Equity income tax')}
            {renderFreeAssetHeader(isPensionCustody, 'Net return after tax')}
            <th>End Value</th>
            <th>Present Value</th>
          </tr>
        </thead>
        <tbody>
          {printOutput(yearlyPrognoses, isPensionCustody)}
        </tbody>
      </Table>
    </Panel>
  );
}

Outcome.propTypes = {
  yearlyPrognoses: PropTypes.array.isRequired,
  productType: PropTypes.string.isRequired
}

export default Outcome;