import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";

function TouchableButton({ text, onPress, bgColor }) {
  return (
    <View style={styles.containerButtons}>
      <TouchableOpacity
        style={[styles.button, {backgroundColor: bgColor}]}
        onPress={onPress}>
        <Text style={styles.buttonText}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    containerButtons: {
      flexDirection: 'column',
      justifyContent: 'space-between'
    },
    button: {
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#000559'
    },
    buttonText: {
      color: '#ffffff'
    }
  });

export default TouchableButton;
