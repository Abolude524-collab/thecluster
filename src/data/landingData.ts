export interface LandingPlatform {
  id: 'youtube' | 'instagram' | 'x';
  name: string;
  badge: string;
  description: string;
  signals: string[];
  note?: string;
}

export interface LandingFeature {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  iconName: string;
}

export interface HowItWorksStep {
  step: string;
  title: string;
  subtitle: string;
  description: string;
  visualLabel: string;
}

export const HERO_COPY = {
  eyebrow: 'SOCIAL ANALYTICS, UNIFIED.',
  headline: 'Your social data, finally in one cluster.',
  subheadline:
    'Connect your social platforms, track the numbers that matter, and understand how your audience is growing — all from one analytics workspace.',
  primaryCTA: 'Get started →',
  secondaryCTA: 'See how it works',
};

export const PROBLEM_COPY = {
  heading: '3 platforms. 3 dashboards. Too many numbers.',
  subheading:
    'Your audience lives across different platforms. Your analytics shouldn\'t have to.',
};

export const UNIFIED_COPY = {
  heading: 'Stop switching tabs. Start seeing the cluster.',
  subheading:
    'The Cluster brings your supported social signals together so you can understand growth, engagement, and content performance from one place.',
};

export const LANDING_PLATFORMS: LandingPlatform[] = [
  {
    id: 'youtube',
    name: 'YouTube',
    badge: 'OAuth 2.0 PKCE',
    description:
      'Connect your channel and bring supported channel, content, and audience analytics into The Cluster.',
    signals: ['Subscribers', 'Video Views', 'Likes', 'Comments', 'Video Performance'],
  },
  {
    id: 'instagram',
    name: 'Instagram',
    badge: 'Graph API',
    description:
      'Connect supported Instagram accounts and access available account and content insights.',
    signals: ['Followers', 'Impressions', 'Likes', 'Comments', 'Content Insights'],
    note: 'Availability depends on account type, permissions, and Meta Graph APIs.',
  },
  {
    id: 'x',
    name: 'X (Twitter)',
    badge: 'API v2',
    description:
      'Connect your X account and work with the metrics available through your authorized API access.',
    signals: ['Followers', 'Impressions', 'Likes', 'Replies', 'Retweets'],
    note: 'Available data depends on API access, permissions, and plan access.',
  },
];

export const UNIFIED_CARDS = [
  {
    title: 'SEE THE BIG PICTURE',
    description: 'Get a unified view of your most important social metrics in real time.',
  },
  {
    title: 'TRACK MOMENTUM',
    description: 'Understand how your audience and engagement are changing over time.',
  },
  {
    title: 'FIND WHAT WORKS',
    description: 'Compare content performance across connected platforms effortlessly.',
  },
  {
    title: 'CONNECT YOUR ACCOUNTS',
    description: 'Manage your social connections and authorization status from one workspace.',
  },
];

export const LANDING_FEATURES: LandingFeature[] = [
  {
    id: 'feat_1',
    eyebrow: 'FEATURE 01',
    title: 'Unified Overview',
    description: 'One dashboard for your connected social accounts with normalized KPI metrics.',
    iconName: 'LayoutDashboard',
  },
  {
    id: 'feat_2',
    eyebrow: 'FEATURE 02',
    title: 'Cross-Platform Growth',
    description: 'Track how your audience changes over time across supported platforms in line charts.',
    iconName: 'TrendingUp',
  },
  {
    id: 'feat_3',
    eyebrow: 'FEATURE 03',
    title: 'Content Performance',
    description: 'Understand which posts, reels, and videos generate the strongest response.',
    iconName: 'FileText',
  },
  {
    id: 'feat_4',
    eyebrow: 'FEATURE 04',
    title: 'Account Connections',
    description: 'See exactly which accounts are connected and whether authorization is healthy.',
    iconName: 'Radio',
  },
  {
    id: 'feat_5',
    eyebrow: 'FEATURE 05',
    title: 'Platform-Aware Metrics',
    description: 'The Cluster knows different platforms expose different data and respects capability limits.',
    iconName: 'ShieldCheck',
  },
];

export const HOW_IT_WORKS_STEPS: HowItWorksStep[] = [
  {
    step: '01',
    title: 'CONNECT',
    subtitle: 'Authorize your accounts',
    description: 'Connect your supported social platforms using secure authorized OAuth code flows.',
    visualLabel: 'YouTube + Instagram + X → CONNECT',
  },
  {
    step: '02',
    title: 'COLLECT',
    subtitle: 'Retrieve & normalize signals',
    description: 'The Cluster retrieves available signals and normalizes provider payload contracts.',
    visualLabel: 'Platform APIs → Adapters → Normalized Data',
  },
  {
    step: '03',
    title: 'UNDERSTAND',
    subtitle: 'Act on unified analytics',
    description: 'See growth, engagement, and content performance from one control room workspace.',
    visualLabel: 'Raw Signals → The Cluster → Clear Analytics',
  },
];
