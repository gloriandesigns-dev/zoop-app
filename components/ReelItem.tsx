import React, { useState, useRef } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, Pressable, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Heart, MessageCircle, Send, Bookmark, Music, Play, Volume2, VolumeX } from 'lucide-react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring, 
  withSequence, 
  withTiming,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Video, ResizeMode } from 'expo-av';

const { height: WINDOW_HEIGHT, width: WINDOW_WIDTH } = Dimensions.get('window');

interface ReelProps {
  reel: {
    id: string;
    user: { username: string; avatar: string };
    videoUrl: string;
    likes: number;
    comments: number;
    caption: string;
    audio: string;
  };
  isActive: boolean;
}

export default function ReelItem({ reel, isActive }: ReelProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isBuffering, setIsBuffering] = useState(true);
  
  const lastTapRef = useRef(0);
  const router = useRouter();
  const videoRef = useRef<Video>(null);

  // Heart burst animation values
  const heartScale = useSharedValue(0);
  const heartOpacity = useSharedValue(0);

  const triggerLikeAnimation = () => {
    setIsLiked(true);
    heartOpacity.value = 1;
    heartScale.value = 0;
    heartScale.value = withSequence(
      withSpring(1.2, { damping: 12, stiffness: 100 }),
      withTiming(1, { duration: 100 }),
      withTiming(1, { duration: 400 }), // Hold
      withTiming(0, { duration: 200 }, () => {
        heartOpacity.value = 0;
      })
    );
  };

  const handlePress = () => {
    const now = Date.now();
    const DOUBLE_PRESS_DELAY = 300;
    
    if (now - lastTapRef.current < DOUBLE_PRESS_DELAY) {
      // Double tap detected
      triggerLikeAnimation();
    } else {
      // Single tap detected - wait a bit to ensure it's not a double tap
      setTimeout(() => {
        if (Date.now() - lastTapRef.current >= DOUBLE_PRESS_DELAY) {
          setIsPaused(!isPaused);
        }
      }, DOUBLE_PRESS_DELAY);
    }
    lastTapRef.current = now;
  };

  const toggleMute = (e: any) => {
    e.stopPropagation();
    setIsMuted(!isMuted);
  };

  const heartAnimatedStyle = useAnimatedStyle(() => ({
    opacity: heartOpacity.value,
    transform: [{ scale: heartScale.value }],
  }));

  return (
    <View style={styles.container}>
      <Pressable style={styles.videoContainer} onPress={handlePress}>
        <Video
          ref={videoRef}
          source={{ uri: reel.videoUrl }}
          style={styles.videoPlayer}
          resizeMode={ResizeMode.COVER}
          shouldPlay={isActive && !isPaused}
          isLooping
          isMuted={isMuted}
          onLoadStart={() => setIsBuffering(true)}
          onReadyForDisplay={() => setIsBuffering(false)}
        />
        
        {/* Buffering Overlay */}
        {isBuffering && isActive && (
          <View style={styles.bufferingOverlay}>
            <ActivityIndicator size="large" color="#FFFFFF" />
          </View>
        )}

        {/* Dark gradient overlay for text readability */}
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)']}
          style={styles.gradientOverlay}
        />

        {/* Play Icon Overlay when paused */}
        {isPaused && !isBuffering && (
          <View style={styles.pauseOverlay}>
            <Play size={64} color="rgba(255,255,255,0.8)" fill="rgba(255,255,255,0.8)" />
          </View>
        )}

        {/* Big Heart Animation Overlay */}
        <Animated.View style={[styles.bigHeartContainer, heartAnimatedStyle]} pointerEvents="none">
          <Heart size={100} color="#EB4213" fill="#EB4213" />
        </Animated.View>

        {/* Top Right Mute Toggle */}
        <TouchableOpacity style={styles.muteButton} onPress={toggleMute}>
          {isMuted ? <VolumeX size={20} color="#FFFFFF" /> : <Volume2 size={20} color="#FFFFFF" />}
        </TouchableOpacity>

        {/* Right Actions Bar */}
        <View style={styles.rightActions}>
          <Pressable style={styles.actionButton} onPress={() => setIsLiked(!isLiked)}>
            <Heart 
              size={32} 
              color={isLiked ? "#EB4213" : "#FFFFFF"} 
              fill={isLiked ? "#EB4213" : "transparent"} 
            />
            <Text style={styles.actionText}>
              {(reel.likes + (isLiked ? 1 : 0)).toLocaleString()}
            </Text>
          </Pressable>
          
          <Pressable style={styles.actionButton} onPress={() => router.push('/comments')}>
            <MessageCircle size={32} color="#FFFFFF" />
            <Text style={styles.actionText}>{reel.comments.toLocaleString()}</Text>
          </Pressable>
          
          <Pressable style={styles.actionButton} onPress={() => router.push('/share')}>
            <Send size={32} color="#FFFFFF" />
            <Text style={styles.actionText}>Share</Text>
          </Pressable>
          
          <Pressable style={styles.actionButton}>
            <Bookmark size={32} color="#FFFFFF" />
          </Pressable>

          <View style={styles.audioTrackCover}>
            <Image source={{ uri: reel.user.avatar }} style={styles.audioImage} />
            <Music size={12} color="#FFFFFF" style={styles.audioIconSmall} />
          </View>
        </View>

        {/* Bottom Info */}
        <View style={styles.bottomInfo}>
          <View style={styles.userRow}>
            <Image source={{ uri: reel.user.avatar }} style={styles.avatar} />
            <Text style={styles.username}>{reel.user.username}</Text>
            <Pressable style={styles.followButton}>
              <Text style={styles.followText}>Follow</Text>
            </Pressable>
          </View>
          
          <Text style={styles.caption} numberOfLines={2}>
            {reel.caption}
          </Text>
          
          <View style={styles.audioRow}>
            <Music size={14} color="#FFFFFF" />
            <Text style={styles.audioText} numberOfLines={1}>
              {reel.audio}
            </Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT,
    backgroundColor: '#000000',
  },
  videoContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  videoPlayer: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  gradientOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
  },
  bufferingOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  pauseOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bigHeartContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  muteButton: {
    position: 'absolute',
    top: 100, // Below the top bar
    right: 16,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 20,
  },
  rightActions: {
    position: 'absolute',
    right: 16,
    bottom: 120, // Above the nav bar
    alignItems: 'center',
    gap: 24,
  },
  actionButton: {
    alignItems: 'center',
    gap: 6,
  },
  actionText: {
    color: '#FFFFFF',
    fontFamily: 'Outfit_500Medium',
    fontSize: 13,
  },
  audioTrackCover: {
    width: 36,
    height: 36,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    overflow: 'hidden',
    marginTop: 12,
  },
  audioImage: {
    width: '100%',
    height: '100%',
  },
  audioIconSmall: {
    position: 'absolute',
    bottom: 2,
    right: 2,
  },
  bottomInfo: {
    position: 'absolute',
    left: 16,
    right: 80, // Leave space for right actions
    bottom: 100, // Above the nav bar
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  username: {
    color: '#FFFFFF',
    fontFamily: 'Outfit_700Bold',
    fontSize: 15,
  },
  followButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  followText: {
    color: '#FFFFFF',
    fontFamily: 'Outfit_500Medium',
    fontSize: 13,
  },
  caption: {
    color: '#FFFFFF',
    fontFamily: 'Outfit_400Regular',
    fontSize: 14,
    marginBottom: 12,
    lineHeight: 20,
  },
  audioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(0,0,0,0.4)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    alignSelf: 'flex-start',
  },
  audioText: {
    color: '#FFFFFF',
    fontFamily: 'Outfit_400Regular',
    fontSize: 13,
  },
});
