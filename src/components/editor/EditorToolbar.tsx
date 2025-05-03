import { Editor } from '@tiptap/react';

interface EditorToolbarProps {
  editor: Editor | null;
}

export default function EditorToolbar({ editor }: EditorToolbarProps) {
  if (!editor) {
    return null;
  }

  const toggleBold = () => editor.chain().focus().toggleBold().run();
  const toggleItalic = () => editor.chain().focus().toggleItalic().run();
  const toggleHeading = (level: 1 | 2) => editor.chain().focus().toggleHeading({ level }).run();
  const toggleBulletList = () => editor.chain().focus().toggleBulletList().run();
  const toggleOrderedList = () => editor.chain().focus().toggleOrderedList().run();
  const toggleBlockquote = () => editor.chain().focus().toggleBlockquote().run();
  const toggleCodeBlock = () => editor.chain().focus().toggleCodeBlock().run();

  return (
    <div className="flex flex-wrap gap-1 p-2 border-b">
      <button
        onClick={toggleBold}
        className={`p-2 rounded ${
          editor.isActive('bold') ? 'bg-gray-200' : 'hover:bg-gray-100'
        }`}
        title="Bold"
      >
        <strong>B</strong>
      </button>
      <button
        onClick={toggleItalic}
        className={`p-2 rounded ${
          editor.isActive('italic') ? 'bg-gray-200' : 'hover:bg-gray-100'
        }`}
        title="Italic"
      >
        <em>I</em>
      </button>
      <div className="w-px h-6 bg-gray-300 mx-1" />
      <button
        onClick={() => toggleHeading(1)}
        className={`p-2 rounded ${
          editor.isActive('heading', { level: 1 }) ? 'bg-gray-200' : 'hover:bg-gray-100'
        }`}
        title="Heading 1"
      >
        H1
      </button>
      <button
        onClick={() => toggleHeading(2)}
        className={`p-2 rounded ${
          editor.isActive('heading', { level: 2 }) ? 'bg-gray-200' : 'hover:bg-gray-100'
        }`}
        title="Heading 2"
      >
        H2
      </button>
      <div className="w-px h-6 bg-gray-300 mx-1" />
      <button
        onClick={toggleBulletList}
        className={`p-2 rounded ${
          editor.isActive('bulletList') ? 'bg-gray-200' : 'hover:bg-gray-100'
        }`}
        title="Bullet List"
      >
        • List
      </button>
      <button
        onClick={toggleOrderedList}
        className={`p-2 rounded ${
          editor.isActive('orderedList') ? 'bg-gray-200' : 'hover:bg-gray-100'
        }`}
        title="Numbered List"
      >
        1. List
      </button>
      <div className="w-px h-6 bg-gray-300 mx-1" />
      <button
        onClick={toggleBlockquote}
        className={`p-2 rounded ${
          editor.isActive('blockquote') ? 'bg-gray-200' : 'hover:bg-gray-100'
        }`}
        title="Quote"
      >
        Quote
      </button>
      <button
        onClick={toggleCodeBlock}
        className={`p-2 rounded ${
          editor.isActive('codeBlock') ? 'bg-gray-200' : 'hover:bg-gray-100'
        }`}
        title="Code Block"
      >
        Code
      </button>
    </div>
  );
} 