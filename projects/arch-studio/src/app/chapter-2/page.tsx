import ChapterInnerPage from '@/components/marketing/ChapterInnerPage';

const CHAPTER_2_IMAGES = [
  {
    src: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80',
    alt: 'Modern staircase in white interior',
    caption: 'Vertical Circulation — Main Stair',
  },
  {
    src: 'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=1200&q=80',
    alt: 'Upper level living space',
    caption: 'Upper Level — Living Void',
  },
  {
    src: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200&q=80',
    alt: 'Rooftop terrace detail',
    caption: 'Rooftop — Threshold to Sky',
  },
];

export default function Chapter2Page() {
  return (
    <ChapterInnerPage
      chapterNumber={2}
      title="Vertical Living"
      subtitle="Chapter 02 — Material Truth"
      description="Concrete, glass, timber — materials age with grace, accumulating stories rather than losing value. Vertical living redefines the relationship between human scale and spatial堆叠."
      images={CHAPTER_2_IMAGES}
    />
  );
}
