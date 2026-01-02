
import React from 'react';
import { Shield, Book, Heart, Lightbulb, Star, Compass, Flame, ScrollText } from 'lucide-react';
import { Milestone, Quote } from './types';

// Robust Date: January 3rd, 2026 (Month is 0-indexed, so 0 = January)
export const CELEBRATION_TARGET = new Date(2026, 0, 3, 0, 0, 0).getTime();
export const CELEBRATION_DATE = 'January 3, 2026 00:00:00';

export const MILESTONES: Milestone[] = [
  {
    year: "13 Rajab",
    title: "Birth in the Kaaba",
    description: "The only person in history born within the sacred sanctuary of the Holy Kaaba in Mecca.",
    icon: "Star"
  },
  {
    year: "610 AD",
    title: "The First Male Muslim",
    description: "Embraced Islam in childhood, standing as a firm pillar of faith and support for the Prophet (s.a.w).",
    icon: "Shield"
  },
  {
    year: "Nahj al-Balagha",
    title: "The Peak of Eloquence",
    description: "A monumental collection of sermons, letters, and sayings reflecting divine wisdom and governance.",
    icon: "Book"
  },
  {
    year: "Legacy",
    title: "Gateway to Knowledge",
    description: "Prophet Muhammad (s.a.w) said: 'I am the city of knowledge and Ali is its gate.'",
    icon: "Lightbulb"
  }
];

export const QUOTES: Quote[] = [
  {
    text: "He who has a thousand friends has not a friend to spare, and he who has one enemy will meet him everywhere.",
    source: "Saying 43"
  },
  {
    text: "Knowledge is a noble inheritance, and education is a graceful ornament.",
    source: "Wisdom 5"
  },
  {
    text: "Patience is of two kinds: patience over what pains you, and patience against what you covet.",
    source: "Wisdom 52"
  },
  {
    text: "Justice is to put everything in its proper place.",
    source: "Nahj al-Balagha"
  },
  {
    text: "The tongue of the wise is behind his heart, and the heart of the fool is behind his tongue.",
    source: "Wisdom 40"
  }
];

export const getIcon = (name: string) => {
  switch (name) {
    case 'Shield': return <Shield className="w-6 h-6" />;
    case 'Book': return <Book className="w-6 h-6" />;
    case 'Heart': return <Heart className="w-6 h-6" />;
    case 'Lightbulb': return <Lightbulb className="w-6 h-6" />;
    case 'Star': return <Star className="w-6 h-6" />;
    case 'Compass': return <Compass className="w-6 h-6" />;
    case 'Flame': return <Flame className="w-6 h-6" />;
    case 'ScrollText': return <ScrollText className="w-6 h-6" />;
    default: return <Star className="w-6 h-6" />;
  }
};
