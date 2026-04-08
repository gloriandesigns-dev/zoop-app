import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, ChevronRight, UserPlus, MapPin, Music, Settings } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function PostUploadEditor() {
  const router = useRouter();
  const [caption, setCaption] = useState('');

  const handleShare = () => {
    // Mock publish action
    router.replace('/');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.iconButton}>
            <ChevronLeft size={28} color="#111111" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>New Post</Text>
          <TouchableOpacity onPress={handleShare} style={styles.shareButton}>
            <Text style={styles.shareText}>Share</Text>
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Media & Caption */}
          <View style={styles.mediaSection}>
            <Image 
              source={{ uri: 'https://picsum.photos/400/400' }} 
              style={styles.mediaPreview} 
            />
            <TextInput
              style={styles.captionInput}
              placeholder="Write a caption..."
              placeholderTextColor="#999999"
              value={caption}
              onChangeText={setCaption}
              multiline
            />
          </View>

          <View style={styles.divider} />

          {/* Options */}
          <View style={styles.optionsList}>
            <TouchableOpacity style={styles.optionItem}>
              <View style={styles.optionLeft}>
                <UserPlus size={22} color="#111111" />
                <Text style={styles.optionText}>Tag people</Text>
              </View>
              <ChevronRight size={20} color="#999999" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.optionItem} onPress={() => router.push('/location/1')}>
              <View style={styles.optionLeft}>
                <MapPin size={22} color="#111111" />
                <Text style={styles.optionText}>Add location</Text>
              </View>
              <ChevronRight size={20} color="#999999" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.optionItem} onPress={() => router.push('/audio/1')}>
              <View style={styles.optionLeft}>
                <Music size={22} color="#111111" />
                <Text style={styles.optionText}>Add music</Text>
              </View>
              <ChevronRight size={20} color="#999999" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.optionItem}>
              <View style={styles.optionLeft}>
                <Settings size={22} color="#111111" />
                <Text style={styles.optionText}>Advanced settings</Text>
              </View>
              <ChevronRight size={20} color="#999999" />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
  shareButton: {
    padding: 8,
    paddingHorizontal: 16,
  },
  shareText: {
    fontFamily: 'Outfit_600SemiBold',
    fontSize: 16,
    color: '#EB4213',
  },
  mediaSection: {
    flexDirection: 'row',
    padding: 16,
    gap: 16,
  },
  mediaPreview: {
    width: 80,
    height: 80,
    borderRadius: 12,
  },
  captionInput: {
    flex: 1,
    fontFamily: 'Outfit_400Regular',
    fontSize: 16,
    color: '#111111',
    paddingTop: 8,
  },
  divider: {
    height: 1,
    backgroundColor: '#F0F0F0',
  },
  optionsList: {
    paddingVertical: 8,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  optionText: {
    fontFamily: 'Outfit_500Medium',
    fontSize: 16,
    color: '#111111',
  },
});
