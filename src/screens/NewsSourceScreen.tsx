import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, NewsItem } from '../types';
import NewsCard from '../components/NewsCard';

type NewsSourceScreenRouteProp = RouteProp<RootStackParamList, 'NewsSource'>;

type NewsSourceScreenProps = {
  route: NewsSourceScreenRouteProp;
  navigation: NativeStackNavigationProp<RootStackParamList, 'NewsSource'>;
};

const NewsSourceScreen = ({ route, navigation }: NewsSourceScreenProps) => {
  const { source, currentNewsId } = route.params;
  const [newsData, setNewsData] = React.useState<NewsItem[]>([]);

  // 加载同新闻源新闻数据
  const loadNewsData = () => {
    try {
      const { data } = require('../data/newsData.json');
      const filteredData = data.filter((item: NewsItem) => 
        item.source === source && item.id !== currentNewsId
      );
      setNewsData(filteredData);
    } catch (error) {
      console.error('Failed to load news data:', error);
    }
  };

  React.useEffect(() => {
    loadNewsData();
  }, [source, currentNewsId]);

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <FlatList
        data={newsData}
        renderItem={({ item }) => (
          <NewsCard
            item={item}
            onPress={() => navigation.navigate('NewsDetail', { 
              news: {
                id: item.id,
                title: item.title,
                imageUrl: item.images.length > 0 ? item.images[0].url : '',
                source: item.source,
                timestamp: item.publishDate,
                summary: item.summary,
                content: item.content,
                author: item.author,
                category: item.category,
                tags: item.tags,
                viewCount: item.viewCount,
                likeCount: item.likeCount,
                commentCount: item.commentCount,
                isFeatured: item.isFeatured,
                isBreaking: item.isBreaking
              }
            })}
          />
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  listContainer: {
    padding: 8,
  },
});

export default NewsSourceScreen;
