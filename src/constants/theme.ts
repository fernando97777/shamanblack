import { Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');

export const COLORS = {
  primary: '#022757',
  secondary: '#00a4cf',
  tertiary: '#e4e4e4',
};

export const SIZES = {
  // Global SIZES
  font: 14,
  radius: 8,
  padding: 10,

  // FONTS Sizes
  largeTitle: 50,
  h1: 36,
  h2: 22,
  h3: 16,
  h4: 14,
  h5: 12,
  body1: 30,
  body2: 20,
  body3: 16,
  body4: 14,

  topIOS: 60,
  topAndroid: 0,

  // App Dimensions
  width,
  height,
};

export const FONTS = {
  largeTitle: {
    fontFamily: 'black',
    fontSize: SIZES.largeTitle,
    lineHeight: 55,
    color: 'black',
  },
  h1: {
    fontFamily: 'bold',
    fontSize: SIZES.h1,
    lineHeight: 36,
    color: 'black',
  },
  h2: {
    fontFamily: 'bold',
    fontSize: SIZES.h2,
    lineHeight: 30,
    color: 'black',
  },
  h3: {
    fontFamily: 'bold',
    fontSize: SIZES.h3,
    lineHeight: 22,
    color: 'black',
  },
  h4: {
    fontFamily: 'bold',
    fontSize: SIZES.h4,
    lineHeight: 20,
  },
  body1: {
    fontFamily: 'regular',
    fontSize: SIZES.body1,
    lineHeight: 36,
    color: 'black',
  },
  body2: {
    fontFamily: 'regular',
    fontSize: SIZES.body2,
    lineHeight: 30,
    color: 'black',
  },
  body3: {
    fontFamily: 'regular',
    fontSize: SIZES.body3,
    lineHeight: 22,
    color: 'black',
  },
  body4: {
    fontFamily: 'regular',
    fontSize: SIZES.body4,
    lineHeight: 20,
    color: 'black',
  },
};

const appTheme = {
  COLORS,
  SIZES,
  FONTS,
};

export default appTheme;
