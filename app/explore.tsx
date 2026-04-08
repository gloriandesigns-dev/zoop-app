import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, X } from 'lucide-react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { generateExploreItems, generateRecentSearches, generateSearchResults } from '../utils/mockData';
import ExploreGrid from '../components/ExploreGrid';

const CATEGORIES = ["For You", "Trending", "Design", "Memes", "Travel", "Music"];
const SEARCH_TABS = ["Top", "Accounts", "Tags", "Places", "Audio"];

const exploreItems = generateExploreItems(30);
const recentSearches = generateRecentSearches(5);
const searchResults = generateSearchResults(8);

export default function ExploreScreen() {
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState("For You");
  const [activeSearchTab, setActiveSearchTab] = useState("Top");

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Search Top Bar */}
      <View style={styles.topBar}>
        <View style={styles.searchContainer}>
          <Search size={20} color="#666666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search Zoop"
            placeholderTextColor="#666666"
            value={searchQuery}
            onChangeText={setSearchQuery}
            onFocus={() => setIsSearching(true)}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')} style={styles.clearIcon}>
              <X size={16} color="#666666" />
            </TouchableOpacity>
          )}
        </View>
        {isSearching && (
          <TouchableOpacity onPress={() => { setIsSearching(false); setSearchQuery(''); }}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {!isSearching ? (
          <Animated.View entering={FadeIn} exiting={FadeOut}>
            {/* Category Filters */}
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false} 
              contentContainerStyle={styles.categoriesContainer}
            >
              {CATEGORIES.map((cat) => (
                <TouchableOpacity 
                  key={cat} 
                  style={[styles.chip, activeCategory === cat && styles.chipActive]}
                  onPress={() => setActiveCategory(cat)}
                >
                  <Text style={[styles.chipText, activeCategory === cat && styles.chipTextActive]}>
                    {cat}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Explore Grid */}
            <ExploreGrid items={exploreItems} />
          </Animated.View>
        ) : (
          <Animated.View entering={FadeIn} exiting={FadeOut} style={styles.searchStateContainer}>
            {/* Search Tabs */}
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false} 
              contentContainerStyle={styles.searchTabsContainer}
            >
              {SEARCH_TABS.map((tab) => (
                <TouchableOpacity 
                  key={tab} 
                  style={[styles.searchTab, activeSearchTab === tab && styles.searchTabActive]}
                  onPress={() => setActiveSearchTab(tab)}
                >
                  <Text style={[styles.searchTabText, activeSearchTab === tab && styles.searchTabTextActive]}>
                    {tab}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {searchQuery.length === 0 ? (
              /* Recent Searches */
              <View style={styles.recentSection}>
                <Text style={styles.recentTitle}>Recent</Text>
                {recentSearches.map((item) => (
                  <View key={item.id} style={styles.recentItem}>
                    <View style={styles.recentItemLeft}>
                      <Image source={{ uri: item.avatar }} style={styles.recentAvatar} />
                      <Text style={styles.recentTerm}>{item.term}</Text>
                    </View>
                    <TouchableOpacity>
                      <X size={20} color="#666666" />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            ) : (
              /* Search Results */
              <View style={styles.resultsSection}>
                {searchResults.map((result) => (
                  <TouchableOpacity key={result.id} style={styles.resultItem}>
                    <Image source={{ uri: result.avatar }} style={styles.resultAvatar} />
                    <View style={styles.resultInfo}>
                      <Text style={styles.resultTitle}>{result.title}</Text>
                      <Text style={styles.resultSubtitle}>{result.subtitle} • {result.followers.toLocaleString()} followers</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </Animated.View>
        )}
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
    height: 64,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  searchContainer: {
    flex: 1,
    height: 44,
    backgroundColor: '#F6F6F6',
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
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
  clearIcon: {
    padding: 4,
  },
  cancelText: {
    fontFamily: 'Outfit_500Medium',
    fontSize: 16,
    color: '#111111',
  },
  scrollContent: {
    paddingBottom: 120, // Space for floating navbar
  },
  categoriesContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    backgroundColor: '#F4F4F4',
    borderRadius: 999,
  },
  chipActive: {
    backgroundColor: '#EB4213',
  },
  chipText: {
    fontFamily: 'Outfit_500Medium',
    fontSize: 14,
    color: '#666666',
  },
  chipTextActive: {
    color: '#FFFFFF',
  },
  searchStateContainer: {
    flex: 1,
  },
  searchTabsContainer: {
    paddingHorizontal: 16,
    paddingBottom: 12,
    gap: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  searchTab: {
    paddingBottom: 8,
  },
  searchTabActive: {
    borderBottomWidth: 2,
    borderBottomColor: '#EB4213',
  },
  searchTabText: {
    fontFamily: 'Outfit_500Medium',
    fontSize: 15,
    color: '#666666',
  },
  searchTabTextActive: {
    color: '#EB4213',
    fontFamily: 'Outfit_700Bold',
  },
  recentSection: {
    padding: 16,
  },
  recentTitle: {
    fontFamily: 'Outfit_700Bold',
    fontSize: 16,
    color: '#111111',
    marginBottom: 16,
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 44,
    marginBottom: 8,
  },
  recentItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  recentAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  recentTerm: {
    fontFamily: 'Outfit_500Medium',
    fontSize: 15,
    color: '#111111',
  },
  resultsSection: {
    padding: 16,
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    marginBottom: 12,
    gap: 12,
  },
  resultAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  resultInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  resultTitle: {
    fontFamily: 'Outfit_500Medium',
    fontSize: 15,
    color: '#111111',
    marginBottom: 2,
  },
  resultSubtitle: {
    fontFamily: 'Outfit_400Regular',
    fontSize: 13,
    color: '#666666',
  },
});
