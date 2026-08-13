"use client";

import { useState } from "react";
import { Languages } from "lucide-react";
import { useLocale } from "next-intl";

import { usePathname, useRouter } from "@/i18n/navigation";

import scss from "./languageSwitcher.module.scss";

type Locale = "en" | "ru" | "ky";

const languages = [
  {
    code: "en",
    label: "English",
    short: "EN",
    flag: "🇬🇧",
  },
  {
    code: "ru",
    label: "Русский",
    short: "RU",
    flag: "🇷🇺",
  },
  {
    code: "ky",
    label: "Кыргызча",
    short: "KG",
    flag: "🇰🇬",
  },
] as const;

const LanguageSwitcher = () => {
  const locale = useLocale() as Locale;

  const router = useRouter();
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);

  const currentLanguage = languages.find(
    (language) => language.code === locale,
  );

  const handleChangeLanguage = (newLocale: Locale) => {
    router.replace(pathname, {
      locale: newLocale,
    });

    setIsOpen(false);
  };

  return (
    <div className={scss.languageSwitcher}>
      <button
        type="button"
        className={scss.currentLanguage}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <Languages size={18} />

        <span>{currentLanguage?.flag}</span>

        <span className={scss.short}>{currentLanguage?.short}</span>

        <span className={`${scss.arrow} ${isOpen ? scss.arrowOpen : ""}`}>
          ▾
        </span>
      </button>

      {isOpen && (
        <div className={scss.dropdown}>
          {languages.map((language) => (
            <button
              key={language.code}
              type="button"
              className={`${scss.languageOption} ${
                locale === language.code ? scss.selected : ""
              }`}
              onClick={() => handleChangeLanguage(language.code)}
            >
              <span className={scss.flag}>{language.flag}</span>

              <span>{language.label}</span>

              {locale === language.code && (
                <span className={scss.check}>✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
