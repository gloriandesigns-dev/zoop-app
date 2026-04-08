import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { X, Camera, Image as ImageIcon, Video, Music, Clock, Zap, Type, Smile, RefreshCw } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import Animated, { SlideInDown, SlideOutDown } from 'react-native-reanimated';

const { height } = Dimensions.get('window');

export default function CreateScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('Post');

  const TABS = ['Post', 'Reel', 'Story'];
  const STORY_MODES = ['Story', 'Boomerang', 'Text'];

  const handleCapture = () => {
    // Dismiss modal and navigate to respective editor
    if (activeTab === 'Post') {
      router.replace('/create/post');
    } else if (activeTab === 'Reel') {
      router.replace('/create/reel');
    } else {
      // Story capture logic
      router.back();
    }
  };

  return (
    <View style={styles.overlay}>
      <Pressable style={styles.backdrop} onPress={() => router.back()} />
      
      <Animated.View 
        entering={SlideInDown.duration(300).springify()} 
        exiting={SlideOutDown.duration(200)}
        style={[styles.sheetContainer, activeTab === 'Story' && styles.fullscreenSheet]}
      >
        <SafeAreaView style={styles.safeArea} edges={['bottom', 'top']}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()} style={styles.closeButton}>
              <X size={24} color="#FFFFFF" />
            </TouchableOpacity>
            
            {activeTab !== 'Story' && <Text style={styles.title}>New {activeTab}</Text>}
            
            {/* Story Top Controls */}
            {activeTab === 'Story' ? (
              <View style={styles.storyTopControls}>
                <TouchableOpacity style={styles.topIcon}><Zap size={24} color="#FFFFFF" /></TouchableOpacity>
                <TouchableOpacity style={styles.topIcon}><Music size={24} color="#FFFFFF" /></TouchableOpacity>
                <TouchableOpacity style={styles.topIcon}><Type size={24} color="#FFFFFF" /></TouchableOpacity>
                <TouchableOpacity style={styles.topIcon}><Smile size={24} color="#FFFFFF" /></TouchableOpacity>
              </View>
            ) : (
              <View style={{ width: 40 }} />
            )}
          </View>

          {/* Camera / Content Area */}
          <View style={[styles.cameraArea, activeTab === 'Story' && styles.storyCameraArea]}>
            {activeTab !== 'Story' && <Camera size={64} color="#333333" />}
            {activeTab !== 'Story' && <Text style={styles.cameraText}>Camera Preview</Text>}
            
            {/* Reel specific controls */}
            {activeTab === 'Reel' && (
              <View style={styles.reelControls}>
                <TouchableOpacity style={styles.controlIcon}><Music size={24} color="#FFFFFF" /></TouchableOpacity>
                <TouchableOpacity style={styles.controlIcon}><Clock size={24} color="#FFFFFF" /></TouchableOpacity>
                <TouchableOpacity style={styles.controlIcon}><Zap size={24} color="#FFFFFF" /></TouchableOpacity>
              </View>
            )}
          </View>

          {/* Story Capture Modes */}
          {activeTab === 'Story' && (
            <View style={styles.storyModesContainer}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.storyModesScroll}>
                {STORY_MODES.map((mode) => (
                  <TouchableOpacity key={mode} style={styles.storyModeItem}>
                    <Text style={[styles.storyModeText, mode === 'Story' && styles.storyModeTextActive]}>{mode}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}

          {/* Action Button */}
          <View style={styles.actionContainer}>
            <TouchableOpacity style={styles.galleryButton}>
              <ImageIcon size={24} color="#FFFFFF" />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.captureButton} onPress={handleCapture}>
              <View style={styles.captureInner} />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.galleryButton}>
              {activeTab === 'Story' ? <RefreshCw size={24} color="#FFFFFF" /> : <Video size={24} color="#FFFFFF" />}
            </TouchableOpacity>
          </View>

          {/* Bottom Tabs */}
          <View style={styles.bottomTabsContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabsScroll}>
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

        </SafeAreaView>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  sheetContainer: {
    height: height * 0.9,
    backgroundColor: '#000000',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: 'hidden',
  },
  fullscreenSheet: {
    height: height,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  closeButton: {
    padding: 8,
  },
  title: {
    fontFamily: 'Outfit_700Bold',
    fontSize: 18,
    color: '#FFFFFF',
  },
  storyTopControls: {
    flexDirection: 'row',
    gap: 16,
  },
  topIcon: {
    padding: 8,
  },
  cameraArea: {
    flex: 1,
    backgroundColor: '#111111',
    borderRadius: 16,
    marginHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  storyCameraArea: {
    marginHorizontal: 0,
    borderRadius: 0,
  },
  cameraText: {
    fontFamily: 'Outfit_500Medium',
    color: '#666666',
    marginTop: 12,
  },
  reelControls: {
    position: 'absolute',
    right: 16,
    top: 16,
    gap: 16,
  },
  controlIcon: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 10,
    borderRadius: 20,
  },
  storyModesContainer: {
    height: 40,
    justifyContent: 'center',
    marginTop: 16,
  },
  storyModesScroll: {
    paddingHorizontal: 16,
    gap: 24,
    alignItems: 'center',
  },
  storyModeItem: {
    paddingHorizontal: 8,
  },
  storyModeText: {
    fontFamily: 'Outfit_600SemiBold',
    fontSize: 14,
    color: '#666666',
  },
  storyModeTextActive: {
    color: '#FFFFFF',
  },
  bottomTabsContainer: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  tabsScroll: {
    paddingHorizontal: 16,
    gap: 24,
    alignItems: 'center',
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: '#222222',
  },
  tabText: {
    fontFamily: 'Outfit_600SemiBold',
    fontSize: 16,
    color: '#666666',
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  actionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingVertical: 16,
  },
  galleryButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
    borderColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureInner: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#FFFFFF',
  },
});
