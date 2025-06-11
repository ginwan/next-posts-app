import { Bold, Heading2, Italic, Strikethrough } from 'lucide-react'
import { type Editor } from '@tiptap/react'
import { Toggle } from './ui/toggle'

type Props = {
    editor: Editor | null
}
const ToolbarComponent = ({ editor }: Props) => {
    return (
        <div className="border border-input bg-transparent rounded-md">
            <Toggle
                size="sm"
                pressed={editor?.isActive("heading")}
                onPressedChange={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
            >
                <Heading2 />
            </Toggle>
            <Toggle
                size="sm"
                pressed={editor?.isActive("bold")}
                onPressedChange={() => editor?.chain().focus().toggleBold().run()}
            >
                <Bold />
            </Toggle>
            <Toggle
                size="sm"
                pressed={editor?.isActive("italic")}
                onPressedChange={() => editor?.chain().focus().toggleItalic().run()}
            >
                <Italic />
            </Toggle>
            <Toggle
                size="sm"
                pressed={editor?.isActive("strike")}
                onPressedChange={() => editor?.chain().focus().toggleStrike().run()}
            >
                <Strikethrough />
            </Toggle>
        </div>
    )
}

export default ToolbarComponent;
