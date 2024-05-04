'use client'
import { useEffect } from 'react'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import Underline from '@tiptap/extension-underline'
import Blockquote from '@tiptap/extension-blockquote'
import Subscript from '@tiptap/extension-subscript'
import Superscript from '@tiptap/extension-superscript'
import TextAlign from '@tiptap/extension-text-align'
import Document from '@tiptap/extension-document'

import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatStrikethroughIcon from '@mui/icons-material/FormatStrikethrough';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import InsertPageBreakIcon from '@mui/icons-material/InsertPageBreak';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import CodeIcon from '@mui/icons-material/Code';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import UndoIcon from '@mui/icons-material/Undo';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
import RedoIcon from '@mui/icons-material/Redo';
import LayersClearIcon from '@mui/icons-material/LayersClear';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import SegmentIcon from '@mui/icons-material/Segment';
import SubscriptIcon from '@mui/icons-material/Subscript';
import SuperscriptIcon from '@mui/icons-material/Superscript';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';


const MenuBar = ({ editor }) => {
    if (!editor) {
      return null
    }
  
  
    return (
        <div className='mb-4 flex flex-row w-full justify-items-stretch'>
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleBold()
            .run()
        }
        className={editor.isActive('bold') ? 'text-black bg-white border border-white rounded-md p-1 mr-2' : 'border border-white rounded-md p-1 mr-2 opacity-40 hover:opacity-100'}
      >
        <FormatBoldIcon style={{ fontSize: 20}} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleItalic()
            .run()
        }
        className={editor.isActive('italic') ? 'text-black bg-white border border-white rounded-md p-1 mr-2' : 'opacity-40 hover:opacity-100 border border-white rounded-md p-1 mr-2'}
      >
        <FormatItalicIcon style={{ fontSize: 20}}/>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleStrike()
            .run()
        }
        className={editor.isActive('strike') ? 'text-black bg-white border border-white rounded-md p-1 mr-2' : 'opacity-40 hover:opacity-100 border border-white rounded-md p-1 mr-2'}
      >
        <FormatStrikethroughIcon style={{ fontSize: 20}}/>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleUnderline()
            .run()
        }
        className={editor.isActive('underline') ? 'text-black bg-white border border-white rounded-md p-1 mr-2' : 'opacity-40 hover:opacity-100 border border-white rounded-md p-1 mr-2'}
      >
        <FormatUnderlinedIcon style={{ fontSize: 20}}/>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleSubscript().run()}
        className={editor.isActive('subscript') ? 'text-black bg-white border border-white rounded-md p-1 mr-2' : 'opacity-40 hover:opacity-100 border border-white rounded-md p-1 mr-2'}
      >
        <SubscriptIcon style={{ fontSize: 20}}/>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleSuperscript().run()}
        className={editor.isActive('superscript') ? 'text-black bg-white border border-white rounded-md p-1 mr-2' : 'opacity-40 hover:opacity-100 border border-white rounded-md p-1 mr-2'}
      >
        <SuperscriptIcon style={{ fontSize: 20}}/>
      </button>

      <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleCode()
            .run()
        }
        className={editor.isActive('code') ? 'text-black bg-white border border-white rounded-md p-1 mr-2' : 'opacity-40 hover:opacity-100 border border-white rounded-md p-1 mr-2'}
      >
        <CodeIcon style={{ fontSize: 20}}/>
      </button>
      <button 
        onClick={() => editor.chain().focus().unsetAllMarks().run()}
        className={'hover:text-black hover:bg-white opacity-40 hover:opacity-100 border border-white rounded-md p-1 mr-2'}
      >
        <DisabledByDefaultIcon style={{ fontSize: 20}}/>
      </button>
      <button 
        onClick={() => editor.chain().focus().clearNodes().run()}
        className={'hover:text-black hover:bg-white opacity-40 hover:opacity-100 border border-white rounded-md p-1 mr-2'}
      >
        <LayersClearIcon />
      </button>
      <button
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={editor.isActive('paragraph') ? 'hidden text-black bg-white border border-white rounded-md p-1 mr-2' : 'hidden opacity-40 hover:opacity-100 border border-white rounded-md p-1 mr-2'}
      >
        <SegmentIcon style={{ fontSize: 20}}/>
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign('left').run()}
        className={editor.isActive({ textAlign: 'left' }) ? 'text-black bg-white border border-white rounded-md p-1 mr-2' : 'opacity-40 hover:opacity-100 border border-white rounded-md p-1 mr-2'}
      >
        <FormatAlignLeftIcon style={{ fontSize: 20}} />
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign('center').run()}
        className={editor.isActive({ textAlign: 'center' }) ? 'text-black bg-white border border-white rounded-md p-1 mr-2' : 'opacity-40 hover:opacity-100 border border-white rounded-md p-1 mr-2'}
      >
        <FormatAlignCenterIcon style={{ fontSize: 20}} />
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign('right').run()}
        className={editor.isActive({ textAlign: 'right' }) ? 'text-black bg-white border border-white rounded-md p-1 mr-2' : 'opacity-40 hover:opacity-100 border border-white rounded-md p-1 mr-2'}
      >
        <FormatAlignRightIcon style={{ fontSize: 20}} />
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign('justify').run()}
        className={editor.isActive({ textAlign: 'justify' }) ? 'text-black bg-white border border-white rounded-md p-1 mr-2' : 'opacity-40 hover:opacity-100 border border-white rounded-md p-1 mr-2'}
      >
        <FormatAlignJustifyIcon style={{ fontSize: 20}} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={editor.isActive('heading', { level: 1 }) ? 'text-black bg-white border border-white rounded-md p-1 mr-2' : 'opacity-40 hover:opacity-100 border border-white rounded-md p-1 mr-2'}
      >
        h1
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive('heading', { level: 2 }) ? 'text-black bg-white border border-white rounded-md p-1 mr-2' : 'opacity-40 hover:opacity-100 border border-white rounded-md p-1 mr-2'}
      >
        h2
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={editor.isActive('heading', { level: 3 }) ? 'text-black bg-white border border-white rounded-md p-1 mr-2' : 'opacity-40 hover:opacity-100 border border-white rounded-md p-1 mr-2'}
      >
        h3
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={editor.isActive('heading', { level: 4 }) ? 'text-black bg-white border border-white rounded-md p-1 mr-2' : 'opacity-40 hover:opacity-100 border border-white rounded-md p-1 mr-2'}
      >
        h4
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        className={editor.isActive('heading', { level: 5 }) ? 'text-black bg-white border border-white rounded-md p-1 mr-2' : 'opacity-40 hover:opacity-100 border border-white rounded-md p-1 mr-2'}
      >
        h5
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        className={editor.isActive('heading', { level: 6 }) ? 'text-black bg-white border border-white rounded-md p-1 mr-2' : 'opacity-40 hover:opacity-100 border border-white rounded-md p-1 mr-2'}
      >
        h6
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive('bulletList') ? 'text-black bg-white border border-white rounded-md p-1 mr-2' : 'opacity-40 hover:opacity-100 border border-white rounded-md p-1 mr-2'}
      >
        <FormatListBulletedIcon style={{ fontSize: 20}}/>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive('orderedList') ? 'text-black bg-white border border-white rounded-md p-1 mr-2' : 'opacity-40 hover:opacity-100 border border-white rounded-md p-1 mr-2'}
      >
        <FormatListNumberedIcon style={{ fontSize: 20}}/>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={editor.isActive('codeBlock') ? 'text-black bg-white border border-white rounded-md p-1 mr-2' : 'opacity-40 hover:opacity-100 border border-white rounded-md p-1 mr-2'}
      >
        <IntegrationInstructionsIcon style={{ fontSize: 20}}/>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive('blockquote') ? 'text-black bg-white border border-white rounded-md p-1 mr-2' : 'opacity-40 hover:opacity-100 border border-white rounded-md p-1 mr-2'}
      >
        <FormatQuoteIcon style={{ fontSize: 20}}/>
      </button>
      <button 
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        className={'hover:text-black hover:bg-white opacity-40 hover:opacity-100 border border-white rounded-md p-1 mr-2'}
      >
        <HorizontalRuleIcon style={{ fontSize: 20}}/>
      </button>
      <button 
        onClick={() => editor.chain().focus().setHardBreak().run()}
        className={'hover:text-black hover:bg-white opacity-40 hover:opacity-100 border border-white rounded-md p-1 mr-2'}
      >
        <InsertPageBreakIcon style={{ fontSize: 20}}/>
      </button>
      <button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .undo()
            .run()
        }
        className={'hover:text-black hover:bg-white opacity-40 hover:opacity-100 border border-white rounded-md p-1 mr-2'}
      >
        <UndoIcon style={{ fontSize: 20}}/>
      </button>
      <button
        onClick={() => editor.chain().focus().redo().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .redo()
            .run()
        }
        className={'hover:text-black hover:bg-white opacity-40 hover:opacity-100 border border-white rounded-md p-1 mr-2'}
      >
        <RedoIcon style={{ fontSize: 20}}/>
      </button>
      {/* <input
        type="color"
        onInput={event => editor.chain().focus().setColor(event.target.value).run()}
        value={editor.getAttributes('textStyle').color}
        data-testid="setColor"
        className='w-9 h-9 p-1'
      /> */}


        </div>
    )
}
  
const Tiptap = ({ onEditorRender }) => {


  const editor = useEditor({
    extensions: [
      Placeholder.configure({
        placeholder: 'Write something .....',
      }),   
      Color.configure({ types: [TextStyle.name, ListItem.name] }),
      TextStyle.configure({ types: [ListItem.name] }),
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
      Blockquote.configure({
        HTMLAttributes: {
          class: 'text-black',
        },
      }),
      Color.configure({
        types: ['textStyle'],
      }),
      Subscript,
      Superscript,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Document.configure({
        HTMLAttributes: {
          class: ''
        }
      }),
      
    ],  
    // content: '<p>Hello World! 🌎️</p>',
    editorProps: {
        attributes: {
          class: 'text-black prose prose-sm sm:prose-base lg:prose-lg focus:outline-none w-full m-0',          
        },
      }
  
  })

  useEffect(() => {
    onEditorRender(editor);
  }, [onEditorRender]);

  return (
    <div className='w-full h-full flex flex-col p-4'>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} className='bg-white bg-opacity-20 h-full rounded-lg p-4 focus:outline-none overflow-scroll'/>
    </div>

  )
}

export default Tiptap