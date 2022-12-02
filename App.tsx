import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Animated } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import ProgressBar from './ProgressBar';
import ProgressCircle from './ProgressCircle';
export default function App() {
  const countInterval = useRef<any>(null);
  const [count, setCount] = useState(0);
  const [circleCount, setCircleCount] = useState(0);

  useEffect(() => {
    countInterval.current = setInterval(() => {
      setCount((old) => old + 1);
      setCircleCount((old) => old + 1);
    }, 200);
    return () => {
      clearInterval(countInterval.current); //when user exits, clear this interval.
    };
  }, []);

  useEffect(() => {
    // load(count);
    if (count >= 100) {
      setCount(0);
    }
    if (circleCount >= 100) {
      setCircleCount(0);
    }
  }, [count]);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text>{count}</Text>

      <View style={{ width: '50%' }}>
        <ProgressBar progress={60} />
      </View>

      <ProgressBar progress={0} />
      <ProgressBar progress={50} />
      <ProgressBar progress={count} />

      <ProgressCircle progress={0} />
      <ProgressCircle progress={25} />
      <ProgressCircle progress={50} />
      <ProgressCircle progress={circleCount} />
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
