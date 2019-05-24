import React from 'react';
import Budget from '../components/input/lookup/Budget';
import { roundOff } from './util';

export function displayBudget(budget, customer, category, addInputBudgetField, setInputFieldFirstLevelArray, setInputFieldBaseLevel, setInputFieldFirstLevelArraySecondLevelArray, budgetTypes) {
  if (!budget) {
    return (<Budget
      category={category}
      customer={customer}
      key={0}
      index={0}
      isLast={true}
      addInputBudgetField={addInputBudgetField}
      setInputFieldBaseLevel={setInputFieldBaseLevel}
      setInputFieldFirstLevelArray={setInputFieldFirstLevelArray}
      setInputFieldFirstLevelArraySecondLevelArray={setInputFieldFirstLevelArraySecondLevelArray}
      budgetTypes={budgetTypes} />
    );
  }
  return budget.map((i, index) => <Budget
    category={category}
    data={i}
    customer={customer}
    key={index}
    index={index}
    isLast={index === (budget.length - 1)}
    addInputBudgetField={addInputBudgetField}
    setInputFieldBaseLevel={setInputFieldBaseLevel}
    setInputFieldFirstLevelArray={setInputFieldFirstLevelArray}
    setInputFieldFirstLevelArraySecondLevelArray={setInputFieldFirstLevelArraySecondLevelArray}
    budgetTypes={budgetTypes} />);
}

function addTaxFromSummary(taxSummary, accumulator = 0) {
  if (!taxSummary) {
    return accumulator;
  }

  return taxSummary.taxAmount + accumulator;
}

function getTaxForOneYear(budget) {
  const {
    freeAssetSummary
  } = budget;
  const taxOnFreeAsset = addTaxFromSummary(freeAssetSummary.taxSummary);

  return taxOnFreeAsset;
}

export function getTaxOnIncome(budgetForSelectedPeriod) {
  return budgetForSelectedPeriod
    .map(budget => getTaxForOneYear(budget))
}

export function printTotalRow(data) {
  return data.map((i, index) => {
    if (!i) {
      return <th key={index} />
    }
    return <th className="align-right" key={index}>{roundOff(i)}</th>
  });
}


function addPrognosisExpense(prognosis, accumulator = 0) {
  if (!prognosis) {
    return accumulator;
  }
  const sumAcrossProducts = prognosis
    .filter(pp => pp.pensionAgreementType === 'PRIVATE')
    .map(pp => pp.payInValue)
    .reduce((prev, curr) => prev + curr, 0);

  return sumAcrossProducts + accumulator;
}

function getExpenseForOneYear(budget) {
  const {
    pensionSummary
  } = budget;
  return addPrognosisExpense(pensionSummary.prognoses);
}

export function getTotalExpense(budgetForSelectedPeriod) {
  return budgetForSelectedPeriod.map(budget => getExpenseForOneYear(budget));
}


function addPrognosisIncome(prognosis, accumulator = 0) {
  if (!prognosis) {
    return accumulator;
  }
  const sumAcrossProducts = prognosis
    .map(pp => pp.payOutFutureValue + pp.dissavingFutureValue)
    .reduce((prev, curr) => prev + curr, 0);

  return sumAcrossProducts + accumulator;

}

function getIncomeInOneYear(budget) {
  const {
    freeAssetSummary,
    pensionSummary,
    socialBenefits
  } = budget;
  const freeAssetIncome = addPrognosisIncome(freeAssetSummary.prognoses);
  const pensionIncome = addPrognosisIncome(pensionSummary.prognoses);
  const {
    socialOutput
  } = socialBenefits.socialBenefits;
  const {
    folkePensionAmount,
    efterloenAmount
  } = socialOutput;

  return freeAssetIncome + pensionIncome + folkePensionAmount + efterloenAmount;
}

export function getTotalIncome(budgetForSelectedPeriod) {
  //sum free asset prognosis, pension prognosis and social benefits
  return budgetForSelectedPeriod
    .map(budget => getIncomeInOneYear(budget))
}

export function getCashFlow(budgetForSelectedPeriod) {
  return budgetForSelectedPeriod
    .map(budget => getIncomeInOneYear(budget) - getExpenseForOneYear(budget) - getTaxForOneYear(budget));
}
