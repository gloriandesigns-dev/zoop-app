import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Dimensions, FlatList, Image, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { SlideInDown, SlideOutDown } from 'react-native-reanimated';
import { Heart, Send } from 'lucide-react-native';
import { generateComments } from '../utils/mockData';

const { height } = Dimensions.get('window');
const commentsData = generateComments(15);

export default function CommentsSheet() {
  const router = useRouter();
  const [inputText, setInputText] = useState('');
  const [comments, setComments] = useState(commentsData);

  const toggleLike = (id: string) => {
    setComments(comments.map(c => c.id === id ? { ...c, isLiked: !c.isLiked, likes: c.isLiked ? c.likes - 1 : c.likes + 1 } : c));
  };

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.commentItem}>
      <Image source={{ uri: item.user.avatar }} style={styles.avatar} />
      <View style={styles.commentContent}>
        <Text style={styles.username}>
          {item.user.username} <Text style={styles.timeAgo}>{item.timeAgo}</Text>
        </Text>
        <Text style={styles.commentText}>{item.text}</Text>
        <View style={styles.commentActions}>
          <Text style={styles.actionText}>Reply</Text>
          {item.likes > 0 && <Text style={styles.actionText}>{item.likes} likes</Text>}
        </View>
      </View>
      <Pressable onPress={() => toggleLike(item.id)} style={styles.likeButton}>
        <Heart size={16} color={item.isLiked ? "#EB4213" : "#666666"} fill={item.isLiked ? "#EB4213" : "transparent"} />
      </Pressable>
    </View>
  );

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.overlay}
    >
      <Pressable style={styles.backdrop} onPress={() => router.back()} />
      
      <Animated.View 
        entering={SlideInDown.duration(300).springify()} 
        exiting={SlideOutDown.duration(200)}
        style={styles.sheetContainer}
      >
        {/* Drag Handle & Header */}
        <View style={styles.header}>
          <View style={styles.dragHandle} />
          <Text style={styles.title}>Comments</Text>
        </View>

        {/* Comments List */}
        <FlatList
          data={comments}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />

        {/* Input Bar */}
        <View style={styles.inputContainer}>
          <Image source={{ uri: 'https://i.pravatar.cc/150?img=68' }} style={styles.inputAvatar} />
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Add a comment..."
              placeholderTextColor="#666666"
              value={inputText}
              onChangeText={setInputText}
              multiline
            />
            {inputText.length > 0 && (
              <Pressable style={styles.sendButton}>
                <Send size={20} color="#EB4213" />
              </Pressable>
            )}
          </View>
        </View>
      </Animated.View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  sheetContainer: {
    height: height * 0.75,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: 'hidden',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  dragHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    marginBottom: 12,
  },
  title: {
    fontFamily: 'Outfit_700Bold',
    fontSize: 16,
    color: '#111111',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  commentItem: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 12,
  },
  commentContent: {
    flex: 1,
    marginRight: 12,
  },
  username: {
    fontFamily: 'Outfit_600SemiBold',
    fontSize: 14,
    color: '#111111',
    marginBottom: 2,
  },
  timeAgo: {
    fontFamily: 'Outfit_400Regular',
    color: '#666666',
    fontSize: 12,
  },
  commentText: {
    fontFamily: 'Outfit_400Regular',
    fontSize: 14,
    color: '#111111',
    lineHeight: 20,
    marginBottom: 6,
  },
  commentActions: {
    flexDirection: 'row',
    gap: 16,
  },
  actionText: {
    fontFamily: 'Outfit_500Medium',
    fontSize: 12,
    color: '#666666',
  },
  likeButton: {
    padding: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    backgroundColor: '#FFFFFF',
  },
  inputAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 12,
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 999,
    minHeight: 52,
    paddingHorizontal: 16,
  },
  input: {
    flex: 1,
    fontFamily: 'Outfit_400Regular',
    fontSize: 14,
    color: '#111111',
    paddingVertical: 12,
  },
  sendButton: {
    marginLeft: 8,
    padding: 4,
  },
});
