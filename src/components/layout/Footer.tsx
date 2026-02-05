import Link from 'next/link';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 rtl:space-x-reverse mb-4">
              <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-2xl">أ</span>
              </div>
              <div>
                <h3 className="text-white text-lg font-bold">Al-Moosa Family</h3>
                <p className="text-emerald-400 text-sm">عائلة الموسى</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-4">
              The Al-Moosa family aims to be an exemplary model of cohesion and solidarity,
              preserving family ties and supporting members in all aspects of life.
            </p>
            <p className="text-sm leading-relaxed text-right" dir="rtl">
              تسعى عائلة الموسى لتكون نموذجاً يُحتذى به في التماسك والتضامن،
              محافظةً على صلة الرحم وداعمةً لأفرادها في جميع مناحي الحياة.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-emerald-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-emerald-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/news" className="hover:text-emerald-400 transition-colors">
                  News
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-emerald-400 transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-emerald-400 transition-colors">
                  Services
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2 rtl:space-x-reverse">
                <MapPin className="w-4 h-4 text-emerald-400" />
                <span className="text-sm">Unaizah, Qassim, Saudi Arabia</span>
              </li>
              <li className="flex items-center space-x-2 rtl:space-x-reverse">
                <Phone className="w-4 h-4 text-emerald-400" />
                <span className="text-sm">+966 XX XXX XXXX</span>
              </li>
              <li className="flex items-center space-x-2 rtl:space-x-reverse">
                <Mail className="w-4 h-4 text-emerald-400" />
                <span className="text-sm">info@almoosa.ws</span>
              </li>
            </ul>
            <div className="flex space-x-4 rtl:space-x-reverse mt-4">
              <a href="#" className="hover:text-emerald-400 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-emerald-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-emerald-400 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Al-Moosa Family. All rights reserved.</p>
          <p className="mt-1 text-gray-500">جميع الحقوق محفوظة لعائلة الموسى</p>
        </div>
      </div>
    </footer>
  );
}
