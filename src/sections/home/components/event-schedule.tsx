'use client';

import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';
import { WEDDING_CONFIG } from '@/constants';

export const EventSchedule = () => {
  const { t } = useTranslation('home');
  const photos = WEDDING_CONFIG.gallery;

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const scheduleItems = [
    {
      time: t('schedule.haldi-date'),
      event: t('schedule.haldi'),
      description: t('schedule.haldi-detail'),
      photo: photos[7].src,
    },
    {
      time: t('schedule.day-19'),
      event: t('schedule.wedding'),
      description: t('schedule.wedding-detail'),
      photo: photos[10].src,
    },
    {
      time: t('schedule.days-stay'),
      event: t('schedule.stay'),
      description: t('schedule.stay-detail'),
      photo: photos[1].src,
    },
  ];

  return (
    <div ref={ref} className="py-2 px-4 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-2"
        >
          <h3 className="text-base sm:text-2xl font-serif text-gray-800 mb-1">
            {t('schedule.title')}
          </h3>
          <div className="w-16 h-px bg-rose-400 mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {scheduleItems.map((item, index) => (
            <motion.div
              key={item.event}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden"
            >
              <img
                src={item.photo}
                alt={item.event}
                className="w-full h-14 sm:h-28 object-cover object-[center_22%]"
              />
              <div className="p-1.5 sm:p-3">
                <span className="inline-block bg-rose-100 text-rose-700 px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-medium mb-1.5">
                  {item.time}
                </span>
                <h4 className="text-sm sm:text-base font-semibold text-gray-800 leading-tight">
                  {item.event}
                </h4>
                <p className="text-gray-600 text-[11px] sm:text-xs mt-1 leading-snug">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
