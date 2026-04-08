import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Sparkles, ChevronDown } from 'lucide-react-native';
import { usePathname, useRouter } from 'expo-router';
import { useMood } from '../context/MoodContext';

const MOODS = ["Funny", "Chill", "Aesthetic", "Learning"];
const GRADIENT_COLORS = ['#EB4213', '#FF99DC', '#826DEE', '#D8F382'];

export default function MoodCapsule() {
  const pathname = usePathname();
  const router = useRouter();
  const { selectedMood, setSelectedMood } = useMood();
  const [expanded, setExpanded] = useState(false);
  
  // Animation values
  const height = useSharedValue(52);
  const width = useSharedValue(200);
  const contentOpacity = useSharedValue(0);

  // Hide capsule on specific screens
  const isHidden = 
    ['/create', '/comments', '/share', '/user-preview', '/settings', '/mood'].includes(pathname) || 
    (pathname.startsWith('/messages/') && pathname !== '/messages') ||
    pathname.startsWith('/story/') ||
    (pathname.startsWith('/profile/') && pathname !== '/profile') ||
    pathname.startsWith('/create/') ||
    pathname.startsWith('/audio/') ||
    pathname.startsWith('/hashtag/') ||
    pathname.startsWith('/location/');

  const toggleExpand = () => {
    const isExpanding = !expanded;
    setExpanded(isExpanding);
    
    height.value = withSpring(isExpanding ? 320 : 52, { damping: 16, stiffness: 100 });
    width.value = withSpring(isExpanding ? 220 : 200, { damping: 16, stiffness: 100 });
    contentOpacity.value = withTiming(isExpanding ? 1 : 0, { duration: 200 });
  };

  const animatedContainerStyle = useAnimatedStyle(() => ({
    height: height.value,
    width: width.value,
  }));

  const animatedExpandedContentStyle = useAnimatedStyle(() => ({
    opacity: contentOpacity.value,
    display: contentOpacity.value === 0 && !expanded ? 'none' : 'flex',
  }));

  const animatedCollapsedContentStyle = useAnimatedStyle(() => ({
    opacity: 1 - contentOpacity.value,
    display: contentOpacity.value === 1 && expanded ? 'none' : 'flex',
  }));

  if (isHidden) {
    return null;
  }

  return (
    <Animated.View style={[styles.container, animatedContainerStyle]}>
      <LinearGradient
        colors={GRADIENT_COLORS}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientBorder}
      >
        <View style={styles.innerContainer}>
          {/* Collapsed State */}
          <Animated.View style={[styles.collapsedContent, animatedCollapsedContentStyle]}>
            <Pressable style={styles.pressableArea} onPress={toggleExpand}>
              <Sparkles size={18} color="#EB4213" />
              <Text style={styles.text}>{selectedMood || "Enter your mood"}</Text>
            </Pressable>
          </Animated.View>

          {/* Expanded State (Dropdown) */}
          <Animated.View style={[styles.expandedContent, animatedExpandedContentStyle]}>
            <Pressable style={styles.headerRow} onPress={toggleExpand}>
              <Text style={styles.expandedTitle}>How are you feeling?</Text>
              <ChevronDown size={20} color="#666666" />
            </Pressable>
            
            <View style={styles.moodList}>
              {MOODS.map((mood) => {
                const isSelected = selectedMood === mood;
                return (
                  <Pressable 
                    key={mood} 
                    style={[styles.moodItem, isSelected && styles.moodItemActive]}
                    onPress={() => {
                      setSelectedMood(mood);
                      toggleExpand();
                    }}
                  >
                    <Text style={[styles.moodText, isSelected && styles.moodTextActive]}>
                      {mood}
                    </Text>
                  </Pressable>
                );
              })}
              
              <Pressable 
                style={styles.moreButton}
                onPress={() => {
                  toggleExpand();
                  router.push('/mood');
                }}
              >
                <Text style={styles.moreButtonText}>View all moods...</Text>
              </Pressable>
            </View>
          </Animated.View>
        </View>
      </LinearGradient>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 96,
    alignSelf: 'center',
    zIndex: 100,
    shadowColor: '#826DEE',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 8,
  },
  gradientBorder: {
    flex: 1,
    borderRadius: 26,
    padding: 2.5,
  },
  innerContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    overflow: 'hidden',
  },
  collapsedContent: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
  },
  pressableArea: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  text: {
    fontFamily: 'Outfit_500Medium',
    fontSize: 14,
    color: '#111111',
  },
  expandedContent: {
    flex: 1,
    padding: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  expandedTitle: {
    fontFamily: 'Outfit_700Bold',
    fontSize: 16,
    color: '#111111',
  },
  moodList: {
    gap: 8,
  },
  moodItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
  },
  moodItemActive: {
    backgroundColor: '#826DEE',
  },
  moodText: {
    fontFamily: 'Outfit_500Medium',
    fontSize: 14,
    color: '#111111',
  },
  moodTextActive: {
    color: '#FFFFFF',
  },
  moreButton: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  moreButtonText: {
    fontFamily: 'Outfit_600SemiBold',
    fontSize: 14,
    color: '#EB4213',
  },
});
