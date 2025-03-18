import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, StatusBar, Share } from 'react-native';
import Toast from 'react-native-toast-message';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

export interface NewsDetailScreenRouteProp {
  params: {
    news: {
      id: string;
      title: string;
      imageUrl: string;
      source: string;
      timestamp: string;
      summary: string;
      content: string;
      author: string;
      category: string;
      tags: string[];
      viewCount: number;
      likeCount: number;
      commentCount: number;
      isFeatured: boolean;
      isBreaking: boolean;
    };
  };
}

export type Props = {
  route: NewsDetailScreenRouteProp;
  navigation: any;
};

const NewsDetailScreen = ({ route, navigation }: Props) => {
  const { t } = useTranslation();
  
  if (!route?.params?.news) {
    return (
      <View style={styles.container}>
        <Text>新闻数据加载失败</Text>
      </View>
    );
  }

  const { news } = route.params;

  const handleShare = async () => {
    try {
      await Share.share({
        message: `${news.title}\n\n${news.summary}\n\n阅读更多：${news.imageUrl}`,
        url: news.imageUrl,
        title: news.title
      });
    } catch (error) {
      console.error('分享失败:', error);
    }
  };

  const { colors } = useTheme();
  const [isLoading, setIsLoading] = useState(true);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContent}>
        <View>
          {/* 大图 */}
          <View style={styles.imageContainer}>
            <Image 
              source={{ uri: news.imageUrl }} 
              style={styles.image}
              resizeMode="cover"
              onLoadStart={() => setIsLoading(true)}
              onLoadEnd={() => setIsLoading(false)}
            />
            {isLoading && (
              <ActivityIndicator 
                style={styles.loadingIndicator}
                size="large"
                color="#0984e3"
              />
            )}
          </View>

          {/* 内容区域 */}
          <View style={styles.content}>
            {/* 标题 */}
            <Text style={styles.title}>{news.title}</Text>

            {/* 元信息 */}
            <View style={styles.metaContainer}>
              <Text style={styles.source}>{news.source}</Text>
              <Text style={styles.timestamp}>{news.timestamp}</Text>
              {news.isBreaking && (
                <View style={styles.breakingBadge}>
                  <Text style={styles.breakingText}>紧急</Text>
                </View>
              )}
            </View>

            {/* 作者信息 */}
            <View style={styles.authorContainer}>
              <Text style={styles.authorText}>作者：{news.author}</Text>
            </View>

            {/* 分类和标签 */}
            <View style={styles.categoryContainer}>
              <Text style={styles.categoryText}>分类：{news.category}</Text>
            </View>
            {news.tags.length > 0 && (
              <View style={styles.tagsContainer}>
                {news.tags.map((tag, index) => (
                  <View key={index} style={styles.tag}>
                    <Text style={styles.tagText}>#{tag}</Text>
                  </View>
                ))}
              </View>
            )}

            {/* 摘要 */}
            <Text style={styles.summary}>{news.summary}</Text>

            {/* 统计数据 */}
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Ionicons name="eye-outline" size={16} color="#666" />
                <Text style={styles.statText}>{news.viewCount}</Text>
              </View>
              <View style={styles.statItem}>
                <Ionicons name="thumbs-up-outline" size={16} color="#666" />
                <Text style={styles.statText}>{news.likeCount}</Text>
              </View>
              <View style={styles.statItem}>
                <Ionicons name="chatbubble-outline" size={16} color="#666" />
                <Text style={styles.statText}>{news.commentCount}</Text>
              </View>
            </View>

            {/* 分隔线 */}
            <View style={styles.divider} />

            {/* 完整内容 */}
            <Text style={styles.fullContent}>
              {news.content}
            </Text>
          </View>

          {/* 相关新闻 */}
          <View style={styles.relatedNewsSection}>
            <Text style={styles.sectionTitle}>相关新闻</Text>
            {[
              {
                id: '1',
                title: t('aiMedical'),
                imageUrl: 'https://picsum.photos/200/150',
                timestamp: '2025-03-14',
              },
              {
                id: '2',
                title: t('aiEducation'),
                imageUrl: 'https://picsum.photos/200/150',
                timestamp: '2025-03-13',
              },
              {
                id: '3',
                title: t('aiArt'),
                imageUrl: 'https://picsum.photos/200/150',
                timestamp: '2025-03-12',
              },
            ].map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.relatedNewsItem}
                onPress={() => {}}
              >
                <Image
                  source={{ uri: item.imageUrl }}
                  style={styles.relatedNewsImage}
                />
                <View style={styles.relatedNewsContent}>
                  <Text style={styles.relatedNewsTitle}>{item.title}</Text>
                  <Text style={styles.relatedNewsTimestamp}>{item.timestamp}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* 分享按钮 */}
          <TouchableOpacity 
            style={styles.shareButton}
            onPress={handleShare}
          >
            <MaterialIcons name="share" size={24} color="#fff" />
            <Text style={styles.shareText}>{t('share')}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 100,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 300,
  },
  image: {
    width: '100%',
    height: 300,
  },
  loadingIndicator: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  content: {
    padding: 24,
    paddingBottom: 100,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    lineHeight: 36,
    color: '#2d3436',
    marginBottom: 16,
  },
  metaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  source: {
    fontSize: 16,
    color: '#0984e3',
    fontWeight: '500',
  },
  timestamp: {
    fontSize: 16,
    color: '#636e72',
  },
  summary: {
    fontSize: 18,
    lineHeight: 28,
    color: '#2d3436',
    marginBottom: 24,
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 24,
  },
  fullContent: {
    fontSize: 16,
    lineHeight: 28,
    color: '#2d3436',
  },
  quote: {
    fontStyle: 'italic',
    color: '#636e72',
    marginVertical: 16,
    paddingLeft: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#0984e3',
  },
  imageCaption: {
    fontSize: 14,
    color: '#636e72',
    textAlign: 'center',
    marginTop: 8,
  },
  relatedNewsSection: {
    padding: 24,
    backgroundColor: '#f5f6fa',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2d3436',
    marginBottom: 16,
  },
  relatedNewsItem: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 16,
    flexDirection: 'row',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  relatedNewsImage: {
    width: 120,
    height: 90,
  },
  relatedNewsContent: {
    flex: 1,
    padding: 16,
  },
  relatedNewsTitle: {
    fontSize: 16,
    color: '#2d3436',
    marginBottom: 8,
  },
  relatedNewsTimestamp: {
    fontSize: 14,
    color: '#636e72',
  },
  shareButton: {
    position: 'absolute',
    bottom: 40,
    right: 24,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0984e3',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  shareText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 8,
    fontWeight: '500',
  },
  breakingBadge: {
    backgroundColor: '#ff4757',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginLeft: 8,
  },
  breakingText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  authorContainer: {
    marginBottom: 12,
  },
  authorText: {
    fontSize: 14,
    color: '#666',
  },
  categoryContainer: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  categoryText: {
    fontSize: 14,
    color: '#666',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  tag: {
    backgroundColor: '#f1f2f6',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    fontSize: 12,
    color: '#666',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
});

export default NewsDetailScreen;
