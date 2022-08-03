import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {FAB} from 'react-native-paper';

import styles from './style';

const FloatButton = ({AdditionalButtons}: {AdditionalButtons?: any}) => {
  const [showBtns, setShowBtns] = useState(false);
  const ShowMoreBtns = () => {
    setShowBtns(!showBtns);
  };

  return (
    <FAB.Group
      theme={{colors: {background: '#111'}}}
      fabStyle={styles.floatButton}
      open={showBtns}
      icon={showBtns ? 'close' : 'plus'}
      color="#fff"
      actions={AdditionalButtons}
      onStateChange={() => ShowMoreBtns()}
      visible={true}
      onPress={() => ShowMoreBtns()}
    />
  );
};

FloatButton.propTypes = {
  icon: PropTypes.string,
  onPress: PropTypes.func,
  style: PropTypes.object,
  moreBtns: PropTypes.array,
};

export default FloatButton;
