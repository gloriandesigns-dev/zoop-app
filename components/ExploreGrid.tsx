import React from 'react';
import { View, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Clapperboard } from 'lucide-react-native';

const { width } = Dimensions.get('window');
const SPACING = 4;
const GRID_WIDTH = width - SPACING * 2;
const SMALL_SIZE = (GRID_WIDTH - SPACING * 2) / 3;
const LARGE_SIZE = SMALL_SIZE * 2 + SPACING;

interface ExploreItem {
  id: string;
  image: string;
  type: string;
}

interface ExploreGridProps {
  items: ExploreItem[];
}

export default function ExploreGrid({ items }: ExploreGridProps) {
  // Group items into blocks of 6 for the repeating pattern
  const blocks = [];
  for (let i = 0; i < items.length; i += 6) {
    blocks.push(items.slice(i, i + 6));
  }

  const renderItem = (item: ExploreItem, size: number, style?: any) => (
    <TouchableOpacity key={item.id} style={[styles.itemContainer, { width: size, height: size }, style]}>
      <Image source={{ uri: item.image }} style={styles.image} />
      {item.type === 'reel' && (
        <View style={styles.reelIcon}>
          <Clapperboard size={16} color="#FFFFFF" />
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {blocks.map((block, index) => {
        const isRightLarge = index % 2 === 0;

        return (
          <View key={index} style={styles.block}>
            {/* Top Row of Block */}
            <View style={styles.row}>
              {isRightLarge ? (
                <>
                  <View style={styles.col}>
                    {block[0] && renderItem(block[0], SMALL_SIZE, { marginBottom: SPACING })}
                    {block[1] && renderItem(block[1], SMALL_SIZE)}
                  </View>
                  {block[2] && renderItem(block[2], LARGE_SIZE, { marginLeft: SPACING })}
                </>
              ) : (
                <>
                  {block[0] && renderItem(block[0], LARGE_SIZE, { marginRight: SPACING })}
                  <View style={styles.col}>
                    {block[1] && renderItem(block[1], SMALL_SIZE, { marginBottom: SPACING })}
                    {block[2] && renderItem(block[2], SMALL_SIZE)}
                  </View>
                </>
              )}
            </View>
            
            {/* Bottom Row of Block (3 small items) */}
            <View style={[styles.row, { marginTop: SPACING }]}>
              {block[3] && renderItem(block[3], SMALL_SIZE)}
              {block[4] && renderItem(block[4], SMALL_SIZE, { marginHorizontal: SPACING })}
              {block[5] && renderItem(block[5], SMALL_SIZE)}
            </View>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SPACING,
    paddingBottom: 20,
  },
  block: {
    marginBottom: SPACING,
  },
  row: {
    flexDirection: 'row',
  },
  col: {
    flexDirection: 'column',
  },
  itemContainer: {
    backgroundColor: '#F0F0F0',
    borderRadius: 12,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  reelIcon: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 4,
    borderRadius: 12,
  },
});
