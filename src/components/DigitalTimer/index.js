// Write your code here
import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {
    startIcon: true,
    workButton: false,
    go: true,
    minutes: new Date(),
    min: 25,
    sec: 0,
    number: 25,
  }

  componentDidMount() {
    this.timerId = setInterval(this.tick, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timerId)
  }

  tick = () => {
    const {startIcon, min, sec} = this.state

    if (startIcon) {
      return
    }

    if (!startIcon) {
      if (min === 0 && sec === 0) {
        clearInterval(this.timerId)
        this.setState(prevState => ({
          startIcon: !prevState.startIcon,
        }))

        console.log(startIcon)
      } else {
        let newMin = min
        let newSec = sec
        if (newSec === 0) {
          newMin -= 1
          newSec = 59
        } else {
          newSec -= 1
        }
        this.setState({min: newMin, sec: newSec})
      }
    }
  }

  start = () => {
    console.log('start')
    const {min, sec} = this.state

    if (min === 0 && sec === 0) {
      this.setState({min: 25, sec: 0})
      this.timerId = setInterval(this.tick, 1000)
    }
    clearInterval(this.timerId)
    this.setState(prevState => ({
      startIcon: !prevState.startIcon,
      workButton: true,
      go: false,
    }))
    this.timerId = setInterval(this.tick, 1000)
  }

  plus = () => {
    this.setState(prevState => ({
      min: prevState.min + 1,
      number: prevState.number + 1,
      go: false,
    }))
  }

  minus = () => {
    console.log('minus')
    this.setState(prevState => ({
      min: prevState.min > 1 ? prevState.min - 1 : prevState.min,
      number: prevState.number > 1 ? prevState.number - 1 : prevState.number,
      go: false,
    }))
  }

  reset = () => {
    console.log('reset')
    clearInterval(this.timerId)
    this.setState(prevState => ({
      startIcon: true,
      workButton: !prevState.workButton,
      go: true,
      min: 25,
      sec: 0,
      number: 25,
    }))

    const {startIcon} = this.state
    if (!startIcon) {
      clearInterval(this.timerId)
    }
  }

  render() {
    const {startIcon, minutes, min, sec, workButton, number, go} = this.state
    const formattedSec = sec.toString().padStart(2, '0')
    const formattedMin = min.toString().padStart(2, '0')
    console.log(minutes)

    return (
      <div className="bg">
        <h1 className="di">Digital Timer</h1>
        <div className="div">
          <div className="bg1">
            <div className="cen">
              <h1 className="t">
                {go ? '25:00' : `${formattedMin}:${formattedSec}`}
              </h1>

              <p className="run">{startIcon ? 'Paused' : 'Running'}</p>
            </div>
          </div>

          <div className="hk">
            <div className="las">
              <div className="sec">
                <div className="pp">
                  <button type="button" className="but1" onClick={this.start}>
                    <img
                      src={
                        startIcon
                          ? 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
                          : 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
                      }
                      alt={startIcon ? 'play icon' : 'pause icon'}
                      className="icon"
                    />
                    {startIcon ? 'Start' : 'Pause'}
                  </button>
                </div>

                <div className="pp">
                  <button type="button" className="but1" onClick={this.reset}>
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png "
                      alt="reset icon"
                      className="icon"
                    />
                    Reset
                  </button>
                </div>
              </div>

              <div>
                <p>Set Timer Limit</p>
              </div>

              <div className="hhh">
                <button
                  type="button"
                  className="but"
                  disabled={workButton}
                  onClick={this.plus}
                >
                  +
                </button>
                <p className="back">{number}</p>
                <button
                  type="button"
                  className="but"
                  disabled={workButton}
                  onClick={this.minus}
                >
                  -
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default DigitalTimer
