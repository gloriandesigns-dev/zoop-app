import { useEffect, useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '../hooks/useFrameworkReady';
import { useFonts, Outfit_400Regular, Outfit_500Medium, Outfit_600SemiBold, Outfit_700Bold } from '@expo-google-fonts/outfit';
import * as SplashScreen from 'expo-splash-screen';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withTiming, runOnJS } from 'react-native-reanimated';
import FloatingNavBar from '../components/FloatingNavBar';
import MoodCapsule from '../components/MoodCapsule';
import { MoodProvider } from '../context/MoodContext';

SplashScreen.preventAutoHideAsync();

function AnimatedSplashScreen({ onAnimationComplete }: { onAnimationComplete: () => void }) {
  const opacity = useSharedValue(1);
  const scale = useSharedValue(0.8);

  useEffect(() => {
    scale.value = withSpring(1, { damping: 12 });
    setTimeout(() => {
      opacity.value = withTiming(0, { duration: 300 }, (finished) => {
        if (finished) {
          runOnJS(onAnimationComplete)();
        }
      });
    }, 1500);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View style={[StyleSheet.absoluteFill, styles.splashContainer, animatedStyle]}>
      <Image 
        source={{ uri: 'https://www.dropbox.com/scl/fi/x6e6zk07p0udbrzecz7xw/zoop.png?rlkey=8jfiyk83oktrsn9qgiak7d8nd&st=s493r6dd&raw=1' }} 
        style={styles.splashLogo} 
      />
    </Animated.View>
  );
}

export default function RootLayout() {
  useFrameworkReady();
  const [isSplashVisible, setIsSplashVisible] = useState(true);

  const [fontsLoaded, fontError] = useFonts({
    Outfit_400Regular,
    Outfit_500Medium,
    Outfit_600SemiBold,
    Outfit_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <MoodProvider>
      <View style={styles.container}>
        <Stack screenOptions={{ headerShown: false, animation: 'fade' }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="explore" />
          <Stack.Screen name="reels" />
          <Stack.Screen name="profile" />
          <Stack.Screen name="activity" />
          <Stack.Screen name="settings" options={{ animation: 'slide_from_right' }} />
          
          {/* Profile Sub-screens */}
          <Stack.Screen name="profile/edit" options={{ animation: 'slide_from_right' }} />
          <Stack.Screen name="profile/network" options={{ animation: 'slide_from_right' }} />
          <Stack.Screen name="profile/saved" options={{ animation: 'slide_from_right' }} />

          {/* Content Pages */}
          <Stack.Screen name="messages/index" />
          <Stack.Screen name="messages/[id]" />
          <Stack.Screen name="post/[id]" />
          <Stack.Screen name="audio/[id]" />
          <Stack.Screen name="hashtag/[tag]" />
          <Stack.Screen name="location/[id]" />
          
          {/* Editors */}
          <Stack.Screen name="create/post" options={{ animation: 'slide_from_bottom' }} />
          <Stack.Screen name="create/reel" options={{ animation: 'slide_from_bottom' }} />

          {/* Fullscreen & Transparent Modals */}
          <Stack.Screen name="story/[id]" options={{ presentation: 'fullScreenModal', animation: 'fade' }} />
          <Stack.Screen name="mood" options={{ presentation: 'fullScreenModal', animation: 'slide_from_bottom' }} />
          <Stack.Screen name="create" options={{ presentation: 'transparentModal', animation: 'slide_from_bottom' }} />
          <Stack.Screen name="comments" options={{ presentation: 'transparentModal', animation: 'none' }} />
          <Stack.Screen name="share" options={{ presentation: 'transparentModal', animation: 'none' }} />
          <Stack.Screen name="user-preview" options={{ presentation: 'transparentModal', animation: 'none' }} />
          
          <Stack.Screen name="+not-found" />
        </Stack>
        
        {/* Global Floating Elements */}
        <MoodCapsule />
        <FloatingNavBar />
        
        {isSplashVisible && (
          <AnimatedSplashScreen onAnimationComplete={() => setIsSplashVisible(false)} />
        )}

        <StatusBar style="light" />
      </View>
    </MoodProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  splashContainer: {
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  splashLogo: {
    width: 180,
    height: 80,
    resizeMode: 'contain',
  },
});
