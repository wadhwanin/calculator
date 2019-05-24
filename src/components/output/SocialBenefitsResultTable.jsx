import React, {PropTypes} from 'react';
import {Table, Panel} from 'react-bootstrap';
import {FormattedNumber} from 'react-intl';
import LinkWithToolTip from './LinkWithToolTip';

function roundOff(value) {
  return Math.round(Math.round(value * 10) / 10);
}

function printOutput(data) {
  return data.map((i, index) => {
    const {year,socialBenefits} = i;
    const sb = socialBenefits.socialBenefits;
    return (
      <tr key={year} className="align-right">
        <td>{year}</td>
        <td>{sb.age}</td>
        <td><FormattedNumber value={roundOff(sb.socialOutput.folkePensionAmount)}/></td>
        <td>
          <LinkWithToolTip tooltip={sb.socialOutput.efterloenMonthly}  id={index}>
            {roundOff(sb.socialOutput.efterloenAmount)}
          </LinkWithToolTip>
        </td>
      </tr>
    )
  });
}

const SocialBenefitsResultTable = (props) => {
  const {data} = props;
  return (
    <Panel
      header='Social Benefits Output'
      bsStyle="success"
      className="tab-spacing">

      <Table responsive striped bordered condensed hover>
        <thead>
          <tr className="align-right">
            <th>Year</th>
            <th>Age</th>
            <th>Folke Pension</th>
            <th>Efterloen</th>
          </tr>
        </thead>
        <tbody>
          {printOutput(data)}
        </tbody>
      </Table>
    </Panel>
  )
}

SocialBenefitsResultTable.propTypes = {
  data: PropTypes.array.isRequired
}

export default SocialBenefitsResultTable;