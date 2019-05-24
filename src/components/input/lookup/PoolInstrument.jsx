import React, {PropTypes} from 'react';
import {
  FormGroup,
  FormControl,
  ControlLabel,
  HelpBlock,
  Col
} from 'react-bootstrap';

const PoolInstrument = (props) => {
  const {
    data,
    indexThirdCategory,
    indexCategory,
    category,
    subCategory,
    thirdCategory,
    setInputFieldFirstLevelArraySecondLevelObjectThirdLevelArray
  } = props;

  let value,
    poolType;

  if (data) {
    value = data.value;
    poolType = data.poolAllocationType;
  }

  return (
    <FormGroup controlId="poolAccount">
      <Col componentClass={ControlLabel} sm={2}>
        Instrument # {indexThirdCategory + 1}
      </Col>
      <Col sm={3}>
      <FormControl type="text" defaultValue={poolType} disabled/>
      </Col>
      <Col sm={3}>
        <FormControl
          type="text"
          defaultValue={value}
          placeholder="Enter market value"
          onChange={(e) => {
          if (parseInt(e.target.value, 10) > 100) {
            e.target.value = 0;
          }
          setInputFieldFirstLevelArraySecondLevelObjectThirdLevelArray({
            value: e.target.value
          }, category, indexCategory, subCategory, thirdCategory, indexThirdCategory)
        }}/>
        <FormControl.Feedback/>
        <HelpBlock>Percentage share (0-100)</HelpBlock>
      </Col>
    </FormGroup>
  )
}

PoolInstrument.propTypes = {
  category: PropTypes.string.isRequired,
  data: PropTypes.object,
  indexCategory: PropTypes.number.isRequired,
  setInputFieldFirstLevelArraySecondLevelObjectThirdLevelArray: PropTypes.func.isRequired
}

export default PoolInstrument;