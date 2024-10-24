import React, { useState } from 'react'

interface AddGroupModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (name: string) => void
}

const AddGroupModal: React.FC<AddGroupModalProps> = ({ isOpen, onClose, onSave }) => {
  const [groupName, setGroupName] = useState('')

  if (!isOpen) return null

  const handleSave = () => {
    if (groupName.trim()) {
      onSave(groupName.trim())
      setGroupName('')
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Add New Group</h2>
        <input
          type="text"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          placeholder="Enter group name"
          className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddGroupModal