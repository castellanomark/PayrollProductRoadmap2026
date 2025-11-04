import { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { SwimLaneRow } from './components/SwimLaneRow';
import { CardEditDialog } from './components/CardEditDialog';

type Category = 'Payroll Data Foundation' | 'Deduction Code Configuration' | 'Pension Support' | 'Tech Debt' | 'Small Enhancements';

interface CardData {
  id: string;
  category: Category;
  title: string;
  columnId: string;
}

const columnIds = ['pi1', 'pi2', 'pi3', 'pi4'];
const columnTitles: Record<string, string> = {
  pi1: 'PI 1 2026',
  pi2: 'PI 2 2026',
  pi3: 'PI 3 2026',
  pi4: 'PI 4 2026',
};

const categories: Category[] = [
  'Payroll Data Foundation',
  'Deduction Code Configuration',
  'Pension Support',
  'Tech Debt',
  'Small Enhancements',
];

const initialCards: CardData[] = [
  // PI 1
  { id: 'card-1', category: 'Payroll Data Foundation', title: 'Preserving Deduction Code in ICT', columnId: 'pi1' },
  { id: 'card-2', category: 'Deduction Code Configuration', title: 'Attribute Expansion', columnId: 'pi1' },
  { id: 'card-3', category: 'Deduction Code Configuration', title: 'UI Redesign', columnId: 'pi1' },
  { id: 'card-4', category: 'Tech Debt', title: 'Payroll Files Historical Source of Data', columnId: 'pi1' },
  // PI 2
  { id: 'card-5', category: 'Payroll Data Foundation', title: 'Update Application Using Deduction Code Object', columnId: 'pi2' },
  { id: 'card-6', category: 'Payroll Data Foundation', title: 'Update Reporting for Deduction Code Object', columnId: 'pi2' },
  { id: 'card-7', category: 'Deduction Code Configuration', title: 'Export Functionality', columnId: 'pi2' },
  { id: 'card-8', category: 'Pension Support', title: 'Person Data Integration', columnId: 'pi2' },
  // PI 3
  { id: 'card-9', category: 'Payroll Data Foundation', title: 'Update Payroll Processing and Jobs to Use Deduction Code Object', columnId: 'pi3' },
  { id: 'card-10', category: 'Deduction Code Configuration', title: 'Import Functionality', columnId: 'pi3' },
  { id: 'card-11', category: 'Pension Support', title: 'Premium Evaluation & Routing', columnId: 'pi3' },
  { id: 'card-12', category: 'Small Enhancements', title: 'Small Enhancements', columnId: 'pi3' },
  // PI 4
  { id: 'card-13', category: 'Payroll Data Foundation', title: 'Adjustment Balance Tracking', columnId: 'pi4' },
  { id: 'card-14', category: 'Deduction Code Configuration', title: 'Audit & Traceability', columnId: 'pi4' },
  { id: 'card-15', category: 'Deduction Code Configuration', title: 'Retro Strategies', columnId: 'pi4' },
  { id: 'card-16', category: 'Pension Support', title: 'Pension Deduction File Generation', columnId: 'pi4' },
  { id: 'card-17', category: 'Pension Support', title: 'Direct Billing for Insuff/Exempt Pensions', columnId: 'pi4' },
  { id: 'card-18', category: 'Small Enhancements', title: 'Small Enhancements', columnId: 'pi4' },
];

export default function App() {
  const [cards, setCards] = useState<CardData[]>(initialCards);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingCard, setEditingCard] = useState<{ id: string; title: string; category: string } | null>(null);
  const [addToColumnId, setAddToColumnId] = useState<string | null>(null);
  const [addToCategory, setAddToCategory] = useState<string | null>(null);

  // Organize cards by category and column
  const organizedData = categories.map((category) => ({
    category,
    columns: columnIds.map((columnId) => ({
      id: columnId,
      cards: cards
        .filter((card) => card.category === category && card.columnId === columnId)
        .map((card) => ({ id: card.id, title: card.title })),
    })),
  }));

  const handleDrop = (cardId: string, targetColumnId: string, targetCategory: string) => {
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === cardId
          ? { ...card, columnId: targetColumnId, category: targetCategory as Category }
          : card
      )
    );
  };

  const handleEditCard = (cardId: string) => {
    const card = cards.find((c) => c.id === cardId);
    if (card) {
      setEditingCard({ id: card.id, title: card.title, category: card.category });
      setAddToColumnId(null);
      setAddToCategory(null);
      setEditDialogOpen(true);
    }
  };

  const handleAddCard = (columnId: string, category: string) => {
    setAddToColumnId(columnId);
    setAddToCategory(category);
    setEditingCard(null);
    setEditDialogOpen(true);
  };

  const handleSaveCard = (cardId: string | null, title: string, category: string) => {
    if (cardId) {
      // Edit existing card
      setCards((prevCards) =>
        prevCards.map((card) =>
          card.id === cardId
            ? { ...card, title, category: category as Category }
            : card
        )
      );
    } else if (addToColumnId && addToCategory) {
      // Add new card
      const newCard: CardData = {
        id: `card-${Date.now()}`,
        title,
        category: category as Category,
        columnId: addToColumnId,
      };
      setCards((prevCards) => [...prevCards, newCard]);
    }
  };

  const handleDeleteCard = (cardId: string) => {
    setCards((prevCards) => prevCards.filter((card) => card.id !== cardId));
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen p-6" style={{ background: 'linear-gradient(to bottom, #f8fafc, #f1f5f9)' }}>
        <div className="max-w-7xl mx-auto">
          <h1 
            className="mb-6 text-gray-900"
            style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: '28px' }}
          >
            2026 Payroll Product Roadmap
          </h1>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
            {/* Column Headers */}
            <div className="flex border-b-2 border-gray-300">
              <div 
                className="w-48 p-3 border-r border-gray-200 flex-shrink-0"
                style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
              >
                <span className="text-sm text-white" style={{ fontFamily: 'Inter', fontWeight: 600 }}>
                  Category
                </span>
              </div>
              <div className="flex flex-1">
                {columnIds.map((columnId, index) => (
                  <div 
                    key={columnId}
                    className="flex-1 p-3 border-r border-gray-200 last:border-r-0 text-center"
                    style={{ 
                      fontFamily: 'Inter', 
                      fontWeight: 600, 
                      fontSize: '14px',
                      background: `linear-gradient(135deg, ${
                        index === 0 ? '#667eea' : 
                        index === 1 ? '#5a67d8' : 
                        index === 2 ? '#4c51bf' : 
                        '#6b46c1'
                      } 0%, ${
                        index === 0 ? '#764ba2' : 
                        index === 1 ? '#6b46c1' : 
                        index === 2 ? '#553c9a' : 
                        '#5a4788'
                      } 100%)`,
                      color: 'white'
                    }}
                  >
                    {columnTitles[columnId]}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Swim Lane Rows */}
            {organizedData.map((row) => (
              <SwimLaneRow
                key={row.category}
                category={row.category}
                columns={row.columns}
                onDrop={handleDrop}
                onEdit={handleEditCard}
                onAddCard={handleAddCard}
              />
            ))}
          </div>
        </div>
      </div>

      <CardEditDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        cardId={editingCard?.id || null}
        initialTitle={editingCard?.title || ''}
        initialCategory={editingCard?.category || addToCategory || 'Payroll Data Foundation'}
        onSave={handleSaveCard}
        onDelete={handleDeleteCard}
      />
    </DndProvider>
  );
}
