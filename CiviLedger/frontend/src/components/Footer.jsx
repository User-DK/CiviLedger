import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Footer = () => {
  return (
    <View style={styles.footer}>
      <Text style={styles.footerText}>
        Copyright © 2025 - CSE Department, Walchand College of Engineering
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
 footer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: 'black', // Black background
    position: 'absolute', // Ensure it stays at the bottom
    bottom: 0,
    width: '100%',
  },
  footerText: {
    fontSize: 12,
    color: 'white', // White text
  },
});

export default Footer;