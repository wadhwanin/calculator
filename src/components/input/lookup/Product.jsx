import React, {PropTypes} from 'react';
import {
  Button,
  FormGroup,
  FormControl,
  ControlLabel,
  HelpBlock,
  Col,
  Accordion,
  Panel
} from 'react-bootstrap';
import PensionInputFields from './PensionInputFields';
import Dissaving from './Dissaving';
import {displayPayInRanges, displayPayOutRanges} from '../../../utils/pay';
import {displayPool, displayCustody} from '../../../utils/instrument';
import {emptyPoolAccount} from '../../../utils/constants'

const addProductButton = (isLast, addInputProduct) => {
  if (!isLast) {
    return;
  }
  return (
    <Col lg={2} lgOffset={2}>
      <Button bsStyle="info" onClick={() => addInputProduct()}>Add another Product
      </Button>
    </Col>
  );
}

const showPensionInputFields = (type, category, indexCategory, secondLevelCategory, pensionDetailsDk, setInputFieldFirstLevelArraySecondLevelObject, setInputFieldFirstLevelArraySecondLevelObjectThirdLevelArray, addInputInsurancePremiumField) => {
  if (type !== 'PENSION') {
    return;
  }
  return (
    <Accordion>
      <Panel header="Pension Details" bsStyle="warning">
        <PensionInputFields
          category={category}
          indexCategory={indexCategory}
          secondLevelCategory="pensionDetailsDk"
          pensionDetailsDk={pensionDetailsDk}
          setInputFieldFirstLevelArraySecondLevelObject={setInputFieldFirstLevelArraySecondLevelObject}
          setInputFieldFirstLevelArraySecondLevelObjectThirdLevelArray={setInputFieldFirstLevelArraySecondLevelObjectThirdLevelArray}
          addInputInsurancePremiumField={addInputInsurancePremiumField}/>
      </Panel>
    </Accordion>
  );
}

