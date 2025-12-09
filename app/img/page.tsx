"use client"

import { useEditor, EditorContent } from '@tiptap/react'
import { StarterKit } from '@tiptap/starter-kit'
import { Image } from '@/components/tiptap-node/image-node/image-node-extension'

export default function ImageEditor() {
    const editor = useEditor({
        immediatelyRender: false,
        extensions: [
            StarterKit,
            Image.configure({
                HTMLAttributes: {
                    class: 'custom-image-class',
                },
            }),
        ],
        content: '<img src="/images/tiptap.png" alt="Image" data-align="center" /><p>hello122 world</p>',
    })

    return  <EditorContent editor={editor} className={'w-100 mx-auto'} />

}