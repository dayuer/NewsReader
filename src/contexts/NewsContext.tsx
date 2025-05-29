import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { NewsItem } from '../types';

type NewsContextType = {
  newsData: NewsItem[];
  loading: boolean;
  refreshNews: () => void;
};

const NewsContext = createContext<NewsContextType>({
  newsData: [],
  loading: false,
  refreshNews: () => {}
});

export const NewsProvider = ({ children }: { children: ReactNode }) => {
  const [newsData, setNewsData] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(false);

  const loadNewsData = () => {
    setLoading(true);
    try {
      const { data } = require('../data/newsData.json');
      setNewsData(data);
    } catch (error) {
      console.error('加载新闻数据失败:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNewsData();
  }, []);

  return (
    <NewsContext.Provider value={{ newsData, loading, refreshNews: loadNewsData }}>
      {children}
    </NewsContext.Provider>
  );
};

export const useNews = () => useContext(NewsContext);
