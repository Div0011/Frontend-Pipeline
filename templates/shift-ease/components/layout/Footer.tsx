import Link from 'next/link';
import { Truck, ShieldCheck, Mail, Phone, MapPin, ExternalLink, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-navy text-white pt-16 pb-12 border-t border-slate-800">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-teal rounded-xl flex items-center justify-center shadow-lg shadow-teal/20">
                <Truck className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="font-display font-extrabold text-2xl text-white">ShiftEase</span>
                <span className="text-xs text-slate-400 block -mt-1 font-medium">by Sheetal</span>
              </div>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed max-w-sm">
              India&apos;s leading verified directory for packers and movers. Compare transparent relocation estimates, view audited GSTIN credentials, and book stress-free moving services.
            </p>
            <div className="flex items-center gap-3 text-xs text-slate-400 pt-2">
              <span className="flex items-center gap-1 bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700">
                <ShieldCheck className="w-4 h-4 text-teal" /> 100% Verified Vendors
              </span>
              <span className="flex items-center gap-1 bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700">
                ISO Certified Process
              </span>
            </div>
          </div>

          {/* Nav Col 1 */}
          <div>
            <h4 className="font-semibold mb-4 text-xs uppercase tracking-wider text-teal">Quick Links</h4>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li><Link href="/" className="hover:text-teal transition-colors">Home Page</Link></li>
              <li><Link href="/directory" className="hover:text-teal transition-colors">Packers Directory</Link></li>
              <li><Link href="/quote" className="hover:text-teal transition-colors">Instant Moving Quote</Link></li>
              <li><Link href="/blog" className="hover:text-teal transition-colors">Relocation Guides</Link></li>
              <li><Link href="/about" className="hover:text-teal transition-colors">About ShiftEase</Link></li>
            </ul>
          </div>

          {/* Nav Col 2 */}
          <div>
            <h4 className="font-semibold mb-4 text-xs uppercase tracking-wider text-teal">Cities & Partners</h4>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li><Link href="/cities/delhi" className="hover:text-teal transition-colors">Packers in Delhi NCR</Link></li>
              <li><Link href="/cities/mumbai" className="hover:text-teal transition-colors">Packers in Mumbai</Link></li>
              <li><Link href="/cities/bangalore" className="hover:text-teal transition-colors">Packers in Bangalore</Link></li>
              <li><Link href="/list-your-business" className="hover:text-teal transition-colors font-semibold text-teal">List Your Business</Link></li>
              <li><Link href="/admin" className="hover:text-teal transition-colors text-xs text-slate-400 flex items-center gap-1">Admin Portal <ExternalLink className="w-3 h-3" /></Link></li>
            </ul>
          </div>

          {/* Contact Col */}
          <div>
            <h4 className="font-semibold mb-4 text-xs uppercase tracking-wider text-teal">Support & Legal</h4>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-teal" /> support@shiftease.in
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-teal" /> +91 1800-SHIFT-EASE
              </li>
              <li className="pt-2"><Link href="/privacy-policy" className="hover:text-teal transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms-of-service" className="hover:text-teal transition-colors">Terms of Service</Link></li>
              <li><Link href="/contact" className="hover:text-teal transition-colors">Contact Support</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} ShiftEase by Sheetal. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Empowering seamless home relocations across India <Heart className="w-3.5 h-3.5 text-teal fill-teal inline" />
          </p>
        </div>
      </div>
    </footer>
  );
}