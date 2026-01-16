
export enum Platform {
  INSTAGRAM = 'Instagram',
  TIKTOK = 'TikTok',
  YOUTUBE = 'YouTube',
  TWITTER = 'Twitter'
}

export enum CollabStatus {
  CONTACTED = 'Contacted',
  SAMPLE_SENT = 'Sample Sent',
  POST_LIVE = 'Post Live',
  PAID = 'Paid'
}

export interface Influencer {
  id: string;
  handle: string;
  platform: Platform;
  followers: number;
  address: string;
  tags: string[];
  avatarUrl: string;
}

export interface Campaign {
  id: string;
  name: string;
  budget: number;
}

export interface Logistics {
  product: string;
  trackingNo: string;
  deliveryStatus: 'Pending' | 'In Transit' | 'Delivered';
}

export interface Metrics {
  likes: number;
  comments: number;
  sales: number;
}

export interface Collaboration {
  id: string;
  influencerId: string;
  campaignId: string;
  status: CollabStatus;
  cost: number;
  logistics?: Logistics;
  metrics?: Metrics;
}

export interface CollaborationWithDetails extends Collaboration {
  influencer: Influencer;
  campaign: Campaign;
}
