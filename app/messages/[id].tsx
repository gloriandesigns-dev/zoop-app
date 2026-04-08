import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, Phone, Video, Info, Camera, Image as ImageIcon, Mic, Send } from 'lucide-react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { generateMessages } from '../../utils/mockData';
import { faker } from '@faker-js/faker';

export default function ChatScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [inputText, setInputText] = useState('');
  const flatListRef = useRef<FlatList>(null);

  // Generate mock user and messages
  const [user] = useState({
    username: faker.internet.username().toLowerCase(),
    avatar: faker.image.avatar(),
  });
  const [messages, setMessages] = useState(generateMessages(20).reverse());

  const sendMessage = () => {
    if (inputText.trim().length === 0) return;
    
    const newMessage = {
      id: Date.now().toString(),
      text: inputText.trim(),
      isSent: true,
      time: 'Now',
    };

    setMessages([newMessage, ...messages]);
    setInputText('');
  };

  const renderMessage = ({ item }: { item: any }) => {
    const isSent = item.isSent;
    
    return (
      <Animated.View 
        entering={FadeInUp.duration(300)}
        style={[
          styles.messageWrapper,
          isSent ? styles.messageWrapperSent : styles.messageWrapperReceived
        ]}
      >
        {!isSent && <Image source={{ uri: user.avatar }} style={styles.messageAvatar} />}
        <View style={[
          styles.messageBubble,
          isSent ? styles.messageBubbleSent : styles.messageBubbleReceived
        ]}>
          <Text style={[
            styles.messageText,
            isSent ? styles.messageTextSent : styles.messageTextReceived
          ]}>
            {item.text}
          </Text>
        </View>
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <KeyboardAvoidingView 
        style={styles.keyboardAvoid} 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.iconButton}>
            <ChevronLeft size={28} color="#111111" />
          </TouchableOpacity>
          <View style={styles.headerUserInfo}>
            <Image source={{ uri: user.avatar }} style={styles.headerAvatar} />
            <Text style={styles.headerUsername}>{user.username}</Text>
          </View>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.iconButton}>
              <Phone size={24} color="#111111" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Video size={24} color="#111111" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Info size={24} color="#111111" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Messages List */}
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderMessage}
          inverted
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.messagesList}
        />

        {/* Input Bar */}
        <View style={styles.inputContainer}>
          <View style={styles.inputBar}>
            <TouchableOpacity style={styles.inputIcon}>
              <Camera size={24} color="#FFFFFF" fill="#826DEE" style={styles.cameraIconBg} />
            </TouchableOpacity>
            <TextInput
              style={styles.textInput}
              placeholder="Message..."
              placeholderTextColor="#666666"
              value={inputText}
              onChangeText={setInputText}
              multiline
            />
            {inputText.length > 0 ? (
              <TouchableOpacity style={styles.inputIcon} onPress={sendMessage}>
                <Send size={24} color="#EB4213" />
              </TouchableOpacity>
            ) : (
              <>
                <TouchableOpacity style={styles.inputIcon}>
                  <Mic size={24} color="#111111" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.inputIcon}>
                  <ImageIcon size={24} color="#111111" />
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  keyboardAvoid: {
    flex: 1,
  },
  header: {
    height: 60,
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
  headerUserInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginLeft: 8,
  },
  headerAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 10,
  },
  headerUsername: {
    fontFamily: 'Outfit_600SemiBold',
    fontSize: 16,
    color: '#111111',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  messagesList: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  messageWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 12,
    maxWidth: '80%',
  },
  messageWrapperSent: {
    alignSelf: 'flex-end',
  },
  messageWrapperReceived: {
    alignSelf: 'flex-start',
  },
  messageAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    marginRight: 8,
  },
  messageBubble: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 18,
  },
  messageBubbleSent: {
    backgroundColor: '#EB4213',
    borderBottomRightRadius: 4,
  },
  messageBubbleReceived: {
    backgroundColor: '#F4F4F4',
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontFamily: 'Outfit_400Regular',
    fontSize: 15,
    lineHeight: 20,
  },
  messageTextSent: {
    color: '#FFFFFF',
  },
  messageTextReceived: {
    color: '#111111',
  },
  inputContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 24,
    minHeight: 48,
    paddingHorizontal: 8,
  },
  inputIcon: {
    padding: 8,
  },
  cameraIconBg: {
    backgroundColor: '#826DEE',
    borderRadius: 12,
    overflow: 'hidden',
  },
  textInput: {
    flex: 1,
    fontFamily: 'Outfit_400Regular',
    fontSize: 15,
    color: '#111111',
    maxHeight: 100,
    paddingTop: 14,
    paddingBottom: 14,
    paddingHorizontal: 8,
  },
});
