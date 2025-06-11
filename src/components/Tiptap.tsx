'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import ToolbarComponent from './Toolbar'

type Props = {
    body: string
    onChange: (richText: string) => void
}

const Tiptap = ({ body, onChange }: Props) => {
    const editor = useEditor({
        extensions: [StarterKit],
        content: body,
        editorProps: {
            attributes: {
                class: 'p-2 focus:outline-none w-80 sm:w-[450px] break-words',
            },
        },
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML())
        },
    })

    if (!editor) return null

    return <>
        <ToolbarComponent editor={editor} />
        <EditorContent editor={editor} className='border rounded-md border-gray-300' />
    </>
}

export default Tiptap
