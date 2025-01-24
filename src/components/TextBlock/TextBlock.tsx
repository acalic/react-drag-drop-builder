import React, { useState, useRef, useEffect } from 'react';

interface TextBlockProps {
  id: string;
  content: string;
  onContentChange: (id: string, content: string) => void;
}

const TextBlock: React.FC<TextBlockProps> = ({ id, content, onContentChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const textBlockRef = useRef<HTMLDivElement | null>(null);
  
  // Update local state when content prop changes
  useEffect(() => {
    if (textBlockRef.current && !isEditing) {
      textBlockRef.current.innerText = content;  // Sync content with state when focus is lost
    }
  }, [content, isEditing]);

  const handleBlur = () => {
    if (textBlockRef.current) {
      const updatedContent = textBlockRef.current.innerText;
      onContentChange(id, updatedContent); // Pass updated content to parent
    }
    setIsEditing(false);
  };

  const handleClick = () => {
    setIsEditing(true);
  };

  return (
    <div
      ref={textBlockRef}
      className="text-block border p-2 rounded"
      contentEditable
      suppressContentEditableWarning
      onBlur={handleBlur}  // Save content when focus is lost
      onClick={handleClick} // Allow clicking to start editing
    >
      {content}
    </div>
  );
};

export default TextBlock;
