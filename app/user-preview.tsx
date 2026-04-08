import React from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { SlideInDown, SlideOutDown } from 'react-native-reanimated';
import { faker } from '@faker-js/faker';

export default function UserPreviewSheet() {
  const router = useRouter();
  
  // Mock user data
  const user = {
    username: faker.internet.username().toLowerCase(),
    fullName: faker.person.fullName(),
    avatar: faker.image.avatar(),
    bio: faker.lorem.sentence(),
  };

  return (
    <View style={styles.overlay}>
      <Pressable style={styles.backdrop} onPress={() => router.back()} />
      
      <Animated.View 
        entering={SlideInDown.duration(300).springify()} 
        exiting={SlideOutDown.duration(200)}
        style={styles.sheetContainer}
      >
        <View style={styles.dragHandle} />
        
        <View style={styles.userInfo}>
          <Image source={{ uri: user.avatar }} style={styles.avatar} />
          <Text style={styles.username}>{user.username}</Text>
          <Text style={styles.fullName}>{user.fullName}</Text>
          <Text style={styles.bio}>{user.bio}</Text>
        </View>

        <View style={styles.actions}>
          <Pressable style={[styles.actionButton, styles.followButton]}>
            <Text style={styles.followText}>Follow</Text>
          </Pressable>
          <Pressable style={styles.actionButton} onPress={() => router.push('/messages/1')}>
            <Text style={styles.actionText}>Message</Text>
          </Pressable>
          <Pressable style={styles.actionButton} onPress={() => router.push('/profile')}>
            <Text style={styles.actionText}>View Profile</Text>
          </Pressable>
        </View>

      </Animated.View>
    </View>
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
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingBottom: 40,
    paddingTop: 12,
    alignItems: 'center',
  },
  dragHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    marginBottom: 24,
  },
  userInfo: {
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginBottom: 12,
  },
  username: {
    fontFamily: 'Outfit_700Bold',
    fontSize: 18,
    color: '#111111',
    marginBottom: 4,
  },
  fullName: {
    fontFamily: 'Outfit_500Medium',
    fontSize: 14,
    color: '#666666',
    marginBottom: 8,
  },
  bio: {
    fontFamily: 'Outfit_400Regular',
    fontSize: 14,
    color: '#111111',
    textAlign: 'center',
  },
  actions: {
    width: '100%',
    paddingHorizontal: 24,
    gap: 12,
  },
  actionButton: {
    width: '100%',
    height: 48,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  followButton: {
    backgroundColor: '#EB4213',
  },
  actionText: {
    fontFamily: 'Outfit_600SemiBold',
    fontSize: 15,
    color: '#111111',
  },
  followText: {
    fontFamily: 'Outfit_600SemiBold',
    fontSize: 15,
    color: '#FFFFFF',
  },
});
