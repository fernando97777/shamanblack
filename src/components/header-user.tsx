import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { FadeIn, SlideInUp, ZoomIn } from 'react-native-reanimated';

interface HeaderProps {
  userName?: string;
}

const Header: React.FC<HeaderProps> = ({ userName = 'Jorge' }) => {
  return (
    <Animated.View style={styles.header}>
      <View style={styles.headerLeft}>
        <Animated.View style={styles.avatarContainer} entering={ZoomIn.delay(300).springify()}>
          <View style={styles.avatar}>
            <Text style={styles.avatarEmoji}>👨‍🍳</Text>
          </View>
        </Animated.View>
        <View style={styles.headerText}>
          <Animated.Text style={styles.greeting} entering={FadeIn.delay(500)}>
            Hey {userName},
          </Animated.Text>
          <Animated.Text style={styles.question} entering={SlideInUp.delay(600).springify()}>
            Listo para ordenar?
          </Animated.Text>
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    marginRight: 12,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#e8f4f8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarEmoji: {
    fontSize: 24,
  },
  headerText: {
    flex: 1,
  },
  greeting: {
    fontSize: 16,
    color: '#666',
    marginBottom: 2,
  },
  question: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
});

export default Header;
