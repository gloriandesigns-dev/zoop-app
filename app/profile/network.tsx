import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { generateNetworkUsers } from '../../utils/mockData';

const followers = generateNetworkUsers(20);
const following = generateNetworkUsers(20);

export default function NetworkScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'Followers' | 'Following'>('Followers');

  const data = activeTab === 'Followers' ? followers : following;

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.userItem}>
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.userInfo}>
        <Text style={styles.username}>{item.username}</Text>
        <Text style={styles.fullName}>{item.fullName}</Text>
      </View>
      <TouchableOpacity 
        style={[styles.followButton, item.isFollowing && styles.followingButton]}
      >
        <Text style={[styles.followText, item.isFollowing && styles.followingText]}>
          {item.isFollowing ? 'Following' : 'Follow'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.iconButton}>
          <ChevronLeft size={28} color="#111111" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>zoop_user</Text>
        <View style={{ width: 44 }} />
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'Followers' && styles.activeTab]}
          onPress={() => setActiveTab('Followers')}
        >
          <Text style={[styles.tabText, activeTab === 'Followers' && styles.activeTabText]}>
            Followers
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'Following' && styles.activeTab]}
          onPress={() => setActiveTab('Following')}
        >
          <Text style={[styles.tabText, activeTab === 'Following' && styles.activeTabText]}>
            Following
          </Text>
        </TouchableOpacity>
      </View>

      {/* List */}
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  iconButton: {
    padding: 8,
  },
  headerTitle: {
    fontFamily: 'Outfit_700Bold',
    fontSize: 18,
    color: '#111111',
  },
  tabsContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#111111',
  },
  tabText: {
    fontFamily: 'Outfit_500Medium',
    fontSize: 15,
    color: '#666666',
  },
  activeTabText: {
    color: '#111111',
    fontFamily: 'Outfit_600SemiBold',
  },
  listContent: {
    paddingVertical: 8,
  },
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 12,
  },
  userInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  username: {
    fontFamily: 'Outfit_600SemiBold',
    fontSize: 14,
    color: '#111111',
    marginBottom: 2,
  },
  fullName: {
    fontFamily: 'Outfit_400Regular',
    fontSize: 13,
    color: '#666666',
  },
  followButton: {
    backgroundColor: '#EB4213',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    minWidth: 100,
    alignItems: 'center',
  },
  followingButton: {
    backgroundColor: '#F5F5F5',
  },
  followText: {
    fontFamily: 'Outfit_600SemiBold',
    fontSize: 13,
    color: '#FFFFFF',
  },
  followingText: {
    color: '#111111',
  },
});
