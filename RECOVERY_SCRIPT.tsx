/**
 * GOALY APP RECOVERY SCRIPT
 * 
 * This is the complete App.tsx that should be regenerated in case of UI corruption.
 * Copy this entire file content to restore the main application component.
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Bookmark, 
  Plus, 
  Search, 
  Menu, 
  ArrowLeft, 
  Share2, 
  Pin, 
  X,
  Heart,
  DollarSign,
  Activity,
  Star,
  BookOpen,
  TrendingUp,
  Zap,
  Target
} from 'lucide-react';
import { secureStorage, generateSecureId, rateLimiter } from './utils/security';
import { DollarBillIcon } from './components/DollarBillIcon';
import { HealthIcon } from './components/HealthIcon';

// AFFIRMATIONS DATA
const loveAffirmations = [
  "I am worthy of deep love",
  "Love flows to me effortlessly", 
  "I attract love with ease",
  "My heart is open to love",
  "I radiate love and receive love",
  "Love surrounds me always",
  "I deserve unconditional love",
  "Love is my natural state",
  "I am a magnet for love",
  "Love fills every cell of my being",
  "I give and receive love freely",
  "My heart overflows with love",
  "Love is always available to me",
  "I am love in human form",
  "Love guides all my actions",
  "I trust in love's perfect timing",
  "Love heals and transforms me",
  "I am surrounded by loving energy",
  "Love is my greatest strength",
  "I choose love in every moment",
  "Love connects me to all beings",
  "I am deeply loved and cherished",
  "My capacity for love is infinite",
  "I attract my perfect soulmate",
  "Love multiplies when I share it",
  "I am worthy of passionate love",
  "My heart chakra is wide open",
  "I forgive myself with love",
  "Love is the answer to everything",
  "I am a beacon of pure love",
  "My relationships are filled with love",
  "I speak words of love and kindness",
  "Love flows through me to others",
  "I am grateful for all the love in my life",
  "My soul recognizes its perfect match",
  "I trust the universe to bring me love",
  "Love is my default emotion",
  "I am loveable exactly as I am",
  "My heart is a fountain of love",
  "I attract love in all its forms",
  "Love is my superpower",
  "I am surrounded by loving souls",
  "My love story is beautiful and unique",
  "I deserve a love that celebrates me",
  "Love comes to me at the perfect time",
  "I am open to receiving deep love",
  "My heart beats with pure love",
  "I create loving relationships effortlessly",
  "Love is my birthright",
  "I am worthy of epic love",
  "My love attracts my ideal partner",
  "I radiate love wherever I go",
  "Love finds me wherever I am",
  "I am a master of self-love",
  "My heart is healed and whole",
  "Love transforms everything it touches",
  "I am divinely guided to love",
  "My love is a gift to the world",
  "I choose love over fear always",
  "Love is my natural frequency",
  "I am worthy of unconditional acceptance",
  "My heart is a magnet for true love",
  "Love flows to me like a river",
  "I am love walking in human form",
  "My soul mate is seeking me too",
  "Love is my greatest adventure",
  "I trust in love's divine timing",
  "My heart is open to miracles",
  "Love is the essence of who I am",
  "I am worthy of a fairy tale love",
  "My love creates positive change",
  "I attract love that honors my worth"
];

const wealthAffirmations = [
  "I am a money magnet",
  "Wealth flows to me easily",
  "I attract abundance effortlessly",
  "Money comes to me from multiple sources",
  "I am worthy of financial success",
  "Prosperity is my natural state",
  "I create wealth through value",
  "My income increases daily",
  "I am financially free",
  "Money works for me",
  "I attract lucrative opportunities",
  "Wealth is drawn to me",
  "I am a successful entrepreneur",
  "My business thrives and grows",
  "I make smart financial decisions",
  "Abundance surrounds me always",
  "I deserve unlimited prosperity",
  "Money flows like water to me",
  "I am rich in all areas",
  "Financial success is inevitable",
  "I attract profitable ventures",
  "My wealth multiplies exponentially",
  "I am open to receiving money",
  "Success follows me everywhere",
  "I create multiple income streams",
  "My business generates massive profits",
  "I am a wealth creator",
  "Money loves me and I love money",
  "I attract high-paying clients",
  "My net worth increases constantly",
  "I am financially abundant",
  "Prosperity flows through me",
  "I manifest money with ease",
  "My business scales effortlessly",
  "I attract investment opportunities",
  "Wealth is my birthright",
  "I am a money-making machine",
  "Financial freedom is mine",
  "I attract passive income streams",
  "My business empire grows daily",
  "I am worthy of massive wealth",
  "Money comes to me in unexpected ways",
  "I create value and receive abundance",
  "My financial goals manifest quickly",
  "I am a master of money",
  "Wealth creation is my superpower",
  "I attract millionaire opportunities",
  "My business dominates the market",
  "I am financially unstoppable",
  "Money flows to me like a river",
  "I am a magnet for financial miracles",
  "Wealth consciousness is my default state",
  "I attract money while I sleep",
  "My bank account grows exponentially",
  "I am worthy of unlimited abundance",
  "Money comes to me from everywhere",
  "I create wealth with my thoughts",
  "My business is a cash cow",
  "I attract wealthy mentors and partners",
  "Financial abundance is my reality",
  "I am a master wealth builder",
  "Money flows to me effortlessly",
  "I deserve to be financially free",
  "My income exceeds my expenses",
  "I attract profitable investments",
  "Wealth is attracted to my energy",
  "I am financially independent",
  "Money multiplies in my hands",
  "I create value that generates wealth",
  "My business attracts ideal customers",
  "I am a successful money manager",
  "Abundance is my natural state",
  "I attract money-making opportunities",
  "My wealth serves the highest good",
  "I am worthy of financial security",
  "Money comes to me in perfect timing",
  "I create multiple revenue streams",
  "My business generates passive income",
  "I attract financial windfalls",
  "Wealth flows to me consistently",
  "I am a money manifestation master",
  "My financial future is bright",
  "I attract abundance in all forms",
  "Money is my faithful servant",
  "I create wealth through innovation",
  "My business scales automatically",
  "I attract high-value opportunities",
  "Financial success is my destiny",
  "I am worthy of extreme wealth",
  "Money loves to work for me",
  "I attract profitable partnerships",
  "My wealth creates positive impact",
  "I am financially bulletproof",
  "Money flows to me like magic",
  "I create wealth through service",
  "My business is incredibly profitable",
  "I attract money with gratitude",
  "Wealth is my divine inheritance",
  "I am a millionaire in the making",
  "Money comes to me in avalanches"
];

const healthAffirmations = [
  "I am perfectly healthy and strong",
  "My body heals itself naturally",
  "I radiate vibrant health",
  "Every cell in my body is healthy",
  "I am full of energy and vitality",
  "My body is my temple",
  "I choose healthy foods that nourish me",
  "I love exercising and moving my body",
  "My immune system is powerful",
  "I sleep deeply and wake refreshed",
  "My body functions perfectly",
  "I am strong and resilient",
  "Health flows through every part of me",
  "I am in perfect physical condition",
  "My body recovers quickly",
  "I have unlimited energy",
  "My mind and body are in harmony",
  "I am grateful for my healthy body",
  "I attract perfect health",
  "My body is a healing machine",
  "I feel amazing in my body",
  "I am physically fit and strong",
  "My body deserves love and care",
  "I make healthy choices effortlessly",
  "My metabolism works perfectly",
  "I am at my ideal weight",
  "My body is flexible and strong",
  "I breathe deeply and easily",
  "My heart beats with perfect rhythm",
  "I am mentally and physically balanced",
  "My body regenerates itself daily",
  "I am free from pain and illness",
  "My body moves with grace and ease",
  "I have perfect posture and alignment",
  "My digestive system works flawlessly",
  "I am aging gracefully and healthily",
  "My body is a source of joy",
  "I am committed to my health",
  "My body responds to exercise beautifully",
  "I have incredible stamina and endurance",
  "My body is strong and capable",
  "I trust my body's wisdom",
  "My health improves every day",
  "I am the picture of perfect health",
  "My body is my greatest asset",
  "I feel fantastic in my skin",
  "My body is a masterpiece",
  "I am healthy inside and out",
  "My body serves me perfectly",
  "I am a beacon of health and vitality",
  "My body is a temple of wellness",
  "I attract perfect health naturally",
  "My cells regenerate with perfection",
  "I am vibrant and alive",
  "My body heals faster than expected",
  "I radiate health and happiness",
  "My immune system is invincible",
  "I choose foods that energize me",
  "My body loves to move and exercise",
  "I sleep like a baby every night",
  "My energy levels are consistently high",
  "I am mentally sharp and focused",
  "My body is perfectly balanced",
  "I recover quickly from any challenge",
  "My strength increases daily",
  "I am in tune with my body's needs",
  "My health is my top priority",
  "I feel younger every day",
  "My body is incredibly resilient",
  "I am free from stress and tension",
  "My organs function optimally",
  "I have perfect circulation",
  "My bones are strong and healthy",
  "I breathe with ease and comfort",
  "My skin glows with health",
  "I am at my perfect weight",
  "My body moves like a dancer",
  "I have excellent coordination",
  "My reflexes are lightning fast",
  "I am physically powerful",
  "My body is a healing miracle",
  "I attract wellness in all forms",
  "My health radiates from within",
  "I am genetically blessed",
  "My body loves healthy habits",
  "I am disease-free and thriving",
  "My energy is magnetic",
  "I am physically unstoppable",
  "My body is perfectly designed",
  "I heal at the speed of light",
  "My health is my superpower",
  "I am a picture of perfect fitness",
  "My body is my best friend",
  "I am healthy in every way",
  "My vitality is contagious",
  "I am built for optimal health",
  "My body is a wellness machine",
  "I am healthy beyond measure",
  "My body thrives on life"
];

const learningAffirmations = [
  "I am a fast and eager learner",
  "Knowledge comes easily to me",
  "I absorb information effortlessly",
  "My mind is sharp and focused",
  "I love learning new things",
  "I retain information perfectly",
  "My brain is a powerful learning machine",
  "I understand concepts quickly",
  "Learning brings me joy and excitement",
  "I am curious about everything",
  "My memory is excellent and reliable",
  "I master new skills with ease",
  "Knowledge flows to me naturally",
  "I am intelligent and capable",
  "My mind expands with every lesson",
  "I embrace challenges as learning opportunities",
  "I am a lifelong learner",
  "My concentration is laser-focused",
  "I learn from every experience",
  "My brain creates new connections daily",
  "I am open to new ideas and perspectives",
  "Learning is my superpower",
  "I process information efficiently",
  "My mind is like a sponge for knowledge",
  "I enjoy studying and researching",
  "I am a master student",
  "My learning capacity is unlimited",
  "I connect ideas and concepts easily",
  "Knowledge transforms my life",
  "I am wise beyond my years",
  "My mind is clear and organized",
  "I learn something valuable every day",
  "I am a knowledge seeker",
  "My brain power increases constantly",
  "I understand complex topics easily",
  "Learning accelerates my growth",
  "I am mentally agile and quick",
  "My mind is a treasure trove of knowledge",
  "I apply what I learn immediately",
  "I am a brilliant problem solver",
  "Knowledge is my greatest wealth",
  "I learn from the best teachers",
  "My mind is always growing",
  "I am a student of life",
  "Learning comes naturally to me",
  "I have an insatiable thirst for knowledge",
  "My brain is optimized for learning",
  "I master any subject I choose",
  "Knowledge empowers me completely",
  "I am a learning machine",
  "My mind is a knowledge magnet",
  "I absorb wisdom like a sponge",
  "Learning is my greatest passion",
  "My brain processes information perfectly",
  "I am intellectually unstoppable",
  "Knowledge flows through me effortlessly",
  "I am a genius in my own right",
  "My mind is infinitely expandable",
  "I learn faster than ever before",
  "Wisdom comes to me naturally",
  "I am a master of my mind",
  "My intelligence grows daily",
  "I understand everything I study",
  "Learning is effortless for me",
  "My mind is crystal clear",
  "I am a brilliant thinker",
  "Knowledge is my natural state",
  "I learn with incredible speed",
  "My brain is a supercomputer",
  "I am mentally invincible",
  "Learning transforms my reality",
  "I am a knowledge creator",
  "My mind is perfectly organized",
  "I learn through all my senses",
  "Wisdom flows to me constantly",
  "I am intellectually gifted",
  "My learning never stops",
  "I am a master of information",
  "Knowledge is my greatest tool",
  "I learn from every moment",
  "My mind is a learning laboratory",
  "I am cognitively superior",
  "Learning is my life force",
  "I am a wisdom gatherer",
  "My brain is incredibly powerful",
  "I learn with perfect recall",
  "Knowledge is my superpower",
  "I am mentally magnificent",
  "My mind is a learning miracle",
  "I absorb knowledge instantly",
  "Learning is my greatest joy",
  "I am intellectually brilliant",
  "My mind is a knowledge vault",
  "I learn with laser precision",
  "Wisdom is my natural gift",
  "I am a learning phenomenon",
  "My brain is optimized for genius",
  "Knowledge flows through my DNA",
  "I am a master of understanding"
];

// Speech & Communication Affirmations
const speechAffirmations = [
  "I speak with confidence and clarity",
  "My voice is powerful and compelling",
  "I communicate my ideas effectively",
  "I am comfortable speaking in public",
  "My words inspire and motivate others",
  "I speak my truth with courage",
  "I express myself clearly and confidently",
  "My voice matters and people listen",
  "I am a natural and engaging speaker",
  "I communicate with passion and purpose",
  "My words flow effortlessly and smoothly",
  "I connect with my audience authentically",
  "I speak with authority and conviction",
  "My message resonates with others",
  "I am confident in every conversation",
  "I articulate my thoughts with ease",
  "My voice is calm and reassuring",
  "I speak up for myself and others",
  "I am a persuasive and influential speaker",
  "My words create positive change",
  "I listen actively and respond thoughtfully",
  "I communicate with empathy and understanding",
  "My storytelling captivates and engages",
  "I speak from the heart with authenticity",
  "I am comfortable with silence and pauses"
];

// Combine all affirmations into a single array with proper IDs and categories
const affirmations = [
  ...loveAffirmations.map((text, index) => ({ id: index + 1, text, category: "love" })),
  ...wealthAffirmations.map((text, index) => ({ id: index + loveAffirmations.length + 1, text, category: "wealth" })),
  ...healthAffirmations.map((text, index) => ({ id: index + loveAffirmations.length + wealthAffirmations.length + 1, text, category: "health" })),
  ...learningAffirmations.map((text, index) => ({ id: index + loveAffirmations.length + wealthAffirmations.length + healthAffirmations.length + 1, text, category: "learning" })),
  ...speechAffirmations.map((text, index) => ({ id: index + loveAffirmations.length + wealthAffirmations.length + healthAffirmations.length + learningAffirmations.length + 1, text, category: "speech" }))
];

// INTERFACES
interface Affirmation {
  id: number;
  text: string;
  category: string;
}

interface BookmarkedAffirmation extends Affirmation {
  bookmarkId: string;
  isPinned: boolean;
  dateAdded: number;
}

// MAIN APP COMPONENT
const App: React.FC = () => {
  // State management
  const [currentAffirmation, setCurrentAffirmation] = useState<Affirmation>(affirmations[0]);
  const [clickedLetters, setClickedLetters] = useState<Set<number>>(new Set());
  const [showBurst, setShowBurst] = useState(false);
  const [currentView, setCurrentView] = useState<'main' | 'bookmarks' | 'search'>('main');
  const [bookmarks, setBookmarks] = useState<BookmarkedAffirmation[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [affirmationHistory, setAffirmationHistory] = useState<Affirmation[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [burstElements, setBurstElements] = useState<Array<{ id: string; x: number; y: number; delay: number }>>([]);

  const affirmationRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef<number>(0);

  // Load bookmarks on mount
  useEffect(() => {
    const savedBookmarks = secureStorage.getItem('goaly-bookmarks') || [];
    setBookmarks(savedBookmarks);
    
    const savedHistory = secureStorage.getItem('goaly-history') || [];
    if (savedHistory.length > 0) {
      setAffirmationHistory(savedHistory);
      setCurrentAffirmation(savedHistory[savedHistory.length - 1]);
      setHistoryIndex(savedHistory.length - 1);
    } else {
      const randomAffirmation = getRandomAffirmation();
      setCurrentAffirmation(randomAffirmation);
      addToHistory(randomAffirmation);
    }
  }, []);

  // Utility functions
  const getRandomAffirmation = useCallback((): Affirmation => {
    const randomIndex = Math.floor(Math.random() * affirmations.length);
    return affirmations[randomIndex];
  }, []);

  const addToHistory = useCallback((affirmation: Affirmation) => {
    setAffirmationHistory(prev => {
      const newHistory = [...prev, affirmation].slice(-10); // Keep last 10
      secureStorage.setItem('goaly-history', newHistory);
      return newHistory;
    });
    setHistoryIndex(prev => Math.min(prev + 1, 9));
  }, []);

  const getNewAffirmation = useCallback(() => {
    if (!rateLimiter.isAllowed('new-affirmation', 30, 60000)) {
      return; // Rate limit: 30 requests per minute
    }
    
    const newAffirmation = getRandomAffirmation();
    setCurrentAffirmation(newAffirmation);
    setClickedLetters(new Set());
    setShowBurst(false);
    addToHistory(newAffirmation);
  }, [getRandomAffirmation, addToHistory]);

  const goToPreviousAffirmation = useCallback(() => {
    if (historyIndex > 0) {
      const prevIndex = historyIndex - 1;
      setCurrentAffirmation(affirmationHistory[prevIndex]);
      setHistoryIndex(prevIndex);
      setClickedLetters(new Set());
      setShowBurst(false);
    }
  }, [historyIndex, affirmationHistory]);

  // Letter clicking logic
  const handleLetterClick = useCallback((letterIndex: number, event: React.MouseEvent) => {
    if (!rateLimiter.isAllowed('letter-click', 100, 10000)) {
      return; // Rate limit: 100 clicks per 10 seconds
    }

    const rect = (event.target as HTMLElement).getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    setClickedLetters(prev => {
      const newSet = new Set(prev);
      newSet.add(letterIndex);
      
      const totalLetters = currentAffirmation.text.replace(/\s/g, '').length;
      if (newSet.size === totalLetters) {
        triggerBurstAnimation(x, y);
      }
      
      return newSet;
    });
  }, [currentAffirmation.text]);

  const triggerBurstAnimation = useCallback((centerX: number, centerY: number) => {
    setShowBurst(true);
    
    const elements = Array.from({ length: 12 }, (_, i) => ({
      id: generateSecureId(),
      x: centerX + (Math.random() - 0.5) * 400,
      y: centerY + (Math.random() - 0.5) * 400,
      delay: i * 100
    }));
    
    setBurstElements(elements);
    
    setTimeout(() => {
      setShowBurst(false);
      setBurstElements([]);
    }, 2000);
  }, []);

  // Bookmark functions
  const isBookmarked = useCallback((affirmation: Affirmation): boolean => {
    return bookmarks.some(bookmark => bookmark.id === affirmation.id);
  }, [bookmarks]);

  const toggleBookmark = useCallback(() => {
    if (!rateLimiter.isAllowed('bookmark-toggle', 20, 60000)) {
      return;
    }

    setBookmarks(prev => {
      let newBookmarks;
      const existingIndex = prev.findIndex(bookmark => bookmark.id === currentAffirmation.id);
      
      if (existingIndex >= 0) {
        newBookmarks = prev.filter((_, index) => index !== existingIndex);
      } else {
        const newBookmark: BookmarkedAffirmation = {
          ...currentAffirmation,
          bookmarkId: generateSecureId(),
          isPinned: false,
          dateAdded: Date.now()
        };
        newBookmarks = [...prev, newBookmark];
      }
      
      secureStorage.setItem('goaly-bookmarks', newBookmarks);
      return newBookmarks;
    });
  }, [currentAffirmation]);

  const togglePin = useCallback((bookmarkId: string) => {
    setBookmarks(prev => {
      const newBookmarks = prev.map(bookmark =>
        bookmark.bookmarkId === bookmarkId
          ? { ...bookmark, isPinned: !bookmark.isPinned }
          : bookmark
      );
      secureStorage.setItem('goaly-bookmarks', newBookmarks);
      return newBookmarks;
    });
  }, []);

  const deleteBookmark = useCallback((bookmarkId: string) => {
    setBookmarks(prev => {
      const newBookmarks = prev.filter(bookmark => bookmark.bookmarkId !== bookmarkId);
      secureStorage.setItem('goaly-bookmarks', newBookmarks);
      return newBookmarks;
    });
  }, []);

  // Share functionality
  const shareAffirmation = useCallback(async () => {
    const shareUrl = `${window.location.origin}?affirmation=${encodeURIComponent(currentAffirmation.text)}`;
    
    try {
      await navigator.clipboard.writeText(shareUrl);
      // Could add a toast notification here
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
    }
  }, [currentAffirmation]);

  // Touch/swipe handling
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    const touchEndY = e.changedTouches[0].clientY;
    const deltaY = touchStartY.current - touchEndY;
    
    if (Math.abs(deltaY) > 50) {
      if (deltaY > 0) {
        getNewAffirmation();
      } else {
        goToPreviousAffirmation();
      }
    }
  }, [getNewAffirmation, goToPreviousAffirmation]);

  // Search and filter functions
  const filteredAffirmations = affirmations.filter(affirmation => {
    const matchesSearch = affirmation.text.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || affirmation.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedBookmarks = [...bookmarks].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return b.dateAdded - a.dateAdded;
  });

  // Render letter with effects
  const renderLetter = (char: string, index: number, letterIndex: number) => {
    if (char === ' ') return <span key={index}>&nbsp;</span>;
    
    const isClicked = clickedLetters.has(letterIndex);
    const categoryClass = `letter-fill-${currentAffirmation.category}`;
    const glowClass = `letter-glow-${currentAffirmation.category}`;
    
    return (
      <span
        key={index}
        className={`cursor-pointer transition-all duration-300 ${
          isClicked ? `${categoryClass} ${glowClass} letter-sparkle` : 'text-gray-800'
        }`}
        onClick={(e) => handleLetterClick(letterIndex, e)}
      >
        {char}
      </span>
    );
  };

  // Render burst animation
  const renderBurstAnimation = () => {
    if (!showBurst) return null;

    const BurstIcon = () => {
      switch (currentAffirmation.category) {
        case 'love':
          return <Heart className="w-6 h-6 text-pink-500" />;
        case 'wealth':
          return <DollarBillIcon className="w-6 h-6" />;
        case 'health':
          return <HealthIcon className="w-6 h-6" />;
        case 'learning':
          return <Star className="w-6 h-6 text-yellow-500" />;
        case 'speech':
          return <Star className="w-6 h-6 text-purple-500" />;
        default:
          return <Star className="w-6 h-6 text-purple-500" />;
      }
    };

    return (
      <div className="fixed inset-0 pointer-events-none z-50">
        {burstElements.map((element) => (
          <div
            key={element.id}
            className="absolute animate-ping"
            style={{
              left: element.x,
              top: element.y,
              animationDelay: `${element.delay}ms`,
              animationDuration: '1s'
            }}
          >
            <BurstIcon />
          </div>
        ))}
      </div>
    );
  };

  // Main render
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 font-['Fredoka']">
      {/* Top Navigation */}
      <nav className="flex items-center justify-between p-4 bg-white/80 backdrop-blur-sm border-b border-purple-100">
        <div className="flex items-center space-x-4">
          {currentView !== 'main' ? (
            <button
              onClick={() => setCurrentView('main')}
              className="p-2 rounded-full hover:bg-purple-100 transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-purple-600" />
            </button>
          ) : (
            <button
              onClick={getNewAffirmation}
              className="text-2xl font-['Fredoka_One'] text-purple-600 hover:text-purple-700 transition-colors"
            >
              Goaly
            </button>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setCurrentView('bookmarks')}
            className="p-2 rounded-full hover:bg-purple-100 transition-colors"
          >
            <Bookmark className="w-6 h-6 text-purple-600" />
          </button>
          <button
            onClick={getNewAffirmation}
            className="p-2 rounded-full hover:bg-purple-100 transition-colors"
          >
            <Plus className="w-6 h-6 text-purple-600" />
          </button>
          <button
            onClick={() => setCurrentView('search')}
            className="p-2 rounded-full hover:bg-purple-100 transition-colors"
          >
            <Search className="w-6 h-6 text-purple-600" />
          </button>
          <button className="p-2 rounded-full hover:bg-purple-100 transition-colors">
            <Menu className="w-6 h-6 text-purple-600" />
          </button>
        </div>
      </nav>

      {/* Main Content */}
      {currentView === 'main' && (
        <div className="relative">
          {/* Main Affirmation Display */}
          <div
            ref={affirmationRef}
            className="flex items-center justify-center min-h-[calc(100vh-80px)] p-8"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div className="text-center max-w-4xl">
              <h1 className="text-4xl md:text-6xl font-['Fredoka_One'] leading-tight mb-8">
                {currentAffirmation.text.split('').map((char, index) => {
                  if (char === ' ') return <span key={index}>&nbsp;</span>;
                  const letterIndex = currentAffirmation.text.substring(0, index).replace(/\s/g, '').length;
                  return renderLetter(char, index, letterIndex);
                })}
              </h1>
            </div>
          </div>

          {/* Right Edge Actions */}
          <div className="fixed right-4 top-1/2 transform -translate-y-1/2 space-y-4">
            <button
              onClick={toggleBookmark}
              className={`p-3 rounded-full shadow-lg transition-all ${
                isBookmarked(currentAffirmation)
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Bookmark className="w-6 h-6" />
            </button>
            <button
              onClick={shareAffirmation}
              className="p-3 rounded-full bg-white text-gray-600 hover:bg-gray-50 shadow-lg transition-all"
            >
              <Share2 className="w-6 h-6" />
            </button>
          </div>

          {renderBurstAnimation()}
        </div>
      )}

      {/* Bookmarks View */}
      {currentView === 'bookmarks' && (
        <div className="p-4">
          <h2 className="text-2xl font-['Fredoka_One'] text-purple-600 mb-6">Your Bookmarks</h2>
          {sortedBookmarks.length === 0 ? (
            <div className="text-center py-12">
              <Bookmark className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No bookmarks yet. Start saving your favorite affirmations!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {sortedBookmarks.map((bookmark) => (
                <div
                  key={bookmark.bookmarkId}
                  className="bg-white rounded-lg p-4 shadow-sm border border-purple-100"
                >
                  <div className="flex items-start justify-between">
                    <p className="text-lg font-medium text-gray-800 flex-1 mr-4">
                      {bookmark.text}
                    </p>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => togglePin(bookmark.bookmarkId)}
                        className={`p-2 rounded-full transition-colors ${
                          bookmark.isPinned
                            ? 'bg-blue-100 text-blue-600'
                            : 'hover:bg-gray-100 text-gray-400'
                        }`}
                      >
                        <Pin className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteBookmark(bookmark.bookmarkId)}
                        className="p-2 rounded-full hover:bg-red-100 text-red-400 hover:text-red-600 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      bookmark.category === 'love' ? 'bg-pink-100 text-pink-600' :
                      bookmark.category === 'wealth' ? 'bg-green-100 text-green-600' :
                      bookmark.category === 'health' ? 'bg-blue-100 text-blue-600' :
                      bookmark.category === 'learning' ? 'bg-yellow-100 text-yellow-600' :
                      'bg-purple-100 text-purple-600'
                    }`}>
                      {bookmark.category}
                    </span>
                    {bookmark.isPinned && (
                      <span className="text-xs text-blue-600 font-medium">Pinned</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Search View */}
      {currentView === 'search' && (
        <div className="p-4">
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search affirmations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-3 rounded-lg border border-purple-200 focus:border-purple-400 focus:outline-none"
            />
          </div>

          <div className="mb-6">
            <div className="flex flex-wrap gap-2">
              {['all', 'love', 'wealth', 'health', 'learning', 'speech'].map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-purple-500 text-white'
                      : 'bg-purple-100 text-purple-600 hover:bg-purple-200'
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            {filteredAffirmations.map((affirmation) => (
              <div
                key={affirmation.id}
                className="bg-white rounded-lg p-4 shadow-sm border border-purple-100 cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => {
                  setCurrentAffirmation(affirmation);
                  setCurrentView('main');
                  setClickedLetters(new Set());
                  setShowBurst(false);
                  addToHistory(affirmation);
                }}
              >
                <p className="text-gray-800 font-medium">{affirmation.text}</p>
                <span className={`inline-block mt-2 px-2 py-1 rounded-full text-xs font-medium ${
                  affirmation.category === 'love' ? 'bg-pink-100 text-pink-600' :
                  affirmation.category === 'wealth' ? 'bg-green-100 text-green-600' :
                  affirmation.category === 'health' ? 'bg-blue-100 text-blue-600' :
                  affirmation.category === 'learning' ? 'bg-yellow-100 text-yellow-600' :
                  'bg-purple-100 text-purple-600'
                }`}>
                  {affirmation.category}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;