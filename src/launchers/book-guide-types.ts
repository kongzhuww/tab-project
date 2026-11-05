export interface GuidePage {
  tag: string;
  title: string;
  badge?: string;
  steps: { icon: string; title: string; desc: string; tip?: string }[];
}
export interface GuideSpread { chapterTitle: string; left: GuidePage; right: GuidePage }
