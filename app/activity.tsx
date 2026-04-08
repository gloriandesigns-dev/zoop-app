import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, SectionList, TouchableOpacity, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { generateNotifications } from '../utils/mockData';

const notifications = generateNotifications(40);
const TABS = ["All", "Likes", "Comments", "Follows", "Mentions"];

export default function ActivityScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("All");

  const sections = useMemo(() => {
    const filtered = notifications.filter(n => {
      if (activeTab === 'All') return true;
      if (activeTab === 'Likes') return n.action === 'like';
      if (activeTab === 'Comments') return n.action === 'comment';
      if (activeTab === 'Follows') return n.action === 'follow';
      if (activeTab === 'Mentions') return n.action === 'mention';
      return true;
    });

    const today = filtered.filter(n => n.section === 'Today');
    const thisWeek = filtered.filter(n => n.section === 'This Week');
    const earlier = filtered.filter(n => n.section === 'Earlier');

    return [
      { title: 'Today', data: today },
      { title: 'This Week', data: thisWeek },
      { title: 'Earlier', data: earlier },
    ].filter(s => s.data.length > 0);
  }, [activeTab]);

  const renderItem = ({ item, index }: { item: any, index: number }) => {
    let actionText = '';
    switch (item.action) {
      case 'like': actionText = 'liked your post.'; break;
      case 'comment': actionText = 'commented: "Love this!"'; break;
      case 'follow': actionText = 'started following you.'; break;
      case 'mention': actionText = 'mentioned you in a comment.'; break;
    }

    return (
      <Animated.View entering={FadeInUp.delay(index * 50).duration(300)}>
        <TouchableOpacity style={styles.notificationItem}>
          <Image source={{ uri: item.user.avatar }} style={styles.avatar} />
          
          <View style={styles.textContainer}>
            <Text style={styles.notificationText}>
              <Text style={styles.username}>{item.user.username}</Text> {actionText}
              <Text style={styles.timeAgo}> {item.timeAgo}</Text>
            </Text>
          </View>

          {item.action === 'follow' ? (
            <TouchableOpacity style={styles.followButton}>
              <Text style={styles.followButtonText}>Follow</Text>
            </TouchableOpacity>
          ) : item.targetImage ? (
            <Image source={{ uri: item.targetImage }} style={styles.targetImage} />
          ) : null}
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ChevronLeft size={28} color="#111111" />
        </TouchableOpacity>
        <Text style={styles.topBarTitle}>Activity</Text>
        <View style={{ width: 44 }} />
      </View>

      {/* Filter Tabs */}
      <View style={styles.tabsWrapper}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabsContainer}
        >
          {TABS.map((tab) => (
            <TouchableOpacity 
              key={tab}
              style={[styles.tab, activeTab === tab && styles.activeTab]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.sectionHeader}>{title}</Text>
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No activity found.</Text>
          </View>
        }
      />
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
  backButton: {
    padding: 8,
  },
  topBarTitle: {
    fontFamily: 'Outfit_700Bold',
    fontSize: 20,
    color: '#111111',
  },
  tabsWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  tabsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
  },
  activeTab: {
    backgroundColor: '#EB4213',
  },
  tabText: {
    fontFamily: 'Outfit_600SemiBold',
    fontSize: 14,
    color: '#666666',
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  listContent: {
    paddingBottom: 120, // Space for floating nav
  },
  sectionHeader: {
    fontFamily: 'Outfit_700Bold',
    fontSize: 16,
    color: '#111111',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    backgroundColor: '#FFFFFF',
  },
  notificationItem: {
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
  textContainer: {
    flex: 1,
    marginRight: 12,
  },
  notificationText: {
    fontFamily: 'Outfit_400Regular',
    fontSize: 14,
    color: '#111111',
    lineHeight: 20,
  },
  username: {
    fontFamily: 'Outfit_600SemiBold',
  },
  timeAgo: {
    color: '#666666',
  },
  followButton: {
    backgroundColor: '#EB4213',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  followButtonText: {
    fontFamily: 'Outfit_600SemiBold',
    fontSize: 13,
    color: '#FFFFFF',
  },
  targetImage: {
    width: 44,
    height: 44,
    borderRadius: 4,
  },
  emptyState: {
    padding: 32,
    alignItems: 'center',
  },
  emptyText: {
    fontFamily: 'Outfit_500Medium',
    color: '#666666',
    fontSize: 16,
  },
});
