import React, {PropTypes} from 'react';
import {Tooltip, OverlayTrigger } from 'react-bootstrap';

const printMonthlyData = (array) => {
  return "Monthly data: [" + array.map(i => ` ${i}`) + "]";
} 

const LinkWithToolTip = (props) => {
  const {id, tooltip, children} = props;
  if (!tooltip || !tooltip.length) {
    return <div>0</div>;
  }
  let toolTipDisplay = <Tooltip id={id}>{printMonthlyData(tooltip)}</Tooltip>;

  return (
    <OverlayTrigger
        overlay={toolTipDisplay} placement="top"
        delayShow={300} delayHide={150}
      >
       <div> {children}</div>
      </OverlayTrigger>
  );
}

LinkWithToolTip.propTypes = {
  id: PropTypes.number.isRequired,
  tooltip: PropTypes.array.isRequired
}

export default LinkWithToolTip;