const Product = (props) => {
  const {
    data,
    index,
    category,
    subCategory,
    addInstrument,
    addPoolInstrument,
    isLast,
    addInputProduct,
    setInputFieldFirstLevelArray,
    setInputFieldFirstLevelArraySecondLevelObject,
    setInputFieldFirstLevelArraySecondLevelObjectThirdLevelArray,
    addInputPayInField,
    addInputPayOutField,
    addInputInsurancePremiumField,
    setInputFieldFirstLevelArraySecondLevelArray
  } = props;
  const {
    type,
    custody,
    pool,
    pensionDetailsDk,
    dissavingGoal,
    payInRanges,
    payOutRanges
  } = data;

  let instruments = [],
    poolInstruments = [],
    totalMarketValue;

  if (custody) 
    instruments = custody.instruments;
  
  if (pool) {
    poolInstruments = pool.instruments;
    totalMarketValue = pool.totalMarketValue;
  }

  const productId = data.id;
  const heading = `Add Product # ${index + 1}`;
  return (
    <Panel
      header={heading}
      defaultExpanded={true}
      collapsible={true}
      bsStyle="danger"
      eventKey={index}>

      <FormGroup controlId="id">
        <Col componentClass={ControlLabel} sm={2}>
          Product Id
        </Col>
        <Col sm={6}>
          <FormControl
            type="text"
            defaultValue={productId}
            placeholder="Enter product id"
            onChange={(e) => {
            setInputFieldFirstLevelArray({
              id: e.target.value
            }, category, index);
          }}/>
          <HelpBlock>Enter any unique id</HelpBlock>
        </Col>
      </FormGroup>
      <FormGroup controlId="ProductType">
        <Col componentClass={ControlLabel} sm={2}>
          Product Type
        </Col>
        <Col sm={6}>
          <FormControl
            componentClass="select"
            placeholder="Select Product Type"
            defaultValue={type}
            onChange={(e) => {
            setInputFieldFirstLevelArraySecondLevelObject({
              pensionDetailsDk: {}
            }, category, index, subCategory);
            setInputFieldFirstLevelArray({
              type: e.target.value
            }, category, index);
          }}>
            <option value="FREE_ASSET">Free Asset</option>
            <option value="PENSION">Pension</option>
          </FormControl>
          <FormControl.Feedback/>
          <HelpBlock></HelpBlock>
        </Col>
      </FormGroup>
      {showPensionInputFields(type, category, index, subCategory, pensionDetailsDk, setInputFieldFirstLevelArraySecondLevelObject, setInputFieldFirstLevelArraySecondLevelObjectThirdLevelArray, addInputInsurancePremiumField)}
      <Accordion>
        <Panel header="Custody" bsStyle="info">
          {displayCustody(instruments, addInstrument, setInputFieldFirstLevelArraySecondLevelObjectThirdLevelArray, setInputFieldFirstLevelArray, category, index, 'custody')}
        </Panel>
      </Accordion>

      <Accordion>
        <Panel header="Pool accounts" bsStyle="warning">
          <FormGroup controlId="ProductType">
            <Col componentClass={ControlLabel} sm={2}>
              Total Market Value
            </Col>
            <Col sm={6}>
              <FormControl
                type="text"
                defaultValue={totalMarketValue}
                placeholder="Enter market value"
                onChange={(e) => {
                if (!poolInstruments.lenght) {
                  const newPoolObj = {
                    "pool": {
                      id: "",
                      totalMarketValue: e.target.value,
                     "instruments": emptyPoolAccount()
                    }
                  };
                  setInputFieldFirstLevelArray(newPoolObj, category, index);
                } else {
                  setInputFieldFirstLevelArraySecondLevelObject({
                    totalMarketValue: e.target.value
                  }, category, 0, "pool")
                }
              }}/>
              <FormControl.Feedback/>
              <HelpBlock>Net worth of this instrument</HelpBlock>
            </Col>
          </FormGroup>
          {displayPool(poolInstruments, addPoolInstrument, setInputFieldFirstLevelArraySecondLevelObjectThirdLevelArray, category, index, 'pool')}
        </Panel>
      </Accordion>

      <Accordion>
        <Panel header="Pay In (Optional)" bsStyle="success">
          {displayPayInRanges(payInRanges, addInputPayInField, setInputFieldFirstLevelArraySecondLevelArray, setInputFieldFirstLevelArray, category, index, 'payInRanges')}
        </Panel>
      </Accordion>

      <Accordion>
        <Panel header="Pay Out (Optional)" expanded={false} bsStyle="info">
          {displayPayOutRanges(payOutRanges, addInputPayOutField, setInputFieldFirstLevelArraySecondLevelArray, setInputFieldFirstLevelArray, category, index, 'payOutRanges')}
        </Panel>
      </Accordion>

      <Panel header="Dissaving (Optional)">
        <Dissaving
          category={category}
          indexCategory={index}
          secondLevelCategory="dissavingGoal"
          dissavingGoal={dissavingGoal}
          setInputFieldFirstLevelArraySecondLevelObject={setInputFieldFirstLevelArraySecondLevelObject}/>
      </Panel>

      {addProductButton(isLast, addInputProduct)}
    </Panel>

  )
};

Product.propTypes = {
  category: PropTypes.string.isRequired,
  subCategory: PropTypes.string.isRequired,
  data: PropTypes.object,
  index: PropTypes.number.isRequired,
  isLast: PropTypes.bool.isRequired,
  addInstrument: PropTypes.func.isRequired,
  addPoolInstrument: PropTypes.func.isRequired,
  addInputProduct: PropTypes.func.isRequired,
  addInputPayInField: PropTypes.func.isRequired,
  addInputPayOutField: PropTypes.func.isRequired,
  addInputInsurancePremiumField: PropTypes.func.isRequired,
  setInputFieldFirstLevelArray: PropTypes.func.isRequired,
  setInputFieldFirstLevelArraySecondLevelObject: PropTypes.func.isRequired,
  setInputFieldFirstLevelArraySecondLevelObjectThirdLevelArray: PropTypes.func.isRequired,
  setInputFieldFirstLevelArraySecondLevelArray: PropTypes.func.isRequired
};

export default Product;