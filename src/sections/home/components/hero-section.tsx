'use client';

import type { WeddingConfigType } from '@/types';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';

interface HeroSectionProps {
  isLoaded: boolean;
  couple: WeddingConfigType;
  onScrollToSection: (sectionId: string) => void;
}

const Portrait = ({
  src,
  name,
  objectPosition,
}: {
  src: string;
  name: string;
  objectPosition: string;
}) => (
  <div className="text-center flex-shrink-0">
    <div
      role="img"
      aria-label={name}
      className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 rounded-full border-4 border-white/80 shadow-2xl mb-3 mx-auto"
      style={{
        backgroundImage: `url(${src})`,
        backgroundSize: '240%',
        backgroundPosition: objectPosition,
        backgroundRepeat: 'no-repeat',
      }}
    />
    <h3 className="font-serif text-white text-lg sm:text-xl md:text-2xl drop-shadow">
      {name}
    </h3>
  </div>
);

export const HeroSection = ({
  isLoaded,
  couple,
  onScrollToSection,
}: HeroSectionProps) => {
  const { t } = useTranslation('home');

  return (
    <div className="h-full relative overflow-hidden">
      <img
        src={couple.cover}
        alt="Kushal and Srushti"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-rose-950/35 to-black/75" />

      <div className="relative z-10 flex flex-col h-full px-6 pt-16 sm:pt-20">
        <div className="flex-1 flex items-center justify-center">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 50 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="mb-6 sm:mb-8"
            >
              <div className="text-sm sm:text-base md:text-lg text-rose-100 mb-4 font-medium tracking-wide">
                {t('hero.welcome')}
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-white mb-4 leading-tight drop-shadow-lg">
                {couple.groom.name}
                <span className="block text-rose-200 text-3xl sm:text-4xl md:text-5xl my-2">
                  &
                </span>
                {couple.bride.name}
              </h1>
              <div className="w-32 h-px bg-gradient-to-r from-transparent via-rose-200 to-transparent mx-auto" />
              <p className="text-rose-100 mt-4 text-sm sm:text-base md:text-lg tracking-wide">
                {t('hero.dates')}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 0.8 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="mb-8"
            >
              <div className="flex items-center justify-center gap-6 sm:gap-10">
                <Portrait
                  src={couple.bride.photo}
                  name={couple.bride.name}
                  objectPosition={couple.bride.objectPosition}
                />
                <div className="text-3xl sm:text-4xl text-rose-200">💕</div>
                <Portrait
                  src={couple.groom.photo}
                  name={couple.groom.name}
                  objectPosition={couple.groom.objectPosition}
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center"
            >
              <motion.button
                onClick={() => onScrollToSection('details')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/90 text-gray-800 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-sm sm:text-base shadow-lg cursor-pointer"
              >
                {t('hero.view-details')}
              </motion.button>
            </motion.div>
          </div>
        </div>

        <div className="flex justify-center pb-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoaded ? 1 : 0 }}
            transition={{ duration: 1, delay: 1.5 }}
          >
            <motion.button
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-white/90 text-center cursor-pointer"
              onClick={() => onScrollToSection('couple')}
            >
              <div className="text-xs mb-2">{t('hero.scroll-down')}</div>
              <div className="text-xl">⬇️</div>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
