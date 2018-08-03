import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import DonutIndicator from '../widgets/donut/Donut.indicator'
import IndicatorService from '../services/Indicator.service'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'

class Dashboard extends Component {
  state = {indicators:[]}

  renderIndicator = (indicator, index) => {
    return (
        
        <Grid item xs={12} md={4} lg={2} key={index}>
            <Card>
                <CardContent classes={{root:"last-child{padding-bottom=16px;}"}}>
                    <DonutIndicator title={indicator.title} 
                                    value={indicator.value} 
                                    goal={indicator.goal} 
                                    url={indicator.url}
                                    options={indicator.options}
                                    apiMethod={indicator.apiMethod}
                                    apiBody={indicator.apiBody}></DonutIndicator>
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
