import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {formatTimeString} from './utils';
import {Style} from './types';

interface StopWatchProps {
  start?: boolean;
  reset?: boolean;
  msecs?: boolean;
  timerStyle?: Style;
  laps?: boolean;
  getTime?: (timer: number | string) => void;
  startTime?: number;
  getMsecs?: (timer: number | string) => void;
}

interface StopWatchStates {
  startTime?: number;
  stopTime?: number;
  pausedTime?: number;
  started?: boolean;
  elapsed?: number;
}

export default class StopWatch extends Component<
  StopWatchProps,
  StopWatchStates
> {
  defaultStyles: Style;
  interval: NodeJS.Timer | undefined;

  constructor(props: StopWatchProps) {
    super(props);
    const {startTime} = props;
    this.state = {
      startTime: null,
      stopTime: null,
      pausedTime: null,
      started: false,
      elapsed: startTime || 0,
    };
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.reset = this.reset.bind(this);
    this.formatTime = this.formatTime.bind(this);
    const width = props.msecs ? 220 : 150;

    this.defaultStyles = {
      container: {
        backgroundColor: '#000',
        padding: 5,
        borderRadius: 5,
        width: width,
      },
      text: {
        fontSize: 30,
        color: '#FFF',
        marginLeft: 7,
      },
    };
  }

  componentDidMount() {
    if (this.props.start) {
      this.start();
    }
  }

  UNSAFE_componentWillReceiveProps(newProps: StopWatchProps) {
    if (newProps.start) {
      this.start();
    } else {
      this.stop();
    }
    if (newProps.reset) {
      this.reset();
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  start() {
    if (this.props.laps && this.state.elapsed) {
      let lap = new Date().getTime() - this.state.stopTime;
      this.setState({
        stopTime: null,
        pausedTime: this.state.pausedTime + lap,
      });
    }

    this.setState({
      startTime: this.state.elapsed
        ? new Date().getTime() - this.state.elapsed
        : new Date().getTime(),
      started: true,
    });

    this.interval = this.interval
      ? this.interval
      : setInterval(() => {
          this.setState({elapsed: new Date().getTime() - this.state.startTime});
        }, 1);
  }

  stop() {
    if (this.interval) {
      if (this.props.laps) {
        this.setState({stopTime: new Date().getTime()});
      }

      clearInterval(this.interval);
      this.interval = null;
    }
    this.setState({started: false});
  }

  reset() {
    const {startTime} = this.props;
    this.setState({
      elapsed: startTime || 0,
      startTime: null,
      stopTime: null,
      pausedTime: null,
    });
  }

  formatTime() {
    const {getTime, getMsecs, msecs} = this.props;
    const now = this.state.elapsed;
    const formatted = formatTimeString(now, msecs);
    if (typeof getTime === 'function') {
      getTime(formatted);
    }
    if (typeof getMsecs === 'function') {
      getMsecs(now);
    }
    return formatted;
  }

  render() {
    const styles = this.props.timerStyle
      ? this.props.timerStyle
      : this.defaultStyles;

    return (
      <View ref="stopwatch" style={styles.container}>
        <Text style={styles.text}>{this.formatTime()}</Text>
      </View>
    );
  }
}
