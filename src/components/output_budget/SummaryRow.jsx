import React, {PropTypes} from 'react';
import {Table} from 'react-bootstrap';
import {printTotalRow} from '../../utils/budget';

const SummaryRow = (props) => {
  const {budgetForSelectedPeriod, summaryFunction} = props;

  return (

    <Table striped bordered condensed hover className="budget-table">
      <thead>
        <tr >
          <th colSpan="3">Total</th>
          {printTotalRow(summaryFunction(budgetForSelectedPeriod))}
          <th >&nbsp;</th>
        </tr>
      </thead>
    </Table>
  );

}

SummaryRow.propTypes = {
  budgetForSelectedPeriod: PropTypes.array.isRequired,
  summaryFunction: PropTypes.func.isRequired
}

export default SummaryRow;