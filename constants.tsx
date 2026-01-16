
import { Platform, CollabStatus, Influencer, Campaign, Collaboration } from './types';

export const INITIAL_INFLUENCERS: Influencer[] = [
  {
    id: 'inf-1',
    handle: '@tech_guru',
    platform: Platform.YOUTUBE,
    followers: 500000,
    address: '台北市信義區',
    tags: ['科技', '3C', '開箱'],
    avatarUrl: 'https://picsum.photos/seed/tech/200'
  },
  {
    id: 'inf-2',
    handle: '@fashion_fwd',
    platform: Platform.INSTAGRAM,
    followers: 120000,
    address: '台北市大安區',
    tags: ['時尚', '生活風格'],
    avatarUrl: 'https://picsum.photos/seed/fashion/200'
  },
  {
    id: 'inf-3',
    handle: '@chef_mario',
    platform: Platform.TIKTOK,
    followers: 850000,
    address: '台中市西區',
    tags: ['料理', '美食', '教學'],
    avatarUrl: 'https://picsum.photos/seed/cook/200'
  },
  {
    id: 'inf-4',
    handle: '@fitness_warrior',
    platform: Platform.INSTAGRAM,
    followers: 250000,
    address: '高雄市前鎮區',
    tags: ['健身', '健康'],
    avatarUrl: 'https://picsum.photos/seed/fit/200'
  }
];

export const INITIAL_CAMPAIGNS: Campaign[] = [
  { id: 'cam-1', name: '2024 夏季新品發表', budget: 15000 },
  { id: 'cam-2', name: '冬季必備品推廣', budget: 10000 }
];

export const INITIAL_COLLABS: Collaboration[] = [
  {
    id: 'col-1',
    influencerId: 'inf-1',
    campaignId: 'cam-1',
    status: CollabStatus.CONTACTED,
    cost: 2000
  },
  {
    id: 'col-2',
    influencerId: 'inf-2',
    campaignId: 'cam-1',
    status: CollabStatus.POST_LIVE,
    cost: 1500,
    metrics: { likes: 12000, comments: 450, sales: 85 }
  }
];
