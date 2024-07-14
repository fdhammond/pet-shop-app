import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom for navigation

interface EditButtonProps {
  id: number; // Assuming id is a number
}

const EditButton: React.FC<EditButtonProps> = ({ id }) => {
  return (
    <Link to={`/edit-product/:${id}`}>
      Edit
    </Link>
  );
};

export default EditButton;
