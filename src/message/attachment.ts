import { FileContent } from '../../deps.ts';

export function createTextfile(content: string): FileContent {
  const file: FileContent = {
    blob: new Blob([content]),
    name: 'chatgpt-reply.txt',
  };
  return file;
}
