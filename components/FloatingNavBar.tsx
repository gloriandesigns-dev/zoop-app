import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Home, Search, Clapperboard, Activity, User } from 'lucide-react-native';
import { useRouter, usePathname } from 'expo-router';

export default function FloatingNavBar() {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  // Hide navbar on specific screens and modals
  const isHidden = 
    ['/create', '/comments', '/share', '/user-preview', '/settings', '/mood'].includes(pathname) || 
    (pathname.startsWith('/messages/') && pathname !== '/messages') ||
    pathname.startsWith('/story/') ||
    (pathname.startsWith('/profile/') && pathname !== '/profile') ||
    pathname.startsWith('/create/') ||
    pathname.startsWith('/audio/') ||
    pathname.startsWith('/hashtag/') ||
    pathname.startsWith('/location/');

  if (isHidden) {
    return null;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.item} onPress={() => router.push('/')}>
        <Home 
          size={24} 
          color={isActive('/') ? "#EB4213" : "#666666"} 
          strokeWidth={isActive('/') ? 2.5 : 2} 
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.item} onPress={() => router.push('/explore')}>
        <Search 
          size={24} 
          color={isActive('/explore') ? "#EB4213" : "#666666"} 
          strokeWidth={isActive('/explore') ? 2.5 : 2} 
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.item} onPress={() => router.push('/reels')}>
        <Clapperboard 
          size={24} 
          color={isActive('/reels') ? "#EB4213" : "#666666"} 
          strokeWidth={isActive('/reels') ? 2.5 : 2} 
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.item} onPress={() => router.push('/activity')}>
        <Activity 
          size={24} 
          color={isActive('/activity') ? "#EB4213" : "#666666"} 
          strokeWidth={isActive('/activity') ? 2.5 : 2} 
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.item} onPress={() => router.push('/profile')}>
        <User 
          size={24} 
          color={isActive('/profile') ? "#EB4213" : "#666666"} 
          strokeWidth={isActive('/profile') ? 2.5 : 2} 
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    height: 64,
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    shadowColor: '#826DEE',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 10,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.02)',
  },
  item: {
    padding: 10,
  },
});
