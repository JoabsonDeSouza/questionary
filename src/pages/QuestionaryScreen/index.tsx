import { useRouter } from 'next/router'
import { useCallback, useEffect, MouseEvent } from 'react'
import { useApp } from '../../context/app'
import { UserAnswer } from '../../model/userAnswer'
import QuestionaryItem from '../../components/QuestionaryItem'
import * as DS from '@material-ui/core'
import Loading from '../../components/Loading'

const QuestionaryScreen = () => {
  const router = useRouter()

  const {
    listQuestions,
    getQuestionaryService,
    showButtonResult,
    updateAnswerUser,
    createUserReport
  } = useApp()

  const getQuestionary = useCallback(async () => {
    await getQuestionaryService()
  }, [])

  useEffect(() => {
    getQuestionary()
  }, [])

  const handleUserResponse = useCallback((response: UserAnswer) => {
    updateAnswerUser(response)
  }, [])

  const handleCheckResult = useCallback((e: MouseEvent<HTMLElement>) => {
    e.preventDefault()
    createUserReport()
    router.replace('/checkresult')
  }, [])

  if (listQuestions.length === 0) {
    return <Loading message="Loading Questions..." />
  }

  return (
    <DS.Container maxWidth="md">
      <DS.Box bgcolor="white" padding={5}>
        <DS.Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          marginBottom={6}
        >
          <DS.Typography variant="h3" color="primary">
            ANSWER THE QUIZ
          </DS.Typography>
        </DS.Box>

        {listQuestions?.map((questionary, index) => (
          <QuestionaryItem
            key={index}
            question={questionary.question}
            numberQuestion={index + 1}
            listQuestions={questionary.list}
            handleUserResponse={handleUserResponse}
          />
        ))}
        {showButtonResult && (
          <DS.Box width="100%" padding={1} marginBottom={10}>
            <DS.Button
              variant="contained"
              color="primary"
              onClick={handleCheckResult}
              fullWidth
              size="large"
            >
              <DS.Typography color="textSecondary">SEE RESULT</DS.Typography>
            </DS.Button>
          </DS.Box>
        )}
      </DS.Box>
    </DS.Container>
  )
}

export default QuestionaryScreen
