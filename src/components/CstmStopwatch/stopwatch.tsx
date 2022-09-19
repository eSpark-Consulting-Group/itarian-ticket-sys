// import React, {Component} from 'react';
// import {Text, View, StyleSheet} from 'react-native';
// import {formatTimeString} from './utils';
// import {Style} from './types';

// interface StopWatchProps {
//   start?: boolean;
//   reset?: boolean;
//   msecs?: boolean;
//   timerStyle?: Style;
//   laps?: boolean;
//   getTime?: (timer: number | string) => void;
//   startTime?: number;
//   getMsecs?: (timer: number | string) => void;
//   index?: number;
// }

// interface StopWatchStates {
//   startTime?: number;
//   stopTime?: number;
//   pausedTime?: number;
//   started?: boolean;
//   elapsed?: number;
// }

// export default class StopWatch extends Component<
//   StopWatchProps,
//   StopWatchStates
// > {
//   defaultStyles: Style;
//   interval: NodeJS.Timer | undefined;

//   constructor(props: StopWatchProps) {
//     super(props);
//     const {startTime} = props;
//     this.state = {
//       startTime: null,
//       stopTime: null,
//       pausedTime: null,
//       started: false,
//       elapsed: startTime || 0,
//     };
//     this.start = this.start.bind(this);
//     this.stop = this.stop.bind(this);
//     this.reset = this.reset.bind(this);
//     this.formatTime = this.formatTime.bind(this);
//     const width = props.msecs ? 220 : 150;

//     this.defaultStyles = {
//       container: {
//         backgroundColor: '#000',
//         padding: 5,
//         borderRadius: 5,
//         width: width,
//       },
//       text: {
//         fontSize: 30,
//         color: '#FFF',
//         marginLeft: 7,
//       },
//     };
//   }

//   componentDidMount() {
//     if (this.props.start) {
//       this.start();
//     }
//   }

//   UNSAFE_componentWillReceiveProps(newProps: StopWatchProps) {
//     if (newProps.start) {
//       this.start();
//     } else {
//       this.stop();
//     }
//     if (newProps.reset) {
//       this.reset();
//     }
//   }

//   componentWillUnmount() {
//     clearInterval(this.interval);
//   }

//   start() {
//     if (this.props.laps && this.state.elapsed) {
//       let lap = new Date().getTime() - this.state.stopTime;
//       this.setState({
//         stopTime: null,
//         pausedTime: this.state.pausedTime + lap,
//       });
//     }

//     this.setState({
//       startTime: this.state.elapsed
//         ? new Date().getTime() - this.state.elapsed
//         : new Date().getTime(),
//       started: true,
//     });

//     this.interval = this.interval
//       ? this.interval
//       : setInterval(() => {
//           this.setState({elapsed: new Date().getTime() - this.state.startTime});
//         }, 999);
//   }

//   stop() {
//     if (this.interval) {
//       if (this.props.laps) {
//         this.setState({stopTime: new Date().getTime()});
//       }

//       clearInterval(this.interval);
//       this.interval = null;
//     }
//     this.setState({started: false});
//   }

//   reset() {
//     const {startTime} = this.props;
//     this.setState({
//       elapsed: startTime || 0,
//       startTime: null,
//       stopTime: null,
//       pausedTime: null,
//     });
//   }

//   formatTime() {
//     const {getTime, getMsecs, msecs} = this.props;
//     const now = this.state.elapsed;
//     const formatted = formatTimeString(now, msecs);
//     if (typeof getTime === 'function') {
//       getTime(formatted);
//     }
//     if (typeof getMsecs === 'function') {
//       getMsecs(now);
//     }
//     return formatted;
//   }

//   render() {
//     const styles = this.props.timerStyle
//       ? this.props.timerStyle
//       : this.defaultStyles;
//     console.log("index", this.props.index, this.formatTime());
//     return (
//       <View ref="stopwatch" style={styles.container}>
//         <Text style={styles.text}>{this.formatTime()}</Text>
//       </View>
//     );
//   }
// }

import React, {useEffect, useRef, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useTheme} from '@react-navigation/native';

export const StopWatch = ({
  start = false,
  startTime = 0,
  getTime = time => {},
  id = 0,
}) => {
  const [voiceDuration, setvoiceDuration] = useState('00:00:00');
  const {colors} = useTheme();
  var duration = useRef<NodeJS.Timer>();

  useEffect(() => {
    if (start) {
      startTimer();
    } else {
      stopTimer();
    }
  }, [start]);

  useEffect(() => {
    if (startTime) {
      setDuration(startTime);
    }
  }, [startTime]);

  useEffect(() => {
    return () => {
      stopTimer();
    };
  }, []);

  const setDuration = timer => {
    var countDownDate = new Date();
    var now = new Date().getTime();
    var timeleft = now - countDownDate.getTime() + 1000 * timer;

    // Calculating the days, hours, minutes and seconds left
    var hours = Math.floor(
      (timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    ).toString();
    var minutes = Math.floor(
      (timeleft % (1000 * 60 * 60)) / (1000 * 60),
    ).toString();
    var seconds = Math.floor((timeleft % (1000 * 60)) / 1000).toString();

    var durationString = `${hours?.length == 1 ? '0' + hours : hours}:${
      minutes?.length == 1 ? '0' + minutes : minutes
    }:${seconds?.length == 1 ? '0' + seconds : seconds}`;
    setvoiceDuration(durationString);
  };

  const startTimer = () => {
    var countDownDate = new Date();
    // Run myfunc every second
    duration.current = setInterval(function () {
      var now = new Date().getTime();
      var timeleft = now - countDownDate.getTime() + 1000 * startTime;

      // Calculating the days, hours, minutes and seconds left
      var hours = Math.floor(
        (timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      ).toString();
      var minutes = Math.floor(
        (timeleft % (1000 * 60 * 60)) / (1000 * 60),
      ).toString();
      var seconds = Math.floor((timeleft % (1000 * 60)) / 1000).toString();

      var durationString = `${hours?.length == 1 ? '0' + hours : hours}:${
        minutes?.length == 1 ? '0' + minutes : minutes
      }:${seconds?.length == 1 ? '0' + seconds : seconds}`;
      setvoiceDuration(durationString);
      getTime(
        parseInt(seconds) + parseInt(minutes) * 60 + parseInt(hours) * 60 * 60,
      );
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(duration.current);
  };

  return (
    <>
      <View style={styles.searchSection}>
        <View>
          <Text
            style={{color: colors.primary, fontWeight: 'bold', fontSize: 16}}>
            {voiceDuration}
          </Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  searchSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  searchIcon: {
    padding: 10,
    height: 40,
  },
  input: {
    flex: 1,
    height: 70,
    padding: 10,
    paddingLeft: 20,
    backgroundColor: '#fff',
    color: '#1B1A57',
    fontSize: 15,
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginRight: 10,
  },
});
