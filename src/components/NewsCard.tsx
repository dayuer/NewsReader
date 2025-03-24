import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { NewsItem } from '../types';
import { StyleProp, ViewStyle } from 'react-native';

const { height: screenHeight } = Dimensions.get('window');
const bottomNavHeight = 60;
const insets = useSafeAreaInsets();
const availableHeight = screenHeight - insets.top - insets.bottom - bottomNavHeight;

interface NewsCardProps {
  item: NewsItem;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

const NewsCard = React.forwardRef<View, NewsCardProps>(({ item, onPress, style }, ref) => {
  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.container}>
        <TouchableOpacity style={style} onPress={onPress} ref={ref}>
          {/* 上部：新闻标题和图片 */}
          <View style={styles.header}>
            {item.images.length > 0 && (
              <Image source={{ uri: item.images[0].url }} style={styles.image} />
            )}
            <LinearGradient
              colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.8)']}
              style={styles.gradient}
            />
            <Text style={styles.title}>{item.title}</Text>
          </View>

          {/* 中部：新闻关键要点 */}
          <View style={styles.content}>
            <Text style={styles.summary}>{item.summary}</Text>
            <View style={styles.meta}>
              <Text style={styles.source}>{item.source}</Text>
              <Text style={styles.date}>{item.publishDate}</Text>
            </View>
          </View>

          {/* 下部：新闻点评和互动 */}
          <View style={styles.footer}>
            <View style={styles.actions}>
              <TouchableOpacity style={styles.actionButton}>
                <MaterialIcons name="thumb-up" size={20} color="#666" />
                <Text style={styles.actionText}>{item.likeCount}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <MaterialIcons name="comment" size={20} color="#666" />
                <Text style={styles.actionText}>{item.commentCount}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <MaterialIcons name="share" size={20} color="#666" />
                <Text style={styles.actionText}>分享</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 0,
    height: screenHeight,
    paddingBottom: bottomNavHeight,
  },
  container: {
    backgroundColor: '#fff',
    overflow: 'scroll',
    elevation: 3,
    height: availableHeight,
  },
  header: {
    height: availableHeight * 0.6,
    justifyContent: 'flex-end',
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    margin: 16,
    fontFamily: 'serif',
  },
  content: {
    padding: 16,
    height: availableHeight * 0.2,
  },
  summary: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    marginBottom: 8,
    fontFamily: 'serif',
  },
  meta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  source: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
  date: {
    fontSize: 14,
    color: '#666',
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    padding: 16,
    height: availableHeight * 0.1,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    marginLeft: 4,
    color: '#666',
  },
});

export default NewsCard;
