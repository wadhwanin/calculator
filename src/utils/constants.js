import { getYearMonthFromDate } from './util';

export const MAX_NUMBER_OF_COLUMNS = 10;

export function emptyInputLookupObject() {
  return {
    "country": "DK",
    "inflation": 0.02,
    "customer": {
      "birthDate": "1965-11-11T18:30:00.000Z",
      "maritalStatus": "SINGLE",
      "municipalityCode": 0,
      "yearsInCountry": 0,
      "churchTax": false,
      "lifeExpectancy": 95,
      "efterlonFleksydelse": "NO"
    },
    "products": [{
      "type": "FREE_ASSET"
    }],
    "startYearMonth": getYearMonthFromDate(new Date())
  };
}

export function emptyPoolAccount() {
  return [{
    "poolAllocationType": "SHORTBONDS",
    "value": "0"
  }, {
    "poolAllocationType": "LONGBONDS",
    "value": "0"
  }, {
    "poolAllocationType": "INDEXBONDS",
    "value": "0"
  }, {
    "poolAllocationType": "FOREIGNBONDS",
    "value": "0"
  }, {
    "poolAllocationType": "HIGHYIELDBONDS",
    "value": "0"
  }, {
    "poolAllocationType": "EQUITIES",
    "value": "0"
  }, {
    "poolAllocationType": "FOREIGNEQUITIES",
    "value": "0"
  }, {
    "poolAllocationType": "NONPUBLICEQUITIES",
    "value": "0"
  }, {
    "poolAllocationType": "DEPOSIT",
    "value": "0"
  }]

}
