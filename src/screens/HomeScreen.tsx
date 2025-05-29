import React from 'react';
import { View, FlatList, StyleSheet, RefreshControl, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, NewsItem } from '../types';
import NewsCard from '../components/NewsCard';
import { useNews } from '../contexts/NewsContext';

const { height: screenHeight } = Dimensions.get('window');

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const { t } = useTranslation();
  const { newsData, loading, refreshNews } = useNews();

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
        <FlatList
          data={newsData}
          pagingEnabled={true}
          snapToAlignment="start"
          snapToInterval={screenHeight}
          decelerationRate="fast"
          renderItem={({ item }) => (
            <View style={{ height: screenHeight }}>
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
            </View>
          )}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={refreshNews}
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
});

export default HomeScreen;
