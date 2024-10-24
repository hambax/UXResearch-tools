import React from 'react';
import { useDrop } from 'react-dnd';
import Card from './Card';
import { CardType } from '../types';

interface GroupProps {
  id: number;
  name: string;
  cards: CardType[];
  onDrop: (cardId: number, fromGroupId: number | null) => void;
}

const Group: React.FC<GroupProps> = ({ id, name, cards, onDrop }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'card',
    drop: (item: { id: number }) => {
      onDrop(item.id, null); // Handle drop from outside a group
    },
    hover: (item: { id: number }, monitor) => { 
      const draggedId = item.id;
      const fromGroup = cards.find(card => card.id === draggedId);
      if (fromGroup) {
        // Prevent dropping on the same group
        return; 
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className={`bg-white p-4 rounded-lg shadow-md ${
        isOver ? 'border-2 border-blue-500' : ''
      } transition-all duration-200 ease-in-out`}
    >
      <h2 className="text-xl font-semibold mb-4 text-gray-800">{name}</h2>
      <div className="space-y-2 min-h-[100px] max-h-[300px] overflow-y-auto scrollbar-hide">
        {cards.map((card) => (
          <Card key={card.id} id={card.id} content={card.content} onDrop={(cardId) => onDrop(cardId, id)} /> 
        ))}
      </div>
    </div>
  );
};

export default Group;