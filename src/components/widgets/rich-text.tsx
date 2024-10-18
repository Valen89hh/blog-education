"use client"

import '@/styles/post-styles.scss'

import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import Image from '@tiptap/extension-image'
import TextStyle from '@tiptap/extension-text-style'
import Document from '@tiptap/extension-document'
import Dropcursor from '@tiptap/extension-dropcursor'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import { EditorProvider, useCurrentEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import { Bold, Heading1, Heading2, Heading3, Image as ImageIcon, Italic, List, ListOrdered, SquareSplitVertical, Strikethrough, UnderlineIcon } from 'lucide-react'
import React, { useEffect, useRef } from 'react'
import Placeholder from '@tiptap/extension-placeholder'

const MenuBar = () => {
  const { editor } = useCurrentEditor()
  const fileRef = useRef<HTMLInputElement>(null)

  const addImage = () => {
    const url = window.prompt('URL')

    if (url && editor) {
        editor.chain().focus().setImage({ src: url }).run()
    }
  }


  if (!editor) {
    return null
  }

  return (
    <div className="flex flex-wrap sticky z-20 top-0 bg-slate-e px-8 py-2 items-center gap-1">
        <input ref={fileRef} style={{display: "none"}} type="file" accept='image/*' />
        <button
            type='button'
            onClick={() => editor.chain().focus().toggleHeading({level: 1}).run()}
            disabled={
                !editor.can()
                .chain()
                .focus()
                .toggleHeading({level: 1})
                .run()
            }
            className={`p-1 rounded-ms transition-all duration-200 
                        ${editor.isActive('heading', {level: 1}) ? 'bg-onyx-dark text-white' : 'bg-transparent text-onyx-dark'}
                    `}
        >
            <Heading1/>
        </button>
        <button
            type='button'
            onClick={() => editor.chain().focus().toggleHeading({level: 2}).run()}
            disabled={
                !editor.can()
                .chain()
                .focus()
                .toggleHeading({level: 1})
                .run()
            }
            className={`p-1 rounded-ms transition-all duration-200 
                        ${editor.isActive('heading', {level: 2}) ? 'bg-onyx-dark text-white' : 'bg-transparent text-onyx-dark'}
                    `}
        >
            <Heading2/>
        </button>
        <button
            type='button'
            onClick={() => editor.chain().focus().toggleHeading({level: 3}).run()}
            disabled={
                !editor.can()
                .chain()
                .focus()
                .toggleHeading({level: 1})
                .run()
            }
            className={`p-1 rounded-ms transition-all duration-200 
                        ${editor.isActive('heading', {level: 3}) ? 'bg-onyx-dark text-white' : 'bg-transparent text-onyx-dark'}
                    `}
        >
            <Heading3/>
        </button>
        <button
            type='button'
            onClick={() => editor.chain().focus().toggleBold().run()}
            disabled={
                !editor.can()
                .chain()
                .focus()
                .toggleBold()
                .run()
            }
            className={`p-1 rounded-ms transition-all duration-200 
                        ${editor.isActive('bold') ? 'bg-onyx-dark text-white' : 'bg-transparent text-onyx-dark'}
                    `}
        >
            <Bold/>
        </button>
        <button
            type='button'
            onClick={() => editor.chain().focus().toggleItalic().run()}
            disabled={
                !editor.can()
                .chain()
                .focus()
                .toggleItalic()
                .run()
            }
            className={`p-1 rounded-ms transition-all duration-200 
                        ${editor.isActive('italic') ? 'bg-onyx-dark text-white' : 'bg-transparent text-onyx-dark'}
                    `}
        >
            <Italic/>
        </button>
        <button
            type='button'
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            disabled={
                !editor.can()
                .chain()
                .focus()
                .toggleUnderline()
                .run()
            }
            className={`p-1 rounded-ms transition-all duration-200 
                        ${editor.isActive('underline') ? 'bg-onyx-dark text-white' : 'bg-transparent text-onyx-dark'}
                    `}
        >
            <UnderlineIcon/>
        </button>
        <button
            type='button'
            onClick={() => editor.chain().focus().toggleStrike().run()}
            disabled={
                !editor.can()
                .chain()
                .focus()
                .toggleStrike()
                .run()
            }
            className={`p-1 rounded-ms transition-all duration-200 
                        ${editor.isActive('strike') ? 'bg-onyx-dark text-white' : 'bg-transparent text-onyx-dark'}
                    `}
        >
            <Strikethrough/>
        </button>
        
        <button
            type='button'
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            disabled={
                !editor.can()
                .chain()
                .focus()
                .toggleOrderedList()
                .run()
            }
            className={`p-1 rounded-ms transition-all duration-200 
                        ${editor.isActive('orderedList') ? 'bg-onyx-dark text-white' : 'bg-transparent text-onyx-dark'}
                    `}
        >
            <ListOrdered/>
        </button>
        <button
            type='button'
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            disabled={
                !editor.can()
                .chain()
                .focus()
                .toggleBulletList()
                .run()
            }
            className={`p-1 rounded-ms transition-all duration-200 
                        ${editor.isActive('bulletList') ? 'bg-onyx-dark text-white' : 'bg-transparent text-onyx-dark'}
                    `}
        >
            <List/>
        </button>
        <button
            type='button'
            className='text-onyx-dark'
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
            <SquareSplitVertical />
        </button>
        <button
            type='button'
            className='text-onyx-dark'
            onClick={addImage}
        >
            <ImageIcon/>
        </button>

    </div>
  )
}

const extensions = [
  Color,
  TextStyle,
  ListItem, 
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
  }),
  Underline,
  Placeholder.configure({
    emptyEditorClass: 'is-editor-empty',
    placeholder: "Escribe aqui tu contenido"
  }),
  Image,
  Document,
  Text,
  Dropcursor,
  Paragraph
]

interface RichTextProps{
    onChange?: (value: string)=>void,
    content?: string
}


const RichText: React.FC<RichTextProps> = ({
    onChange,
    content
}) => {

    return (
        <div>
            <EditorProvider 
                slotBefore={<MenuBar />} 
                extensions={extensions} 
                content={content}
                immediatelyRender={false}
                editorProps={{
                    attributes: {
                        class: 'outline-none py-2 px-8 min-h-[15rem]', // Aplica la clase personalizada para estilos específicos
                    },
                }}
                onUpdate={({editor})=>{
                    if(onChange) {
                        if(!editor.getText()){
                            onChange("")
                        }else{
                            onChange(editor.getHTML())
                        } 
                    }
                    console.log(editor.getText())
                }}
            >
            </EditorProvider>
        </div>
    )
}

export default RichText;