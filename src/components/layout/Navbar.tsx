'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useState } from 'react';
import {
  Home,
  Info,
  Newspaper,
  Image,
  FileText,
  LogIn,
  LogOut,
  User,
  Settings,
  Menu,
  X,
  Globe,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/components/providers/LanguageProvider';

export function Navbar() {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const navLinks = [
    { href: '/', labelKey: 'nav.home', icon: Home },
    { href: '/about', labelKey: 'nav.about', icon: Info },
    { href: '/news', labelKey: 'nav.news', icon: Newspaper },
    { href: '/gallery', labelKey: 'nav.gallery', icon: Image },
    { href: '/services', labelKey: 'nav.services', icon: FileText },
  ];

  const toggleLanguage = () => {
    setLanguage(language === 'ar' ? 'en' : 'ar');
  };

  return (
    <nav className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 rtl:space-x-reverse">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <span className="text-emerald-600 font-bold text-xl">أ</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold">
                {language === 'ar' ? 'عائلة الموسى' : 'Al-Moosa Family'}
              </h1>
              <p className="text-xs text-emerald-100">
                {language === 'ar' ? 'Al-Moosa Family' : 'عائلة الموسى'}
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 rtl:space-x-reverse">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center space-x-1 rtl:space-x-reverse px-3 py-2 rounded-md text-sm font-medium hover:bg-white/10 transition-colors"
              >
                <link.icon className="w-4 h-4" />
                <span>{t(link.labelKey)}</span>
              </Link>
            ))}
          </div>

          {/* Auth & Language Buttons */}
          <div className="hidden md:flex items-center space-x-2 rtl:space-x-reverse">
            {/* Language Switcher */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="text-white hover:bg-white/10"
            >
              <Globe className="w-4 h-4 mr-1 rtl:ml-1 rtl:mr-0" />
              {language === 'ar' ? 'EN' : 'عربي'}
            </Button>

            {session ? (
              <>
                {session.user.role === 'admin' && (
                  <Link href="/admin">
                    <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                      <Settings className="w-4 h-4 mr-1 rtl:ml-1 rtl:mr-0" />
                      {t('nav.admin')}
                    </Button>
                  </Link>
                )}
                <Link href="/profile">
                  <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                    <User className="w-4 h-4 mr-1 rtl:ml-1 rtl:mr-0" />
                    {session.user.name}
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => signOut()}
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  <LogOut className="w-4 h-4 mr-1 rtl:ml-1 rtl:mr-0" />
                  {t('nav.logout')}
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                    <LogIn className="w-4 h-4 mr-1 rtl:ml-1 rtl:mr-0" />
                    {t('nav.login')}
                  </Button>
                </Link>
                <Link href="/register">
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-white text-emerald-600 hover:bg-emerald-50 border-white"
                  >
                    {t('nav.register')}
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2 rtl:space-x-reverse">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="text-white hover:bg-white/10"
            >
              <Globe className="w-4 h-4" />
            </Button>
            <button
              className="p-2 rounded-md hover:bg-white/10"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/20">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center space-x-2 rtl:space-x-reverse px-3 py-2 rounded-md text-sm font-medium hover:bg-white/10"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <link.icon className="w-4 h-4" />
                  <span>{t(link.labelKey)}</span>
                </Link>
              ))}
              <hr className="border-white/20" />
              {session ? (
                <>
                  {session.user.role === 'admin' && (
                    <Link
                      href="/admin"
                      className="flex items-center space-x-2 rtl:space-x-reverse px-3 py-2 rounded-md text-sm font-medium hover:bg-white/10"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Settings className="w-4 h-4" />
                      <span>{t('nav.admin')}</span>
                    </Link>
                  )}
                  <Link
                    href="/profile"
                    className="flex items-center space-x-2 rtl:space-x-reverse px-3 py-2 rounded-md text-sm font-medium hover:bg-white/10"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="w-4 h-4" />
                    <span>{session.user.name}</span>
                  </Link>
                  <button
                    className="flex items-center space-x-2 rtl:space-x-reverse px-3 py-2 rounded-md text-sm font-medium hover:bg-white/10 w-full text-left rtl:text-right"
                    onClick={() => {
                      signOut();
                      setIsMenuOpen(false);
                    }}
                  >
                    <LogOut className="w-4 h-4" />
                    <span>{t('nav.logout')}</span>
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="flex items-center space-x-2 rtl:space-x-reverse px-3 py-2 rounded-md text-sm font-medium hover:bg-white/10"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <LogIn className="w-4 h-4" />
                    <span>{t('nav.login')}</span>
                  </Link>
                  <Link
                    href="/register"
                    className="flex items-center space-x-2 rtl:space-x-reverse px-3 py-2 rounded-md text-sm font-medium bg-white/10"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="w-4 h-4" />
                    <span>{t('nav.register')}</span>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
