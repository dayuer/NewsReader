import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import * as cheerio from 'cheerio';

export interface NewsDetailScreenRouteProp {
  params: {
    news: {
      id: string;
      title: string;
      imageUrl: string;
      source: string;
      timestamp: string;
      summary: string;
    };
  };
}

export type Props = {
  route: NewsDetailScreenRouteProp;
};

const NewsDetailScreen = ({ route }: Props) => {
  if (!route?.params?.news) {
    return (
      <View style={styles.container}>
        <Text>新闻数据加载失败</Text>
      </View>
    );
  }
  const { t } = useTranslation();
  const { news } = route.params;

  const handleShare = () => {
    // 分享功能实现
  };

  return (
    <ScrollView style={styles.container}>
      {/* 大图 */}
      <Image 
        source={{ uri: news.imageUrl }} 
        style={styles.image}
        resizeMode="cover"
      />

      {/* 内容区域 */}
      <View style={styles.content}>
        {/* 标题 */}
        <Text style={styles.title}>{news.title}</Text>

        {/* 元信息 */}
        <View style={styles.metaContainer}>
          <Text style={styles.source}>{news.source}</Text>
          <Text style={styles.timestamp}>{news.timestamp}</Text>
        </View>

        {/* 摘要 */}
        <Text style={styles.summary}>{news.summary}</Text>

        {/* 分隔线 */}
        <View style={styles.divider} />

        {/* 完整内容 */}
        <Text style={styles.fullContent}>
          近日，人工智能领域迎来重大突破。OpenAI发布了最新一代语言模型GPT-5，该模型在自然语言处理、代码生成和创意写作等方面展现出前所未有的能力。
          {'\n\n'}
          据OpenAI首席科学家Ilya Sutskever介绍，GPT-5在多个基准测试中表现优异，特别是在理解复杂指令和生成高质量内容方面有了显著提升。该模型采用了全新的架构设计，能够更好地处理长文本和上下文信息。
          {'\n\n'}
          <Text style={styles.quote}>
            "GPT-5的发布标志着人工智能技术进入了一个新的时代。"
          </Text>
          {'\n\n'}
          在应用方面，GPT-5已经在多个领域展现出巨大潜力：
          {'\n\n'}
          • 教育：辅助教学，提供个性化学习方案
          {'\n\n'}
          • 医疗：辅助诊断，提供治疗方案建议
          {'\n\n'}
          • 创意：协助写作、绘画等创意工作
          {'\n\n'}
          • 编程：自动生成代码，提高开发效率
          {'\n\n'}
          然而，随着AI技术的快速发展，也引发了一些担忧。专家们呼吁加强对AI的监管，确保其安全、可靠地发展。
          {'\n\n'}
          <Text style={styles.imageCaption}>
            图：OpenAI实验室内部工作场景
          </Text>
        </Text>
      </View>

      {/* 相关新闻 */}
      <View style={styles.relatedNewsSection}>
        <Text style={styles.sectionTitle}>相关新闻</Text>
        {[
          {
            id: '1',
            title: 'AI技术助力医疗诊断',
            imageUrl: 'https://picsum.photos/200/150',
            timestamp: '2025-03-14',
          },
          {
            id: '2',
            title: '人工智能在教育领域的应用',
            imageUrl: 'https://picsum.photos/200/150',
            timestamp: '2025-03-13',
          },
          {
            id: '3',
            title: 'AI绘画工具引发艺术界热议',
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
        <Text style={styles.shareText}>分享</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 300,
  },
  content: {
    padding: 24,
    paddingBottom: 100, // 为分享按钮留出空间
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
  shareText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 8,
    fontWeight: '500',
  },
});

export default NewsDetailScreen;
