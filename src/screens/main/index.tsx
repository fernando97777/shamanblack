import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Main = () => {
  return (
    <SafeAreaView style={styles.area}>
      <StatusBar style='light' />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text className='text-black text-2xl font-bold'>Main</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  // Main
  area: {
    flex: 1,
  },
});

export default Main;
