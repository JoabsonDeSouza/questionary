import { useRouter } from 'next/router'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react'
import { saveReport } from '../datastore'
import { Report } from '../model/report'
import { ResultQuestionary } from '../model/resultQuestionary'
import { UserAnswer } from '../model/userAnswer'
import { GetQuestionary } from '../service/apiQuestionary'
import { Option } from '../model/option'
import { Question } from '../model/question'
import { QuestionaryOptions } from '../model/questionaryOptions'

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
  updateCurrentReport: (report: Report) => void
  listQuestions: QuestionaryOptions[]
}

const AppContext = createContext<AppContextData>({} as AppContextData)

const routesCheck = ['/report', '/questionary']

const AppProvider: React.FC = ({ children }) => {
  const questionsQtd = useRef<number>(0)
  const [resultQuestionary, setResultQuestionary] =
    useState<ResultQuestionary>()
  const responseAnswerUser = useRef<UserAnswer[]>([])
  const [showButtonResult, setShowButtonResult] = useState<boolean>(false)
  const [currentReport, setCurrentReport] = useState<Report>({
    totalCorrect: 0,
    totalIncorrect: 0,
    totalQuestions: questionsQtd.current,
    userAnswer: [],
    date: new Date()
  })
  const [listQuestions, setListQuestions] = useState<QuestionaryOptions[]>([])

  const routes = useRouter()

  const updateQtdQuestions = useCallback((qtd: number) => {
    questionsQtd.current = qtd
  }, [])

  const updateCurrentReport = useCallback((report: Report) => {
    setCurrentReport(report)
  }, [])

  const getQuestionaryService = async () => {
    const result = await GetQuestionary(questionsQtd.current)
    setResultQuestionary(result)

    const questions: QuestionaryOptions[] = []

    result?.results.map((question: Question) => {
      const list: Option[] = []

      question.incorrect_answers.forEach((answer: string, index: number) => {
        list.push({
          value: answer,
          label: answer,
          correctAnswer: false,
          id: index
        })
      })

      list.push({
        id: list.length + 1,
        value: question.correct_answer,
        label: question.correct_answer,
        correctAnswer: true
      })

      list.sort(() => Math.random() - 0.5)

      questions.push({ list, question })
    })
    setListQuestions(questions)
  }

  const updateAnswerUser = useCallback((answer: UserAnswer) => {
    const newAnswerUser = [...responseAnswerUser.current, answer]
    responseAnswerUser.current = newAnswerUser

    setShowButtonResult(
      responseAnswerUser.current.length === questionsQtd.current
    )
  }, [])

  const createUserReport = useCallback(() => {
    const totalCorrect = responseAnswerUser.current.filter(
      response => response.user_correct
    ).length

    const totalIncorrect = questionsQtd.current - totalCorrect

    const userReport: Report = {
      totalCorrect,
      totalIncorrect,
      totalQuestions: questionsQtd.current,
      userAnswer: responseAnswerUser.current,
      date: new Date()
    }
    saveReport(userReport)
    setCurrentReport(userReport)
  }, [])

  useEffect(() => {
    if (routesCheck.includes(routes.pathname) && questionsQtd.current === 0) {
      routes.replace('/')
      return
    }

    if (
      routes.pathname === '/checkresult' &&
      currentReport.userAnswer.length === 0
    ) {
      routes.replace('/')
    }
  }, [routes])

  return (
    <AppContext.Provider
      value={{
        questionsQtd: questionsQtd.current,
        updateQtdQuestions,
        getQuestionaryService,
        resultQuestionary,
        updateAnswerUser,
        answerUser: responseAnswerUser.current,
        showButtonResult,
        createUserReport,
        currentReport,
        listQuestions,
        updateCurrentReport
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
