'use client';

import { Fragment, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { WEDDING_CONFIG } from '@/constants';
import { generateMapLink } from '@/lib/wedding-utils';

const PETALS = [
  { left: '6%', delay: '0s', duration: '13s', size: 12 },
  { left: '18%', delay: '2s', duration: '15s', size: 9 },
  { left: '34%', delay: '5s', duration: '12s', size: 14 },
  { left: '52%', delay: '1s', duration: '16s', size: 8 },
  { left: '68%', delay: '4s', duration: '14s', size: 13 },
  { left: '82%', delay: '7s', duration: '12s', size: 10 },
  { left: '92%', delay: '3s', duration: '17s', size: 11 },
];

const EVENT_PETALS = [
  { left: '6%', delay: '0s', duration: '6.5s', size: 16, sway: '22px' },
  { left: '20%', delay: '1.6s', duration: '7.4s', size: 12, sway: '-18px' },
  { left: '36%', delay: '0.7s', duration: '8s', size: 18, sway: '14px' },
  { left: '52%', delay: '2.8s', duration: '6.8s', size: 13, sway: '-24px' },
  { left: '68%', delay: '1.1s', duration: '7.6s', size: 17, sway: '20px' },
  { left: '84%', delay: '3.2s', duration: '6.2s', size: 14, sway: '-16px' },
];

type SongPlayer = {
  playVideo: () => void;
  pauseVideo: () => void;
  getPlayerState: () => number;
};

declare global {
  interface Window {
    YT?: {
      Player: new (
        element: HTMLElement,
        options: {
          videoId: string;
          width: string;
          height: string;
          playerVars: Record<string, number | string>;
          events: {
            onReady: () => void;
            onStateChange: (event: { data: number }) => void;
          };
        },
      ) => SongPlayer;
      PlayerState: { PLAYING: number };
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

export function IllustratedInvite() {
  const { t } = useTranslation('home');
  const searchParams = useSearchParams();
  const nameOrder = searchParams.get('names') === 'srushti' ? 'srushti' : 'kushal';
  const requestedEvent = searchParams.get('event');

  const eventVariant =
    requestedEvent === 'haldi' || requestedEvent === 'wedding'
      ? requestedEvent
      : 'all';

  const songHostRef = useRef<HTMLDivElement>(null);
  const songRef = useRef<SongPlayer | null>(null);
  const songReady = useRef(false);
  const wantSong = useRef(false);
  const started = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [shift, setShift] = useState(0);

  const orderedPeople =
    nameOrder === 'srushti'
      ? [
          { title: t('invite.bride-title'), name: t('invite.bride-name') },
          { title: t('invite.groom-title'), name: t('invite.groom-name') },
        ]
      : [
          { title: t('invite.groom-title'), name: t('invite.groom-name') },
          { title: t('invite.bride-title'), name: t('invite.bride-name') },
        ];

  const familyDetails =
    nameOrder === 'srushti'
      ? [
          {
            relationship: t('invite.daughter-of'),
            parents: t('invite.parents-todmal'),
          },
          {
            relationship: t('invite.son-of'),
            parents: t('invite.parents-thaluri'),
          },
        ]
      : [
          {
            relationship: t('invite.son-of'),
            parents: t('invite.parents-thaluri'),
          },
          {
            relationship: t('invite.daughter-of'),
            parents: t('invite.parents-todmal'),
          },
        ];

  const familiesText =
    nameOrder === 'srushti'
      ? t('invite.families-bride-first')
      : t('invite.families');

  const couple = `${orderedPeople[0].name} & ${orderedPeople[1].name}`;

  const invitationLine =
    eventVariant === 'haldi'
      ? t('invite.haldi-invite-you')
      : t('invite.invite-you');

  const invitationLetterBody =
    eventVariant === 'haldi'
      ? t('invite.haldi-letter-body')
      : t('invite.letter-body');

  const haldiMap = generateMapLink(WEDDING_CONFIG.venue.haldi.mapQuery);
  const vidhiMap = generateMapLink(WEDDING_CONFIG.venue.vidhi.mapQuery);

  const events = [
    {
      id: 'haldi',
      title: t('invite.haldi'),
      date: t('invite.haldi-date'),
      when: t('invite.late-afternoon'),
      venue: t('invite.haldi-venue'),
      address: '',
      image: WEDDING_CONFIG.art.haldi,
      petal: 'linear-gradient(135deg, #f6d36a, #e08a2f)',
      artworkOnly: true,
      compact: false,
      copyTop: '29%',
      copyLeft: '12%',
      copyRight: '12%',
      shades: [] as { name: string; color: string }[],
      dress: '',
      lines: [] as string[],
    },
    {
      id: 'vidhi',
      title: t('invite.vidhi'),
      date: t('invite.date-19'),
      when: t('invite.morning'),
      venue: WEDDING_CONFIG.venue.vidhi.name,
      address: WEDDING_CONFIG.venue.vidhi.address,
      image: WEDDING_CONFIG.art.vidhi,
      petal: 'linear-gradient(135deg, #f3b0c4, #c44766)',
      artworkOnly: false,
      compact: false,
      copyTop: '14%',
      copyLeft: '20%',
      copyRight: '20%',
      shades: [],
      dressHeading: '',
      dress: t('invite.vidhi-dress'),
      lines: [] as string[],
    },
    {
      id: 'mangal',
      title: t('invite.mangal'),
      date: t('invite.date-19'),
      when: t('invite.mangal-time'),
      venue: WEDDING_CONFIG.venue.vidhi.name,
      address: WEDDING_CONFIG.venue.vidhi.address,
      image: WEDDING_CONFIG.art.mangal,
      petal: 'linear-gradient(135deg, #f6d98a, #c69214)',
      artworkOnly: false,
      compact: true,
      copyTop: '17%',
      copyLeft: '30%',
      copyRight: '18%',
      shades: [],
      dressHeading: t('invite.mangal-dress'),
      dress: '',
      lines: [] as string[],
    },
  ];

  const visibleEvents = events.filter((item) =>
    eventVariant === 'all'
      ? true
      : eventVariant === 'haldi'
        ? item.id === 'haldi'
        : item.id !== 'haldi'
  );

  const venues = [
    {
      ...WEDDING_CONFIG.venue.haldi,
      id: 'haldi',
      title: t('invite.venue-haldi-title'),
      mapUrl: haldiMap,
    },
    {
      ...WEDDING_CONFIG.venue.vidhi,
      id: 'wedding',
      title: t('invite.venue-vidhi-title'),
      mapUrl: vidhiMap,
    },
  ];

  useEffect(() => {
    document.title = couple;
  }, [couple]);

  useEffect(() => {
    let frame = 0;

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        setShift(window.scrollY);
      });
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  useEffect(() => {
    const mountSong = () => {
      if (!songHostRef.current || songRef.current || !window.YT) return;

      songRef.current = new window.YT.Player(songHostRef.current, {
        videoId: WEDDING_CONFIG.song.youtubeId,
        width: '200',
        height: '200',
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          fs: 0,
          loop: 1,
          playlist: WEDDING_CONFIG.song.youtubeId,
          modestbranding: 1,
          playsinline: 1,
          rel: 0,
        },
        events: {
          onReady: () => {
            songReady.current = true;

            if (wantSong.current) {
              songRef.current?.playVideo();
              setPlaying(true);
            }
          },
          onStateChange: (event) => {
            setPlaying(event.data === window.YT?.PlayerState.PLAYING);
          },
        },
      });
    };

    if (window.YT?.Player) {
      mountSong();

      return;
    }

    const previous = window.onYouTubeIframeAPIReady;

    window.onYouTubeIframeAPIReady = () => {
      previous?.();
      mountSong();
    };

    if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
      const script = document.createElement('script');

      script.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(script);
    }
  }, []);

  const sceneShift = Math.min(shift, 900) * 0.34;
  const paperShift = Math.min(shift * 0.14, 110);

  const beginMusic = () => {
    if (started.current) return;

    started.current = true;
    wantSong.current = true;

    if (songReady.current) {
      songRef.current?.playVideo();
      setPlaying(true);
    }
  };

  const toggleMusic = () => {
    if (!songReady.current || !songRef.current) {
      wantSong.current = true;
      started.current = true;

      return;
    }

    if (songRef.current.getPlayerState() === window.YT?.PlayerState.PLAYING) {
      songRef.current.pauseVideo();
      setPlaying(false);

      return;
    }

    wantSong.current = true;
    started.current = true;
    songRef.current.playVideo();
    setPlaying(true);
  };

  return (
    <div
      className="min-h-dvh bg-[#f4eadc] bg-cover bg-center"
      style={{ backgroundImage: `url(${WEDDING_CONFIG.art.paper})` }}
      onPointerDown={(event) => {
        const target = event.target as HTMLElement;

        if (target.closest('[data-music]')) return;

        beginMusic();
      }}
    >
      <div
        ref={songHostRef}
        className="pointer-events-none fixed top-0 left-[-1000px] h-[200px] w-[200px]"
      />
      <div className="mx-auto min-h-dvh w-full max-w-[480px] bg-[#f7f0e6] shadow-[0_0_40px_rgba(90,50,20,0.12)]">
        <section className="relative h-[150dvh]">
          <div className="sticky top-0 flex h-dvh flex-col overflow-hidden px-6 pb-10 pt-8 text-center">
          <div
            className="absolute inset-0 will-change-transform"
            style={{ transform: `translate3d(0, ${sceneShift}px, 0)` }}
          >
            <img
              src={WEDDING_CONFIG.art.cover}
              alt=""
              className="absolute top-[-22%] left-1/2 h-[150%] w-[124%] max-w-none -translate-x-1/2 object-cover"
            />
            {PETALS.map((petal) => (
              <span
                key={petal.left}
                className="invite-petal"
                style={{
                  left: petal.left,
                  width: petal.size,
                  height: petal.size * 1.45,
                  animationDuration: petal.duration,
                  animationDelay: petal.delay,
                }}
              />
            ))}
          </div>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[#f7f0e6]" />
          <div className="relative z-10 mt-10">
            <h1 className="font-script text-7xl leading-none text-[#6b2d3c] [text-shadow:0_2px_16px_rgba(255,255,255,0.9)]">
              {orderedPeople[0].name}
            </h1>
            <p className="font-script mt-1 text-4xl text-[#8a4a3a] [text-shadow:0_2px_12px_rgba(255,255,255,0.85)]">
              {t('invite.weds')}
            </p>
            <h1 className="font-script text-7xl leading-none text-[#6b2d3c] [text-shadow:0_2px_16px_rgba(255,255,255,0.9)]">
              {orderedPeople[1].name}
            </h1>
          </div>
          <p
            className="relative z-10 mt-auto pt-16 text-xs uppercase tracking-[0.28em] text-white [text-shadow:0_1px_6px_rgba(60,20,10,0.6)]"
            style={{ opacity: Math.max(0, 1 - shift / 180) }}
          >
            {t('invite.scroll')}
          </p>
          </div>
        </section>

        <div className="relative z-10 -mt-[22vh] overflow-hidden">
          <img
            src={WEDDING_CONFIG.art.paper}
            alt=""
            className="pointer-events-none absolute top-0 left-0 h-[130%] w-full object-cover will-change-transform"
            style={{ transform: `translate3d(0, ${paperShift}px, 0)` }}
          />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-transparent to-[#f7f0e6]" />
          <div className="relative">
        <section className="px-8 pt-28 pb-14 text-center">
          <p className="font-serif text-base tracking-wide text-[#3d2b22]">
            {t('invite.invocation')}
          </p>
          <img
            src={WEDDING_CONFIG.art.ganpati}
            alt={t('invite.ganpati')}
            className="mx-auto mt-3 h-32 w-auto object-contain"
          />
          <p className="mt-8 font-serif text-xl italic text-[#3d2b22]">
            {t('invite.invite-lead')}
          </p>
          <p className="mt-2 font-serif text-lg text-[#3d2b22]">
            {familiesText}
          </p>
          {familyDetails.map((family) => (
            <Fragment key={family.parents}>
              <p className="mt-5 font-serif text-base italic text-[#8a4a3a]">
                {family.relationship}
              </p>
              <p className="mt-2 whitespace-nowrap font-serif text-[13px] font-bold text-[#3d2b22]">
                {family.parents}
              </p>
            </Fragment>
          ))}
          <p className="mt-6 font-serif text-lg italic leading-snug text-[#3d2b22]">
            {invitationLine}
          </p>
          <p className="mt-5 font-serif text-base tracking-wide text-[#8a4a3a]">
            {orderedPeople[0].title}
          </p>
          <p className="font-script mt-1 text-5xl leading-none text-[#6b2d3c]">
            {orderedPeople[0].name}
          </p>
          <p className="mt-2 font-serif text-lg italic text-[#8a4a3a]">&</p>
          <p className="mt-1 font-serif text-base tracking-wide text-[#8a4a3a]">
            {orderedPeople[1].title}
          </p>
          <p className="font-script mt-1 text-5xl leading-none text-[#6b2d3c]">
            {orderedPeople[1].name}
          </p>
          <div className="mt-8 rounded-3xl border border-[#eadcc4] bg-white/75 px-6 py-8 text-left shadow-sm">
            <p className="font-serif text-2xl italic text-[#6b2d3c]">
              {t('invite.letter-dear')}
            </p>
            <p className="mt-4 whitespace-pre-line font-serif text-lg leading-relaxed text-[#4d3b32]">
              {invitationLetterBody}
            </p>
            <p className="mt-6 font-serif text-lg italic text-[#6b2d3c]">
              {t('invite.letter-sign')}
            </p>
            <p className="font-script mt-1 text-4xl text-[#8a4a3a]">{couple}</p>
          </div>
        </section>

        <section className="px-6 pb-14">
          <h2 className="text-center font-serif text-3xl text-[#3d2b22]">
            {t('invite.events-title')}
          </h2>
          <div className="mt-8 space-y-8">
            {visibleEvents.map((item) => (
              <article
                key={item.title}
                className="relative overflow-hidden rounded-3xl shadow-sm"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="block h-auto w-full"
                />
                {EVENT_PETALS.map((petal) => (
                  <span
                    key={petal.left}
                    className="event-petal"
                    style={{
                      left: petal.left,
                      width: petal.size,
                      height: petal.size * 1.45,
                      animationDuration: petal.duration,
                      animationDelay: petal.delay,
                      background: item.petal,
                      ['--sway' as string]: petal.sway,
                    }}
                  />
                ))}
                {item.artworkOnly ? null : (
                <div
                  className="pointer-events-none absolute z-10 text-center"
                  style={{
                    top: item.copyTop,
                    left: item.copyLeft,
                    right: item.copyRight,
                  }}
                >
                  <h3
                    className={`font-script leading-none text-[#6b2d3c] ${item.compact ? 'mx-auto max-w-[7.5rem] text-[1.85rem]' : 'text-[2.15rem]'}`}
                  >
                    {item.title}
                  </h3>
                  <div
                    className={`flex items-center gap-2 text-[#b08958] ${item.compact ? 'mt-1' : 'mt-2'}`}
                  >
                    <span className="h-px flex-1 bg-current" />
                    <p className="font-serif text-[13px] whitespace-nowrap text-[#5c4033]">
                      {item.date}
                    </p>
                    <span className="h-px flex-1 bg-current" />
                  </div>
                  <p className="mt-1.5 flex items-center justify-center gap-1.5 font-serif text-[13px] text-[#3d2b22]">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-3 w-3 shrink-0"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      aria-hidden="true"
                    >
                      <circle cx="12" cy="12" r="8.5" />
                      <path d="M12 8v4.5l2.5 1.5" strokeLinecap="round" />
                    </svg>
                    <span className="capitalize">{item.when}</span>
                  </p>
                  <p className="mt-1 flex items-center justify-center gap-1.5 font-serif text-[13px] text-[#3d2b22]">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-3 w-3 shrink-0"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M12 2.5c-3.6 0-6.5 2.8-6.5 6.3 0 4.7 6.5 12.7 6.5 12.7s6.5-8 6.5-12.7c0-3.5-2.9-6.3-6.5-6.3zm0 8.6a2.3 2.3 0 1 1 0-4.6 2.3 2.3 0 0 1 0 4.6z" />
                    </svg>
                    {item.venue}
                  </p>
                  {item.address ? (
                    <p className="mx-auto mt-1 max-w-[90%] text-center font-serif text-[11px] leading-tight text-[#3d2b22]">
                      {item.address}
                    </p>
                  ) : null}
                  <p className="mt-1.5 font-serif text-[15px] capitalize text-[#3d2b22]">
                    {item.dressHeading || t('invite.dress')}
                  </p>
                  {item.shades.length > 0 ? (
                    <div className="mx-auto mt-1.5 grid max-w-[15rem] grid-cols-5 gap-1.5">
                      {item.shades.map((shade) => (
                        <div key={shade.name}>
                          <div
                            className="h-6 rounded-full border border-[#c4a574] shadow-sm"
                            style={{ backgroundColor: shade.color }}
                          />
                          <p className="mt-1 text-center font-serif text-[11px] leading-tight text-[#5c4033]">
                            {shade.name}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : item.lines.length > 0 ? (
                    <div className="mt-1 space-y-0.5">
                      {item.lines.map((line) => (
                        <p
                          key={line}
                          className="font-serif text-[13px] leading-snug text-[#3d2b22]"
                        >
                          {line}
                        </p>
                      ))}
                    </div>
                  ) : item.dress ? (
                    <p className="mt-1 font-serif text-[13px] leading-snug text-[#3d2b22]">
                      {item.dress}
                    </p>
                  ) : null}
                </div>
                )}
              </article>
            ))}
          </div>
          {eventVariant === 'all' ? (
            <>
              <h2 className="mt-8 text-center font-serif text-3xl text-[#3d2b22]">
                {t('invite.venue-title')}
              </h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {venues.map((venue) => (
                  <article
                    key={venue.title}
                    className="rounded-3xl border border-[#eadcc4] bg-white/70 px-5 py-6 text-center shadow-sm"
                  >
                    <h3 className="font-serif text-2xl text-[#6b2d3c]">
                      {venue.title}
                    </h3>
                    <div className="mx-auto mt-3 h-px w-14 bg-[#e2c48a]" />
                    <p className="mt-3 text-sm text-[#5c463c]">
                      <span className="font-semibold">
                        {t('invite.venue-date')}:
                      </span>{' '}
                      {venue.date}
                    </p>
                    <p className="mt-2 font-serif text-lg font-semibold text-[#3d2b22]">
                      {venue.name}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-[#5c463c]">
                      <span className="font-semibold">
                        {t('invite.venue-address')}:
                      </span>{' '}
                      {venue.address}
                    </p>
                    <a
                      href={venue.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-block text-sm tracking-wide text-[#8a4a3a] underline decoration-[#e2c48a] underline-offset-4"
                    >
                      {t('invite.venue-map-link')}
                    </a>
                  </article>
                ))}
              </div>
            </>
          ) : null}
        </section>

          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={toggleMusic}
        data-music=""
        aria-label={t('invite.music')}
        className="fixed right-4 bottom-4 z-20 flex h-14 w-14 items-center justify-center rounded-full bg-[#d4527a] text-lg text-white shadow-lg"
      >
        {playing ? '❚❚' : '♪'}
      </button>
    </div>
  );
}
