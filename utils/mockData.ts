import { faker } from '@faker-js/faker';

// --- DYNAMIC MOOD ASSETS ---
const MOOD_HOME_ASSETS: Record<string, string[]> = {
  Default: [
    "https://www.dropbox.com/scl/fi/q8pr3vkftt2vh0zr91d7v/kate-dupe.jpeg?rlkey=72104e41vqzo2xuc7k17xhqyw&st=qqhy5xxa&raw=1",
    "https://www.dropbox.com/scl/fi/hd6m0rpza7guod7pxpz0a/lara-joy-dupe.jpeg?rlkey=0e39t9rkh8o2tfz6mmi0bqw9k&st=5pg12p8u&raw=1",
    "https://www.dropbox.com/scl/fi/nfellja0ya08bfsu7oh34/thiago-lazaro-dupe.jpeg?rlkey=rxc4m809ddrrlx7img9izmk22&st=qn9g0dhg&raw=1",
    "https://www.dropbox.com/scl/fi/st8oqdy2c50i16z7eg6jz/rebekah-hayward-dupe.jpeg?rlkey=vubcy7tvz0sqxyvwgvamta4be&st=laepkz50&raw=1"
  ],
  Funny: [
    "https://www.dropbox.com/scl/fi/7f7blkpxv6yzifp4mpi7y/WhatsApp-Image-2026-04-08-at-11.05.34-PM-1.jpeg?rlkey=jtha2plqpuupsbqdkcc20q49m&st=czeb0nlx&raw=1",
    "https://www.dropbox.com/scl/fi/hoynozjedbol2gyxr3d5g/WhatsApp-Image-2026-04-08-at-11.05.35-PM.jpeg?rlkey=crjmck5l7dwl18s3i1cp6g53j&st=okxzemuv&raw=1",
    "https://www.dropbox.com/scl/fi/bazayy5fcvqxd56k3sz4f/WhatsApp-Image-2026-04-08-at-11.05.34-PM.jpeg?rlkey=5usgy6u0ql7r319ectnarw9gf&st=0usrzzm4&raw=1",
    "https://www.dropbox.com/scl/fi/kehk14kih94u1l57c5g93/WhatsApp-Image-2026-04-08-at-11.05.36-PM.jpeg?rlkey=f1kry2krd41xcrg5uqug6sc8i&st=cik9qi1v&raw=1"
  ],
  Chill: [
    "https://www.dropbox.com/scl/fi/4inngdkhw6owth5lwf5u0/WhatsApp-Image-2026-04-08-at-11.05.40-PM.jpeg?rlkey=mbfsnimj2r3z637hmpevzpls7&st=cvxizlyh&raw=1",
    "https://www.dropbox.com/scl/fi/lt3nrwc3kdiiqi6ela59d/WhatsApp-Image-2026-04-08-at-11.05.41-PM-1.jpeg?rlkey=kt9pi6my7yrcnxu7g66tccvh7&st=pltc4m7j&raw=1",
    "https://www.dropbox.com/scl/fi/tm9ixxp9pofe8kszckgum/WhatsApp-Image-2026-04-08-at-11.05.41-PM.jpeg?rlkey=kijedi9s9io7hc3kn257cl1eq&st=dr56ljau&raw=1",
    "https://www.dropbox.com/scl/fi/kvrwzeeennc71p5auu1f8/WhatsApp-Image-2026-04-08-at-11.05.40-PM-2.jpeg?rlkey=2ypsazo6tc2ocsiw4d07f0vzi&st=xznr5mcu&raw=1",
    "https://www.dropbox.com/scl/fi/kb1hdpshp8o8qzu5ia2nh/WhatsApp-Image-2026-04-08-at-11.05.41-PM-2.jpeg?rlkey=e8oasvilozboozivarxvhmtll&st=ev1cj81g&raw=1"
  ]
};

