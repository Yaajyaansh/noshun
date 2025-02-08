export type BlockType = "text" | "image" | "checklist";
export type TextStyle = "h1" | "h2" | "h3" | "p";

export interface BaseBlock {
  id: string;
  type: BlockType;
}

export interface TextBlock extends BaseBlock {
  type: "text";
  content: string;
  style: TextStyle;
}

export interface ImageBlock extends BaseBlock {
  type: "image";
  src: string;
  width: number;
  height: number;
}

export interface ChecklistItem {
  id: string;
  text: string;
  checked: boolean;
}

export interface ChecklistBlock extends BaseBlock {
  type: "checklist";
  items: ChecklistItem[];
}

export type Block = TextBlock | ImageBlock | ChecklistBlock;