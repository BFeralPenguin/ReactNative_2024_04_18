import {TextStyle} from 'react-native';

const colors = {
  primary: '#871',
  secondary: 'burlywood',
  outline: '#0AA',
  shadow: '#FFF',
  red: 'red',
};

const text: {
  small: TextStyle;
  medium: TextStyle;
  large: TextStyle;
} = {
  small: {
    fontSize: 10,
  },
  medium: {
    fontSize: 14,
  },
  large: {
    fontSize: 16,
  },
};

export default {
  colors,
  text,
};
