'use client';

import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Code,
  Heading1,
  Heading2,
  Heading3,
  Highlighter,
  Italic,
  List,
  ListOrdered,
  Quote,
  Strikethrough,
  Subscript,
  Superscript,
  Underline,
  Undo2,
  Redo2,
  Eraser,
  Pilcrow,
} from 'lucide-react';
import { Toggle } from './Toggle';
import { Editor } from '@tiptap/react';

export default function MenuBar({ editor }: { editor: Editor | null }) {
  if (!editor) return null;

  const items = [
    {
      icon: <Undo2 className="size-4 text-black dark:text-white hover:text-primary"/>,
      onClick: () => editor.chain().focus().undo().run(),
    },
    {
      icon: <Redo2 className="size-4 text-black dark:text-white hover:text-primary"/>,
      onClick: () => editor.chain().focus().redo().run(),
    },
    {
      icon: <Eraser className="size-4 text-black dark:text-white hover:text-primary"/>,
      onClick: () => editor.chain().focus().clearNodes().unsetAllMarks().run(),
    },
    {
      icon: <Heading1 className="size-4 text-black dark:text-white hover:text-primary"/>,
      onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      isActive: () => editor.isActive('heading', { level: 1 }),
    },
    {
      icon: <Heading2 className="size-4 text-black dark:text-white hover:text-primary"/>,
      onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      isActive: () => editor.isActive('heading', { level: 2 }),
    },
    {
      icon: <Heading3 className="size-4 text-black dark:text-white hover:text-primary"/>,
      onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      isActive: () => editor.isActive('heading', { level: 3 }),
    },
    {
      icon: <Pilcrow className="size-4 text-black dark:text-white hover:text-primary"/>,
      onClick: () => editor.chain().focus().setParagraph().run(),
      isActive: () => editor.isActive('paragraph'),
    },
    {
      icon: <Bold className="size-4 text-black dark:text-white hover:text-primary"/>,
      onClick: () => editor.chain().focus().toggleBold().run(),
      isActive: () => editor.isActive('bold'),
    },
    {
      icon: <Italic className="size-4 text-black dark:text-white hover:text-primary"/>,
      onClick: () => editor.chain().focus().toggleItalic().run(),
      isActive: () => editor.isActive('italic'),
    },
    {
      icon: <Underline className="size-4 text-black dark:text-white hover:text-primary"/>,
      onClick: () => editor.chain().focus().toggleUnderline().run(),
      isActive: () => editor.isActive('underline'),
    },
    {
      icon: <Strikethrough className="size-4 text-black dark:text-white hover:text-primary"/>,
      onClick: () => editor.chain().focus().toggleStrike().run(),
      isActive: () => editor.isActive('strike'),
    },
    {
      icon: <Subscript className="size-4 text-black dark:text-white hover:text-primary"/>,
      onClick: () => editor.chain().focus().toggleSubscript().run(),
      isActive: () => editor.isActive('subscript'),
    },
    {
      icon: <Superscript className="size-4 text-black dark:text-white hover:text-primary"/>,
      onClick: () => editor.chain().focus().toggleSuperscript().run(),
      isActive: () => editor.isActive('superscript'),
    },
    {
      icon: <AlignLeft className="size-4 text-black dark:text-white hover:text-primary"/>,
      onClick: () => editor.chain().focus().setTextAlign('left').run(),
      isActive: () => editor.isActive({ textAlign: 'left' }),
    },
    {
      icon: <AlignCenter className="size-4 text-black dark:text-white hover:text-primary"/>,
      onClick: () => editor.chain().focus().setTextAlign('center').run(),
      isActive: () => editor.isActive({ textAlign: 'center' }),
    },
    {
      icon: <AlignRight className="size-4 text-black dark:text-white hover:text-primary"/>,
      onClick: () => editor.chain().focus().setTextAlign('right').run(),
      isActive: () => editor.isActive({ textAlign: 'right' }),
    },
    {
      icon: <List className="size-4 text-black dark:text-white hover:text-primary"/>,
      onClick: () => editor.chain().focus().toggleBulletList().run(),
      isActive: () => editor.isActive('bulletList'),
    },
    {
      icon: <ListOrdered className="size-4 text-black dark:text-white hover:text-primary"/>,
      onClick: () => editor.chain().focus().toggleOrderedList().run(),
      isActive: () => editor.isActive('orderedList'),
    },
    {
      icon: <Quote className="size-4 text-black dark:text-white hover:text-primary"/>,
      onClick: () => editor.chain().focus().toggleBlockquote().run(),
      isActive: () => editor.isActive('blockquote'),
    },
    {
      icon: <Code className="size-4 text-black dark:text-white hover:text-primary"/>,
      onClick: () => editor.chain().focus().toggleCodeBlock().run(),
      isActive: () => editor.isActive('codeBlock'),
    },
    {
      icon: <Highlighter className="size-4 text-black dark:text-white hover:text-primary"/>,
      onClick: () => editor.chain().focus().toggleHighlight().run(),
      isActive: () => editor.isActive('highlight'),
    },
  ];

  return (
    <div className="flex flex-wrap items-center gap-2 mb-2 p-2 rounded-md bg-gray-100 dark:bg-gray-800 shadow-custom">
      {items.map((item, index) => (
        <Toggle
          key={index}
          pressed={item.isActive?.() ?? false}
          onPressedChange={item.onClick}
        >
          {item.icon}
        </Toggle>
      ))}
    </div>
  );
}
