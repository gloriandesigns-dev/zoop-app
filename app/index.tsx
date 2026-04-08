import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TopBar from '../components/TopBar';
import Stories from '../components/Stories';
import Feed from '../components/Feed';

export default function ZoopHomeScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <TopBar />
      
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Stories />
        <View style={styles.divider} />
        <Feed />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    paddingBottom: 120, // Extra padding for the global floating elements
  },
  divider: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginHorizontal: 16,
    marginBottom: 16,
  },
});
