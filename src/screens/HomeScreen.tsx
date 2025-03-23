import React from 'react';
import { View, FlatList, StyleSheet, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, NewsItem } from '../types';
import NewsCard from '../components/NewsCard';
type NewsItemProps = {
  item: NewsItem;
  onPress: () => void;
};

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

const NewsCardItem = ({ item, onPress }: NewsItemProps) => {
  return (
    <NewsCard 
      item={item} 
      onPress={onPress}
    />
  );
};

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const { t } = useTranslation();
  const [refreshing, setRefreshing] = React.useState(false);
  const [newsData, setNewsData] = React.useState<NewsItem[]>([]);

  // 加载新闻数据
  const loadNewsData = () => {
    try {
      const { data } = require('../data/newsData.json');
      setNewsData(data);
    } catch (error) {
      console.error('Failed to load news data:', error);
    }
  };

  // 初始化加载数据
  React.useEffect(() => {
    loadNewsData();
  }, []);

  // 处理下拉刷新
  const handleRefresh = () => {
    setRefreshing(true);
    loadNewsData();
    setRefreshing(false);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
        <FlatList
          data={newsData}
          pagingEnabled={true}
          snapToAlignment="center"
          decelerationRate="fast"
          renderItem={({ item }) => (
            <NewsCardItem
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
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              colors={['#ff0000']}
              tintColor="#ff0000"
            />
          }
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
    flexGrow: 1,
  },
});

export default HomeScreen;
