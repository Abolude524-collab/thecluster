export interface RawYouTubeChannel {
  kind: 'youtube#channel';
  id: string;
  snippet: {
    title: string;
    customUrl: string;
    thumbnails: { default: { url: string } };
    publishedAt: string;
  };
  statistics: {
    viewCount: string;
    subscriberCount: string;
    videoCount: string;
    likeCount: string;
    commentCount: string;
  };
}

export interface RawInstagramBusinessAccount {
  kind: 'instagram#business_account';
  id: string;
  username: string;
  name: string;
  profile_picture_url: string;
  followers_count: number;
  media_count: number;
  impressions_count: number;
  likes_count: number;
  comments_count: number;
}

export interface RawXUserAccount {
  kind: 'x#user';
  id: string;
  name: string;
  username: string;
  profile_image_url: string;
  public_metrics: {
    followers_count: number;
    following_count: number;
    tweet_count: number;
    listed_count: number;
    total_likes_received: number;
    total_retweets_received: number;
    total_replies_received: number;
  };
}

export interface RawProviderContent {
  id: string;
  platform: 'youtube' | 'instagram' | 'x';
  title: string;
  thumbnailUrl: string;
  publishedAt: string;
  url: string;
  rawMetrics: {
    views?: number;
    likes?: number;
    comments?: number;
    retweets?: number;
    shares?: number | null;
  };
}

// Initial Mock Database State
export const INITIAL_MOCK_YOUTUBE: RawYouTubeChannel = {
  kind: 'youtube#channel',
  id: 'yt_tech_channel',
  snippet: {
    title: 'Tech & Architecture',
    customUrl: '@techarchitecture',
    thumbnails: {
      default: {
        url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
      },
    },
    publishedAt: '2022-01-15T00:00:00Z',
  },
  statistics: {
    viewCount: '832000',
    subscriberCount: '12400',
    videoCount: '142',
    likeCount: '42100',
    commentCount: '3800',
  },
};

export const INITIAL_MOCK_INSTAGRAM: RawInstagramBusinessAccount = {
  kind: 'instagram#business_account',
  id: 'ig_design_studio',
  username: 'designstudio',
  name: 'Design Studio HQ',
  profile_picture_url:
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80',
  followers_count: 84200,
  media_count: 384,
  impressions_count: 1420000,
  likes_count: 92400,
  comments_count: 6100,
};

export const INITIAL_MOCK_X: RawXUserAccount = {
  kind: 'x#user',
  id: 'x_dev_signal',
  name: 'Dev Signal',
  username: 'devsignal',
  profile_image_url:
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
  public_metrics: {
    followers_count: 18800,
    following_count: 420,
    tweet_count: 1250,
    listed_count: 84,
    total_likes_received: 31200,
    total_retweets_received: 4800,
    total_replies_received: 2900,
  },
};

export const MOCK_CONTENT_ITEMS: RawProviderContent[] = [
  {
    id: 'content_001',
    platform: 'youtube',
    title: 'Building Scalable Full-Stack Architecture in 2026',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=300&q=80',
    publishedAt: '2026-09-12T14:30:00Z',
    url: 'https://youtube.com/watch?v=mock1',
    rawMetrics: { views: 42800, likes: 3200, comments: 418, shares: null },
  },
  {
    id: 'content_002',
    platform: 'instagram',
    title: 'Dark Mode UI Design Tokens & Color Harmony Guidelines',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=300&q=80',
    publishedAt: '2026-09-14T09:15:00Z',
    url: 'https://instagram.com/p/mock2',
    rawMetrics: { views: 18400, likes: 2900, comments: 184, shares: null },
  },
  {
    id: 'content_003',
    platform: 'x',
    title: 'Why provider adapters decoupling saves your React components from API breaking changes 🧵👇',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=300&q=80',
    publishedAt: '2026-09-16T18:00:00Z',
    url: 'https://x.com/devsignal/status/mock3',
    rawMetrics: { views: 24500, likes: 1850, comments: 310, retweets: 420 },
  },
  {
    id: 'content_004',
    platform: 'youtube',
    title: 'Mastering Asynchronous State & Error Boundaries',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=300&q=80',
    publishedAt: '2026-09-08T11:00:00Z',
    url: 'https://youtube.com/watch?v=mock4',
    rawMetrics: { views: 65200, likes: 4900, comments: 612, shares: null },
  },
  {
    id: 'content_005',
    platform: 'instagram',
    title: 'Behind the Scenes: High-Performance Data Visualization Controls',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=300&q=80',
    publishedAt: '2026-09-02T16:45:00Z',
    url: 'https://instagram.com/p/mock5',
    rawMetrics: { views: 31000, likes: 4100, comments: 240, shares: null },
  },
  {
    id: 'content_006',
    platform: 'x',
    title: 'OAuth 2.0 PKCE flow simulated cleanly in frontend portfolio applications without leak risks.',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=300&q=80',
    publishedAt: '2026-08-28T20:10:00Z',
    url: 'https://x.com/devsignal/status/mock6',
    rawMetrics: { views: 19200, likes: 1420, comments: 195, retweets: 310 },
  },
];
