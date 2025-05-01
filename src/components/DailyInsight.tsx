
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Lightbulb, AlertCircle, Shield, Apple, Carrot, Egg, Milk, Cake, Banana } from 'lucide-react';

export type InsightType = 'tip' | 'recall' | 'verified';

type InsightProps = {
  insight: {
    id: number;
    title: string;
    type: InsightType;
    content: string;
    icon: React.ReactNode;
    image?: string;
  };
  index: number;
};

// Food illustrations to use instead of photos
const foodIllustrations = {
  tip: <Apple className="w-12 h-12 text-cta-yellow" />,
  recall: <Cake className="w-12 h-12 text-status-red" />,
  verified: <Carrot className="w-12 h-12 text-status-green" />
};

const DailyInsight: React.FC<InsightProps> = ({ insight, index }) => {
  const getBackgroundColor = (type: InsightType) => {
    switch(type) {
      case 'tip':
        return 'bg-cta-yellow/20 border-cta-yellow'; // Yellow
      case 'recall':
        return 'bg-status-red/20 border-status-red'; // Red
      case 'verified':
        return 'bg-status-green/20 border-status-green'; // Green
      default:
        return 'bg-card border';
    }
  };

  const getIcon = (type: InsightType) => {
    switch(type) {
      case 'tip':
        return <Lightbulb className="h-5 w-5 text-cta-yellow" />; // Yellow icon
      case 'recall':
        return <AlertCircle className="h-5 w-5 text-status-red" />; // Red icon
      case 'verified':
        return <Shield className="h-5 w-5 text-status-green" />; // Green icon
      default:
        return null;
    }
  };

  // Simplified animation with reduced duration
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className={cn(
        'rounded-2xl p-5 border shadow-lg',
        getBackgroundColor(insight.type)
      )}
    >
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 flex items-center justify-center border border-white/20 bg-[#1A1A1A]">
          {foodIllustrations[insight.type]}
        </div>
        <div className="flex-grow">
          <div className="flex items-center gap-2 mb-2">
            {getIcon(insight.type)}
            <h3 className="font-semibold text-lg text-pure-white">{insight.title}</h3>
          </div>
          <p className="text-text-primary leading-relaxed">{insight.content}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default DailyInsight;
