import { Bold, Heading2, Italic, List, ListOrdered, Strikethrough } from 'lucide-react'
import { type Editor } from '@tiptap/react'
import { Toggle } from './ui/toggle'

type Props = {
    editor: Editor | null
}
const ToolbarComponent = ({ editor }: Props) => {
    return (
        <div className="border border-input bg-transparent">
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
            <Toggle
                size="sm"
                pressed={editor?.isActive("bulletList")}
                onPressedChange={() => editor?.chain().focus().toggleBulletList().run()}
            >
                <List />
            </Toggle>
            <Toggle
                size="sm"
                pressed={editor?.isActive("OrderedList")}
                onPressedChange={() => editor?.chain().focus().toggleOrderedList().run()}
            >
                <ListOrdered />
            </Toggle>
        </div>
    )
}

export default ToolbarComponent;
