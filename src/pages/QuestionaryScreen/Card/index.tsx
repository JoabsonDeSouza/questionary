import React, { useState, ChangeEvent } from 'react'
import { Option } from '../../../model/option'
import { Question } from '../../../model/question'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import he from 'he'
import { UserAnswer } from '../../../model/userAnswer'

interface CardProps {
  question: Question
  numberQuestion: number
  listQuestions: Option[]
  handleUserResponse: (response: UserAnswer) => void
}

const Card = ({
  question,
  numberQuestion,
  listQuestions,
  handleUserResponse
}: CardProps) => {
  const [value, setValue] = useState('')
  const [disable, setDisabled] = useState(false)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()

    const { value } = event.target

    const answerCorrect = listQuestions.filter(answer => answer.correctAnswer)

    const userAnswer: UserAnswer = {
      question: question.question,
      questionCorrect: answerCorrect[0],
      user_answer: `${value}`,
      id: numberQuestion,
      user_correct: value === answerCorrect[0].value
    }

    handleUserResponse(userAnswer)
    setValue(event.target.value)
    setDisabled(true)
  }

  return (
    <div>
      <h1>{`Question Nº ${numberQuestion}`}</h1>
      <h3>{`Level Question: ${question.difficulty}`}</h3>

      <FormControl component="fieldset">
        <FormLabel component="legend">{he.decode(question.question)}</FormLabel>
        <RadioGroup
          aria-label="gender"
          name="gender1"
          value={value}
          onChange={handleChange}
        >
          {listQuestions.map(option => (
            <FormControlLabel
              key={option.value}
              value={option.value}
              control={<Radio />}
              label={he.decode(option.label)}
              disabled={disable}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </div>
  )
}

export default Card
