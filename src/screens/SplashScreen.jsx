import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Animated,
  Image,
  Platform,
} from 'react-native';

const SplashScreen = () => {
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

    // Auto navigate after 2.5 seconds
    setTimeout(() => {
      console.log('Navigate to Login Screen');
    }, 2500);
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
        }}
      >
        {/* Logo Image */}
        <Animated.Image 
          source={require('../assets/images/ligi.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        
        {/* Tagline - Right below logo */}
        <Text style={styles.tagline}>News in a Zip!</Text>
      </Animated.View>
      
      {/* Loading Indicator */}
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
  logo: {
    width: 350,
    height: 350,
    marginBottom: -50,  // ← Changed from 25 to 5 (logo ke bilkul neeche!)
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    // Shadow for Android
    elevation: 8,
  },
  tagline: {
    fontSize: 18,
    color: '#000',
    opacity: 0.8,
    textAlign: 'center',
    marginTop: -50,  // ← Changed from 1 to 0 (no gap!)
    fontWeight: '500',
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