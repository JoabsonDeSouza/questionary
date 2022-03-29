import { Question } from './question'

export interface ResultQuestionary {
  response_code: number
  results: Question[]
}
