import { RoadmapCard } from './RoadmapCard';
import { useDrop } from 'react-dnd';
import { Plus } from 'lucide-react';
import { Button } from './ui/button';

interface CardData {
  id: string;
  category: 'Payroll Data Foundation' | 'Deduction Code Configuration' | 'Pension Support' | 'Tech Debt' | 'Small Enhancements';
  title: string;
}

interface RoadmapColumnProps {
  id: string;
  title: string;
  cards: CardData[];
  onDrop: (cardId: string, targetColumnId: string) => void;
  onEdit: (cardId: string) => void;
  onAddCard: (columnId: string) => void;
}

export function RoadmapColumn({ id, title, cards, onDrop, onEdit, onAddCard }: RoadmapColumnProps) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'ROADMAP_CARD',
    drop: (item: { id: string; columnId: string }) => {
      if (item.columnId !== id) {
        onDrop(item.id, id);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }), [id, onDrop]);

  return (
    <div className="flex flex-col gap-2 min-w-0 flex-1">
      <div 
        className="px-3 py-2 bg-white border-b-2 border-gray-300 sticky top-0 z-10 flex items-center justify-between"
        style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '14px' }}
      >
        <span>{title}</span>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onAddCard(id)}
          className="h-6 w-6 p-0"
        >
          <Plus className="h-3 w-3" />
        </Button>
      </div>
      <div 
        ref={drop}
        className="flex flex-col gap-2 px-2 flex-1 min-h-[200px] transition-colors"
        style={{ backgroundColor: isOver ? 'rgba(0, 0, 0, 0.02)' : 'transparent' }}
      >
        {cards.map((card) => (
          <RoadmapCard 
            key={card.id} 
            id={card.id}
            category={card.category} 
            title={card.title}
            columnId={id}
            onEdit={onEdit}
          />
        ))}
      </div>
    </div>
  );
}
