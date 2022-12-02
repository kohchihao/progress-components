import {
  StyleSheet,
  Text,
  View,
  Animated,
  LayoutChangeEvent,
} from 'react-native';
import React, { useState, useRef, useEffect } from 'react';

type Props = {
  progress?: number;
  indeterminate?: boolean;
};

const ProgressBar = ({ progress = 0 }: Props) => {
  const [deviceWidth, setDeviceWidth] = useState(0);
  const loaderValue = useRef(new Animated.Value(0)).current;

  const onProgressTrackLayout = (event: LayoutChangeEvent) => {
    setDeviceWidth(event.nativeEvent.layout.width);
  };

  useEffect(() => {
    Animated.timing(loaderValue, {
      toValue: progress,
      duration: 100,
      useNativeDriver: true,
      isInteraction: false,
    }).start();
  }, [progress]);

  return (
    <View style={styles.progressTrack} onLayout={onProgressTrackLayout}>
      <Animated.View
        style={[
          styles.progressBar,
          {
            transform: [
              {
                translateX: loaderValue.interpolate({
                  inputRange: [0, 100],
                  outputRange: [-1 * 0.5 * deviceWidth, 0], // negative => left to right and vice-versa
                }),
              },
              {
                scaleX: loaderValue.interpolate({
                  inputRange: [0, 100],
                  outputRange: [0.0001, 1],
                }),
              },
            ],
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  progressTrack: {
    height: 4,
    flexDirection: 'row',
    width: '100%',
    backgroundColor: '#f0f0f0',
    overflow: 'hidden',
  },
  progressBar: {
    flex: 1,
    backgroundColor: '#8BED4F',
  },
});

export default ProgressBar;
