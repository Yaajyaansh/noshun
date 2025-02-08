import { useState } from "react";
import { ImageBlock as ImageBlockType } from "@/types/editor";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface ImageBlockProps {
  block: ImageBlockType;
  onChange: (block: ImageBlockType) => void;
  onDelete?: () => void;
}

export const ImageBlock = ({ block, onChange, onDelete }: ImageBlockProps) => {
  const [showControls, setShowControls] = useState(false);

  const handleSrcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({
      ...block,
      src: e.target.value,
    });
  };

  const handleDimensionChange = (
    dimension: "width" | "height",
    value: string
  ) => {
    onChange({
      ...block,
      [dimension]: parseInt(value) || 0,
    });
  };

  return (
    <div 
      className="group relative space-y-2"
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
        {block.src ? (
          <img
            src={block.src}
            alt="Block content"
            style={{
              width: block.width || "auto",
              height: block.height || "auto",
            }}
            className="rounded"
          />
        ) : (
          <div className="flex items-center justify-center rounded bg-muted p-8">
            No image selected
          </div>
        )}
        {showControls && (
          <div className="absolute right-0 top-0 z-50 rounded-bl bg-background/95 p-4 shadow-lg animate-fade-in">
            <div className="space-y-4">
              <div>
                <Label htmlFor="src">Image URL</Label>
                <Input
                  id="src"
                  value={block.src}
                  onChange={handleSrcChange}
                  placeholder="Enter image URL..."
                  className="mt-1"
                />
              </div>
              <div className="flex space-x-4">
                <div>
                  <Label htmlFor="width">Width</Label>
                  <Input
                    id="width"
                    type="number"
                    value={block.width}
                    onChange={(e) => handleDimensionChange("width", e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="height">Height</Label>
                  <Input
                    id="height"
                    type="number"
                    value={block.height}
                    onChange={(e) =>
                      handleDimensionChange("height", e.target.value)
                    }
                    className="mt-1"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};