'use client';

import { useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

interface StrategyEditorProps {
  initialContent?: string;
  onSave: (content: string) => Promise<void>;
}

export default function StrategyEditor({ initialContent = '', onSave }: StrategyEditorProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [lastSavedContent, setLastSavedContent] = useState(initialContent);

  const editor = useEditor({
    extensions: [StarterKit],
    content: initialContent,
    onUpdate: ({ editor }) => {
      const content = editor.getHTML();
      if (content !== lastSavedContent) {
        // Content has changed
      }
    },
  });

  const handleSave = async () => {
    if (!editor) return;
    
    setIsSaving(true);
    try {
      const content = editor.getHTML();
      await onSave(content);
      setLastSavedContent(content);
    } catch (error) {
      console.error('Failed to save:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Strategy Document</h2>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className={`px-4 py-2 rounded-md ${
            isSaving
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {isSaving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
      <div className="flex-1 overflow-auto border rounded-lg p-4 bg-white">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
} 