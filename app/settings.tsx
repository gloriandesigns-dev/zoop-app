import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, ChevronRight, User, Lock, Bell, Palette, HelpCircle, LogOut } from 'lucide-react-native';
import { useRouter } from 'expo-router';

const SETTINGS_SECTIONS = [
  { id: 'account', title: 'Account', icon: User },
  { id: 'privacy', title: 'Privacy', icon: Lock },
  { id: 'notifications', title: 'Notifications', icon: Bell },
  { id: 'appearance', title: 'Appearance', icon: Palette },
  { id: 'help', title: 'Help', icon: HelpCircle },
];

export default function SettingsScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.iconButton}>
          <ChevronLeft size={28} color="#111111" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.sectionGroup}>
          {SETTINGS_SECTIONS.map((section) => {
            const Icon = section.icon;
            return (
              <TouchableOpacity key={section.id} style={styles.item}>
                <View style={styles.itemLeft}>
                  <Icon size={22} color="#111111" />
                  <Text style={styles.itemTitle}>{section.title}</Text>
                </View>
                <ChevronRight size={20} color="#999999" />
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.logoutSection}>
          <TouchableOpacity style={styles.item}>
            <View style={styles.itemLeft}>
              <LogOut size={22} color="#EB4213" />
              <Text style={[styles.itemTitle, { color: '#EB4213' }]}>Log Out</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
  content: {
    paddingVertical: 16,
  },
  sectionGroup: {
    borderBottomWidth: 8,
    borderBottomColor: '#F5F5F5',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 56,
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  itemTitle: {
    fontFamily: 'Outfit_500Medium',
    fontSize: 16,
    color: '#111111',
  },
  logoutSection: {
    paddingTop: 8,
  },
});
