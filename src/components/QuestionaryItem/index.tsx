import React, { useState, ChangeEvent } from 'react'
import { Option } from '../../model/option'
import { Question } from '../../model/question'
import he from 'he'
import { UserAnswer } from '../../model/userAnswer'
import * as DS from '@material-ui/core'
import { green } from '@material-ui/core/colors'

interface CardProps {
  question: Question
  numberQuestion: number
  listQuestions: Option[]
  handleUserResponse: (response: UserAnswer) => void
}

const GreenRadio = DS.withStyles({
  root: {
    color: green[400],
    '&$checked': {
      color: green[600]
    }
  },
  checked: {}
})(props => <DS.Radio color="default" {...props} />)

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
    <DS.Box
      display="flex"
      bgcolor="white"
      flexDirection="column"
      marginBottom={4}
    >
      <DS.Typography
        variant="h5"
        color="primary"
      >{`Question Nº ${numberQuestion}`}</DS.Typography>
      <DS.Box marginTop={1} marginBottom={1}>
        <DS.Typography variant="body2">{`Level Question: ${question.difficulty}`}</DS.Typography>
      </DS.Box>
      <DS.FormControl component="fieldset">
        <DS.Typography variant="h6">
          {he.decode(question.question)}
        </DS.Typography>
        <DS.RadioGroup
          aria-label="gender"
          name="gender1"
          value={value}
          onChange={handleChange}
        >
          {listQuestions.map(option => (
            <DS.FormControlLabel
              key={option.value}
              value={option.value}
              control={<GreenRadio />}
              label={he.decode(option.label)}
              disabled={disable}
            />
          ))}
        </DS.RadioGroup>
      </DS.FormControl>
    </DS.Box>
  )
}

export default Card
