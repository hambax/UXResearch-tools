import React from 'react';
import { useDrag } from 'react-dnd';

interface CardProps {
  id: number;
  content: string;
  onDrop: (cardId: number, toGroupId: number) => void; // Updated prop type
}

const Card: React.FC<CardProps> = ({ id, content, onDrop }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'card',
    item: { id },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult<{ groupId: number }>();
      if (item && dropResult) {
        onDrop(item.id, dropResult.groupId); // Pass groupId to onDrop
      }
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`bg-white p-3 rounded-md shadow-sm cursor-move ${
        isDragging ? 'opacity-50' : 'opacity-100'
      } hover:shadow-md transition-shadow`}
    >
      {content}
    </div>
  );
};

export default Card;