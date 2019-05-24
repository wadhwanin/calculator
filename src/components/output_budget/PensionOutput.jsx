import React, {PropTypes} from 'react';
import {Table} from 'react-bootstrap';
import {roundOff, printDataRowsOnSubIndex} from '../../utils/util';

function printPensionPrognosis(budgetForSelectedPeriod) {

  const payOutValues2D = budgetForSelectedPeriod.map(b => {
    const {pensionSummary} = b;
    const {prognoses} = pensionSummary;
    if (!prognoses) {
      return [];
    }
    return prognoses.map(pp => {
      return {
        'name': pp.productName,
        'value': pp.payOutFutureValue + pp.dissavingFutureValue
      }
    });

  });

  //prognosis not present
  if (!payOutValues2D[0]) {
    return;
  }

  return payOutValues2D[0].map((p, subIndex) => {
    return (
      <tr key={subIndex}>
        <td colSpan={3}>{p.name}</td>
        {printDataRowsOnSubIndex(payOutValues2D, subIndex)}
        <td>&nbsp;</td>
      </tr>
    )
  });

}

function printSocialBenefitRow(budgetForSelectedPeriod, heading, property) {

  const earlyRetirementOutput = budgetForSelectedPeriod.map(budget => {
    const {socialBenefits} = budget.socialBenefits;
    const {socialOutput} = socialBenefits;
    return socialOutput[property];
  })
  return (
    <tr>
      <td colSpan={3}>{heading}</td>
      {earlyRetirementOutput.map((socialBenefit, index) => {
        if (!socialBenefit) {
          return <td key={index}/>
        }
        return <td className="align-right" key={index}>{roundOff(socialBenefit)}</td>
      })}
      <td>&nbsp;</td>
    </tr>
  )

}

const PensionOutput = (props) => {

  const {showPension, budgetForSelectedPeriod} = props;
  const showPensionDetails = showPension //todo: invert the flag
    ? {}
    : {
      display: 'none'
    };

  return (
    <Table
      striped
      bordered
      condensed
      hover
      style={showPensionDetails}
      className="budget-table">
      <tbody>
        {printPensionPrognosis(budgetForSelectedPeriod)}
        {printSocialBenefitRow(budgetForSelectedPeriod, 'Efterloen', 'efterloenAmount')}
        {printSocialBenefitRow(budgetForSelectedPeriod, 'Folkepension', 'folkePensionAmount')}
      </tbody>
    </Table>
  );

}

PensionOutput.propTypes = {
  showPension: PropTypes.bool.isRequired,
  budgetForSelectedPeriod: PropTypes.array.isRequired
}
export default PensionOutput;
