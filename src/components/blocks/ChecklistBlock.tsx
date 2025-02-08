import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, Plus } from "lucide-react";
import { ChecklistBlock as ChecklistBlockType, ChecklistItem } from "@/types/editor";

interface ChecklistBlockProps {
  block: ChecklistBlockType;
  onChange: (block: ChecklistBlockType) => void;
  onDelete: () => void;
}

export const ChecklistBlock = ({ block, onChange, onDelete }: ChecklistBlockProps) => {
  const [newItemText, setNewItemText] = useState("");

  const addItem = () => {
    if (!newItemText.trim()) return;

    const newItem: ChecklistItem = {
      id: crypto.randomUUID(),
      text: newItemText,
      checked: false,
    };

    onChange({
      ...block,
      items: [...block.items, newItem],
    });

    setNewItemText("");
  };

  const toggleItem = (itemId: string) => {
    onChange({
      ...block,
      items: block.items.map((item) =>
        item.id === itemId ? { ...item, checked: !item.checked } : item
      ),
    });
  };

  const deleteItem = (itemId: string) => {
    onChange({
      ...block,
      items: block.items.filter((item) => item.id !== itemId),
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Input
          type="text"
          value={newItemText}
          onChange={(e) => setNewItemText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addItem()}
          placeholder="Add a new item..."
          className="flex-1"
        />
        <Button onClick={addItem} size="icon">
          <Plus className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={onDelete}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-2">
        {block.items.map((item) => (
          <div key={item.id} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={item.checked}
              onChange={() => toggleItem(item.id)}
              className="h-4 w-4"
            />
            <span className={item.checked ? "line-through text-muted-foreground" : ""}>
              {item.text}
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => deleteItem(item.id)}
              className="ml-auto h-8 w-8"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};