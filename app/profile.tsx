import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PlusSquare, Menu, Grid, Clapperboard, Contact, Bookmark } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import Animated, { FadeIn } from 'react-native-reanimated';
import { generateProfileData, generateHighlights, generateProfilePosts } from '../utils/mockData';

const { width } = Dimensions.get('window');
const GRID_SPACING = 2;
const COLUMN_COUNT = 3;
const ITEM_SIZE = (width - (GRID_SPACING * (COLUMN_COUNT - 1))) / COLUMN_COUNT;

const profileData = generateProfileData();
const highlights = generateHighlights(6);
const posts = generateProfilePosts(24);

const GRADIENT_COLORS = ['#EB4213', '#FF99DC', '#826DEE', '#D8F382'];

export default function ProfileScreen() {
  const [activeTab, setActiveTab] = useState('posts');
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <Text style={styles.topBarUsername}>{profileData.username}</Text>
        <View style={styles.topBarActions}>
          <TouchableOpacity style={styles.iconButton} onPress={() => router.push('/create')}>
            <PlusSquare size={24} color="#111111" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={() => router.push('/profile/saved')}>
            <Bookmark size={24} color="#111111" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={() => router.push('/settings')}>
            <Menu size={24} color="#111111" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <Animated.View entering={FadeIn.duration(400)}>
          {/* Profile Info */}
          <View style={styles.profileHeader}>
            <View style={styles.avatarContainer}>
              <LinearGradient
                colors={GRADIENT_COLORS}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.gradientRing}
              >
                <View style={styles.innerRing}>
                  <Image source={{ uri: profileData.avatar }} style={styles.avatar} />
                </View>
              </LinearGradient>
            </View>

            <View style={styles.statsContainer}>
              <TouchableOpacity style={styles.statItem}>
                <Text style={styles.statNumber}>{profileData.stats.posts}</Text>
                <Text style={styles.statLabel}>Posts</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.statItem} onPress={() => router.push('/profile/network')}>
                <Text style={styles.statNumber}>{profileData.stats.followers}</Text>
                <Text style={styles.statLabel}>Followers</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.statItem} onPress={() => router.push('/profile/network')}>
                <Text style={styles.statNumber}>{profileData.stats.following}</Text>
                <Text style={styles.statLabel}>Following</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Bio */}
          <View style={styles.bioContainer}>
            <Text style={styles.fullName}>{profileData.fullName}</Text>
            <Text style={styles.bioText}>{profileData.bio}</Text>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtonsContainer}>
            <TouchableOpacity style={styles.actionButton} onPress={() => router.push('/profile/edit')}>
              <Text style={styles.actionButtonText}>Edit Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionButtonText}>Share Profile</Text>
            </TouchableOpacity>
          </View>

          {/* Highlights */}
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.highlightsContainer}
          >
            {highlights.map((item) => (
              <TouchableOpacity key={item.id} style={styles.highlightItem}>
                <View style={styles.highlightRing}>
                  <Image source={{ uri: item.cover }} style={styles.highlightImage} />
                </View>
                <Text style={styles.highlightTitle} numberOfLines={1}>{item.title}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={styles.highlightItem} onPress={() => router.push('/create')}>
              <View style={styles.highlightAddRing}>
                <PlusSquare size={24} color="#111111" />
              </View>
              <Text style={styles.highlightTitle}>New</Text>
            </TouchableOpacity>
          </ScrollView>

          {/* Tabs */}
          <View style={styles.tabsContainer}>
            <TouchableOpacity 
              style={[styles.tab, activeTab === 'posts' && styles.activeTab]}
              onPress={() => setActiveTab('posts')}
            >
              <Grid size={24} color={activeTab === 'posts' ? '#EB4213' : '#666666'} />
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.tab, activeTab === 'reels' && styles.activeTab]}
              onPress={() => setActiveTab('reels')}
            >
              <Clapperboard size={24} color={activeTab === 'reels' ? '#EB4213' : '#666666'} />
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.tab, activeTab === 'tagged' && styles.activeTab]}
              onPress={() => setActiveTab('tagged')}
            >
              <Contact size={24} color={activeTab === 'tagged' ? '#EB4213' : '#666666'} />
            </TouchableOpacity>
          </View>

          {/* Grid */}
          <View style={styles.gridContainer}>
            {posts.map((post) => (
              <TouchableOpacity 
                key={post.id} 
                style={styles.gridItem}
                onPress={() => router.push(`/post/${post.id}`)}
              >
                <Image source={{ uri: post.image }} style={styles.gridImage} />
                {post.type === 'reel' && (
                  <View style={styles.gridIconOverlay}>
                    <Clapperboard size={16} color="#FFFFFF" />
                  </View>
                )}
                {post.type === 'carousel' && (
                  <View style={styles.gridIconOverlay}>
                    <Contact size={16} color="#FFFFFF" />
                  </View>
                )}
              </TouchableOpacity>
            ))}
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  topBarUsername: {
    fontFamily: 'Outfit_700Bold',
    fontSize: 20,
    color: '#111111',
  },
  topBarActions: {
    flexDirection: 'row',
    gap: 12,
  },
  iconButton: {
    padding: 4,
  },
  scrollContent: {
    paddingBottom: 120, // Space for floating nav bar
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 12,
  },
  avatarContainer: {
    marginRight: 24,
  },
  gradientRing: {
    width: 90,
    height: 90,
    borderRadius: 45,
    padding: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerRing: {
    width: '100%',
    height: '100%',
    borderRadius: 45,
    backgroundColor: '#FFFFFF',
    padding: 3,
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 45,
  },
  statsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontFamily: 'Outfit_700Bold',
    fontSize: 18,
    color: '#111111',
  },
  statLabel: {
    fontFamily: 'Outfit_400Regular',
    fontSize: 13,
    color: '#111111',
  },
  bioContainer: {
    paddingHorizontal: 16,
    marginTop: 12,
  },
  fullName: {
    fontFamily: 'Outfit_500Medium',
    fontSize: 14,
    color: '#111111',
    marginBottom: 2,
  },
  bioText: {
    fontFamily: 'Outfit_400Regular',
    fontSize: 14,
    color: '#111111',
    lineHeight: 20,
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginTop: 16,
    gap: 8,
  },
  actionButton: {
    flex: 1,
    height: 36,
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButtonText: {
    fontFamily: 'Outfit_500Medium',
    fontSize: 14,
    color: '#111111',
  },
  highlightsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    gap: 16,
  },
  highlightItem: {
    alignItems: 'center',
    width: 68,
  },
  highlightRing: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    padding: 3,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  highlightAddRing: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 1,
    borderColor: '#111111',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  highlightImage: {
    width: '100%',
    height: '100%',
    borderRadius: 32,
  },
  highlightTitle: {
    fontFamily: 'Outfit_400Regular',
    fontSize: 12,
    color: '#111111',
  },
  tabsContainer: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  tab: {
    flex: 1,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#EB4213',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: GRID_SPACING,
  },
  gridItem: {
    width: ITEM_SIZE,
    height: ITEM_SIZE,
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    overflow: 'hidden',
  },
  gridImage: {
    width: '100%',
    height: '100%',
  },
  gridIconOverlay: {
    position: 'absolute',
    top: 6,
    right: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
});
