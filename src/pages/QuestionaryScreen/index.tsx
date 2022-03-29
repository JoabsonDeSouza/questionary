import { useRouter } from 'next/router'
import { useCallback, useEffect, useMemo, MouseEvent } from 'react'
import { useApp } from '../../context/app'
import { Option } from '../../model/option'
import { UserAnswer } from '../../model/userAnswer'
import Card from './Card'

const QuestionaryScreen = () => {
  const router = useRouter()

  const {
    resultQuestionary,
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

  const questionary = useMemo(() => {
    return resultQuestionary?.results.map((question, index) => {
      const listQuestions: Option[] = []

      question.incorrect_answers.forEach((answer: string, index: number) => {
        listQuestions.push({
          value: answer,
          label: answer,
          correctAnswer: false,
          id: index
        })
      })

      listQuestions.push({
        id: listQuestions.length + 1,
        value: question.correct_answer,
        label: question.correct_answer,
        correctAnswer: true
      })

      listQuestions.sort(() => Math.random() - 0.5)

      return (
        <Card
          key={question.question}
          question={question}
          numberQuestion={index + 1}
          listQuestions={listQuestions}
          handleUserResponse={handleUserResponse}
        />
      )
    })
  }, [resultQuestionary])

  if (!resultQuestionary || !resultQuestionary?.results) {
    return <h1>Carregando...</h1>
  }

  return (
    <>
      <div>{questionary}</div>
      {showButtonResult && (
        <button onClick={handleCheckResult}>Ver Resultado</button>
      )}
    </>
  )
}

export default QuestionaryScreen
