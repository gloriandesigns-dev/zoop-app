import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { X } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { useMood } from '../context/MoodContext';

const { width } = Dimensions.get('window');
const SPACING = 16;
const CARD_WIDTH = (width - SPACING * 3) / 2;

const MOODS = [
  { id: '1', name: 'Funny', emoji: '😂', color: '#FF99DC' },
  { id: '2', name: 'Chill', emoji: '☕', color: '#826DEE' },
  { id: '3', name: 'Aesthetic', emoji: '✨', color: '#D8F382' },
  { id: '4', name: 'Learning', emoji: '📚', color: '#EB4213' },
  { id: '5', name: 'Trending', emoji: '🔥', color: '#FF99DC' },
  { id: '6', name: 'Music', emoji: '🎵', color: '#826DEE' },
  { id: '7', name: 'Gaming', emoji: '🎮', color: '#D8F382' },
  { id: '8', name: 'Travel', emoji: '✈️', color: '#EB4213' },
];

export default function MoodSelectorScreen() {
  const router = useRouter();
  const { selectedMood, setSelectedMood } = useMood();

  const handleSelect = (name: string) => {
    setSelectedMood(name);
    setTimeout(() => {
      router.back();
    }, 400);
  };

  const renderItem = ({ item, index }: { item: any, index: number }) => {
    const isSelected = selectedMood === item.name;
    
    return (
      <Animated.View entering={FadeInUp.delay(index * 50).duration(400)}>
        <TouchableOpacity 
          style={[
            styles.card, 
            isSelected && styles.cardSelected,
            isSelected && { borderColor: item.color }
          ]}
          onPress={() => handleSelect(item.name)}
        >
          <Text style={styles.emoji}>{item.emoji}</Text>
          <Text style={[styles.moodName, isSelected && styles.moodNameSelected]}>
            {item.name}
          </Text>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      {/* Header */}
      <View style={styles.header}>
        <View style={{ width: 44 }} />
        <Text style={styles.headerTitle}>Choose your mood</Text>
        <TouchableOpacity onPress={() => router.back()} style={styles.iconButton}>
          <X size={28} color="#111111" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={MOODS}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        numColumns={2}
        contentContainerStyle={styles.gridContent}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
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
    height: 64,
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
    fontSize: 20,
    color: '#111111',
  },
  gridContent: {
    padding: SPACING,
    paddingTop: 24,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: SPACING,
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_WIDTH * 0.8,
    backgroundColor: '#F8F8F8',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  cardSelected: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#826DEE',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  emoji: {
    fontSize: 40,
    marginBottom: 12,
  },
  moodName: {
    fontFamily: 'Outfit_500Medium',
    fontSize: 16,
    color: '#666666',
  },
  moodNameSelected: {
    fontFamily: 'Outfit_700Bold',
    color: '#111111',
  },
});
