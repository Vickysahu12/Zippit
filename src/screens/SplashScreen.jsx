import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Animated,
  Image,
} from 'react-native';

const SplashScreen = ({ navigation }) => {   // <-- navigation prop yahan lo
  const fadeAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(0.5);

  useEffect(() => {
    // Fade in + Scale animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();

    // Auto navigate after 3.5 seconds
    const timer = setTimeout(() => {
      navigation.replace('Login'); // 👈 ye line navigate karegi Login screen pe
    }, 3500);

    return () => clearTimeout(timer); // memory leak avoid
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar 
        barStyle="dark-content" 
        backgroundColor="#FFEB3B" 
        translucent={false}
      />

      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }],
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <View style={styles.logoWrapper}>
          <Animated.Image
            source={require('../assets/images/ligi.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.tagline}>News in a Zip!</Text>
        </View>
      </Animated.View>

      <View style={styles.loadingContainer}>
        <View style={styles.loadingBar} />
      </View>

      <Text style={styles.footer}>Surat Edition • v1.0</Text>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFEB3B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    // tightly stack logo + tagline
    marginBottom: 0,
  },
  logo: {
    width: 350,
    height: 350,
    // removes any internal padding from contain
    marginBottom: -100, // pulls tagline up close to logo
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  tagline: {
    fontSize: 18,
    color: '#000',
    opacity: 0.9,
    textAlign: 'center',
    fontWeight: '500',
    marginBottom:100, // extra close look
  },
  loadingContainer: {
    position: 'absolute',
    bottom: 80,
    width: 200,
    height: 4,
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  loadingBar: {
    width: '70%',
    height: '100%',
    backgroundColor: '#000',
    borderRadius: 2,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    fontSize: 14,
    color: '#000',
    opacity: 0.7,
    fontWeight: '500',
  },
});

export default SplashScreen;
