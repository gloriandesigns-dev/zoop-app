import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, Pressable, TextInput } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { X, Heart, Send } from 'lucide-react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing, cancelAnimation } from 'react-native-reanimated';
import { generateStories } from '../../utils/mockData';

const { width, height } = Dimensions.get('window');

export default function StoryViewerScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [isPaused, setIsPaused] = useState(false);
  
  // Mock data fetching based on ID
  const allStories = generateStories(5);
  const currentIndex = allStories.findIndex(s => s.id === id) || 0;
  const story = allStories[currentIndex >= 0 ? currentIndex : 0];

  const progress = useSharedValue(0);

  const startAnimation = () => {
    progress.value = withTiming(1, { duration: 5000, easing: Easing.linear }, (finished) => {
      if (finished) {
        // Auto advance logic (mocked to just close for now, or you could navigate to next ID)
        router.back();
      }
    });
  };

  useEffect(() => {
    startAnimation();
    return () => cancelAnimation(progress);
  }, []);

  const handlePressIn = () => {
    setIsPaused(true);
    cancelAnimation(progress);
  };

  const handlePressOut = () => {
    setIsPaused(false);
    // Resume animation from current value
    const remainingTime = 5000 * (1 - progress.value);
    progress.value = withTiming(1, { duration: remainingTime, easing: Easing.linear }, (finished) => {
      if (finished) router.back();
    });
  };

  const handleTapLeft = () => {
    // Go to previous story (mocked to close)
    router.back();
  };

  const handleTapRight = () => {
    // Go to next story (mocked to close)
    router.back();
  };

  const progressStyle = useAnimatedStyle(() => ({
    width: `${progress.value * 100}%`,
  }));

  if (!story) return null;

  return (
    <View style={styles.container}>
      <Image source={{ uri: story.storyImage }} style={styles.backgroundImage} />
      
      {/* Tap Zones */}
      <View style={styles.tapZones}>
        <Pressable 
          style={styles.leftZone} 
          onPress={handleTapLeft}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
        />
        <Pressable 
          style={styles.rightZone} 
          onPress={handleTapRight}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
        />
      </View>

      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <View style={styles.progressTrack}>
            <Animated.View style={[styles.progressFill, progressStyle]} />
          </View>
        </View>

        {/* Header */}
        <View style={styles.header}>
          <View style={styles.userInfo}>
            <Image source={{ uri: story.avatar }} style={styles.avatar} />
            <Text style={styles.username}>{story.username}</Text>
            <Text style={styles.timeAgo}>2h</Text>
          </View>
          <Pressable onPress={() => router.back()} style={styles.closeButton}>
            <X size={24} color="#FFFFFF" />
          </Pressable>
        </View>

        {/* Bottom Input */}
        <View style={styles.bottomContainer}>
          <View style={styles.inputWrapper}>
            <TextInput 
              style={styles.input}
              placeholder="Send message"
              placeholderTextColor="#FFFFFF80"
            />
          </View>
          <Pressable style={styles.reactionBtn}>
            <Heart size={28} color="#FFFFFF" />
          </Pressable>
          <Pressable style={styles.reactionBtn}>
            <Send size={28} color="#FFFFFF" />
          </Pressable>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    width: width,
    height: height,
    resizeMode: 'cover',
  },
  tapZones: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: 'row',
    zIndex: 10,
  },
  leftZone: {
    flex: 0.3,
  },
  rightZone: {
    flex: 0.7,
  },
  safeArea: {
    flex: 1,
    justifyContent: 'space-between',
    zIndex: 20,
  },
  progressContainer: {
    paddingHorizontal: 8,
    paddingTop: 8,
    paddingBottom: 12,
  },
  progressTrack: {
    height: 2,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 1,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  username: {
    fontFamily: 'Outfit_600SemiBold',
    fontSize: 14,
    color: '#FFFFFF',
  },
  timeAgo: {
    fontFamily: 'Outfit_400Regular',
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
  },
  closeButton: {
    padding: 8,
  },
  bottomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 16,
    gap: 16,
  },
  inputWrapper: {
    flex: 1,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
    justifyContent: 'center',
    paddingHorizontal: 16,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  input: {
    fontFamily: 'Outfit_400Regular',
    fontSize: 14,
    color: '#FFFFFF',
  },
  reactionBtn: {
    padding: 4,
  },
});
