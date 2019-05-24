import React, {PropTypes} from 'react';
import {Table, Accordion, Panel} from 'react-bootstrap';

const printSubCalculations = (productPrognoses) => {
  if (!Array.isArray(productPrognoses)) 
    return;
  
  const {assetCategoryPrognoses} = productPrognoses[0];

  return assetCategoryPrognoses.map((c, index) => {
    const assetClass = c.taxClass || c.assetClass;
    return (
      <tbody key={index}>
        <tr>
          <td>
            Gross return {assetClass}
          </td>
          <td>
            {c.grossReturnPercentage * 100}
            %
          </td>
        </tr>
        <tr>
          <td>
            Cost {assetClass}
          </td>
          <td>
            {c.weightedCostPercentage * 100}
            %
          </td>
        </tr>
        <tr>
          <td>
            Net return {assetClass}
            before tax
          </td>
          <td>
            {c.netReturnPercentage * 100}
            %
          </td>
        </tr>
        <tr>
          <td>&nbsp;
          </td>
          <td>&nbsp;
          </td>
        </tr>
      </tbody>
    );
  });
}

const displayHeaders = (input, productType) => {
  let product = {};
  if (productType === 'pension') 
    product = input.pensionSummary;
  if (productType === 'freeAsset') 
    product = input.freeAssetSummary;
  
  if (!Array.isArray(product.prognoses) || product.prognoses > 1) 
    return;
  return (
    <Table responsive striped bordered condensed hover>
      <thead>
        <tr>
          <th>Description</th>
          <th>Value</th>
        </tr>
      </thead>
      {printSubCalculations(product.prognoses)}
    </Table>
  )
}

const SubCalculations = (props) => {
  const {productPrognoses} = props;
  const {productType} = props;
  return (
    <Accordion className="tab-spacing">
      <Panel header="Sub Calculations" bsStyle="info">
        {displayHeaders(productPrognoses[0], productType)}
      </Panel>
    </Accordion>
  );
};

SubCalculations.propTypes = {
  productPrognoses: PropTypes.array.isRequired,
  productType: PropTypes.string.isRequired
}

export default SubCalculations;