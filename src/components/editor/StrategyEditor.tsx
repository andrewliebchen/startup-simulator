import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import { Document } from '@/lib/types';
import { useState, useEffect } from 'react';
import EditorToolbar from './EditorToolbar';

interface StrategyEditorProps {
  gameId: string;
  initialContent?: string;
  onSave: (content: string) => Promise<void>;
  isSaving: boolean;
}

export default function StrategyEditor({
  gameId,
  initialContent = '',
  onSave,
  isSaving,
}: StrategyEditorProps) {
  const [isDirty, setIsDirty] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Write your company strategy here...',
      }),
    ],
    content: initialContent,
    onUpdate: () => {
      setIsDirty(true);
    },
  });

  useEffect(() => {
    if (editor && initialContent !== editor.getHTML()) {
      editor.commands.setContent(initialContent);
      setIsDirty(false);
    }
  }, [initialContent, editor]);

  const handleSave = async () => {
    if (!editor || !isDirty) return;
    
    try {
      await onSave(editor.getHTML());
      setIsDirty(false);
    } catch (error) {
      console.error('Failed to save strategy:', error);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-semibold">Company Strategy</h2>
        <button
          onClick={handleSave}
          disabled={!isDirty || isSaving}
          className={`px-4 py-2 rounded ${
            isDirty && !isSaving
              ? 'bg-blue-500 hover:bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          }`}
        >
          {isSaving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <EditorToolbar editor={editor} />

      <div className="flex-1 overflow-y-auto p-4">
        <EditorContent
          editor={editor}
          className="prose max-w-none min-h-[200px] p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="p-4 border-t bg-gray-50">
        <div className="text-sm text-gray-500">
          {isDirty ? 'You have unsaved changes' : 'All changes saved'}
        </div>
      </div>
    </div>
  );
} 