import { useCallback, MouseEvent, ChangeEvent } from 'react'
import { useApp } from '../../../context/app'

interface StartApplicationProps {
  setIsStartQuestionary: (isStartQuestionary: boolean) => void
}

const StartApplication = ({ setIsStartQuestionary }: StartApplicationProps) => {
  const { questionsQtd, updateQtdQuestions } = useApp()

  const handleStart = useCallback((e: MouseEvent<HTMLElement>) => {
    e.preventDefault()
    setIsStartQuestionary(true)
  }, [])

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    updateQtdQuestions(Number(e.target.value))
  }, [])

  return (
    <div>
      <h1>StartApplication</h1>
      <div>
        <input
          placeholder="Quantidade de perguntas"
          type="number"
          value={questionsQtd}
          onChange={handleChange}
        />
        <button onClick={handleStart}>Iniciar</button>
      </div>
    </div>
  )
}

export default StartApplication
