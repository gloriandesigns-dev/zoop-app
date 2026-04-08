import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, MoreHorizontal, Heart, MessageCircle, Send, Bookmark } from 'lucide-react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { generateSinglePost } from '../../utils/mockData';

export default function PostViewerScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [isLiked, setIsLiked] = useState(false);
  
  // In a real app, you would fetch the post by ID. Here we generate a mock one.
  const post = generateSinglePost(id as string);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ChevronLeft size={28} color="#111111" />
        </TouchableOpacity>
        <Text style={styles.topBarTitle}>Posts</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <Animated.View entering={FadeInUp.duration(400).springify()}>
          {/* Post Header */}
          <View style={styles.header}>
            <View style={styles.userInfo}>
              <Image source={{ uri: post.user.avatar }} style={styles.avatar} />
              <Text style={styles.username}>{post.user.username}</Text>
            </View>
            <TouchableOpacity>
              <MoreHorizontal size={20} color="#111111" />
            </TouchableOpacity>
          </View>

          {/* Post Media */}
          <Image source={{ uri: post.image }} style={styles.media} />

          {/* Actions */}
          <View style={styles.actions}>
            <View style={styles.leftActions}>
              <TouchableOpacity onPress={() => setIsLiked(!isLiked)}>
                <Heart 
                  size={26} 
                  color={isLiked ? "#EB4213" : "#111111"} 
                  fill={isLiked ? "#EB4213" : "transparent"} 
                />
              </TouchableOpacity>
              <TouchableOpacity><MessageCircle size={26} color="#111111" /></TouchableOpacity>
              <TouchableOpacity><Send size={26} color="#111111" /></TouchableOpacity>
            </View>
            <TouchableOpacity><Bookmark size={26} color="#111111" /></TouchableOpacity>
          </View>

          {/* Likes & Caption */}
          <View style={styles.content}>
            <Text style={styles.likes}>{(post.likes + (isLiked ? 1 : 0)).toLocaleString()} likes</Text>
            <Text style={styles.captionText}>
              <Text style={styles.captionUsername}>{post.user.username} </Text>
              {post.caption}
            </Text>
            <TouchableOpacity>
              <Text style={styles.viewComments}>View all {post.comments} comments</Text>
            </TouchableOpacity>
            <Text style={styles.timeAgo}>{post.timeAgo} ago</Text>
          </View>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  topBar: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  backButton: {
    padding: 8,
  },
  topBarTitle: {
    fontFamily: 'Outfit_700Bold',
    fontSize: 18,
    color: '#111111',
  },
  scrollContent: {
    paddingBottom: 120, // Space for floating nav bar if it persists
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  username: {
    fontFamily: 'Outfit_500Medium',
    fontSize: 14,
    color: '#111111',
  },
  media: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 0, // As requested in JSON
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    paddingHorizontal: 14,
  },
  leftActions: {
    flexDirection: 'row',
    gap: 16,
  },
  content: {
    paddingHorizontal: 14,
    paddingBottom: 14,
  },
  likes: {
    fontFamily: 'Outfit_700Bold',
    fontSize: 14,
    color: '#111111',
    marginBottom: 6,
  },
  captionText: {
    fontFamily: 'Outfit_400Regular',
    fontSize: 14,
    color: '#111111',
    lineHeight: 20,
  },
  captionUsername: {
    fontFamily: 'Outfit_700Bold',
    color: '#111111',
  },
  viewComments: {
    fontFamily: 'Outfit_400Regular',
    fontSize: 14,
    color: '#666666',
    marginTop: 6,
  },
  timeAgo: {
    fontFamily: 'Outfit_400Regular',
    fontSize: 12,
    color: '#666666',
    marginTop: 6,
  },
});
