'use client';

import { motion } from 'motion/react';
import { generateMapLink } from '@/lib/wedding-utils';
import type { WeddingConfigType } from '@/types';
import { useTranslation } from 'react-i18next';
import { useTranslate } from '@/locales';
import { WEDDING_CONFIG } from '@/constants';

interface WeddingDetailsCardProps {
  date: Date;
  weddingDate: Date;
  venue: WeddingConfigType['venue'];
  dateConfirmed: boolean;
}

export const WeddingDetailsCard = ({
  date,
  weddingDate,
  venue,
  dateConfirmed,
}: WeddingDetailsCardProps) => {
  const { currentLang } = useTranslate();
  const { t } = useTranslation('home');

  const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&${new URLSearchParams(
    {
      text: `${WEDDING_CONFIG.groom.name} & ${WEDDING_CONFIG.bride.name}`,
      dates: '20261218/20261220',
      details: t('details.join-us'),
      location: `${venue.vidhi.name}, ${venue.vidhi.address}`,
    }
  ).toString()}`;

  return (
    <div className="py-2 bg-gradient-to-br from-white to-rose-50/50">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-2"
        >
          <h2 className="text-2xl sm:text-4xl font-serif text-gray-800 mb-1">
            {t('details.title')}
          </h2>
          <div className="w-16 h-px bg-rose-400 mx-auto mb-1"></div>
          <p className="text-xs sm:text-base text-gray-600 max-w-2xl mx-auto leading-snug">
            {t('details.join-us-text')}
          </p>
        </motion.div>

        {/* Date Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative bg-gradient-to-br from-white via-rose-50/30 to-pink-50/50 rounded-3xl shadow-2xl p-3 sm:p-4 mb-2 border border-rose-100/50 overflow-hidden group"
        >
          {/* Background Decorations */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-rose-200/20 to-pink-200/20 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-500"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-br from-purple-200/20 to-rose-200/20 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-500"></div>

          <div className="relative z-10">
            {/* Save the Date Header */}
            <div className="text-center mb-1">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-500/10 to-pink-500/10 backdrop-blur-sm rounded-full px-3 py-1 border border-rose-200/50"
              >
                <span className="text-2xl">💕</span>
                <span className="text-sm sm:text-base font-semibold text-rose-600 tracking-wide uppercase">
                  {t('details.date')}
                </span>
              </motion.div>
            </div>

            {!dateConfirmed && (
              <div className="text-center mb-4">
                <img
                  src={WEDDING_CONFIG.cover}
                  alt="Kushal and Srushti"
                  className="w-full max-w-md mx-auto h-80 object-cover object-top rounded-3xl shadow-xl mb-8"
                />
                <h3 className="text-2xl sm:text-3xl font-serif text-gray-800 mb-3">
                  {t('details.date-pending')}
                </h3>
                <p className="text-gray-600 max-w-xl mx-auto">
                  {t('details.date-pending-help')}
                </p>
              </div>
            )}

            {dateConfirmed && (
            <>
            <div className="flex flex-row items-stretch justify-center gap-2 sm:gap-4 mb-2">
              {/* Day */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-center group-hover:scale-105 transition-transform duration-300 flex-1 sm:flex-none"
              >
                <div className="bg-gradient-to-br from-rose-500 to-pink-600 text-white rounded-2xl p-2 shadow-lg mb-1 h-12 sm:h-20 flex flex-col items-center justify-center min-w-14 sm:min-w-24">
                  <div className="text-3xl sm:text-4xl font-bold leading-none">
                    {date.getDate()}
                  </div>
                </div>
                <p className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider mt-0.5 leading-tight">
                  {t('details.haldi-sangeet')}
                </p>
              </motion.div>

              {/* Month */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="text-center group-hover:scale-105 transition-transform duration-300 flex-1 sm:flex-none"
              >
                <div className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white rounded-2xl p-2 shadow-lg mb-1 h-12 sm:h-20 flex flex-col items-center justify-center min-w-14 sm:min-w-24">
                  <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-none mb-1">
                    {date
                      .toLocaleDateString(currentLang.numberFormat.code, {
                        month: 'short',
                      })
                      .toUpperCase()}
                  </div>
                  <div className="text-sm sm:text-base md:text-lg font-medium opacity-90">
                    {date.getFullYear()}
                  </div>
                </div>
                <p className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider mt-0.5 leading-tight">
                  {t('details.month')} & {t('details.year')}
                </p>
              </motion.div>

              {/* Time */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="text-center group-hover:scale-105 transition-transform duration-300 flex-1 sm:flex-none"
              >
                <div className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-2xl p-2 shadow-lg mb-1 h-12 sm:h-20 flex flex-col items-center justify-center min-w-14 sm:min-w-24">
                  <div className="text-3xl sm:text-4xl font-bold leading-none">
                    {weddingDate.getDate()}
                  </div>
                </div>
                <p className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider mt-0.5 leading-tight">
                  {t('details.wedding-day')}
                </p>
              </motion.div>
            </div>

            {/* Weekday Display */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="text-center mb-2 px-2"
            >
              <div className="inline-block w-full max-w-sm sm:max-w-md md:max-w-lg bg-gradient-to-r from-white/90 via-rose-50/80 to-white/90 backdrop-blur-sm rounded-xl px-3 py-1.5 shadow-md border border-rose-100/50">
                <div>
                  <div className="flex items-center justify-center gap-2 mb-0.5">
                    <p className="text-sm sm:text-xl font-serif text-gray-800 font-bold text-center leading-tight">
                      {t('details.weekend')}
                    </p>
                  </div>
                  <p className="text-xs sm:text-base text-gray-600 font-medium">
                    {date.getDate()}–{weddingDate.getDate()}{' '}
                    {date.toLocaleDateString(currentLang.numberFormat.code, {
                      month: 'long',
                      year: 'numeric',
                    })}
                  </p>
                  <p className="text-[10px] sm:text-sm text-rose-600 font-semibold">
                    {t('details.mark-calendar')}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Call to Action */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="text-center"
            >
              <motion.a
                href={calendarUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 text-white px-4 py-2 rounded-xl font-semibold text-xs sm:text-base shadow-md transition-all duration-300 group/btn"
              >
                <span className="text-xl group-hover/btn:scale-110 transition-transform duration-200">
                  📅
                </span>
                <span>{t('details.add-to-calendar')}</span>
                <motion.span
                  className="text-sm opacity-75"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </motion.a>

              <p className="hidden">
                {t('details.message')}
              </p>
            </motion.div>
            </>
            )}
          </div>
        </motion.div>

        {/* Hotels are on the venue screen */}
        <div className="hidden">
          {/* Ceremony Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 group hover:shadow-2xl transition-all duration-300"
          >
            <div className="text-center mb-6">
              <div className="inline-block bg-gradient-to-r from-purple-100 to-indigo-100 rounded-full p-4 mb-4 group-hover:scale-110 transition-transform duration-300">
                <div className="text-4xl">🪔</div>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                {t('details.ceremony')}
              </h3>
              <div className="w-16 h-px bg-purple-400 mx-auto"></div>
            </div>

            <div className="space-y-4 text-center">
              <div>
                <h4 className="font-semibold text-gray-800 mb-1 text-sm sm:text-base">
                  {venue.haldi.name}
                </h4>
                <p className="text-gray-600 text-xs sm:text-sm">
                  {venue.haldi.address}
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-4">
                <p className="font-medium text-gray-800 text-sm sm:text-base">
                  {t('details.when')}
                </p>
                <p className="text-purple-600 font-semibold text-sm sm:text-base">
                  {venue.haldi.date}
                </p>
              </div>

              {venue.haldi.mapQuery ? (
                <motion.a
                  href={generateMapLink(venue.haldi.mapQuery)}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:shadow-lg transition-all duration-300"
                >
                  📍 {t('details.get-directions')}
                </motion.a>
              ) : null}
            </div>
          </motion.div>

          {/* Reception Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 group hover:shadow-2xl transition-all duration-300"
          >
            <div className="text-center mb-6">
              <div className="inline-block bg-gradient-to-r from-emerald-100 to-teal-100 rounded-full p-4 mb-4 group-hover:scale-110 transition-transform duration-300">
                <div className="text-4xl">🏨</div>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                  {t('invite.venue-vidhi-title')}
              </h3>
              <div className="w-16 h-px bg-emerald-400 mx-auto"></div>
            </div>

            <div className="space-y-4 text-center">
              <div>
                <h4 className="font-semibold text-gray-800 mb-1 text-sm sm:text-base">
                  {venue.vidhi.name}
                </h4>
                <p className="text-gray-600 text-xs sm:text-sm">
                  {venue.vidhi.address}
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-4">
                <p className="font-medium text-gray-800 text-sm sm:text-base">
                  {t('details.when')}
                </p>
                <p className="text-emerald-600 font-semibold text-sm sm:text-base">
                  {venue.vidhi.date}
                </p>
              </div>

              {venue.vidhi.mapQuery ? (
                <motion.a
                  href={generateMapLink(venue.vidhi.mapQuery)}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:shadow-lg transition-all duration-300"
                >
                  📍 {t('details.get-directions')}
                </motion.a>
              ) : null}
            </div>
          </motion.div>
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="hidden"
        >
          <div className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-2xl p-8 border border-rose-100">
            <h4 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 mb-4">
              {t('details.please-note')}
            </h4>
            <div className="grid md:grid-cols-3 gap-6 text-xs sm:text-sm text-gray-600">
              <div className="flex flex-col items-center">
                <div className="text-xl sm:text-2xl mb-2">👗</div>
                <p className="font-medium">{t('details.dress-code')}</p>
                <p>{t('details.formal-attire')}</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-xl sm:text-2xl mb-2">🚗</div>
                <p className="font-medium">{t('details.parking')}</p>
                <p>{t('details.valet-available')}</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-xl sm:text-2xl mb-2">📱</div>
                <p className="font-medium">{t('details.contact')}</p>
                <p>{t('details.contact-value')}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
