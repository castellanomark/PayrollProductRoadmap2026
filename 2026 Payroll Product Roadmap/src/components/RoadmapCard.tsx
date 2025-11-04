import { Database, Settings, GitBranch, FileText, Sparkles, Pencil } from 'lucide-react';
import { useDrag } from 'react-dnd';

interface RoadmapCardProps {
  id: string;
  category: 'Payroll Data Foundation' | 'Deduction Code Configuration' | 'Pension Support' | 'Tech Debt' | 'Small Enhancements';
  title: string;
  columnId: string;
  onEdit: (id: string) => void;
}

const categoryConfig = {
  'Payroll Data Foundation': {
    color: '#F9D79C',
    icon: Database,
  },
  'Deduction Code Configuration': {
    color: '#A7D8F9',
    icon: Settings,
  },
  'Pension Support': {
    color: '#B8E3C6',
    icon: GitBranch,
  },
  'Tech Debt': {
    color: '#D6C6F9',
    icon: FileText,
  },
  'Small Enhancements': {
    color: '#F2F2F2',
    icon: Sparkles,
  },
};

export function RoadmapCard({ id, category, title, columnId, onEdit }: RoadmapCardProps) {
  const config = categoryConfig[category];
  const Icon = config.icon;

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'ROADMAP_CARD',
    item: { id, category, title, columnId },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }), [id, category, title, columnId]);

  return (
    <div
      ref={drag}
      className="rounded-md p-2 transition-all duration-200 hover:shadow-md hover:scale-[1.02] cursor-move relative group"
      style={{ 
        backgroundColor: config.color,
        opacity: isDragging ? 0.5 : 1,
      }}
    >
      <div className="flex items-start gap-2">
        <Icon className="w-3 h-3 mt-0.5 flex-shrink-0 opacity-60" />
        <div className="flex-1 min-w-0">
          <div className="text-[10px] opacity-60 mb-0.5" style={{ fontFamily: 'Inter', fontWeight: 400 }}>
            {category}
          </div>
          <div className="text-xs leading-tight" style={{ fontFamily: 'Inter', fontWeight: 400 }}>
            {title}
          </div>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit(id);
          }}
          className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-black/10 rounded"
          title="Edit card"
        >
          <Pencil className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}
