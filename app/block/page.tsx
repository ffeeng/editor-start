"use client"

import { EditorContent, EditorContext, useEditor } from '@tiptap/react'
import { StarterKit } from '@tiptap/starter-kit'
import { Highlight } from '@tiptap/extension-highlight'
import { TextStyle } from '@tiptap/extension-text-style'
import { Color } from '@tiptap/extension-color'

// Custom extensions
import { UiState } from '@/components/tiptap-extension/ui-state-extension'
import { NodeBackground } from '@/components/tiptap-extension/node-background-extension'

// UI components
import { DragContextMenu } from '@/components/tiptap-ui/drag-context-menu'

// Editor styles
import '@/components/tiptap-node/paragraph-node/paragraph-node.scss'
import '@/components/tiptap-node/blockquote-node/blockquote-node.scss'
import '@/components/tiptap-node/code-block-node/code-block-node.scss'
import '@/components/tiptap-node/heading-node/heading-node.scss'
import '@/components/tiptap-node/horizontal-rule-node/horizontal-rule-node.scss'
import '@/components/tiptap-node/list-node/list-node.scss'

// Global styles
import '@/styles/_keyframe-animations.scss'
import '@/styles/_variables.scss'

export default function TiptapEditor() {
    const editor = useEditor({
        immediatelyRender: false,
        extensions: [
            // Base extensions
            StarterKit,

            // Text styling extensions which handle the "Colors" menu
            TextStyle,
            Highlight,
            Color,
            NodeBackground,

            // UI state management (REQUIRED for drag context menu)
            // This was installed automatically by the CLI
            UiState,
        ],
        content: `
      <h1>Welcome to Tiptap</h1>
      <p>Hover over any block to see the drag handle appear on the left.</p>
      <blockquote>
        <p>Click the drag handle to access the context menu.</p>
      </blockquote>
    `,
    })

    return (
        <EditorContext.Provider value={{ editor }} >
            <EditorContent editor={editor} className={'w-100 mx-auto'} />

            <DragContextMenu />
        </EditorContext.Provider>
    )
}