import React, { useState } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Card from './components/Card'
import Group from './components/Group'
import AddGroupModal from './components/AddGroupModal'
import AddCardModal from './components/AddCardModal'
import Navigation from './components/Navigation'
import TreeTest from './components/TreeTest'
import FirstClick from './components/FirstClick'
import { CardType, GroupType } from './types'
import { Plus, RotateCcw, Download } from 'lucide-react'

const initialCards: CardType[] = [
  { id: 1, content: 'Name' },
  { id: 2, content: 'Email' },
  { id: 3, content: 'Phone' },
  { id: 4, content: 'Location' },
  { id: 5, content: 'KiwiSaver' },
  { id: 6, content: 'Bank Account' },
  { id: 7, content: 'IRD Number' },
  { id: 8, content: 'Date of Birth' },
  { id: 9, content: 'Emergency Contact' },
  { id: 10, content: 'Tax Code' },
  { id: 11, content: 'Salary' },
  { id: 12, content: 'Start Date' },
  { id: 13, content: 'Employee ID' },
  { id: 14, content: 'Job Title' },
  { id: 15, content: 'Department' },
  { id: 16, content: 'Regular Deductions' },
  { id: 17, content: 'Nationality' },
  { id: 18, content: 'Work Visa Details' },
  { id: 19, content: 'Education' },
  { id: 20, content: 'Tax exemption status' },
  { id: 21, content: 'Car allowance' },
  { id: 22, content: 'Regular Work pattern' },
  { id: 23, content: 'PIR' }
]

const initialGroups: GroupType[] = [
  { id: 1, name: 'Personal Details', cards: [] },
  { id: 2, name: 'Financial Information', cards: [] },
  { id: 3, name: 'Employment Details', cards: [] },
  { id: 4, name: 'Contact Information', cards: [] },
  { id: 5, name: 'Tax Info', cards: [] }
]

function App() {
  const [cards, setCards] = useState<CardType[]>(initialCards)
  const [groups, setGroups] = useState<GroupType[]>(initialGroups)
  const [isGroupModalOpen, setIsGroupModalOpen] = useState(false)
  const [isCardModalOpen, setIsCardModalOpen] = useState(false)

  const moveCard = (cardId: number, fromGroupId: number | null, toGroupId: number) => {
    let movedCard: CardType | undefined

    if (fromGroupId === null) {
      movedCard = cards.find(card => card.id === cardId)
      if (movedCard) {
        setCards(prevCards => prevCards.filter(card => card.id !== cardId))
      }
    } else {
      setGroups(prevGroups => {
        const updatedGroups = prevGroups.map(group => {
          if (group.id === fromGroupId) {
            movedCard = group.cards.find(card => card.id === cardId)
            return { ...group, cards: group.cards.filter(card => card.id !== cardId) }
          }
          return group
        })
        return updatedGroups
      })
    }

    if (movedCard) {
      setGroups(prevGroups => prevGroups.map(group => {
        if (group.id === toGroupId) {
          return { ...group, cards: [...group.cards, movedCard!] }
        }
        return group
      }))
    }
  }

  const addGroup = (name: string) => {
    const newGroup: GroupType = {
      id: groups.length + 1,
      name,
      cards: []
    }
    setGroups([...groups, newGroup])
    setIsGroupModalOpen(false)
  }

  const addCard = (content: string) => {
    const newCard: CardType = {
      id: Math.max(...cards.map(card => card.id), ...groups.flatMap(group => group.cards.map(card => card.id))) + 1,
      content
    }
    setCards([...cards, newCard])
    setIsCardModalOpen(false)
  }

  const startOver = () => {
    setCards(initialCards)
    setGroups(initialGroups)
  }

  const exportResults = () => {
    const csvContent = groups.map(group => {
      return `"${group.name}","${group.cards.map(card => card.content).join('","')}"`
    }).join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob)
      link.setAttribute('href', url)
      link.setAttribute('download', 'card_sort_results.csv')
      link.style.visibility = 'hidden'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  const CardSortView = () => (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-12 text-left text-blue-500">Employee Record Card Sort</h1>
      <div className="flex justify-between mb-4">
        <div className="space-x-2">
          <button
            onClick={() => setIsCardModalOpen(true)}
            className="border border-blue-500 text-blue-500 px-4 py-2 rounded hover:bg-blue-100 transition-colors"
          >
            <Plus size={24} className="inline mr-2" />
            Add Card
          </button>
          <button
            onClick={() => setIsGroupModalOpen(true)}
            className="border border-blue-500 text-blue-500 px-4 py-2 rounded hover:bg-blue-100 transition-colors"
          >
            <Plus size={24} className="inline mr-2" />
            Add Group
          </button>
          <button
            onClick={startOver}
            className="border border-blue-500 text-blue-500 px-4 py-2 rounded hover:bg-blue-100 transition-colors"
          >
            <RotateCcw size={24} className="inline mr-2" />
            Start Over
          </button>
        </div>
        <button
          onClick={exportResults}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
        >
          <Download size={24} className="inline mr-2" />
          Export Results
        </button>
      </div>
      <div className="flex flex-wrap gap-4 mb-8 justify-start">
        {cards.map(card => (
          <Card key={card.id} id={card.id} content={card.content} onDrop={(cardId) => moveCard(cardId, null, -1)} />
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {groups.map(group => (
          <Group
            key={group.id}
            id={group.id}
            name={group.name}
            cards={group.cards}
            onDrop={(cardId, fromGroupId) => moveCard(cardId, fromGroupId, group.id)}
          />
        ))}
      </div>
      <AddGroupModal
        isOpen={isGroupModalOpen}
        onClose={() => setIsGroupModalOpen(false)}
        onSave={addGroup}
      />
      <AddCardModal
        isOpen={isCardModalOpen}
        onClose={() => setIsCardModalOpen(false)}
        onSave={addCard}
      />
    </div>
  )

  return (
    <DndProvider backend={HTML5Backend}>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navigation />
          <div className="mt-12">
            <Routes>
              <Route path="/" element={<CardSortView />} />
              <Route path="/tree-test" element={<TreeTest groups={groups} />} />
              <Route path="/first-click" element={<FirstClick />} />
            </Routes>
          </div>
        </div>
      </Router>
    </DndProvider>
  )
}

export default App