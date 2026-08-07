import ChapterInnerPage from '@/components/marketing/ChapterInnerPage';

const CHAPTER_3_IMAGES = [
  {
    src: 'https://images.unsplash.com/photo-1600566753086-00f18f6b0050?w=1200&q=80',
    alt: 'Basement lighting detail',
    caption: 'Basement — Light Installation',
  },
  {
    src: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80',
    alt: 'Subterranean space with ambient light',
    caption: 'Subterranean — Ambient Glow',
  },
  {
    src: 'https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?w=1200&q=80',
    alt: 'Final light bulb moment',
    caption: 'Completion — The Illuminate State',
  },
];

export default function Chapter3Page() {
  return (
    <ChapterInnerPage
      chapterNumber={3}
      title="Into the Basement"
      subtitle="Chapter 03 — Final Illumination"
      description="The journey descends into the basement, where light becomes the primary material. Here, in the controlled darkness, a single bulb defines the space — proving that minimal means are the most powerful."
      images={CHAPTER_3_IMAGES}
    />
  );
}
