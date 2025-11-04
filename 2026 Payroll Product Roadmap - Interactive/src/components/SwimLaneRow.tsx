import { Database, Settings, GitBranch, FileText, Sparkles, Plus } from 'lucide-react';
import { useDrop } from 'react-dnd';
import { SwimLaneCard } from './SwimLaneCard';
import { Button } from './ui/button';

interface CardData {
  id: string;
  title: string;
}

interface SwimLaneRowProps {
  category: 'Payroll Data Foundation' | 'Deduction Code Configuration' | 'Pension Support' | 'Tech Debt' | 'Small Enhancements';
  columns: {
    id: string;
    cards: CardData[];
  }[];
  onDrop: (cardId: string, targetColumnId: string, targetCategory: string) => void;
  onEdit: (cardId: string) => void;
  onAddCard: (columnId: string, category: string) => void;
}

const categoryConfig = {
  'Payroll Data Foundation': {
    color: '#F9D79C',
    lightColor: '#FEF6E9',
    icon: Database,
  },
  'Deduction Code Configuration': {
    color: '#A7D8F9',
    lightColor: '#EFF8FE',
    icon: Settings,
  },
  'Pension Support': {
    color: '#B8E3C6',
    lightColor: '#F0F9F3',
    icon: GitBranch,
  },
  'Tech Debt': {
    color: '#D6C6F9',
    lightColor: '#F6F2FE',
    icon: FileText,
  },
  'Small Enhancements': {
    color: '#F2F2F2',
    lightColor: '#FAFAFA',
    icon: Sparkles,
  },
};

function SwimLaneCell({ 
  columnId, 
  category, 
  cards, 
  onDrop, 
  onEdit,
  onAddCard,
  lightColor 
}: { 
  columnId: string; 
  category: string; 
  cards: CardData[]; 
  onDrop: (cardId: string, targetColumnId: string, targetCategory: string) => void; 
  onEdit: (cardId: string) => void;
  onAddCard: (columnId: string, category: string) => void;
  lightColor: string;
}) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'ROADMAP_CARD',
    drop: (item: { id: string; columnId: string; category: string }) => {
      if (item.columnId !== columnId || item.category !== category) {
        onDrop(item.id, columnId, category);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }), [columnId, category, onDrop]);

  return (
    <div 
      ref={drop}
      className="flex-1 min-h-[80px] p-2 border-r border-gray-200 last:border-r-0 transition-colors relative group"
      style={{ backgroundColor: isOver ? 'rgba(0, 0, 0, 0.05)' : lightColor }}
    >
      <div className="flex flex-col gap-2">
        {cards.map((card) => (
          <SwimLaneCard
            key={card.id}
            id={card.id}
            title={card.title}
            columnId={columnId}
            category={category}
            onEdit={onEdit}
          />
        ))}
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onAddCard(columnId, category)}
        className="absolute bottom-1 right-1 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <Plus className="h-3 w-3" />
      </Button>
    </div>
  );
}

export function SwimLaneRow({ category, columns, onDrop, onEdit, onAddCard }: SwimLaneRowProps) {
  const config = categoryConfig[category];
  const Icon = config.icon;

  return (
    <div className="flex border-b border-gray-200 last:border-b-0">
      <div 
        className="w-48 p-3 flex items-center gap-2 border-r border-gray-200 flex-shrink-0"
        style={{ backgroundColor: config.color }}
      >
        <Icon className="w-4 h-4 flex-shrink-0 opacity-60" />
        <span className="text-sm" style={{ fontFamily: 'Inter', fontWeight: 600 }}>
          {category}
        </span>
      </div>
      <div className="flex flex-1">
        {columns.map((column) => (
          <SwimLaneCell
            key={column.id}
            columnId={column.id}
            category={category}
            cards={column.cards}
            onDrop={onDrop}
            onEdit={onEdit}
            onAddCard={onAddCard}
            lightColor={config.lightColor}
          />
        ))}
      </div>
    </div>
  );
}
