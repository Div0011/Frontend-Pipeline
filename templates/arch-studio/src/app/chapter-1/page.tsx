import ChapterInnerPage from '@/components/marketing/ChapterInnerPage';

const CHAPTER_1_IMAGES = [
  {
    src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
    alt: 'Minimal white interior with natural light',
    caption: 'Light & Void — Primary Residence',
  },
  {
    src: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80',
    alt: 'Architectural detail of void space',
    caption: 'Void Study — Section Detail',
  },
  {
    src: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80',
    alt: 'Material truth in concrete and glass',
    caption: 'Material Palette — Finish Board',
  },
];

export default function Chapter1Page() {
  return (
    <ChapterInnerPage
      chapterNumber={1}
      title="Light & Void"
      subtitle="Chapter 01 — Spatial Poetry"
      description="Every void is as intentional as every volume. We sculpt emptiness to give presence to the essential. In this chapter, we explore how controlled absence defines architectural experience."
      images={CHAPTER_1_IMAGES}
    />
  );
}
