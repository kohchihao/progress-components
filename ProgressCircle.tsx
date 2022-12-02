import React, { useRef, useEffect, useState } from 'react';
import {
  Easing,
  TextInput,
  Animated,
  Text,
  View,
  StyleSheet,
} from 'react-native';
import Svg, { G, Circle, Rect } from 'react-native-svg';

const radius = 72;
const strokeWidth = 10;
const max = 100;

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
type Props = {
  progress?: number;
};
const ProgressCircle = ({ progress = 0 }: Props) => {
  const circleRef = useRef();
  const halfCircle = radius + strokeWidth;
  const circleCircumference = 2 * Math.PI * radius;
  const animatedValue = React.useRef(new Animated.Value(0)).current;
  const [strokeDashOffset, setStrokeDashOffset] = useState(0);

  const animation = (toValue: number) => {
    return Animated.timing(animatedValue, {
      toValue,
      duration: 100,
      delay: 0,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    animation(progress);

    animatedValue.addListener((v) => {
      if (circleRef?.current) {
        const maxPerc = (100 * v.value) / max;
        const strokeDashOffset =
          circleCircumference - (circleCircumference * maxPerc) / 100;

        setStrokeDashOffset(strokeDashOffset);
      }
    });

    return () => {
      animatedValue.removeAllListeners();
    };
  }, [progress]);
  return (
    <View>
      <Svg
        width={radius * 2}
        height={radius * 2}
        viewBox={`0 0 ${halfCircle * 2} ${halfCircle * 2}`}
      >
        <G rotation="-90" origin={`${halfCircle}, ${halfCircle}`}>
          <Circle
            cx="50%"
            cy="50%"
            stroke={'#E5E5E5'}
            strokeWidth={strokeWidth}
            r={radius}
            fill="transparent"
          />

          <AnimatedCircle
            ref={circleRef}
            cx="50%"
            cy="50%"
            stroke={'red'}
            strokeWidth={strokeWidth}
            r={radius}
            fill="transparent"
            strokeDasharray={circleCircumference}
            strokeDashoffset={strokeDashOffset}
            strokeLinecap="round"
          />
        </G>
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({});

export default ProgressCircle;
