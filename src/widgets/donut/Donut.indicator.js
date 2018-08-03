import React, { Component } from 'react'
import Donut from '../../charts/Donut'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import IndicatorService from '../../services/Indicator.service'
import {path} from 'ramda'
import {kUnity} from '../../util/Formatter'

class DonutIndicator extends Component {
  state = {title: "untitled", value: 0, goal: 0}

  componentDidMount(){
    const {title, value, goal} = this.props;    
    this.setState({title, value, goal});
    console.log(this.props.url)
    this.loadData()
  }

  async loadData(){
    console.log('this.props.apiMethod',this.props.apiMethod);
    const response = await IndicatorService.getIndicatorData(this.props.url,this.props.apiMethod, this.props.apiBody)
    console.log(response)
    if(response.ok){
      const valueField = this.props.options.valueField || 'value'
      const value = path(valueField.split('.'), response.data)
      this.setState({value} );
    }
  }

  getFormatedValue = (value, format) => {
    switch (format) {
      case 'K':
        return kUnity(value)
      default:
        return value;
    }
  }

  render() {
    const {title, value, goal} = this.state;
    const percent = value * 100 / goal
    const formatedValue = this.getFormatedValue(value, this.props.options.format)
    const formatedGoal = this.getFormatedValue(goal, this.props.options.format)
    
    return (
      <Grid container>
        <Grid item xs={9}>
         <Typography color="textSecondary">{title}</Typography>
         <Typography variant="display2" paragraph={false}>{formatedValue}<Typography style={{display: 'contents'}}  variant="body1"> de {formatedGoal}</Typography></Typography>
        </Grid>
        <Grid item xs={3}>
          <Donut percent={percent}></Donut>
        </Grid>
      </Grid>
    );
  }
}

export default DonutIndicator;
