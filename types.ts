
export enum Platform {
  INSTAGRAM = 'Instagram',
  TIKTOK = 'TikTok',
  YOUTUBE = 'YouTube',
  TWITTER = 'Twitter'
}

export enum CollabStatus {
  CONTACTED = '已聯繫',
  SAMPLE_SENT = '已寄樣品',
  POST_LIVE = '貼文上線',
  PAID = '已付款'
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
  deliveryStatus: '待處理' | '運送中' | '已送達';
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
