import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Dimensions, TextInput, ScrollView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { SlideInDown, SlideOutDown } from 'react-native-reanimated';
import { Search, Link, PlusSquare, MessageCircle, MoreHorizontal } from 'lucide-react-native';
import { generateChats } from '../utils/mockData';

const { height } = Dimensions.get('window');
const recentUsers = generateChats(10).map(c => c.user);

export default function ShareSheet() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <View style={styles.overlay}>
      <Pressable style={styles.backdrop} onPress={() => router.back()} />
      
      <Animated.View 
        entering={SlideInDown.duration(300).springify()} 
        exiting={SlideOutDown.duration(200)}
        style={styles.sheetContainer}
      >
        {/* Drag Handle */}
        <View style={styles.header}>
          <View style={styles.dragHandle} />
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBox}>
            <Search size={20} color="#666666" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Share to..."
              placeholderTextColor="#666666"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        {/* Recent Users */}
        <View style={styles.recentSection}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.recentScroll}>
            {recentUsers.map((user, index) => (
              <Pressable key={index} style={styles.userItem}>
                <Image source={{ uri: user.avatar }} style={styles.userAvatar} />
                <Text style={styles.username} numberOfLines={1}>{user.username}</Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        {/* Actions Grid */}
        <View style={styles.actionsGrid}>
          <Pressable style={styles.actionItem}>
            <View style={styles.actionIconBg}>
              <Link size={24} color="#111111" />
            </View>
            <Text style={styles.actionText}>Copy Link</Text>
          </Pressable>
          <Pressable style={styles.actionItem}>
            <View style={styles.actionIconBg}>
              <PlusSquare size={24} color="#111111" />
            </View>
            <Text style={styles.actionText}>Add to Story</Text>
          </Pressable>
          <Pressable style={styles.actionItem}>
            <View style={[styles.actionIconBg, { backgroundColor: '#25D366' }]}>
              <MessageCircle size={24} color="#FFFFFF" />
            </View>
            <Text style={styles.actionText}>WhatsApp</Text>
          </Pressable>
          <Pressable style={styles.actionItem}>
            <View style={styles.actionIconBg}>
              <MoreHorizontal size={24} color="#111111" />
            </View>
            <Text style={styles.actionText}>More</Text>
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
    paddingBottom: 32,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  dragHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
  },
  searchContainer: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 14,
    height: 44,
    paddingHorizontal: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontFamily: 'Outfit_400Regular',
    fontSize: 16,
    color: '#111111',
    height: '100%',
  },
  recentSection: {
    marginBottom: 24,
  },
  recentScroll: {
    paddingHorizontal: 16,
    gap: 16,
  },
  userItem: {
    alignItems: 'center',
    width: 72,
  },
  userAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 8,
  },
  username: {
    fontFamily: 'Outfit_400Regular',
    fontSize: 12,
    color: '#111111',
    textAlign: 'center',
  },
  actionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
  },
  actionItem: {
    alignItems: 'center',
    width: 72,
  },
  actionIconBg: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionText: {
    fontFamily: 'Outfit_500Medium',
    fontSize: 12,
    color: '#111111',
    textAlign: 'center',
  },
});
