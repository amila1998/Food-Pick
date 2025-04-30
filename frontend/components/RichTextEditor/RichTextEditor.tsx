'use client'

import React from 'react'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TextAlign from '@tiptap/extension-text-align'
import Highlight from '@tiptap/extension-highlight'
import Underline from '@tiptap/extension-underline'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import Placeholder from '@tiptap/extension-placeholder'
import Color from '@tiptap/extension-color'
import TextStyle from '@tiptap/extension-text-style'
import FontFamily from '@tiptap/extension-font-family'
import Superscript from '@tiptap/extension-superscript'
import Subscript from '@tiptap/extension-subscript'
import Table from '@tiptap/extension-table'
import TableRow from '@tiptap/extension-table-row'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { common, createLowlight } from 'lowlight'

import MenuBar from './menu-bar'

const lowlight = createLowlight(common)

interface RichTextEditorProps {
  content: string
  onChange: (value: string) => void
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ content, onChange }) => {
const editor = useEditor({
    extensions: [
        StarterKit.configure({
            heading: {
                levels: [1, 2, 3], // Allow up to 3 heading levels
            },
            bulletList: {
                HTMLAttributes: { class: 'list-disc ml-5' },
            },
            orderedList: {
                HTMLAttributes: { class: 'list-decimal ml-5' },
            },
        }),
        TextAlign.configure({
            types: ['heading', 'paragraph'],
        }),
        Highlight,
        Underline,
        Link.configure({
            openOnClick: true,
        }),
        Image.configure({
            inline: false,
            allowBase64: true,
        }),
        Color,
        TextStyle,
        FontFamily,
        Superscript,
        Subscript,
        Placeholder.configure({
            placeholder: 'Start writing your blog...',
        }),
        Table.configure({
            resizable: true,
        }),
        TableRow,
        TableHeader,
        TableCell,
        CodeBlockLowlight.configure({
            lowlight,
        }),
    ],
    content: content,
    editorProps: {
        attributes: {
            class:
                'min-h-[160px] block w-full p-5 rounded-md bg-gray-100 dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-primary transition-all',
        },
    },
    onUpdate: ({ editor }) => {
        onChange(editor.getHTML())
    },
})

  return (
    <div>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  )
}

export default RichTextEditor
