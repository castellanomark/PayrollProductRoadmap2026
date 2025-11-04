import { Pencil } from 'lucide-react';
import { useDrag } from 'react-dnd';

interface SwimLaneCardProps {
  id: string;
  title: string;
  columnId: string;
  category: string;
  onEdit: (id: string) => void;
}

export function SwimLaneCard({ id, title, columnId, category, onEdit }: SwimLaneCardProps) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'ROADMAP_CARD',
    item: { id, title, columnId, category },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }), [id, title, columnId, category]);

  return (
    <div
      ref={drag}
      className="rounded-md p-2 bg-white border border-gray-200 transition-all duration-200 hover:shadow-md hover:scale-[1.02] cursor-move relative group"
      style={{ 
        opacity: isDragging ? 0.5 : 1,
      }}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div className="text-xs leading-tight" style={{ fontFamily: 'Inter', fontWeight: 400 }}>
            {title}
          </div>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit(id);
          }}
          className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-gray-100 rounded flex-shrink-0"
          title="Edit card"
        >
          <Pencil className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}
