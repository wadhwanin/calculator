import React, {PropTypes} from 'react';
import {
  Button,
  FormGroup,
  FormControl,
  ControlLabel,
  HelpBlock,
  Col
} from 'react-bootstrap';

const addButton = (isLast, addInstrument, indexCategory) => {
  if (!isLast) {
    return;
  }
  return (
    <Col sm={1}>
      <Button onClick={() => addInstrument(indexCategory)}>
        +</Button>
    </Col>
  )
}

const Instrument = (props) => {
  const {
    data,
    indexThirdCategory,
    indexCategory,
    isLast,
    category,
    secondCategory,
    thirdCategory,
    addInstrument,
    setInputFieldFirstLevelArray,
    setInputFieldFirstLevelArraySecondLevelObjectThirdLevelArray
  } = props;

  let isin,
    value;

  if (data) {
    isin = data.isin;
    value = data.value;
  }

  return (
    <FormGroup controlId="isin">
      <Col componentClass={ControlLabel} sm={2}>
        Instrument # {indexThirdCategory + 1}
      </Col>
      <Col sm={3}>
        <FormControl
          type="text"
          defaultValue={isin}
          placeholder="Enter ISIN"
          onChange={(e) => {
          if (!data) {
            const newCustodyObj = {
              "custody": {
                "instruments": [
                  {
                    isin: e.target.value,
                    "value": ""
                  }
                ]
              }
            };
            setInputFieldFirstLevelArray(newCustodyObj, category, indexCategory);
          } else {
            setInputFieldFirstLevelArraySecondLevelObjectThirdLevelArray({
              isin: e.target.value
            }, category, indexCategory, secondCategory, thirdCategory, indexThirdCategory)
          }
        }}/>
        <FormControl.Feedback/>
        <HelpBlock>Should be present in SIR</HelpBlock>
      </Col>
      <Col sm={3}>
        <FormControl
          type="text"
          defaultValue={value}
          placeholder="Enter market value"
          onChange={(e) => {
          if (!data) {
            const newCustodyObj = {
              "custody": {
                "instruments": [
                  {
                    "isin": "",
                    value: e.target.value
                  }
                ]
              }
            };
            setInputFieldFirstLevelArray(newCustodyObj, category, indexCategory);
          } else {
            setInputFieldFirstLevelArraySecondLevelObjectThirdLevelArray({
             value: e.target.value
            }, category, indexCategory, secondCategory, thirdCategory, indexThirdCategory)
          }
        }}/>
        <FormControl.Feedback/>
        <HelpBlock>Net worth of this instrument in custody</HelpBlock>
      </Col>

      {addButton(isLast, addInstrument, indexCategory)}
    </FormGroup>
  )
}

Instrument.propTypes = {
  category: PropTypes.string.isRequired,
  secondCategory: PropTypes.string.isRequired,
  thirdCategory: PropTypes.string.isRequired,
  data: PropTypes.object,
  indexThirdCategory: PropTypes.number.isRequired,
  indexCategory: PropTypes.number.isRequired,
  isLast: PropTypes.bool.isRequired,
  addInstrument: PropTypes.func.isRequired,
  setInputFieldFirstLevelArray: PropTypes.func.isRequired,
  setInputFieldFirstLevelArraySecondLevelObjectThirdLevelArray: PropTypes.func.isRequired
}

export default Instrument;