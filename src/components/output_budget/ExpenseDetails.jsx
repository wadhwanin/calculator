import React, {PropTypes} from 'react';
import {Table} from 'react-bootstrap';
import {printDataRowsOnSubIndex} from '../../utils/util';

function printPensionExpenses(budgetForSelectedPeriod) {

  const payOutValues2D = budgetForSelectedPeriod.map(b => {
    const {pensionSummary} = b;
    const {prognoses} = pensionSummary;
    if (!prognoses) {
      return [];
    }
    return prognoses.map(pp => {
       if ( pp.pensionAgreementType !== 'PRIVATE') {
         return {}
       }
      return {
        'name': pp.productName,
        'value': pp.payInValue
      }
    });

  });

  //prognosis not present
  if (!payOutValues2D[0]) {
    return;
  }

  return payOutValues2D[0].map((p, subIndex) => {
    if (!p.name) {
      // eslint-disable-next-line
      return;
    }
    return (
      <tr key={subIndex}>
        <td colSpan={3}>{p.name}</td>
        {printDataRowsOnSubIndex(payOutValues2D, subIndex)}
        <td>&nbsp;</td>
      </tr>
    )
  });

}

const PensionOutput = (props) => {

  const {showExpenses, budgetForSelectedPeriod} = props;
  const showExpensesDetails = showExpenses //todo: invert the flag
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
      style={showExpensesDetails}
      className="budget-table">
      <tbody>
        {printPensionExpenses(budgetForSelectedPeriod)}
      </tbody>
    </Table>
  );

}

PensionOutput.propTypes = {
  showExpenses: PropTypes.bool.isRequired,
  budgetForSelectedPeriod: PropTypes.array.isRequired
}
export default PensionOutput;
