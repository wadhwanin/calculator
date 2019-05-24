import React, {PropTypes} from 'react';
import {Table, Button, Glyphicon} from 'react-bootstrap';

function printHeader(budgetForSelectedPeriod) {
  return budgetForSelectedPeriod
    .map(i => <th  className="align-right" key={i.year}>{i.year}</th>);
}

const YearControls = (props) => {
  const {increment, decrement, budgetForSelectedPeriod} = props;
  return (
    <Table striped bordered condensed hover className="budget-table">
    <thead>
      <tr>
        <th colSpan="2">Year</th>
        <th className="align-center" >
          <Button onClick={() => decrement()}>
            <Glyphicon glyph="chevron-left"/></Button>
        </th>
        {printHeader(budgetForSelectedPeriod)}
        <th className="align-center">
          <Button onClick={() => increment()}><Glyphicon glyph="chevron-right"/></Button>
        </th>
      </tr>
    </thead>
    </Table>
  )
}

YearControls.propTypes = {
  budgetForSelectedPeriod: PropTypes.array.isRequired,
  increment: PropTypes.func.isRequired,
  decrement: PropTypes.func.isRequired,
}

export default YearControls;