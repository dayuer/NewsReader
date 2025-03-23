import { RouteProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
  Home: undefined;
  NewsDetail: {
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
    }
  };
  NewsSource: {
    source: string;
    currentNewsId: string;
  };
  Settings: undefined;
  ForgotPassword: undefined;
  Register: undefined;
  Login: undefined;
  Main: undefined;
};

export type BottomTabParamList = {
  HomeTab: undefined;
  ProfileTab: undefined;
};

export type NewsDetailScreenRouteProp = RouteProp<RootStackParamList, 'NewsDetail'>;
export type ProfileScreenNavigationProp = BottomTabNavigationProp<BottomTabParamList, 'ProfileTab'> & {
  navigate: (screen: 'Settings' | 'Notifications') => void;
};

export type NewsDetailScreenProps = {
  route: NewsDetailScreenRouteProp;
};

export type NewsItem = {
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

export type ProfileScreenProps = {
  navigation: ProfileScreenNavigationProp;
};

export type TabBarIconProps = {
  focused: boolean;
  color: string;
  size: number;
};
