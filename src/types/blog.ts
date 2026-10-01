export type BlogCategory =
  | 'All'
  | 'Road Safety'
  | 'First-Aid Tips'
  | 'App Updates'
  | 'Life-Saving Stories';

export interface BlogAuthor {
  name: string;
  role: string;
  avatarUrl: string;
  credentials?: string;
}

export interface CalloutBox {
  type: 'urgent' | 'warning' | 'tip' | 'protocol';
  title: string;
  content: string;
  badgeText?: string;
}

export interface ArticleSection {
  heading: string;
  subheading?: string;
  paragraphs: string[];
  bulletPoints?: string[];
  checklistItems?: string[];
  callout?: CalloutBox;
  quote?: {
    text: string;
    author: string;
  };
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  category: 'Road Safety' | 'First-Aid Tips' | 'App Updates' | 'Life-Saving Stories';
  readTime: string;
  publishedDate: string;
  lastUpdated?: string;
  author: BlogAuthor;
  reviewedBy?: {
    name: string;
    designation: string;
    organization: string;
  };
  coverImage: string;
  tags: string[];
  featured?: boolean;
  sections: ArticleSection[];
  keyTakeaways: string[];
  urgencyLevel?: 'critical' | 'essential' | 'informative';
}
