import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import IndicatorService from '../../services/Indicator.service'
import {path} from 'ramda'
import {kUnity} from '../../util/Formatter'

class SimpleNumericIndicator extends Component {
  state = {title: "untitled", value: 0, goal: 0}

  componentDidMount(){
    const {title, info, value} = this.props.indicator;    
    this.setState({title, info, value});    
    this.loadData()
  }


  async loadData(){
    const {apiMethod,apiBody, apiUrl, options} = this.props.indicator
    const response = await IndicatorService.getIndicatorData(apiUrl,apiMethod, apiBody)
    console.log(response)
    if(response.ok){
      const valueField = options.valueField || 'value'
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
    const {title, info, value} = this.state;
    
    const formatedValue = this.getFormatedValue(value, this.props.indicator.options.format)
        
    return (
      <Grid container>
        <Grid item xs={8}>
        <Typography variant="headline" color="textSecondary">{title}</Typography>
         <Typography color="textSecondary">{info}</Typography>        
        </Grid>
        <Grid item xs={4}>
        <Typography align="right" variant="display2" paragraph={false}>{formatedValue}</Typography>
        </Grid>
      </Grid>
    );
  }
}

export default SimpleNumericIndicator;
