export type BlockType = 'text' | 'image';

export interface Block {
  id: string;
  type: BlockType;
  content?: string;
  src?: string;
}