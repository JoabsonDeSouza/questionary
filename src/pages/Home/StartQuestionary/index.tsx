import { useRouter } from 'next/router'
import { useCallback, MouseEvent } from 'react'
import * as DS from '@material-ui/core'

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
    <DS.Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      bgcolor="white"
      width="100%"
      borderRadius={20}
      padding={2}
    >
      <DS.Box marginBottom={3} marginTop={3}>
        <DS.Typography color="textPrimary" variant="h4">
          All ready! Let's start?
        </DS.Typography>
      </DS.Box>

      <DS.Box marginTop={4} width="100%" display="flex" flexDirection="row">
        <DS.Box width="100%" padding={1}>
          <DS.Button
            variant="contained"
            color="secondary"
            onClick={handleCancel}
            fullWidth
            size="large"
          >
            BACK
          </DS.Button>
        </DS.Box>
        <DS.Box width="100%" padding={1}>
          <DS.Button
            variant="contained"
            color="primary"
            onClick={handleStart}
            fullWidth
            size="large"
          >
            <DS.Typography color="textSecondary">START QUIZ</DS.Typography>
          </DS.Button>
        </DS.Box>
      </DS.Box>
    </DS.Box>
  )
}

export default StartQuestionary
