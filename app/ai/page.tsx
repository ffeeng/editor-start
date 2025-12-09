"use client"

import { EditorContent, EditorContext, useEditor } from '@tiptap/react'

// --- Tiptap Core Extensions ---
import { StarterKit } from '@tiptap/starter-kit'
import { Ai } from '@tiptap-pro/extension-ai'
import { UiState } from '@/components/tiptap-extension/ui-state-extension'

import { HorizontalRule } from '@/components/tiptap-node/horizontal-rule-node/horizontal-rule-node-extension'
import { Selection } from '@tiptap/extensions'
// import { AiProvider, useAi } from '@/components/contexts/ai-context'

// --- Tiptap UI ---
import { AiMenu } from '@/components/tiptap-ui/ai-menu'
import { AiAskButton } from '@/components/tiptap-ui/ai-ask-button'

// --- UI Primitive ---
import { ButtonGroup } from '@/components/tiptap-ui-primitive/button'

// --- Utils ---
// import { TIPTAP_AI_APP_ID } from '@/lib/tiptap-collab-utils'

// --- Tiptap Node ---
import '@/components/tiptap-node/blockquote-node/blockquote-node.scss'
import '@/components/tiptap-node/code-block-node/code-block-node.scss'
import '@/components/tiptap-node/horizontal-rule-node/horizontal-rule-node.scss'
import '@/components/tiptap-node/heading-node/heading-node.scss'
import '@/components/tiptap-node/paragraph-node/paragraph-node.scss'

// export const AiMenuExample = () => {
//     return (
//         <AiProvider>
//             <AiEditorWrapper />
//         </AiProvider>
//     )
// }

const TIPTAP_AI_APP_ID = 'abc'

// eslint-disable-next-line react/display-name
export default  () => {
    return <AiEditorWrapper />
}

const AiEditorWrapper = () => {
    // const { aiToken } = useAi()
    const aiToken = 'aa'

    if (!aiToken) {
        return <div className="tiptap-editor-wrapper">Loading AI...</div>
    }

    return <AiEditor aiToken={aiToken} />
}

const AiEditor = ({ aiToken }: { aiToken: string }) => {
    const editor = useEditor({
        immediatelyRender: false,
        extensions: [
            StarterKit.configure({
                horizontalRule: false,
            }),
            HorizontalRule,
            Selection,
            UiState,
            Ai.configure({
                appId: TIPTAP_AI_APP_ID,
                token: aiToken,
                autocompletion: false,
                showDecorations: true,
                hideDecorationsOnStreamEnd: false,
                onLoading: (context) => {
                    context.editor.commands.aiGenerationSetIsLoading(true)
                    context.editor.commands.aiGenerationHasMessage(false)
                },
                onChunk: (context) => {
                    context.editor.commands.aiGenerationSetIsLoading(true)
                    context.editor.commands.aiGenerationHasMessage(true)
                },
                onSuccess: (context) => {
                    const hasMessage = !!context.response
                    context.editor.commands.aiGenerationSetIsLoading(false)
                    context.editor.commands.aiGenerationHasMessage(hasMessage)
                },
            }),
        ],
        content: `
<p>Today, we're exploring how AI is transforming creative workflows. From writing assistance to intelligent summarization, the tools at our fingertips are evolving fast. But how do we use them responsibly?</p>
<p>In this article, we’ll look at real-world examples of AI enhancing—not replacing—human creativity.</p>
        `,
    })

    return (
        <EditorContext.Provider value={{ editor }}>
            <div className="controls-bar w-100 mx-auto">
                <div className="control-item">
                    <ButtonGroup orientation="horizontal">
                        <AiAskButton />
                    </ButtonGroup>
                </div>
            </div>

            <EditorContent editor={editor} role="presentation" className="control-showcase w-100 mx-auto">
                <AiMenu />
            </EditorContent>
        </EditorContext.Provider>
    )
}