import React, {PropTypes} from 'react';
import {FormGroup, FormControl, ControlLabel, Col, Button} from 'react-bootstrap';

const addButton = (isLast, addChildrenField) => {
  if (!isLast) {
    return;
  }
  return (
    <Col sm={1}>
      <Button onClick={() => addChildrenField()}>+</Button>
    </Col>
  )
};

const Children = (props) => {
  const {
    data,
    index,
    isLast,
    category,
    subCategory,
    addChildrenField,
    setInputFieldFirstLevelObject,
    setInputFieldFirstLevelObjectSecondLevelArray
  } = props;

  let name,
    socialBenefitsReceiverId,
    shareOfSocialBenefit;

  if (data) {
    name = data.name;
    socialBenefitsReceiverId = data.socialBenefitsReceiverId;
    shareOfSocialBenefit = data.shareOfSocialBenefit;
  }

  return (
    <div>
      <FormGroup controlId="child">
        <Col componentClass={ControlLabel} sm={1}>
          Name
        </Col>
        <Col sm={2}>
          <FormControl
            defaultValue={name}
            type="text"
            placeholder="Name"
            onChange={(e) => {
              if (!data) {
                let newChildrenObject = {};
                const newChildrenArray = [
                  {
                    "name": "",
                    "socialBenefitsReceiverId": "",
                    "shareOfSocialBenefit": ""
                  }
                ];
                newChildrenObject[subCategory] = newChildrenArray;
                setInputFieldFirstLevelObject(newChildrenObject, category);
              } else {
                setInputFieldFirstLevelObjectSecondLevelArray({
                  name: e.target.value
                }, category, subCategory, index);
              }
            } }
          />
          <FormControl.Feedback/>
        </Col>
        <Col componentClass={ControlLabel} sm={2}>
          Social Benefits Receiver Id
        </Col>
        <Col sm={2}>
          <FormControl
            defaultValue={socialBenefitsReceiverId}
            type="text"
            placeholder="ID"
            onChange={(e) => {
              if (!isNaN(e.target.value)) {
                setInputFieldFirstLevelObjectSecondLevelArray({
                  socialBenefitsReceiverId: e.target.value
                }, category, subCategory, index)
              }
            }}
          />
          <FormControl.Feedback/>
        </Col>

        <Col componentClass={ControlLabel} sm={2}>
          Share of social benefit
        </Col>
        <Col sm={2}>
          <FormControl
            defaultValue={shareOfSocialBenefit}
            componentClass="select"
            onChange={(e) => {
              if (!isNaN(e.target.value)) {
                setInputFieldFirstLevelObjectSecondLevelArray({
                  shareOfSocialBenefit: parseInt(e.target.value, 10)
                }, category, subCategory, index)
              }
            }}>
            <option value="0">0%</option>
            <option value="50">50%</option>
            <option value="100">100%</option>
          </FormControl>
        </Col>
        {addButton(isLast, addChildrenField)}
      </FormGroup>
    </div>
  );

};

Children.propTypes = {
  isLast: PropTypes.bool.isRequired,
  category: PropTypes.string,
  subCategory: PropTypes.string.isRequired,
  addChildrenField: PropTypes.func.isRequired,
  setInputFieldFirstLevelObject: PropTypes.func.isRequired,
  setInputFieldFirstLevelObjectSecondLevelArray: PropTypes.func.isRequired
};

export default Children;