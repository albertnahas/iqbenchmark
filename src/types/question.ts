export interface Question {
  id: number
  question: string
  question_line2: string
  answer: string
  userAnswer?: string
  hasFigure: boolean
  figureSize: string
  type: string
  shapesCount?: number | null
  category?: string
  choices: (string | number)[]
}
