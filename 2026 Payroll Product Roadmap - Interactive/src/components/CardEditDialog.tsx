import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface CardEditDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  cardId: string | null;
  initialTitle: string;
  initialCategory: string;
  onSave: (cardId: string | null, title: string, category: string) => void;
  onDelete?: (cardId: string) => void;
}

export function CardEditDialog({
  open,
  onOpenChange,
  cardId,
  initialTitle,
  initialCategory,
  onSave,
  onDelete,
}: CardEditDialogProps) {
  const [title, setTitle] = useState(initialTitle);
  const [category, setCategory] = useState(initialCategory);

  useEffect(() => {
    setTitle(initialTitle);
    setCategory(initialCategory);
  }, [initialTitle, initialCategory, open]);

  const handleSave = () => {
    if (title.trim()) {
      onSave(cardId, title, category);
      onOpenChange(false);
    }
  };

  const handleDelete = () => {
    if (cardId && onDelete) {
      onDelete(cardId);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{cardId ? 'Edit Card' : 'Add New Card'}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter card title"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger id="category">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Payroll Data Foundation">Payroll Data Foundation</SelectItem>
                <SelectItem value="Deduction Code Configuration">Deduction Code Configuration</SelectItem>
                <SelectItem value="Pension Support">Pension Support</SelectItem>
                <SelectItem value="Tech Debt">Tech Debt</SelectItem>
                <SelectItem value="Small Enhancements">Small Enhancements</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter className="flex justify-between">
          <div>
            {cardId && onDelete && (
              <Button variant="destructive" onClick={handleDelete}>
                Delete
              </Button>
            )}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
