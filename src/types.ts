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
  type: 'large' | 'small' | 'text' | 'multi';
  title: string;
  summary: string;
  imageUrl?: string;
  imageUrls?: string[];
  timestamp: string;
  source: string;
};

export type ProfileScreenProps = {
  navigation: ProfileScreenNavigationProp;
};

export type TabBarIconProps = {
  focused: boolean;
  color: string;
  size: number;
};