const MOOD_REELS_ASSETS: Record<string, string[]> = {
  Default: [
    "https://www.dropbox.com/scl/fi/8rtokfce23xha8ytzylut/I-ve-seen-everyone-use-these-cutting-boards-but-no-one-is-talking-about-it.mp4?rlkey=z8sxznchoos2l24zs2z0lfwgr&st=npsn90bi&raw=1",
    "https://www.dropbox.com/scl/fi/393ae4flefekxrso5gkmx/Testing-limits-under-extreme-pressure..mp4?rlkey=1horfruf9j6kucvtbduu8oa79&st=7v7au49h&raw=1",
    "https://www.dropbox.com/scl/fi/u579fty4dj6k3q1fl9tdx/Photoshop-Tips-2026-Put-Bus-on-Road-with-Perspective-Warp-graphicdesign-photoshop-adobe-ad.mp4?rlkey=zyo9o95joo6h9w1s457jnu0ra&st=a5rzfy0x&raw=1"
  ],
  Funny: [
    "https://www.dropbox.com/scl/fi/fj53ydia7g0iarc3657is/Sounds-on-try-not-to-laugh-Jennifer_46010-TW...-funny-takemymoney-9gag-funnyvideos-techno.mp4?rlkey=jhzhagnpkas9423gwqrgfunbj&st=h6hf3k3b&raw=1",
    "https://www.dropbox.com/scl/fi/1pyr05zlcce5rymuny8ck/We-came-up-in-comedy-the-same-way-we-came-up-in-life-by-refusing-to-play-it-safe.-Two-kids-from.mp4?rlkey=9b7ocie3fp9skpvkmqh2t7paz&st=jr3c6bej&raw=1",
    "https://www.dropbox.com/scl/fi/ud5m4d7edzpeq8u01zji9/GTA-logic.mp4?rlkey=ptm8w3aqirff1kxkatdlrmk4l&st=gu25jb77&raw=1"
  ],
  Chill: [
    "https://www.dropbox.com/scl/fi/p889c2v5pdb0f4jmbhxxp/Chill-guy-chillguy-chillguymeme-chillguyart-chillguyillustration-meme-art-animation-comic.mp4?rlkey=xif8373i6d3z6qmor6bc707sl&st=2vynshzc&raw=1",
    "https://www.dropbox.com/scl/fi/pwmj8dkii06mh94plt5tc/No-me-molestes-.....-peace-chill-relax-outdoors.mp4?rlkey=99vmnkp1o1i5egnkpsjvskhu3&st=w6dkwvch&raw=1",
    "https://www.dropbox.com/scl/fi/rc8qwooh3xysvmw256g2n/Nostalgia-meets-the-future.-Digital-art-is-where-imagination-runs-free-julianmajin-Follow.mp4?rlkey=iz86oq3zceur2i33t0xngs1wu&st=999eyosd&raw=1"
  ]
};

const CHILL_MESSAGES = [
  "yo, what's good? 🤙",
  "just chilling, wbu?",
  "that's crazyyy 💀",
  "lmao no way 😂",
  "bet, let's do it",
  "sounds like a vibe ✨",
  "fr fr",
  "on my way rn 🏃‍♂️",
  "did you see that new post?",
  "can't wait for the weekend 🌴",
  "say less 🤝",
  "bruh 😭",
  "vibes are immaculate today",
  "need coffee asap ☕",
  "let me know when you're free",
  "honestly same",
  "we definitely need to link up soon",
  "so true bestie",
  "mood 💯",
  "sending good vibes your way 🌊"
];

export const generateStories = (count = 10) => {
  return Array.from({ length: count }).map(() => ({
    id: faker.string.uuid(),
    username: faker.internet.username().toLowerCase(),
    avatar: faker.image.avatar(),
    hasUnseen: faker.datatype.boolean(),
    storyImage: faker.image.urlPicsumPhotos({ width: 1080, height: 1920 }),
  }));
};

export const generatePosts = (mood: string | null = null) => {
  const activeMood = mood && MOOD_HOME_ASSETS[mood] ? mood : 'Default';
  const assets = MOOD_HOME_ASSETS[activeMood];

  return assets.map((url) => ({
    id: faker.string.uuid(),
    user: {
      username: faker.internet.username().toLowerCase(),
      avatar: faker.image.avatar(),
    },
    image: url,
    likes: faker.number.int({ min: 10, max: 1000 }),
    caption: faker.lorem.sentence(),
    timeAgo: `${faker.number.int({ min: 1, max: 23 })}h`,
  }));
};

export const generateReels = (mood: string | null = null) => {
  const activeMood = mood && MOOD_REELS_ASSETS[mood] ? mood : 'Default';
  const assets = MOOD_REELS_ASSETS[activeMood];

  return assets.map((url) => ({
    id: faker.string.uuid(),
    user: {
      username: faker.internet.username().toLowerCase(),
      avatar: faker.image.avatar(),
    },
    videoUrl: url,
    likes: faker.number.int({ min: 100, max: 10000 }),
    comments: faker.number.int({ min: 10, max: 500 }),
    caption: faker.lorem.sentences(2),
    audio: `${faker.music.songName()} • ${faker.person.fullName()}`,
  }));
};

export const generateExploreItems = (count = 30) => {
  return Array.from({ length: count }).map(() => ({
    id: faker.string.uuid(),
    image: faker.image.urlPicsumPhotos({ width: 400, height: 400 }),
    type: faker.helpers.arrayElement(['image', 'reel']),
  }));
};

export const generateRecentSearches = (count = 5) => {
  return Array.from({ length: count }).map(() => ({
    id: faker.string.uuid(),
    term: faker.internet.username().toLowerCase(),
    avatar: faker.image.avatar(),
    type: faker.helpers.arrayElement(['account', 'tag']),
  }));
};

export const generateSearchResults = (count = 8) => {
  return Array.from({ length: count }).map(() => ({
    id: faker.string.uuid(),
    title: faker.internet.username().toLowerCase(),
    subtitle: faker.person.fullName(),
    avatar: faker.image.avatar(),
    followers: faker.number.int({ min: 100, max: 50000 }),
  }));
};

