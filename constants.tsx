
import { Platform, CollabStatus, Influencer, Campaign, Collaboration } from './types';

export const INITIAL_INFLUENCERS: Influencer[] = [
  {
    id: 'inf-1',
    handle: '@tech_guru',
    platform: Platform.YOUTUBE,
    followers: 500000,
    address: '123 Tech Ave, SF',
    tags: ['Tech', 'Gadgets', 'Review'],
    avatarUrl: 'https://picsum.photos/seed/tech/200'
  },
  {
    id: 'inf-2',
    handle: '@fashion_fwd',
    platform: Platform.INSTAGRAM,
    followers: 120000,
    address: '456 Style Blvd, NY',
    tags: ['Fashion', 'Lifestyle'],
    avatarUrl: 'https://picsum.photos/seed/fashion/200'
  },
  {
    id: 'inf-3',
    handle: '@chef_mario',
    platform: Platform.TIKTOK,
    followers: 850000,
    address: '789 Gourmet St, CHI',
    tags: ['Cooking', 'Food', 'Tutorial'],
    avatarUrl: 'https://picsum.photos/seed/cook/200'
  },
  {
    id: 'inf-4',
    handle: '@fitness_warrior',
    platform: Platform.INSTAGRAM,
    followers: 250000,
    address: '321 Muscle Rd, LA',
    tags: ['Fitness', 'Health'],
    avatarUrl: 'https://picsum.photos/seed/fit/200'
  }
];

export const INITIAL_CAMPAIGNS: Campaign[] = [
  { id: 'cam-1', name: 'Summer Launch 2024', budget: 15000 },
  { id: 'cam-2', name: 'Winter Essentials', budget: 10000 }
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
