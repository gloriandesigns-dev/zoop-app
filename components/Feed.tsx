import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import PostCard from './PostCard';
import { generatePosts } from '../utils/mockData';
import { useMood } from '../context/MoodContext';

export default function Feed() {
  const { selectedMood } = useMood();
  
  // Re-generate posts when mood changes
  const posts = useMemo(() => generatePosts(selectedMood), [selectedMood]);

  return (
    <View style={styles.container}>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingBottom: 100, // Space for floating elements
  },
});
