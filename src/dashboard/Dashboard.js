import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import DonutIndicator from '../widgets/donut/Donut.indicator'
import SimpleNumericIndicator from '../widgets/simple-numeric/SimpleNumeric.indicator'
import IndicatorService from '../services/Indicator.service'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'

class Dashboard extends Component {
  state = {indicators:[]}

  getIndicatorClass = (indicatorType) => {
    switch(indicatorType){
        case 'Donut':
            return DonutIndicator
        default:
            return SimpleNumericIndicator
    }
  }

  renderIndicator = (indicator, index) => {
      var IndicatorClass = this.getIndicatorClass(indicator.type);
    return (
        
        <Grid item xs={12} md={4} lg={3} key={index}>
            <Card>
                <CardContent style={{paddingBottom:16}}>
                
                    <IndicatorClass indicator={indicator}></IndicatorClass>
                </CardContent>
            </Card>
        </Grid>
    )
  }

  componentDidMount(){
    const indicators = IndicatorService.getIndicators('TOKEN');    
    this.setState({indicators});
  }
 

  render() {
    const {indicators} = this.state

    return (
        <Grid container spacing={16}>
            {indicators.map(this.renderIndicator)}
        </Grid>
    );
  }
}

export default Dashboard;
