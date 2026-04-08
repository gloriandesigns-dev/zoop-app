import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { MoreHorizontal, Heart, MessageCircle, Send, Bookmark } from 'lucide-react-native';
import { useRouter } from 'expo-router';

interface PostProps {
  post: {
    id: string;
    user: { username: string; avatar: string };
    image: string;
    likes: number;
    caption: string;
    timeAgo: string;
  };
}

export default function PostCard({ post }: PostProps) {
  const [isLiked, setIsLiked] = useState(false);
  const router = useRouter();

  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Image source={{ uri: post.user.avatar }} style={styles.avatar} />
          <Text style={styles.username}>{post.user.username}</Text>
        </View>
        <TouchableOpacity>
          <MoreHorizontal size={20} color="#111111" />
        </TouchableOpacity>
      </View>

      {/* Media */}
      <Image source={{ uri: post.image }} style={styles.media} />

      {/* Actions */}
      <View style={styles.actions}>
        <View style={styles.leftActions}>
          <TouchableOpacity onPress={() => setIsLiked(!isLiked)}>
            <Heart 
              size={24} 
              color={isLiked ? "#EB4213" : "#111111"} 
              fill={isLiked ? "#EB4213" : "transparent"} 
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/comments')}>
            <MessageCircle size={24} color="#111111" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/share')}>
            <Send size={24} color="#111111" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity><Bookmark size={24} color="#111111" /></TouchableOpacity>
      </View>

      {/* Likes & Caption */}
      <View style={styles.content}>
        <Text style={styles.likes}>{(post.likes + (isLiked ? 1 : 0)).toLocaleString()} likes</Text>
        <Text style={styles.captionText}>
          <Text style={styles.captionUsername}>{post.user.username} </Text>
          {post.caption}
        </Text>
        <Text style={styles.timeAgo}>{post.timeAgo} ago</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    marginBottom: 22,
    shadowColor: '#826DEE',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 14,
    paddingBottom: 10,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  avatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
  },
  username: {
    fontFamily: 'Outfit_500Medium',
    fontSize: 14,
    color: '#111111',
  },
  media: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 16,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
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
    marginBottom: 4,
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
  timeAgo: {
    fontFamily: 'Outfit_400Regular',
    fontSize: 12,
    color: '#666666',
    marginTop: 6,
  },
});
