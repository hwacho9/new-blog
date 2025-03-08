"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

// 언어 타입 정의
type Language = "en" | "ko" | "jp";

// 각 언어별 메뉴 텍스트
const translations = {
  en: {
    home: "Home",
    categories: "Categories",
    tags: "Tags",
    about: "About Me",
    langSelect: "Language",
  },
  ko: {
    home: "홈",
    categories: "카테고리",
    tags: "태그",
    about: "소개",
    langSelect: "언어",
  },
  jp: {
    home: "ホーム",
    categories: "カテゴリ",
    tags: "タグ",
    about: "紹介",
    langSelect: "言語",
  },
};

const Header = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState<Language>("en");
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

  const isActive = (path: string) => {
    return pathname === path
      ? "text-primary font-semibold"
      : "text-gray-600 hover:text-primary";
  };

  const t = translations[language];

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
    setIsLangMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-primary">
            My Blog
          </Link>

          {/* 모바일 햄버거 메뉴 */}
          <button
            className="md:hidden text-gray-500"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              )}
            </svg>
          </button>

          {/* 데스크탑 메뉴 */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className={`${isActive("/")} transition-colors`}>
              {t.home}
            </Link>
            <Link
              href="/categories"
              className={`${isActive("/categories")} transition-colors`}
            >
              {t.categories}
            </Link>
            <Link
              href="/tags"
              className={`${isActive("/tags")} transition-colors`}
            >
              {t.tags}
            </Link>
            <Link
              href="/about"
              className={`${isActive("/about")} transition-colors`}
            >
              {t.about}
            </Link>

            {/* 언어 선택 드롭다운 */}
            <div className="relative">
              <button
                className="flex items-center space-x-1 text-gray-600 hover:text-primary transition-colors"
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
              >
                <span>{t.langSelect}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {isLangMenuOpen && (
                <div className="absolute right-0 mt-2 w-36 bg-white rounded-lg shadow-lg py-1 z-20">
                  <button
                    className={`w-full text-left px-4 py-2 text-sm ${
                      language === "en"
                        ? "bg-gray-100 text-primary"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                    onClick={() => changeLanguage("en")}
                  >
                    English
                  </button>
                  <button
                    className={`w-full text-left px-4 py-2 text-sm ${
                      language === "ko"
                        ? "bg-gray-100 text-primary"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                    onClick={() => changeLanguage("ko")}
                  >
                    한국어
                  </button>
                  <button
                    className={`w-full text-left px-4 py-2 text-sm ${
                      language === "jp"
                        ? "bg-gray-100 text-primary"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                    onClick={() => changeLanguage("jp")}
                  >
                    日本語
                  </button>
                </div>
              )}
            </div>
          </nav>
        </div>

        {/* 모바일 메뉴 */}
        {isMenuOpen && (
          <nav className="mt-4 pb-2 md:hidden">
            <div className="flex flex-col space-y-3">
              <Link
                href="/"
                className={`${isActive("/")} transition-colors`}
                onClick={() => setIsMenuOpen(false)}
              >
                {t.home}
              </Link>
              <Link
                href="/categories"
                className={`${isActive("/categories")} transition-colors`}
                onClick={() => setIsMenuOpen(false)}
              >
                {t.categories}
              </Link>
              <Link
                href="/tags"
                className={`${isActive("/tags")} transition-colors`}
                onClick={() => setIsMenuOpen(false)}
              >
                {t.tags}
              </Link>
              <Link
                href="/about"
                className={`${isActive("/about")} transition-colors`}
                onClick={() => setIsMenuOpen(false)}
              >
                {t.about}
              </Link>

              {/* 모바일 언어 선택 */}
              <div className="border-t border-gray-200 pt-3 mt-3">
                <p className="text-sm text-gray-500 mb-2">{t.langSelect}:</p>
                <div className="flex space-x-4">
                  <button
                    className={`px-2 py-1 text-sm rounded ${
                      language === "en"
                        ? "bg-primary text-white"
                        : "bg-gray-100 text-gray-700"
                    }`}
                    onClick={() => changeLanguage("en")}
                  >
                    EN
                  </button>
                  <button
                    className={`px-2 py-1 text-sm rounded ${
                      language === "ko"
                        ? "bg-primary text-white"
                        : "bg-gray-100 text-gray-700"
                    }`}
                    onClick={() => changeLanguage("ko")}
                  >
                    KO
                  </button>
                  <button
                    className={`px-2 py-1 text-sm rounded ${
                      language === "jp"
                        ? "bg-primary text-white"
                        : "bg-gray-100 text-gray-700"
                    }`}
                    onClick={() => changeLanguage("jp")}
                  >
                    JP
                  </button>
                </div>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
