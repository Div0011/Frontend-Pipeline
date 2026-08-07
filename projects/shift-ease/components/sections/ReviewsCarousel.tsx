export default function ReviewsCarousel() {
  const reviews = [
    { name: 'Amit Sharma', city: 'Delhi', rating: 5, text: 'ShiftEase made finding a reliable mover so easy. The process was seamless and the vendor was professional throughout.' },
    { name: 'Priya Patel', city: 'Mumbai', rating: 5, text: 'I was able to compare three vendors and choose the best one. The transparent pricing was a game changer for our family move.' },
    { name: 'Rahul Kumar', city: 'Bangalore', rating: 4, text: 'Great directory with verified businesses. The quote system saved me hours of calling different companies.' },
  ];

  return (
    <section className="section-padding bg-lightGray">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="heading-lg font-display text-navy mb-4">Verified Reviews</h2>
          <p className="text-body text-slate max-w-2xl mx-auto">
            Hear from families who have used our platform for their relocations.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className={`text-lg ${i < review.rating ? 'text-yellow-400' : 'text-gray-200'}`}>★</span>
                ))}
              </div>
              <p className="text-body text-slate mb-4">"{review.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-teal/10 rounded-full flex items-center justify-center font-semibold text-teal">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-navy text-sm">{review.name}</div>
                  <div className="text-small text-slate">{review.city}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}