export interface CardType {
  id: number
  content: string
}

export interface GroupType {
  id: number
  name: string
  cards: CardType[]
}