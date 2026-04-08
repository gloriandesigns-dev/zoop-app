import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { X, Music, Type, Smile, Wand2, FastForward, Check } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function ReelEditorScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.iconButton}>
            <X size={28} color="#FFFFFF" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.nextButton} onPress={() => router.replace('/')}>
            <Text style={styles.nextText}>Next</Text>
            <Check size={20} color="#111111" />
          </TouchableOpacity>
        </View>

        {/* Preview Area */}
        <View style={styles.previewArea}>
          <Image 
            source={{ uri: 'https://picsum.photos/1080/1920' }} 
            style={styles.previewImage}
            resizeMode="cover"
          />
          
          {/* Right Controls */}
          <View style={styles.controlsRight}>
            <TouchableOpacity style={styles.controlItem}>
              <Music size={24} color="#FFFFFF" />
              <Text style={styles.controlText}>Audio</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.controlItem}>
              <Type size={24} color="#FFFFFF" />
              <Text style={styles.controlText}>Text</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.controlItem}>
              <Smile size={24} color="#FFFFFF" />
              <Text style={styles.controlText}>Stickers</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.controlItem}>
              <Wand2 size={24} color="#FFFFFF" />
              <Text style={styles.controlText}>Effects</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.controlItem}>
              <FastForward size={24} color="#FFFFFF" />
              <Text style={styles.controlText}>Speed</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Timeline */}
        <View style={styles.timelineContainer}>
          <View style={styles.timelinePlayhead} />
          <View style={styles.clipBlock}>
            <Image source={{ uri: 'https://picsum.photos/100/100' }} style={styles.clipThumb} />
            <Image source={{ uri: 'https://picsum.photos/101/100' }} style={styles.clipThumb} />
            <Image source={{ uri: 'https://picsum.photos/102/100' }} style={styles.clipThumb} />
            <Image source={{ uri: 'https://picsum.photos/103/100' }} style={styles.clipThumb} />
          </View>
        </View>

      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    zIndex: 10,
  },
  iconButton: {
    padding: 8,
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 4,
  },
  nextText: {
    fontFamily: 'Outfit_600SemiBold',
    fontSize: 15,
    color: '#111111',
  },
  previewArea: {
    flex: 1,
    borderRadius: 16,
    marginHorizontal: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  previewImage: {
    width: '100%',
    height: '100%',
  },
  controlsRight: {
    position: 'absolute',
    right: 16,
    top: 20,
    gap: 20,
    alignItems: 'center',
  },
  controlItem: {
    alignItems: 'center',
    gap: 4,
  },
  controlText: {
    fontFamily: 'Outfit_500Medium',
    fontSize: 12,
    color: '#FFFFFF',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  timelineContainer: {
    height: 80,
    marginTop: 16,
    marginBottom: 16,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  timelinePlayhead: {
    position: 'absolute',
    left: '50%',
    top: 0,
    bottom: 0,
    width: 2,
    backgroundColor: '#FFFFFF',
    zIndex: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
  clipBlock: {
    height: 60,
    flexDirection: 'row',
    backgroundColor: '#222222',
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#EB4213',
  },
  clipThumb: {
    flex: 1,
    height: '100%',
    opacity: 0.8,
  },
});
