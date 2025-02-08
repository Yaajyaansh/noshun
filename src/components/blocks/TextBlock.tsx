import { useState } from "react";
import { TextBlock as TextBlockType } from "@/types/editor";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface TextBlockProps {
  block: TextBlockType;
  onChange: (block: TextBlockType) => void;
  onDelete?: () => void;
}

const styleClasses = {
  h1: "text-4xl font-bold",
  h2: "text-3xl font-bold",
  h3: "text-2xl font-bold",
  p: "text-base",
};

export const TextBlock = ({ block, onChange, onDelete }: TextBlockProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [localContent, setLocalContent] = useState(block.content);
  const [showControls, setShowControls] = useState(false);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.target;
    setLocalContent(textarea.value);
    
    // Automatically adjust height
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  const handleBlur = () => {
    setIsEditing(false);
    if (localContent !== block.content) {
      onChange({
        ...block,
        content: localContent,
      });
    }
  };

  const handleStyleChange = (style: TextBlockType["style"]) => {
    onChange({
      ...block,
      style,
    });
  };

  return (
    <div 
      className="group relative"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      {onDelete && (
        <div className="absolute -right-12 top-1/2 -translate-y-1/2 transition-all duration-200 opacity-0 group-hover:opacity-100">
          <Button
            variant="destructive"
            size="icon"
            onClick={onDelete}
            className="shadow-md"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      )}
      <div className="relative">
        {isEditing ? (
          <textarea
            className="w-full resize-none bg-transparent p-2 focus:outline-none min-h-[1.5em] overflow-hidden"
            value={localContent}
            onChange={handleContentChange}
            onBlur={handleBlur}
            autoFocus
            style={{
              height: 'auto',
              minHeight: '1.5em'
            }}
          />
        ) : (
          <div
            onClick={() => setIsEditing(true)}
            className={cn(
              "cursor-text p-2 whitespace-pre-wrap break-words",
              styleClasses[block.style],
              "hover:bg-editor-block rounded transition-colors"
            )}
          >
            {localContent || "Click to edit..."}
          </div>
        )}
      </div>
      {showControls && (
        <div className="absolute right-0 top-0 z-50 rounded-bl bg-background/95 p-4 shadow-lg animate-fade-in">
          <div className="space-y-4">
            <div className="flex space-x-2">
              {(["h1", "h2", "h3", "p"] as const).map((style) => (
                <button
                  key={style}
                  onClick={() => handleStyleChange(style)}
                  className={cn(
                    "px-2 py-1 text-sm rounded",
                    block.style === style
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted hover:bg-muted/80"
                  )}
                >
                  {style.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};