import { Question } from './question'
import { Option } from './option'

export interface QuestionaryOptions {
  list: Option[]
  question: Question
}
