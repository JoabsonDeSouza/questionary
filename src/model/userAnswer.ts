import { Option } from './option'

export interface UserAnswer {
  id: number
  question: string
  user_answer: string
  questionCorrect: Option
  user_correct: boolean
}
