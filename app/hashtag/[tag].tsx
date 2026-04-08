import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft } from 'lucide-react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { generateGridPosts } from '../../utils/mockData';

const { width } = Dimensions.get('window');
const SPACING = 2;
const COLUMN_COUNT = 3;
const ITEM_SIZE = (width - (SPACING * (COLUMN_COUNT - 1))) / COLUMN_COUNT;

const TABS = ["Top", "Recent", "Reels"];
const posts = generateGridPosts(24);

export default function HashtagPageScreen() {
  const { tag } = useLocalSearchParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Top");

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.gridItem} onPress={() => router.push(`/post/${item.id}`)}>
      <Image source={{ uri: item.image }} style={styles.gridImage} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.iconButton}>
          <ChevronLeft size={28} color="#111111" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>#{tag || 'photography'}</Text>
        <View style={{ width: 44 }} />
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        {TABS.map((t) => (
          <TouchableOpacity 
            key={t}
            style={[styles.tab, activeTab === t && styles.activeTab]}
            onPress={() => setActiveTab(t)}
          >
            <Text style={[styles.tabText, activeTab === t && styles.activeTabText]}>
              {t}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Grid */}
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        numColumns={3}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.row}
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
    paddingVertical: 14,
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
    fontFamily: 'Outfit_700Bold',
  },
  listContent: {
    paddingBottom: 40,
  },
  row: {
    gap: SPACING,
    marginBottom: SPACING,
  },
  gridItem: {
    width: ITEM_SIZE,
    height: ITEM_SIZE,
    backgroundColor: '#F0F0F0',
  },
  gridImage: {
    width: '100%',
    height: '100%',
  },
});
