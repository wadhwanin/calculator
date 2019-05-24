import React, {Component, PropTypes} from 'react';
import calculateRequest from '../utils/api';
import {Panel, ProgressBar, Tabs, Tab} from 'react-bootstrap';
import {connect} from 'react-redux';
import SubCalculations from '../components/output/SubCalculations';
import Outcome from '../components/output/Outcome'
import SocialBenefitsResultTable from '../components/output/SocialBenefitsResultTable';
import DebugInfo from '../components/output/DebugInfo';
import isEmpty from 'lodash/isEmpty';
import {mergeCustodies} from '../utils/util';

function mapStateToProps(state) {
  const {input, output} = state;
  const {data, url, debugYear} = input;
  const {currentTab} = output;
  return Object.assign({}, {data, url, debugYear, currentTab});
}

function displayCustodyOutput(yearly, hasSubheader, currentProduct) {
  let result = [];
  if (hasSubheader && currentProduct) {
    if (currentProduct.type === 'freeAsset') {
      for (let year of yearly) {
        const filteredArray = {
          year: year.year,
          pensionSummary: {},
          freeAssetSummary: {
            taxSummary: year.freeAssetSummary.taxSummary
          },
          socialBenefits: {}
        };
        filteredArray.freeAssetSummary.prognoses = year
          .freeAssetSummary
          .prognoses
          .filter((product) => product.productId === currentProduct.id);
        filteredArray.socialBenefits = year.socialBenefits;

        result.push(filteredArray);
      }

    }

    if (currentProduct.type === 'pension') {
      for (let year of yearly) {
        const filteredArray = {
          year: year.year,
          pensionSummary: {
            taxSummary: year.pensionSummary.taxSummary
          },
          freeAssetSummary: {},
          socialBenefits: {}
        };
        filteredArray.pensionSummary.prognoses = year
          .pensionSummary
          .prognoses
          .filter((product) => product.productId === currentProduct.id);
        filteredArray.socialBenefits = year.socialBenefits;
        result.push(filteredArray);
      }

    }

    return (
      <div>
        <SubCalculations productPrognoses={result} productType={currentProduct.type}/>
        <Outcome yearlyPrognoses={result} productType={currentProduct.type}></Outcome>
      </div>
    );
  }

  if (hasSubheader && !currentProduct) {
    return (
      <div>
        <SubCalculations productPrognoses={yearly} productType={currentProduct.type}/>
        <Outcome yearlyPrognoses={yearly} productType={currentProduct.type}></Outcome>
      </div>
    );
  }

  if (!hasSubheader) {
    return (
      <div>
        <Outcome yearlyPrognoses={yearly} productType="mix"></Outcome>
      </div>
    );
  }
}

function extractProducts(firstYearPrognosis) {
  let productList = [],
    pensions = [],
    freeAssets = [];

  if (Array.isArray(firstYearPrognosis.freeAssetSummary.prognoses)) {
    freeAssets = firstYearPrognosis
      .freeAssetSummary
      .prognoses
      .map(i => {
        return {id: i.productId, type: "freeAsset"}
      });
  }

  if (Array.isArray(firstYearPrognosis.pensionSummary.prognoses)) {
    pensions = firstYearPrognosis
      .pensionSummary
      .prognoses
      .map(i => {
        return {id: i.productId, type: "pension"}
      });
  }

  productList = [
    ...freeAssets,
    ...pensions
  ];
  return productList;
}

function displayConsolidatedTab(annualBudgets, products) {
  const freeAssetIndex = products.findIndex(x => x.type === 'freeAsset');
  const freeAssetsProducts = products.reduce(function (a, e, i) {
    if (e.type === 'freeAsset') 
      a.push(i);
    return a;
  }, []);

  if (freeAssetsProducts.length < 2) 
    return;
  
  return (
    <Tab eventKey="custodyOutputData" title="Consolidated Free Asset Result">
      {displayCustodyOutput(mergeCustodies(annualBudgets), false, products[freeAssetIndex])}
    </Tab>
  )
}

