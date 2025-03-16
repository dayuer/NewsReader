import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

type NewsItem = {
  id: string;
  type?: 'large' | 'small' | 'text' | 'multi';
  title: string;
  summary: string;
  imageUrl?: string;
  imageUrls?: string[];
  timestamp: string;
  source: string;
};

type NewsItemProps = {
  item: NewsItem;
  onPress: () => void;
};

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

// 模拟新闻数据
const newsData: NewsItem[] = [
  {
    id: '1',
    type: 'large',
    title: 'Breaking News: Major Event',
    summary: 'A significant event has occurred that will impact many people...',
    imageUrl: 'https://picsum.photos/600/400',
    timestamp: '2小时前',
    source: '新华网'
  },
  {
    id: '2',
    type: 'small',
    title: 'Technology Advancements',
    summary: 'New breakthroughs in AI technology are changing the world...',
    imageUrl: 'https://picsum.photos/200/200',
    timestamp: '5小时前',
    source: '科技日报'
  },
  {
    id: '3',
    type: 'text',
    title: 'Global Economy Update',
    summary: 'The global economy shows signs of recovery after recent challenges...',
    timestamp: '1天前',
    source: '经济观察报'
  },
  {
    id: '4',
    type: 'multi',
    title: 'Art Exhibition Opens in Shanghai',
    summary: 'A major art exhibition featuring works from around the world has opened...',
    imageUrls: [
      'https://picsum.photos/300/200',
      'https://picsum.photos/300/200',
      'https://picsum.photos/300/200'
    ],
    timestamp: '3小时前',
    source: '艺术中国'
  },
  {
    id: '5',
    type: 'large',
    title: 'New Climate Change Report Released',
    summary: 'Scientists warn of dire consequences if global warming continues at current rate...',
    imageUrl: 'https://picsum.photos/600/400',
    timestamp: '1小时前',
    source: '环境日报'
  },
  {
    id: '6',
    type: 'small',
    title: 'SpaceX Launches New Satellite',
    summary: 'SpaceX successfully launched a new communication satellite into orbit...',
    imageUrl: 'https://picsum.photos/200/200',
    timestamp: '4小时前',
    source: '科技前沿'
  },
  {
    id: '7',
    type: 'text',
    title: 'Stock Market Hits New High',
    summary: 'The stock market reached record levels today, driven by tech sector gains...',
    timestamp: '6小时前',
    source: '财经周刊'
  },
  {
    id: '8',
    type: 'multi',
    title: 'New Movie Releases This Weekend',
    summary: 'Check out the latest blockbuster movies hitting theaters this weekend...',
    imageUrls: [
      'https://picsum.photos/300/200',
      'https://picsum.photos/300/200',
      'https://picsum.photos/300/200'
    ],
    timestamp: '1天前',
    source: '娱乐在线'
  },
  {
    id: '9',
    type: 'large',
    title: 'Major Sports Event Concludes',
    summary: 'The international sports competition ended with record-breaking performances...',
    imageUrl: 'https://picsum.photos/600/400',
    timestamp: '2天前',
    source: '体育世界'
  },
  {
    id: '10',
    type: 'small',
    title: 'New Smartphone Released',
    summary: 'The latest smartphone features cutting-edge technology and improved camera...',
    imageUrl: 'https://picsum.photos/200/200',
    timestamp: '3小时前',
    source: '科技快讯'
  },
  {
    id: '11',
    type: 'text',
    title: 'Global Health Summit Concludes',
    summary: 'World leaders discuss strategies to improve global health and prevent future pandemics...',
    timestamp: '1天前',
    source: '健康时报'
  },
  {
    id: '12',
    type: 'multi',
    title: 'New Art Installation in City Center',
    summary: 'A stunning new art installation has been unveiled in the heart of the city...',
    imageUrls: [
      'https://picsum.photos/300/200',
      'https://picsum.photos/300/200',
      'https://picsum.photos/300/200'
    ],
    timestamp: '4小时前',
    source: '城市文化'
  },
  {
    id: '13',
    type: 'large',
    title: 'Major Infrastructure Project Announced',
    summary: 'The government has announced a new infrastructure project to improve transportation...',
    imageUrl: 'https://picsum.photos/600/400',
    timestamp: '1天前',
    source: '建设日报'
  },
  {
    id: '14',
    type: 'small',
    title: 'New Study on Climate Change',
    summary: 'Researchers have published a new study on the effects of climate change on coastal cities...',
    imageUrl: 'https://picsum.photos/200/200',
    timestamp: '5小时前',
    source: '环境研究'
  },
  {
    id: '15',
    type: 'text',
    title: 'Global Trade Agreement Signed',
    summary: 'Countries have signed a new trade agreement to boost economic growth...',
    timestamp: '2天前',
    source: '国际贸易'
  },
  {
    id: '16',
    type: 'multi',
    title: 'New Fashion Trends for Spring',
    summary: 'Discover the latest fashion trends for the upcoming spring season...',
    imageUrls: [
      'https://picsum.photos/300/200',
      'https://picsum.photos/300/200',
      'https://picsum.photos/300/200'
    ],
    timestamp: '1天前',
    source: '时尚周刊'
  },
  {
    id: '17',
    type: 'large',
    title: 'New Theme Park Opens',
    summary: 'A new theme park featuring cutting-edge attractions has opened its doors...',
    imageUrl: 'https://picsum.photos/600/400',
    timestamp: '3小时前',
    source: '旅游天地'
  },
  {
    id: '18',
    type: 'small',
    title: 'Breakthrough in Medical Research',
    summary: 'Scientists have made a significant breakthrough in cancer treatment research...',
    imageUrl: 'https://picsum.photos/200/200',
    timestamp: '6小时前',
    source: '医学前沿'
  },
  {
    id: '19',
    type: 'text',
    title: 'New Education Policy Announced',
    summary: 'The government has announced a new policy to improve the education system...',
    timestamp: '1天前',
    source: '教育时报'
  },
  {
    id: '20',
    type: 'multi',
    title: 'New Restaurant Opens in Downtown',
    summary: 'A highly anticipated new restaurant has opened in the city center...',
    imageUrls: [
      'https://picsum.photos/300/200',
      'https://picsum.photos/300/200',
      'https://picsum.photos/300/200'
    ],
    timestamp: '2小时前',
    source: '美食天地'
  }
];

