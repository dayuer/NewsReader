import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

type NewsItem = {
  id: string;
  title: string;
  content: string;
  summary: string;
  source: string;
  author: string;
  publishDate: string;
  category: string;
  subCategory: string;
  tags: string[];
  images: {
    url: string;
    caption?: string;
  }[];
  viewCount: number;
  likeCount: number;
  commentCount: number;
  isFeatured: boolean;
  isBreaking: boolean;
};

type NewsItemProps = {
  item: NewsItem;
  onPress: () => void;
};

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};


const LargeNewsItem = ({ item, onPress }: NewsItemProps) => (
  <TouchableOpacity style={styles.newsItem} onPress={onPress}>
    {item.images.length > 0 && item.images[0].url && (
      <Image source={{ uri: item.images[0].url }} style={styles.largeImage} />
    )}
    <View style={styles.newsContent}>
      <Text style={styles.newsTitle}>{item.title}</Text>
      <Text style={styles.newsSummary}>{item.summary}</Text>
      <View style={styles.newsMeta}>
        <Text style={styles.newsSource}>{item.source}</Text>
        <Text style={styles.newsTimestamp}>{item.publishDate}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

const SmallNewsItem = ({ item, onPress }: NewsItemProps) => (
  <TouchableOpacity style={[styles.newsItem, styles.smallItem]} onPress={onPress}>
    {item.images.length > 0 && item.images[0].url && (
      <Image source={{ uri: item.images[0].url }} style={styles.smallImage} />
    )}
    <View style={styles.smallContent}>
      <Text style={styles.newsTitle}>{item.title}</Text>
      <Text style={styles.newsSummary}>{item.summary}</Text>
      <View style={styles.newsMeta}>
        <Text style={styles.newsSource}>{item.source}</Text>
        <Text style={styles.newsTimestamp}>{item.publishDate}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

const TextNewsItem = ({ item, onPress }: NewsItemProps) => (
  <TouchableOpacity style={styles.newsItem} onPress={onPress}>
    <View style={styles.newsContent}>
      <Text style={styles.newsTitle}>{item.title}</Text>
      <Text style={styles.newsSummary}>{item.summary}</Text>
      <View style={styles.newsMeta}>
        <Text style={styles.newsSource}>{item.source}</Text>
        <Text style={styles.newsTimestamp}>{item.publishDate}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

const MultiImageNewsItem = ({ item, onPress }: NewsItemProps) => (
  <TouchableOpacity style={styles.newsItem} onPress={onPress}>
    <View style={styles.multiImageContainer}>
      {item.images.slice(0, 3).map((image, index) => (
        image.url && <Image key={index} source={{ uri: image.url }} style={styles.multiImage} />
      ))}
    </View>
    <View style={styles.newsContent}>
      <Text style={styles.newsTitle}>{item.title}</Text>
      <Text style={styles.newsSummary}>{item.summary}</Text>
      <View style={styles.newsMeta}>
        <Text style={styles.newsSource}>{item.source}</Text>
        <Text style={styles.newsTimestamp}>{item.publishDate}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

const NewsItem = ({ item, onPress }: NewsItemProps) => {
  if (item.isFeatured) {
    return <LargeNewsItem item={item} onPress={onPress} />;
  }
  if (item.images.length > 1) {
    return <MultiImageNewsItem item={item} onPress={onPress} />;
  }
  if (item.images.length === 1) {
    return <SmallNewsItem item={item} onPress={onPress} />;
  }
  return <TextNewsItem item={item} onPress={onPress} />;
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
        renderItem={({ item }) => (
          <NewsItem
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
            colors={['#ff0000']} // 自定义刷新指示器颜色
            tintColor="#ff0000" // iOS 自定义刷新指示器颜色
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#ffffff',
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  searchButton: {
    padding: 8,
  },
  listContainer: {
    padding: 8,
  },
  newsItem: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    marginBottom: 8,
    overflow: 'hidden',
    elevation: 1,
  },
  largeImage: {
    width: '100%',
    height: 192,
  },
  smallItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  smallImage: {
    width: 96,
    height: 96,
    margin: 16,
    borderRadius: 8,
  },
  smallContent: {
    flex: 1,
    paddingRight: 16,
  },
  multiImageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
  },
  multiImage: {
    width: '32%',
    aspectRatio: 1.5,
    borderRadius: 4,
  },
  newsContent: {
    padding: 16,
  },
  newsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  newsSummary: {
    fontSize: 14,
    color: '#4b5563',
    marginBottom: 8,
  },
  newsMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  newsSource: {
    fontSize: 12,
    color: '#6b7280',
  },
  newsTimestamp: {
    fontSize: 12,
    color: '## 6b7280',
  },
});

export default HomeScreen;
