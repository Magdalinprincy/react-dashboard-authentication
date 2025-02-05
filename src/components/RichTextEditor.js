import React, { useState, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Box } from '@mui/material';

const RichTextEditor = () => {
  const [editorValue, setEditorValue] = useState('');
  const quillRef = useRef(null); // Reference to the Quill editor

  const handleChange = (value) => {
    setEditorValue(value);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: 'rgb(247, 241, 220)',
        padding: '40px',
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: '900px',
          backgroundColor: 'rgb(247, 241, 220)',
          borderRadius: '10px',
          padding: '15px',
          border: '2px solid rgb(58, 31, 140)',
          transition: 'all 0.3s ease',
          '&:hover': {
            border: '2px solid rgb(58, 31, 140)',
            boxShadow: '0px 6px 12px rgba(58, 31, 140, 0.3)',
          },
        }}
      >
        <ReactQuill
          ref={quillRef} // Attach Quill instance reference
          value={editorValue}
          onChange={handleChange}
          modules={{
            toolbar: {
              container: [
                [{ header: [1, 2, 3, false] }],
                ['bold', 'italic', 'underline', 'strike'],
                [{ color: [] }, { background: [] }],
                [{ align: [] }],
                ['link'],
                ['clean'],
              ],
            },
          }}
          formats={['header', 'bold', 'italic', 'underline', 'strike', 'color', 'background', 'align', 'link']}
          theme="snow"
          style={{
            fontSize: '16px',
            fontFamily: 'Afacad, sans-serif',
            color: 'rgb(58, 31, 140)',
            backgroundColor: 'rgb(247, 241, 220)',
            border: 'none',
            outline: 'none',
            height: '300px',
            minHeight: '300px',
            paddingBottom: '1px',
          }}
        />
      </Box>
    </Box>
  );
};

export default RichTextEditor;