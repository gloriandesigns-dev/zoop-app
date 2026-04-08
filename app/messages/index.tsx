import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, Edit, Settings, Search } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeInLeft } from 'react-native-reanimated';
import { generateChats } from '../../utils/mockData';

const chats = generateChats(15);

export default function MessagesListScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity 
      style={styles.chatItem}
      onPress={() => router.push(`/messages/${item.id}`)}
    >
      <Image source={{ uri: item.user.avatar }} style={styles.avatar} />
      <View style={styles.chatInfo}>
        <View style={styles.chatHeader}>
          <Text style={[styles.username, item.unread && styles.unreadText]}>
            {item.user.username}
          </Text>
          <Text style={[styles.timeAgo, item.unread && styles.unreadText]}>
            {item.timeAgo}
          </Text>
        </View>
        <View style={styles.messageRow}>
          <Text 
            style={[styles.lastMessage, item.unread && styles.unreadText]} 
            numberOfLines={1}
          >
            {item.lastMessage}
          </Text>
          {item.unread && <View style={styles.unreadDot} />}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.back()} style={styles.iconButton}>
          <ChevronLeft size={28} color="#111111" />
        </TouchableOpacity>
        <Text style={styles.topBarTitle}>Messages</Text>
        <View style={styles.rightActions}>
          <TouchableOpacity style={styles.iconButton}>
            <Edit size={24} color="#111111" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Settings size={24} color="#111111" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <Search size={20} color="#666666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search messages"
            placeholderTextColor="#666666"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Chat List */}
      <Animated.View entering={FadeInLeft.duration(300)} style={{ flex: 1 }}>
        <FlatList
          data={chats}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />
      </Animated.View>
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
  },
  iconButton: {
    padding: 8,
  },
  topBarTitle: {
    fontFamily: 'Outfit_700Bold',
    fontSize: 20,
    color: '#111111',
  },
  rightActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 8,
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
  listContent: {
    paddingBottom: 100, // Space for floating nav
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 72,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  chatInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  username: {
    fontFamily: 'Outfit_500Medium',
    fontSize: 15,
    color: '#111111',
  },
  timeAgo: {
    fontFamily: 'Outfit_400Regular',
    fontSize: 13,
    color: '#666666',
  },
  messageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  lastMessage: {
    fontFamily: 'Outfit_400Regular',
    fontSize: 14,
    color: '#666666',
    flex: 1,
    paddingRight: 16,
  },
  unreadText: {
    fontFamily: 'Outfit_700Bold',
    color: '#111111',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EB4213',
  },
});
