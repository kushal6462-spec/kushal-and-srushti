const asset = (path: string) =>
  `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}${path}`;

export const WEDDING_CONFIG = {
  dateConfirmed: true,
  /** First celebration. Countdown runs to this morning. */
  date: new Date('2026-11-22T00:00:00+05:30'),
  weddingDate: new Date('2026-11-25T00:00:00+05:30'),
  song: {
    title: 'Love',
    youtubeId: 'kUUOlB_L2sA',
  },
  rsvpUrl: process.env.NEXT_PUBLIC_RSVP_URL || '',
  art: {
    cover: asset('/assets/theme/cover-sky.jpg'),
    paper: asset('/assets/theme/paper.jpg'),
    ganpati: asset('/assets/theme/ganpati.png'),
    haldi: asset('/assets/theme/Hali-updated1.png'),
    sangeet: asset('/assets/theme/sangeet.jpg'),
    vidhi: asset('/assets/theme/vidhi.jpg'),
    mangal: asset('/assets/theme/mangal-ashtak.jpg'),
  },
  cover: asset('/assets/images/gallery/01.jpeg'),
  bride: {
    name: 'Srushti',
    fullName: 'Srushti',
    photo: asset('/assets/images/gallery/01.jpeg'),
    objectPosition: '72% 38%',
  },
  groom: {
    name: 'Kushal',
    fullName: 'Kushal',
    photo: asset('/assets/images/gallery/01.jpeg'),
    objectPosition: '22% 34%',
  },
  venue: {
    haldi: {
      date: '22 November 2026',
      name: 'Monte Verita North Annexe',
      address: 'Gulmohar Rd, Borivali East, Mumbai, Maharashtra 400066',
      mapQuery: 'https://maps.app.goo.gl/dRAD1DP8uZNQ2Trn6',
    },
    vidhi: {
      date: '25 November 2026',
      name: 'Pioneer Hall',
      address:
        '9, St John Baptist Rd, Mount Mary, Bandra West, Mumbai, Maharashtra 400050',
      mapQuery: 'https://maps.app.goo.gl/QWKJRzsMzqDCXadK7',
    },
  },
  gallery: [
    {
      src: asset('/assets/images/gallery/couple-01.jpg'),
      caption: 'A step taken together',
    },
    {
      src: asset('/assets/images/gallery/couple-02.jpg'),
      caption: 'Under a rain of flowers',
    },
    {
      src: asset('/assets/images/gallery/couple-03.jpg'),
      caption: 'A look meant only for us',
    },
    {
      src: asset('/assets/images/gallery/couple-04.jpg'),
      caption: 'Seated, still smiling',
    },
    {
      src: asset('/assets/images/gallery/couple-05.jpg'),
      caption: 'A greeting, and a smile',
    },
    {
      src: asset('/assets/images/gallery/couple-06.jpg'),
      caption: 'A promise on one knee',
    },
  ],
};