export const generateProfileData = () => ({
  username: faker.internet.username().toLowerCase(),
  fullName: faker.person.fullName(),
  bio: "Digital creator 🎨\nLiving life one pixel at a time ✨\n📍 New York",
  avatar: faker.image.avatar(),
  stats: {
    posts: faker.number.int({ min: 50, max: 500 }),
    followers: `${faker.number.int({ min: 1, max: 99 })}.${faker.number.int({ min: 1, max: 9 })}K`,
    following: faker.number.int({ min: 100, max: 1000 }),
  }
});

export const generateHighlights = (count = 6) => {
  return Array.from({ length: count }).map(() => ({
    id: faker.string.uuid(),
    title: faker.helpers.arrayElement(['Travel', 'Food', 'Vibes', 'Work', 'Friends', 'Art', 'Music']),
    cover: faker.image.urlPicsumPhotos({ width: 150, height: 150 }),
  }));
};

export const generateProfilePosts = (count = 24) => {
  return Array.from({ length: count }).map(() => ({
    id: faker.string.uuid(),
    image: faker.image.urlPicsumPhotos({ width: 400, height: 400 }),
    type: faker.helpers.arrayElement(['image', 'image', 'image', 'reel', 'carousel']),
  }));
};

export const generateSinglePost = (id: string) => ({
  id,
  user: {
    username: faker.internet.username().toLowerCase(),
    avatar: faker.image.avatar(),
  },
  image: faker.image.urlPicsumPhotos({ width: 800, height: 800 }),
  likes: faker.number.int({ min: 100, max: 5000 }),
  caption: faker.lorem.paragraph(),
  timeAgo: `${faker.number.int({ min: 1, max: 23 })}h`,
  comments: faker.number.int({ min: 5, max: 150 }),
});

export const generateChats = (count = 15) => {
  return Array.from({ length: count }).map(() => ({
    id: faker.string.uuid(),
    user: {
      username: faker.internet.username().toLowerCase(),
      avatar: faker.image.avatar(),
      fullName: faker.person.fullName(),
    },
    lastMessage: faker.helpers.arrayElement(CHILL_MESSAGES),
    timeAgo: `${faker.number.int({ min: 1, max: 59 })}m`,
    unread: faker.datatype.boolean(),
  }));
};

export const generateMessages = (count = 20) => {
  return Array.from({ length: count }).map(() => ({
    id: faker.string.uuid(),
    text: faker.helpers.arrayElement(CHILL_MESSAGES),
    isSent: faker.datatype.boolean(),
    time: `${faker.number.int({ min: 1, max: 12 })}:${faker.number.int({ min: 10, max: 59 })} ${faker.helpers.arrayElement(['AM', 'PM'])}`,
  }));
};

export const generateNotifications = (count = 30) => {
  return Array.from({ length: count }).map(() => ({
    id: faker.string.uuid(),
    user: {
      username: faker.internet.username().toLowerCase(),
      avatar: faker.image.avatar(),
    },
    action: faker.helpers.arrayElement(['like', 'comment', 'follow', 'mention']),
    targetImage: faker.datatype.boolean() ? faker.image.urlPicsumPhotos({ width: 100, height: 100 }) : null,
    timeAgo: `${faker.number.int({ min: 1, max: 23 })}h`,
    section: faker.helpers.arrayElement(['Today', 'This Week', 'Earlier']),
  }));
};

export const generateComments = (count = 15) => {
  return Array.from({ length: count }).map(() => ({
    id: faker.string.uuid(),
    user: {
      username: faker.internet.username().toLowerCase(),
      avatar: faker.image.avatar(),
    },
    text: faker.lorem.sentences({ min: 1, max: 2 }),
    timeAgo: `${faker.number.int({ min: 1, max: 59 })}m`,
    likes: faker.number.int({ min: 0, max: 500 }),
    isLiked: faker.datatype.boolean(),
  }));
};

export const generateNetworkUsers = (count = 20) => {
  return Array.from({ length: count }).map(() => ({
    id: faker.string.uuid(),
    username: faker.internet.username().toLowerCase(),
    fullName: faker.person.fullName(),
    avatar: faker.image.avatar(),
    isFollowing: faker.datatype.boolean(),
  }));
};

export const generateCollections = (count = 6) => {
  return Array.from({ length: count }).map(() => ({
    id: faker.string.uuid(),
    title: faker.helpers.arrayElement(['Inspiration', 'Recipes', 'Travel Goals', 'Outfits', 'Tech Setup', 'Memes']),
    cover: faker.image.urlPicsumPhotos({ width: 300, height: 300 }),
    itemCount: faker.number.int({ min: 5, max: 150 }),
  }));
};

export const generateGridPosts = (count = 21) => {
  return Array.from({ length: count }).map(() => ({
    id: faker.string.uuid(),
    image: faker.image.urlPicsumPhotos({ width: 400, height: 400 }),
    type: faker.helpers.arrayElement(['image', 'reel', 'carousel']),
  }));
};
