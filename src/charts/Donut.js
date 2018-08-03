import React from 'react'
import ProgressBar from 'progressbar.js'
import Typography from '@material-ui/core/Typography'

class Donut extends React.Component {
  state= {percent: 0}
  chart = null

  styles = {
    trailColor: 'gray',
    color: '#E91E63',
    trailWidth: 1,
    duration: 1400,
    easing: 'bounce',
    strokeWidth: 6
  }

  percentContainerStyle = {
    position: 'absolute',
    display: 'flex',
    width: '100%',
    height: '100%',
    justifyContent:"center",
    alignItems:"center"
  }

  componentDidMount(){
    this.chart = new ProgressBar.Circle(this.refs.donutChart, this.styles)
    this.synchronizePercent(this.props.percent)
  }

  componentWillReceiveProps(nextProps){
    this.synchronizePercent(nextProps.percent)
  }

  synchronizePercent(value){
    const percent = value / 100
    this.setState({percent, integerValue: Math.floor(value)})
    this.chart.animate(percent)
  }

  render () {

    return (
      <div style={{position: 'relative', ...this.props.style}}>
        <div style={this.percentContainerStyle}>
          <Typography style={{color: this.styles.color, fontWeight: 'bold'}} type="subheading">{this.state.integerValue }<Typography component="span" style={{color: this.styles.color, display: 'contents'}} type="caption">%</Typography></Typography>
        </div>
        <div ref="donutChart"></div>
      </div>
    )
  }
}


export default Donut
