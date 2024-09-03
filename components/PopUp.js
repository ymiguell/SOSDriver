import React, { useRef, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Animated, PanResponder } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { height } = Dimensions.get('window');

export function BottomSheet() {
  const [isExpanded, setIsExpanded] = useState(true);
  const animatedHeight = useRef(new Animated.Value(height * 0.3)).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (e, gestureState) => {
        animatedHeight.setValue(height - gestureState.moveY);
      },
      onPanResponderRelease: (e, gestureState) => {
        const newHeight = height - gestureState.moveY;
        Animated.spring(animatedHeight, {
          toValue: newHeight < height * 0.5 ? height * 0.3 : height * 0.7,
          useNativeDriver: false,
        }).start();
      },
    })
  ).current;

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.bottomSheet, { height: animatedHeight }]}
        {...panResponder.panHandlers}
      >
        <LinearGradient
          colors={['#003B6F', '#005AA6', '#007BFF']}
          style={styles.gradient}
        >
          <View style={styles.handle} />
          <View style={styles.content}>
            <TouchableOpacity style={styles.options}>
              <Text style={styles.centralizarTextos}>Mecânico?</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.options}>
              <Text style={styles.centralizarTextos}>Eletricista?</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.options}>
              <Text style={styles.centralizarTextos}>Borracheiro?</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  bottomSheet: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    overflow: 'hidden',
    zIndex: 2,
  },
  gradient: {
    flex: 1,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  handle: {
    width: 60,
    height: 5,
    backgroundColor: '#ddd',
    borderRadius: 2.5,
    alignSelf: 'center',
    marginVertical: 10,
  },
  content: {
    padding: 16,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    position: 'relative',
    height: '100%',
    width: '100%',
  },
  options: {
    alignSelf: 'center',
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#fff',
    width: '50%',
    borderRadius: 10,
  },
  centralizarTextos: {
    textAlign: 'center',
    color: 'white',
  },
});
