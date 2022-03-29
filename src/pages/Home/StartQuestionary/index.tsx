import { useRouter } from 'next/router'
import { useCallback, MouseEvent } from 'react'

interface StartQuestionaryProps {
  setIsStartQuestionary: (isStartQuestionary: boolean) => void
}

const StartQuestionary = ({ setIsStartQuestionary }: StartQuestionaryProps) => {
  const router = useRouter()

  const handleCancel = useCallback((e: MouseEvent<HTMLElement>) => {
    e.preventDefault()
    setIsStartQuestionary(false)
  }, [])

  const handleStart = useCallback((e: MouseEvent<HTMLElement>) => {
    e.preventDefault()
    router.replace('/questionary')
  }, [])

  return (
    <div>
      <h1>StartQuestionary</h1>
      <button onClick={handleStart}>Iniciar</button>
      <button onClick={handleCancel}>Cancelar</button>
    </div>
  )
}

export default StartQuestionary
