import { UserAnswer } from './userAnswer'

export interface Report {
  totalCorrect: number
  totalIncorrect: number
  totalQuestions: number
  userAnswer: UserAnswer[]
  date: Date
}
