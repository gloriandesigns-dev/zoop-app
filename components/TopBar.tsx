import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Heart, MessageCircle } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function TopBar() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Image 
        source={{ uri: 'https://www.dropbox.com/scl/fi/x6e6zk07p0udbrzecz7xw/zoop.png?rlkey=8jfiyk83oktrsn9qgiak7d8nd&st=s493r6dd&raw=1' }} 
        style={styles.logo} 
      />
      <View style={styles.rightIcons}>
        <TouchableOpacity style={styles.iconButton} onPress={() => router.push('/activity')}>
          <Heart size={24} color="#111111" strokeWidth={2} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={() => router.push('/messages')}>
          <MessageCircle size={24} color="#111111" strokeWidth={2} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 64,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
  },
  logo: {
    width: 80,
    height: 32,
    resizeMode: 'contain',
  },
  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  iconButton: {
    padding: 4,
  },
});
