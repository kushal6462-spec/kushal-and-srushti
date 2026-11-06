'use client';

import type { WeddingConfigType } from '@/types';
import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';
import { generateMapLink } from '@/lib/wedding-utils';

interface VenueInformationProps {
  venue: WeddingConfigType['venue'];
}

export const VenueInformation = ({ venue }: VenueInformationProps) => {
  const { t } = useTranslation('home');

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <div ref={ref} className="py-2 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-2"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-gray-800 mb-4">
            {t('venue.location-title')}
          </h2>
          <div className="w-24 h-px bg-rose-400 mx-auto"></div>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 mt-6 max-w-2xl mx-auto">
            {t('venue.location-subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-3">
          {/* Ceremony Venue */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-3 shadow-md border border-purple-100"
          >
            <div className="text-center mb-2">
              <h3 className="text-sm sm:text-xl font-serif text-gray-800 mb-1">
                {t('invite.venue-haldi-title')}
              </h3>
              <div className="w-16 h-px bg-purple-400 mx-auto"></div>
            </div>

            <div className="space-y-6">
              <div className="text-center">
                <h4 className="text-xs sm:text-lg font-semibold text-gray-800 mb-1 leading-tight">
                  {venue.haldi.name}
                </h4>
                <p className="text-[10px] sm:text-sm text-gray-600 mb-1 leading-snug line-clamp-3">
                  {venue.haldi.address}
                </p>
                <div className="inline-block bg-white/60 rounded-lg px-4 py-2 shadow-sm">
                  <p className="text-purple-700 font-medium text-sm sm:text-base">
                    📅 {venue.haldi.date}
                  </p>
                </div>
              </div>

              <div className="hidden">
                <h5 className="font-semibold text-gray-800 mb-3 text-sm sm:text-base">
                  {t('venue.ceremony-details')}
                </h5>
                <div className="space-y-2 text-xs sm:text-sm text-gray-600">
                  <p>• {t('venue.arrive-early')}</p>
                  <p>• {t('venue.unplugged')}</p>
                  <p>• {t('venue.parking')}</p>
                  <p>• {t('venue.wheelchair')}</p>
                </div>
              </div>

              {venue.haldi.mapQuery ? (
                <button
                  onClick={() =>
                    window.open(
                      generateMapLink(venue.haldi.mapQuery),
                      '_blank'
                    )
                  }
                  className="w-full bg-gradient-to-r from-purple-400 to-indigo-500 text-white py-3 px-6 rounded-xl font-medium hover:from-purple-500 hover:to-indigo-600 transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base cursor-pointer"
                >
                  {t('venue.view-map')}
                </button>
              ) : null}
            </div>
          </motion.div>

          {/* Reception Venue */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-3 shadow-md border border-amber-100"
          >
            <div className="text-center mb-2">
              <h3 className="text-sm sm:text-xl font-serif text-gray-800 mb-1">
                {t('invite.venue-vidhi-title')}
              </h3>
              <div className="w-16 h-px bg-amber-400 mx-auto"></div>
            </div>

            <div className="space-y-6">
              <div className="text-center">
                <h4 className="text-xs sm:text-lg font-semibold text-gray-800 mb-1 leading-tight">
                  {venue.vidhi.name}
                </h4>
                <p className="text-[10px] sm:text-sm text-gray-600 mb-1 leading-snug line-clamp-3">
                  {venue.vidhi.address}
                </p>
                <div className="inline-block bg-white/60 rounded-lg px-4 py-2 shadow-sm">
                  <p className="text-amber-700 font-medium text-sm sm:text-base">
                    📅 {venue.vidhi.date}
                  </p>
                </div>
              </div>

              <div className="hidden">
                <h5 className="font-semibold text-gray-800 mb-3 text-sm sm:text-base">
                  {t('venue.reception-details')}
                </h5>
                <div className="space-y-2 text-xs sm:text-sm text-gray-600">
                  <p>• {t('venue.welcome-drink')}</p>
                  <p>• {t('venue.open-bar')}</p>
                  <p>• {t('venue.dancing')}</p>
                  <p>• {t('venue.valet')}</p>
                </div>
              </div>

              {venue.vidhi.mapQuery ? (
                <button
                  onClick={() =>
                    window.open(
                      generateMapLink(venue.vidhi.mapQuery),
                      '_blank'
                    )
                  }
                  className="w-full bg-gradient-to-r from-amber-400 to-orange-500 text-white py-3 px-6 rounded-xl font-medium hover:from-amber-500 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base cursor-pointer"
                >
                  {t('venue.view-map')}
                </button>
              ) : null}
            </div>
          </motion.div>
        </div>

        {/* Transportation Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="hidden"
        >
          <div className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-2xl p-8 max-w-3xl mx-auto border border-rose-100">
            <h4 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 mb-4 flex items-center justify-center">
              <span className="mr-2">🚐</span>
              {t('venue.transportation')}
            </h4>
            <p className="text-gray-600 mb-4 text-sm sm:text-base">
              {t('venue.shuttle-service')}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-gray-600">
              <div className="bg-white/50 rounded-lg p-4">
                <p className="font-medium">{t('venue.shuttle-schedule')}</p>
                <p>{t('venue.departure')}</p>
                <p>{t('venue.return-trips')}</p>
              </div>
              <div className="bg-white/50 rounded-lg p-4">
                <p className="font-medium">{t('venue.alternative')}</p>
                <p>{t('venue.taxi-uber')}</p>
                <p>{t('venue.public-parking')}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
