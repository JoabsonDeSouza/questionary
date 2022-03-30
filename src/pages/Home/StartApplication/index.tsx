import { useCallback, MouseEvent, ChangeEvent, useState } from 'react'
import { useApp } from '../../../context/app'
import * as DS from '@material-ui/core'

interface StartApplicationProps {
  setIsStartQuestionary: (isStartQuestionary: boolean) => void
}

const StartApplication = ({ setIsStartQuestionary }: StartApplicationProps) => {
  const [questionsQtd, setQuestionsQtd] = useState<string>('')

  const { updateQtdQuestions } = useApp()
  const [error, setError] = useState<boolean>(false)

  const handleStart = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      e.preventDefault()

      if (!questionsQtd) {
        setError(true)
        return
      }

      setIsStartQuestionary(true)
      updateQtdQuestions(Number(questionsQtd))
      setError(false)
    },
    [questionsQtd]
  )

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setError(false)
    const onlyNumbs = e.target.value.replace(/[^0-9]/g, '')
    setQuestionsQtd(onlyNumbs)
  }, [])

  return (
    <DS.Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      bgcolor="white"
      width="100%"
      borderRadius={20}
      padding={2}
    >
      <DS.Typography color="textPrimary" variant="h4">
        Welcome to the quiz test
      </DS.Typography>

      <DS.Box marginBottom={3} width="100%" marginTop={3}>
        <DS.TextField
          error={error}
          id="outlined-error-helper-text"
          label="Number of questions you want to answer"
          value={questionsQtd}
          onChange={handleChange}
          helperText={error && 'Enter a number of questions you want to answer'}
          variant="outlined"
          fullWidth
        />
        <DS.Box marginTop={4} width="100%">
          <DS.Button
            variant="contained"
            color="primary"
            onClick={handleStart}
            fullWidth
            size="large"
          >
            <DS.Typography color="textSecondary">NEXT</DS.Typography>
          </DS.Button>
        </DS.Box>
      </DS.Box>
    </DS.Box>
  )
}

export default StartApplication
