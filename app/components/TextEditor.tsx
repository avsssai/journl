// app/components/Editor.tsx
import React, { useState } from "react";
import "react-quill/dist/quill.snow.css"; // Import the styles
import ReactQuill from "react-quill";

const Editor = () => {
  const [value, setValue] = useState("");
  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image", "video"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
  ];

  return (
    <div>
      <ReactQuill
        value={value}
        onChange={setValue}
        modules={modules}
        formats={formats}
      />
      );
    </div>
  );
};

export default Editor;
