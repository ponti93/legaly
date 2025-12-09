import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Animated,
  Platform,
  Pressable,
  Image,
} from 'react-native';
import { X, Send, Upload, MessageCircle, FileText } from 'lucide-react-native';
import { Colors, Spacing } from '@/constants/colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as DocumentPicker from 'expo-document-picker';

interface ChatbotModalProps {
  visible: boolean;
  onClose: () => void;
}

type Mode = 'selection' | 'knowledge' | 'document';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export default function ChatbotModal({ visible, onClose }: ChatbotModalProps) {
  const [mode, setMode] = useState<Mode>('selection');
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [consentChecked, setConsentChecked] = useState(false);
  
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const scrollViewRef = useRef<ScrollView>(null);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 8,
          tension: 40,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      fadeAnim.setValue(0);
      scaleAnim.setValue(0.9);
      setMode('selection');
      setMessages([]);
      setInputText('');
      setSelectedFile(null);
      setConsentChecked(false);
    }
  }, [visible, fadeAnim, scaleAnim]);

  const handleModeSelect = (selectedMode: 'knowledge' | 'document') => {
    setMode(selectedMode);
    
    if (selectedMode === 'knowledge') {
      setMessages([
        {
          id: '1',
          text: 'Hello! I can help you learn about LegallyYes, our programs, events, and mission. What would you like to know?',
          isUser: false,
          timestamp: new Date(),
        },
      ]);
    }
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date(),
    };

    const responseMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: 'This mode will answer questions based on the LegallyYes knowledge base. API integration coming soon.',
      isUser: false,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage, responseMessage]);
    setInputText('');

    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const handleFileUpload = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'],
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setSelectedFile(result.assets[0]);
      }
    } catch (error) {
      console.error('Error picking document:', error);
    }
  };

  const handleAnalyzeDocument = () => {
    if (!selectedFile || !consentChecked) return;
    console.log('Document analysis will be integrated with API');
  };

  const renderModeSelection = () => (
    <View style={styles.modeSelectionContainer}>
      <Text style={styles.modeTitle}>How can I help you today?</Text>
      
      <Animated.View
        style={[
          styles.modeButtonWrapper,
          {
            opacity: fadeAnim,
            transform: [{ translateY: fadeAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [20, 0],
            })}],
          },
        ]}
      >
        <TouchableOpacity
          style={[styles.modeButton, styles.modeButtonPrimary]}
          onPress={() => handleModeSelect('knowledge')}
          activeOpacity={0.8}
        >
          <MessageCircle size={32} color={Colors.white} style={styles.modeIcon} />
          <Text style={styles.modeButtonTitle}>Ask About LegallyYes</Text>
          <Text style={styles.modeButtonDescription}>
            Ask questions about the organization, programs, founder, or mission.
          </Text>
        </TouchableOpacity>
      </Animated.View>

      <Animated.View
        style={[
          styles.modeButtonWrapper,
          {
            opacity: fadeAnim,
            transform: [{ translateY: fadeAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [40, 0],
            })}],
          },
        ]}
      >
        <TouchableOpacity
          style={[styles.modeButton, styles.modeButtonSecondary]}
          onPress={() => handleModeSelect('document')}
          activeOpacity={0.8}
        >
          <FileText size={32} color={Colors.deepCharcoal} style={styles.modeIcon} />
          <Text style={[styles.modeButtonTitle, { color: Colors.deepCharcoal }]}>
            Analyze a Document
          </Text>
          <Text style={[styles.modeButtonDescription, { color: Colors.deepCharcoal }]}>
            Upload a document to receive an AI-powered analysis.
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );

  const renderKnowledgeMode = () => (
    <View style={styles.chatContainer}>
      <ScrollView
        ref={scrollViewRef}
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}
        showsVerticalScrollIndicator={false}
      >
        {messages.map((message) => (
          <View
            key={message.id}
            style={[
              styles.messageBubble,
              message.isUser ? styles.userMessage : styles.assistantMessage,
            ]}
          >
            <Text
              style={[
                styles.messageText,
                message.isUser ? styles.userMessageText : styles.assistantMessageText,
              ]}
            >
              {message.text}
            </Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Ask a question…"
          placeholderTextColor={Colors.softGray}
          value={inputText}
          onChangeText={setInputText}
          onSubmitEditing={handleSendMessage}
          multiline
          maxLength={500}
        />
        <TouchableOpacity
          style={styles.sendButton}
          onPress={handleSendMessage}
          activeOpacity={0.8}
        >
          <Send size={20} color={Colors.white} />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderDocumentMode = () => (
    <View style={styles.documentContainer}>
      <Text style={styles.documentTitle}>Document Analysis</Text>
      <Text style={styles.documentSubtitle}>
        Upload a PDF, DOCX, or TXT file for AI-powered analysis
      </Text>

      <TouchableOpacity
        style={styles.uploadBox}
        onPress={handleFileUpload}
        activeOpacity={0.7}
      >
        <Upload size={48} color={Colors.primary} />
        <Text style={styles.uploadText}>
          {selectedFile ? selectedFile.name : 'Upload PDF, DOCX, or TXT file'}
        </Text>
        <Text style={styles.uploadSubtext}>
          {selectedFile ? 'Tap to change file' : 'Or drag and drop'}
        </Text>
      </TouchableOpacity>

      <View style={styles.consentContainer}>
        <TouchableOpacity
          style={styles.checkbox}
          onPress={() => setConsentChecked(!consentChecked)}
          activeOpacity={0.7}
        >
          <View style={[styles.checkboxBox, consentChecked && styles.checkboxChecked]}>
            {consentChecked && <View style={styles.checkboxInner} />}
          </View>
          <Text style={styles.consentText}>
            I agree to the terms and consent to having my document analyzed.
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[
          styles.analyzeButton,
          (!selectedFile || !consentChecked) && styles.analyzeButtonDisabled,
        ]}
        onPress={handleAnalyzeDocument}
        disabled={!selectedFile || !consentChecked}
        activeOpacity={0.8}
      >
        <Text style={styles.analyzeButtonText}>Analyze Document</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <Animated.View
          style={[
            styles.modalContainer,
            Platform.OS === 'web' && styles.modalContainerWeb,
            {
              paddingTop: insets.top + Spacing.lg,
              paddingBottom: insets.bottom + Spacing.lg,
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
          onStartShouldSetResponder={() => true}
        >
          <View style={styles.modalContent}>
            <View style={styles.header}>
              <View style={styles.headerLeft}>
                <Image
                  source={{ uri: 'https://pub-e001eb4506b145aa938b5d3badbff6a5.r2.dev/attachments/dghaiwzfh3hlv793j97uo' }}
                  style={styles.logoImage}
                  resizeMode="contain"
                />
                <Text style={styles.headerTitle}>LegallyYes Assistant</Text>
              </View>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={onClose}
                activeOpacity={0.7}
              >
                <X size={24} color={Colors.deepCharcoal} />
              </TouchableOpacity>
            </View>

            {mode === 'selection' && renderModeSelection()}
            {mode === 'knowledge' && renderKnowledgeMode()}
            {mode === 'document' && renderDocumentMode()}

            {mode !== 'selection' && (
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => setMode('selection')}
                activeOpacity={0.7}
              >
                <Text style={styles.backButtonText}>← Back to Menu</Text>
              </TouchableOpacity>
            )}
          </View>
        </Animated.View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(11, 15, 26, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    maxWidth: 600,
    maxHeight: '85%',
    backgroundColor: Colors.white,
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: Colors.deepCharcoal,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 24,
    elevation: 10,
  },
  modalContainerWeb: {
    maxHeight: 700,
  },
  modalContent: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.secondary,
    backgroundColor: Colors.secondary,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  logoImage: {
    width: 32,
    height: 32,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600' as const,
    color: Colors.deepCharcoal,
  },
  closeButton: {
    padding: Spacing.sm,
  },
  modeSelectionContainer: {
    flex: 1,
    padding: Spacing.xl,
    justifyContent: 'center',
  },
  modeTitle: {
    fontSize: 24,
    fontWeight: '600' as const,
    color: Colors.deepCharcoal,
    textAlign: 'center',
    marginBottom: Spacing.xl,
  },
  modeButtonWrapper: {
    marginBottom: Spacing.lg,
  },
  modeButton: {
    padding: Spacing.xl,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: Colors.deepCharcoal,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  modeButtonPrimary: {
    backgroundColor: Colors.primary,
  },
  modeButtonSecondary: {
    backgroundColor: Colors.secondary,
  },
  modeIcon: {
    marginBottom: Spacing.md,
  },
  modeButtonTitle: {
    fontSize: 20,
    fontWeight: '600' as const,
    color: Colors.white,
    marginBottom: Spacing.sm,
  },
  modeButtonDescription: {
    fontSize: 14,
    color: Colors.white,
    textAlign: 'center',
    opacity: 0.9,
  },
  chatContainer: {
    flex: 1,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: Spacing.lg,
    gap: Spacing.md,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: Spacing.md,
    borderRadius: 16,
    marginBottom: Spacing.sm,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: Colors.primary,
    borderBottomRightRadius: 4,
  },
  assistantMessage: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.secondary,
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 15,
    lineHeight: 22,
  },
  userMessageText: {
    color: Colors.white,
  },
  assistantMessageText: {
    color: Colors.deepCharcoal,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.secondary,
    alignItems: 'flex-end',
    gap: Spacing.sm,
  },
  input: {
    flex: 1,
    minHeight: 44,
    maxHeight: 100,
    backgroundColor: Colors.softGray,
    borderRadius: 22,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    fontSize: 15,
    color: Colors.deepCharcoal,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  documentContainer: {
    flex: 1,
    padding: Spacing.xl,
  },
  documentTitle: {
    fontSize: 24,
    fontWeight: '600' as const,
    color: Colors.deepCharcoal,
    marginBottom: Spacing.sm,
  },
  documentSubtitle: {
    fontSize: 14,
    color: Colors.deepCharcoal,
    opacity: 0.7,
    marginBottom: Spacing.xl,
  },
  uploadBox: {
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: Colors.primary,
    borderRadius: 16,
    backgroundColor: Colors.secondary,
    padding: Spacing.xxl,
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  uploadText: {
    fontSize: 16,
    fontWeight: '500' as const,
    color: Colors.deepCharcoal,
    marginTop: Spacing.md,
    textAlign: 'center',
  },
  uploadSubtext: {
    fontSize: 13,
    color: Colors.deepCharcoal,
    opacity: 0.6,
    marginTop: Spacing.xs,
  },
  consentContainer: {
    marginBottom: Spacing.xl,
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  checkboxBox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: Colors.primary,
  },
  checkboxInner: {
    width: 12,
    height: 12,
    borderRadius: 3,
    backgroundColor: Colors.white,
  },
  consentText: {
    flex: 1,
    fontSize: 13,
    color: Colors.deepCharcoal,
    lineHeight: 18,
  },
  analyzeButton: {
    backgroundColor: Colors.primary,
    padding: Spacing.md,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  analyzeButtonDisabled: {
    backgroundColor: Colors.softGray,
    opacity: 0.5,
    shadowOpacity: 0,
  },
  analyzeButtonText: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: Colors.white,
  },
  backButton: {
    padding: Spacing.md,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: Colors.secondary,
  },
  backButtonText: {
    fontSize: 15,
    color: Colors.primary,
    fontWeight: '500' as const,
  },
});
