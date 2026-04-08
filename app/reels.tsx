import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Camera } from 'lucide-react-native';
import { generateReels } from '../utils/mockData';
import ReelItem from '../components/ReelItem';
import { useMood } from '../context/MoodContext';

const { height: WINDOW_HEIGHT } = Dimensions.get('window');

export default function ReelsScreen() {
  const [activeIndex, setActiveIndex] = useState(0);
  const { selectedMood } = useMood();

  // Re-generate reels when mood changes
  const reelsData = useMemo(() => generateReels(selectedMood), [selectedMood]);

  const onViewableItemsChanged = React.useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index);
    }
  }).current;

  const viewabilityConfig = React.useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  return (
    <View style={styles.container}>
      {/* Top Bar Overlay */}
      <SafeAreaView style={styles.topBarContainer} edges={['top']}>
        <View style={styles.topBar}>
          <Text style={styles.title}>Reels</Text>
          <TouchableOpacity>
            <Camera size={28} color="#FFFFFF" strokeWidth={2} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {/* Fullscreen Vertical Pager */}
      <FlatList
        data={reelsData}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <ReelItem reel={item} isActive={index === activeIndex} />
        )}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        snapToInterval={WINDOW_HEIGHT}
        snapToAlignment="start"
        decelerationRate="fast"
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        initialNumToRender={3}
        maxToRenderPerBatch={3}
        windowSize={5}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  topBarContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 50,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  title: {
    fontFamily: 'Outfit_700Bold',
    fontSize: 24,
    color: '#FFFFFF',
  },
});
