import { createContext, useCallback, useContext, useRef, useState } from 'react'
import { saveReport } from '../datastore'
import { Report } from '../model/report'
import { ResultQuestionary } from '../model/resultQuestionary'
import { UserAnswer } from '../model/userAnswer'
import { GetQuestionary } from '../service/apiQuestionary'

interface AppContextData {
  questionsQtd: number
  updateQtdQuestions: (questionsQtd: number) => void
  getQuestionaryService: () => Promise<void>
  resultQuestionary: ResultQuestionary | undefined
  updateAnswerUser: (userAnswer: UserAnswer) => void
  answerUser: UserAnswer[]
  showButtonResult: boolean
  createUserReport: () => void
  currentReport: Report
}

const AppContext = createContext<AppContextData>({} as AppContextData)

const AppProvider: React.FC = ({ children }) => {
  const [questionsQtd, setQuestionsQtd] = useState<number>(5)
  const [resultQuestionary, setResultQuestionary] =
    useState<ResultQuestionary>()
  const responseAnswerUser = useRef<UserAnswer[]>([])
  const [showButtonResult, setShowButtonResult] = useState<boolean>(false)
  const [currentReport, setCurrentReport] = useState<Report>({
    totalCorrect: 0,
    totalIncorrect: 0,
    totalQuestions: questionsQtd,
    userAnswer: []
  })

  const updateQtdQuestions = useCallback((qtd: number) => {
    setQuestionsQtd(qtd)
  }, [])

  const getQuestionaryService = async () => {
    const result = await GetQuestionary(questionsQtd)
    setResultQuestionary(result)
  }

  const updateAnswerUser = useCallback((answer: UserAnswer) => {
    const newAnswerUser = [...responseAnswerUser.current, answer]
    responseAnswerUser.current = newAnswerUser
    setShowButtonResult(responseAnswerUser.current.length === questionsQtd)
  }, [])

  const createUserReport = useCallback(() => {
    const totalCorrect = responseAnswerUser.current.filter(
      response => response.user_correct
    ).length

    console.log('totalCorrect', responseAnswerUser.current)
    const totalIncorrect = questionsQtd - totalCorrect

    const userReport: Report = {
      totalCorrect,
      totalIncorrect,
      totalQuestions: questionsQtd,
      userAnswer: responseAnswerUser.current
    }
    saveReport(userReport)
    setCurrentReport(userReport)
  }, [])

  return (
    <AppContext.Provider
      value={{
        questionsQtd,
        updateQtdQuestions,
        getQuestionaryService,
        resultQuestionary,
        updateAnswerUser,
        answerUser: responseAnswerUser.current,
        showButtonResult,
        createUserReport,
        currentReport
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

function useApp(): AppContextData {
  const context = useContext(AppContext)

  if (!context) {
    throw new Error('useApp must be used within an AppProvider')
  }

  return context
}

export { AppProvider, useApp }
