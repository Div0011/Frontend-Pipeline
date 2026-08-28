export default function ContactInfo() {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="heading-md font-display text-navy mb-4">Contact Information</h3>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <span className="text-teal mt-1">📍</span>
            <div>
              <p className="font-semibold text-navy">Office Address</p>
              <p className="text-body text-slate">123, Connaught Place, New Delhi, India</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-teal mt-1">📞</span>
            <div>
              <p className="font-semibold text-navy">Phone</p>
              <p className="text-body text-slate">+91 98765 43210</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-teal mt-1">✉️</span>
            <div>
              <p className="font-semibold text-navy">Email</p>
              <p className="text-body text-slate">hello@shiftEase.in</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-teal mt-1">🕐</span>
            <div>
              <p className="font-semibold text-navy">Working Hours</p>
              <p className="text-body text-slate">Mon – Sat: 9:00 AM – 7:00 PM</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="heading-md font-display text-navy mb-4">Location</h3>
        <div className="bg-lightGray rounded-xl h-64 flex items-center justify-center">
          <p className="text-slate">Map placeholder — integrate Google Maps or Mapbox</p>
        </div>
      </div>
    </div>
  );
}