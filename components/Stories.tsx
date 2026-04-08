import React from 'react';
import { ScrollView, View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { generateStories } from '../utils/mockData';

const stories = generateStories(12);
const GRADIENT_COLORS = ['#EB4213', '#FF99DC', '#826DEE', '#D8F382'];

const { width } = Dimensions.get('window');
// Calculate item width to show exactly 4.5 items on screen
const ITEM_WIDTH = width / 4.5;
const AVATAR_SIZE = 72;
const BORDER_WIDTH = 3;
const RING_SIZE = AVATAR_SIZE + (BORDER_WIDTH * 2);

export default function Stories() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        snapToInterval={ITEM_WIDTH}
        decelerationRate="fast"
      >
        {/* Your Story */}
        <TouchableOpacity style={styles.storyContainer} onPress={() => router.push('/create')}>
          <View style={[styles.avatarRing, { borderColor: '#E0E0E0', borderWidth: BORDER_WIDTH }]}>
            <Image source={{ uri: 'https://i.pravatar.cc/150?img=68' }} style={styles.avatar} />
            <View style={styles.addButton}>
              <Text style={styles.addText}>+</Text>
            </View>
          </View>
          <Text style={styles.username} numberOfLines={1}>Your Story</Text>
        </TouchableOpacity>

        {/* Other Stories */}
        {stories.map((story) => (
          <TouchableOpacity 
            key={story.id} 
            style={styles.storyContainer}
            onPress={() => router.push(`/story/${story.id}`)}
          >
            {story.hasUnseen ? (
              <LinearGradient
                colors={GRADIENT_COLORS}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.gradientRing}
              >
                <View style={styles.innerRing}>
                  <Image source={{ uri: story.avatar }} style={styles.avatar} />
                </View>
              </LinearGradient>
            ) : (
              <View style={[styles.avatarRing, { borderColor: '#E0E0E0', borderWidth: BORDER_WIDTH }]}>
                <Image source={{ uri: story.avatar }} style={styles.avatar} />
              </View>
            )}
            <Text style={styles.username} numberOfLines={1}>{story.username}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 8,
    paddingBottom: 12,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    paddingLeft: 8, // Adjust padding to align with the calculated width
  },
  storyContainer: {
    alignItems: 'center',
    width: ITEM_WIDTH,
  },
  gradientRing: {
    width: RING_SIZE,
    height: RING_SIZE,
    borderRadius: RING_SIZE / 2,
    padding: BORDER_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerRing: {
    width: '100%',
    height: '100%',
    borderRadius: RING_SIZE / 2,
    backgroundColor: '#FFFFFF',
    padding: 2,
  },
  avatarRing: {
    width: RING_SIZE,
    height: RING_SIZE,
    borderRadius: RING_SIZE / 2,
    padding: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: AVATAR_SIZE / 2,
  },
  username: {
    fontFamily: 'Outfit_400Regular',
    fontSize: 12,
    color: '#111111',
    marginTop: 6,
    textAlign: 'center',
    width: '90%',
  },
  addButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#826DEE',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  addText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 18,
  },
});
