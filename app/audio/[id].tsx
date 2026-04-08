import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, Music, Play } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { generateGridPosts } from '../../utils/mockData';

const { width } = Dimensions.get('window');
const SPACING = 2;
const COLUMN_COUNT = 3;
const ITEM_SIZE = (width - (SPACING * (COLUMN_COUNT - 1))) / COLUMN_COUNT;

const posts = generateGridPosts(21);

export default function AudioPageScreen() {
  const router = useRouter();

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.gridItem} onPress={() => router.push(`/post/${item.id}`)}>
      <Image source={{ uri: item.image }} style={styles.gridImage} />
      <View style={styles.playIconOverlay}>
        <Play size={16} color="#FFFFFF" fill="#FFFFFF" />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.iconButton}>
          <ChevronLeft size={28} color="#111111" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Audio</Text>
        <View style={{ width: 44 }} />
      </View>

      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        numColumns={3}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.row}
        ListHeaderComponent={
          <View style={styles.audioHeader}>
            <View style={styles.coverContainer}>
              <Image source={{ uri: 'https://picsum.photos/200/200' }} style={styles.coverImage} />
              <View style={styles.musicIconBadge}>
                <Music size={16} color="#FFFFFF" />
              </View>
            </View>
            
            <Text style={styles.audioTitle}>Trending Song Title</Text>
            <Text style={styles.audioArtist}>Artist Name • Original Audio</Text>
            <Text style={styles.audioStats}>1.2M Reels</Text>

            <TouchableOpacity style={styles.useButton} onPress={() => router.push('/create/reel')}>
              <Text style={styles.useButtonText}>Use Audio</Text>
            </TouchableOpacity>
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
  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  iconButton: {
    padding: 8,
  },
  headerTitle: {
    fontFamily: 'Outfit_700Bold',
    fontSize: 18,
    color: '#111111',
  },
  audioHeader: {
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  coverContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  coverImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
  },
  musicIconBadge: {
    position: 'absolute',
    bottom: -6,
    right: -6,
    backgroundColor: '#111111',
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  audioTitle: {
    fontFamily: 'Outfit_700Bold',
    fontSize: 20,
    color: '#111111',
    marginBottom: 4,
    textAlign: 'center',
  },
  audioArtist: {
    fontFamily: 'Outfit_500Medium',
    fontSize: 14,
    color: '#666666',
    marginBottom: 4,
  },
  audioStats: {
    fontFamily: 'Outfit_400Regular',
    fontSize: 13,
    color: '#999999',
    marginBottom: 20,
  },
  useButton: {
    backgroundColor: '#EB4213',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 24,
    width: '100%',
    alignItems: 'center',
  },
  useButtonText: {
    fontFamily: 'Outfit_600SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
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
    height: ITEM_SIZE * 1.5,
    backgroundColor: '#F0F0F0',
  },
  gridImage: {
    width: '100%',
    height: '100%',
  },
  playIconOverlay: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
});
