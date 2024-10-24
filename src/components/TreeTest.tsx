import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { GroupType } from '../types';

interface TreeTestProps {
  groups: GroupType[];
}

const TreeTest: React.FC<TreeTestProps> = ({ groups }) => {
  const [openGroups, setOpenGroups] = useState<number[]>([]);

  const toggleGroup = (groupId: number) => {
    setOpenGroups(prev => 
      prev.includes(groupId)
        ? prev.filter(id => id !== groupId)
        : [...prev, groupId]
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8 text-left text-blue-500">Information Architecture Tree Test</h1>
      <div className="bg-white rounded-lg shadow-md">
        {groups.map(group => (
          <div key={group.id} className="border-b last:border-b-0">
            <button
              onClick={() => toggleGroup(group.id)}
              className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
            >
              <span className="text-lg font-medium text-gray-800">{group.name}</span>
              {openGroups.includes(group.id) ? (
                <ChevronDown className="text-gray-500" size={20} />
              ) : (
                <ChevronRight className="text-gray-500" size={20} />
              )}
            </button>
            {openGroups.includes(group.id) && (
              <div className="bg-gray-50 px-4 py-2">
                {group.cards.map(card => (
                  <div
                    key={card.id}
                    className="py-2 px-6 text-gray-600 hover:text-blue-500 cursor-pointer transition-colors"
                  >
                    {card.content}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TreeTest;