class Output extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    url: PropTypes.string.isRequired,
    debugYear: PropTypes.string,
    currentTab: PropTypes.string
  };

  constructor(props) {
    super(props);
    const {currentTab} = this.props;
    this.state = {
      key: currentTab,
      response: {},
      error: ''
    };
  }

  submitAndSetState(props) {
    this.setState({response: {}});
    const {data, url, debugYear} = props;
    const questionMarkOrAmpersand = url.indexOf('?') > -1
      ? '&'
      : '?';
    const finalUrl = debugYear
      ? `${url}${questionMarkOrAmpersand}isDebugMode=true&debugInfoYear=${debugYear}`
      : url;

    if (!data) {
      this.setState({error: 'Input is null'});
    }

    calculateRequest(finalUrl, data).then(r => {
      if (!r.ok) {
        const errorMessage = `error occured during REST Call: r.status: ${r.status} and r.statusText: ${r.statusText}`;
        console.error(errorMessage);
        console.log(r.body);
        this.setState({error: errorMessage});
        return;
      }
      r
        .json()
        .then((out) => {
          if (out) {
            const productList = extractProducts(out.annualBudgets[0]);
            const freeAssetsProducts = productList.reduce(function (a, e, i) {
              if (e.type === 'freeAsset') 
                a.push(i);
              return a;
            }, []);

            if (freeAssetsProducts.length === 0) {
              const activeTab = out.annualBudgets[0].pensionSummary.prognoses[0].productId;
              this.setState({key: activeTab, response: out});
              return;
            }

            if (freeAssetsProducts.length === 1) {
              const activeTab = out.annualBudgets[0].freeAssetSummary.prognoses[0].productId;
              this.setState({key: activeTab, response: out});
              return;
            }
          }
          this.setState({response: out})
        });
    });

  }

  componentWillMount() {
    this.submitAndSetState(this.props);
  }

  componentWillReceiveProps(newProps) {
    this.submitAndSetState(newProps);
  }

  renderDebugTab() {
    const {data, debugYear} = this.props;
    const {customer} = data;
    const {response} = this.state;
    const {socialBenefitsDebugInfo, taxDebugInfo} = response;
    if (!socialBenefitsDebugInfo || !taxDebugInfo) {

      return;
    }

    return (
      <Tab eventKey="socialBenefitsDebugInfo" title="Magnus I/0">
        <DebugInfo
          socialBenefitsDebugInfo={socialBenefitsDebugInfo}
          taxDebugInfo={taxDebugInfo}
          debugYear={debugYear}
          customer={customer}/>
      </Tab>
    );
  }

  renderSocialBenefitsTab() {
    const {response} = this.state;
    const yearlyPrognoses = response.annualBudgets;
    if (!yearlyPrognoses) {
      return;
    }
    return (
      <Tab eventKey="socialBenefits" title="Social Benefits">
        <SocialBenefitsResultTable data={yearlyPrognoses}/>
      </Tab>
    );

  }

  displaySingleProduct(productPrognoses, currentProduct) {
    const {key} = this.state;
    return (
      <Tabs activeKey={key} onSelect={(key) => this.setState({key})} id="primary">
        <Tab eventKey={key} title={key}>
          {displayCustodyOutput(productPrognoses, true, currentProduct)}
        </Tab>
        {this.renderDebugTab()}
        {this.renderSocialBenefitsTab()}
      </Tabs>
    );
  }

  render() {

    const {error, response, key} = this.state;
    const {annualBudgets} = response;
    let productList = [];

    if (annualBudgets) 
      productList = extractProducts(annualBudgets[0]);
    
    if (error.length) {
      return (
        <Panel header="Error" bsStyle="danger">
          Error occured: {error}
        </Panel>
      );
    }

    if (isEmpty(response)) {
      return (
        <Panel header="Loading Results" bsStyle="warning">
          <ProgressBar active now={45}/>
        </Panel>
      );
    }

    return (
      <div>
        <Tabs activeKey={key} onSelect={(key) => this.setState({key})} id="primary">
          {displayConsolidatedTab(annualBudgets, productList)}
          {productList.map((i, index) => {
            return (
              <Tab eventKey={i.id} title={i.id} key={index}>
                {displayCustodyOutput(annualBudgets, true, i)}
              </Tab>
            )
          })}
          {this.renderDebugTab()}
          {this.renderSocialBenefitsTab()}

        </Tabs>
      </div>
    )
  }
};

export default connect(mapStateToProps)(Output);