const LargeNewsItem = ({ item, onPress }: NewsItemProps) => (
  <TouchableOpacity style={styles.newsItem} onPress={onPress}>
    <Image source={{ uri: item.imageUrl }} style={styles.largeImage} />
    <View style={styles.newsContent}>
      <Text style={styles.newsTitle}>{item.title}</Text>
      <Text style={styles.newsSummary}>{item.summary}</Text>
      <View style={styles.newsMeta}>
        <Text style={styles.newsSource}>{item.source}</Text>
        <Text style={styles.newsTimestamp}>{item.timestamp}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

const SmallNewsItem = ({ item, onPress }: NewsItemProps) => (
  <TouchableOpacity style={[styles.newsItem, styles.smallItem]} onPress={onPress}>
    <Image source={{ uri: item.imageUrl }} style={styles.smallImage} />
    <View style={styles.smallContent}>
      <Text style={styles.newsTitle}>{item.title}</Text>
      <Text style={styles.newsSummary}>{item.summary}</Text>
      <View style={styles.newsMeta}>
        <Text style={styles.newsSource}>{item.source}</Text>
        <Text style={styles.newsTimestamp}>{item.timestamp}</Text>
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
        <Text style={styles.newsTimestamp}>{item.timestamp}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

const MultiImageNewsItem = ({ item, onPress }: NewsItemProps) => (
  <TouchableOpacity style={styles.newsItem} onPress={onPress}>
    <View style={styles.multiImageContainer}>
      {item.imageUrls?.map((uri, index) => (
        <Image key={index} source={{ uri }} style={styles.multiImage} />
      ))}
    </View>
    <View style={styles.newsContent}>
      <Text style={styles.newsTitle}>{item.title}</Text>
      <Text style={styles.newsSummary}>{item.summary}</Text>
      <View style={styles.newsMeta}>
        <Text style={styles.newsSource}>{item.source}</Text>
        <Text style={styles.newsTimestamp}>{item.timestamp}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

const NewsItem = ({ item, onPress }: NewsItemProps) => {
  switch (item.type) {
    case 'large':
      return <LargeNewsItem item={item} onPress={onPress} />;
    case 'small':
      return <SmallNewsItem item={item} onPress={onPress} />;
    case 'text':
      return <TextNewsItem item={item} onPress={onPress} />;
    case 'multi':
      return <MultiImageNewsItem item={item} onPress={onPress} />;
    default:
      return <LargeNewsItem item={item} onPress={onPress} />;
  }
};

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const { t } = useTranslation();

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
                imageUrl: item.imageUrl || '',
                source: item.source,
                timestamp: item.timestamp,
                summary: item.summary
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
