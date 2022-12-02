import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Animated } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import ProgressBar from './ProgressBar';

export default function App() {
  const countInterval = useRef<any>(null);
  const [count, setCount] = useState(0);

  const loaderValue = useRef(new Animated.Value(0)).current;

  const load = (count) => {
    Animated.timing(loaderValue, {
      toValue: count, //final value
      duration: 100, //update value in 500 milliseconds
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    countInterval.current = setInterval(
      () => setCount((old) => old + 0.1),
      500
    );
    return () => {
      clearInterval(countInterval.current); //when user exits, clear this interval.
    };
  }, []);

  useEffect(() => {
    load(count);
    if (count >= 1) {
      setCount(0);
    }
  }, [count]);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text>{count}</Text>

      <View style={{ width: '50%' }}>
        <ProgressBar progress={0.6} />
      </View>

      <ProgressBar progress={0} />
      <ProgressBar progress={100} />
      <ProgressBar progress={count} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  progressTrack: {
    height: 4,
    flexDirection: 'row',
    width: '100%',
    backgroundColor: '#f0f0f0',
  },
});
