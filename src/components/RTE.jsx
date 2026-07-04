import React from 'react'
import { Editor } from '@tinymce/tinymce-react' // the real help for the rich text editor
import { Controller } from 'react-hook-form'

export default function RTE({ label, name, control, defaultValue }) {
  return (
    <div className='w-full'>
      {label && <label className='mb-2 block text-sm font-medium text-richblack-50'>{label}</label>}
      <Controller
        name={name || 'content'}
        control={control}
        render={({ field: { onChange } }) => (
          <Editor
            apiKey='34243xff1o31zbtffwhyx38jbx8z61iv2mo77b3cporzqydc'
            initialValue={defaultValue}
            init={{
              height: 500,
              menubar: true,
              plugins: [
                'anchor',
                'autolink',
                'charmap',
                'codesample',
                'emoticons',
                'link',
                'lists',
                'media',
                'searchreplace',
                'table',
                'visualblocks',
                'wordcount',
                'image',
                'advlist',
                'preview',
                'code',
                'fullscreen',
                'insertdatetime',
                'help',
              ],
              toolbar:
                'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table codesample | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat help',
              content_style: 'body { font-family: Inter, Helvetica, Arial, sans-serif; font-size: 16px; line-height: 1.7; }',
            }}
            onEditorChange={onChange}
          />
        )}
      />
    </div>
  )
}
/*
Why this file is needed:
In a blog app, you need a rich editor for writing posts. Without it, users could only write plain text. With this component, they can:
✓ Make text bold, italic, strikethrough
✓ Create bullet lists
✓ Insert images and links
✓ Change text alignment
✓ Add tables
*/
