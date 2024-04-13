import React from 'react';
import {StyleSheet, Text} from 'react-native';
import theme from '../theme.js';

export default function StyledText({
  children,
  color,
  fontSize,
  fontWeight,
  style,
  aling,
  ...restOfProps
}) {
  const textStyles = [
    styles.text,
    aling === 'center' && styles.textAlignCenter,
    color === 'primary' && styles.colorPrimary,
    color === 'secondary' && styles.colorSecondary,
    fontSize === 'subheading' && styles.subheading,
    fontWeight === 'bold' && styles.bold,
    style,
  ];

  return (
    <Text style={textStyles} {...restOfProps}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSize.body,
    fontFamily: theme.fonts.main,
    fontWeight: theme.fontWeights.normal,
  },
  colorPrimary: {
    color: theme.colors.primary,
  },
  colorSecondary: {
    color: theme.colors.textSecondary,
  },
  bold: {
    fontWeight: theme.fontWeights.bold,
  },
  subheading: {
    fontSize: theme.fontSize.subHeading,
  },
  textAlignCenter: {
    textAlign: 'center',
  },
});
