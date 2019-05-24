import React, {PropTypes} from 'react';
import {printDataRowsOnSubIndex} from '../../utils/util';
import {Table} from 'react-bootstrap';
import flatten from 'lodash/flatten';
import uniq from 'lodash/uniq';

function combinePrognosis(prognosis, acc = []) {
  if (!prognosis) {
    return acc;
  }
  return acc.concat(prognosis);
}

function printTaxDetails(budgetForSelectedPeriod) {

  const taxValues2D = budgetForSelectedPeriod.map(b => {
    const {freeAssetSummary} = b;
    const freeAssetPrognosis = combinePrognosis(freeAssetSummary.prognoses);
    const allAssetCategoryPrognoses = flatten(freeAssetPrognosis.map(pp => pp.assetCategoryPrognoses));
    //get all tax classes
    const allTaxClasses = uniq(allAssetCategoryPrognoses.map(acp => acp.taxClass || acp.assetClass));

    return allTaxClasses.map(tc => {
      return allAssetCategoryPrognoses
        .filter(acp =>  acp.taxClass || acp.assetClass === tc)
        .reduce((prev, curr) => {
          return {
            name: tc,
            value: curr.taxAmount + prev.taxAmount,
            taxAmount: curr.taxAmount + prev.taxAmount
          }
        }, {
          name: tc,
          taxAmount: 0
        });
    })
  });

  //tax not present
  if (!taxValues2D[0]) {
    return;
  }

  return taxValues2D[0].map((p, subIndex) => {
    return (
      <tr key={subIndex}>
        <td colSpan={3}>{p.name}</td>
        {printDataRowsOnSubIndex(taxValues2D, subIndex)}
        <td>&nbsp;</td>
      </tr>
    )
  });

}

const TaxDetails = (props) => {
  const {showTaxDetails, budgetForSelectedPeriod} = props;
  const displayFlag = showTaxDetails //todo: invert the flag
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
      className="budget-table"
      style={displayFlag}>
      <tbody>
        {printTaxDetails(budgetForSelectedPeriod)}
      </tbody>
    </Table>
  );

}

TaxDetails.propTypes = {
  budgetForSelectedPeriod: PropTypes.array.isRequired,
  showTaxDetails: PropTypes.bool.isRequired
}

export default TaxDetails;