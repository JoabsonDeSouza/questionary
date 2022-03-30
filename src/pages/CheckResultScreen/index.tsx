import React from 'react'
import { useApp } from '../../context/app'
import * as DS from '@material-ui/core'
import { useRouter } from 'next/router'
import he from 'he'

const CheckResult = () => {
  const router = useRouter()
  const { currentReport } = useApp()

  const showButton = !router?.query?.result

  return (
    <DS.Container maxWidth="md">
      <DS.Box bgcolor="white" padding={5}>
        <DS.Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          marginBottom={6}
        >
          <DS.Typography variant="h3" color="textPrimary">
            RESULT THE QUIZ
          </DS.Typography>
        </DS.Box>
        <DS.Typography variant="h5" color="primary">
          Total correct: {currentReport.totalCorrect} /{' '}
          {currentReport.userAnswer.length}
        </DS.Typography>
        <DS.Typography variant="h5" color="secondary">
          Total errors: {currentReport.totalIncorrect} /{' '}
          {currentReport.userAnswer.length}
        </DS.Typography>

        <DS.Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          marginBottom={6}
          marginTop={6}
        >
          <DS.Typography
            variant="h5"
            color="textPrimary"
            style={{ fontStyle: 'oblique' }}
          >
            CHECK RESPONSES
          </DS.Typography>
        </DS.Box>
        {currentReport.userAnswer.map((answer, index) => (
          <div key={index}>
            <DS.Typography variant="h6" color="textPrimary">
              Question: {he.decode(answer.question)}
            </DS.Typography>
            <DS.Typography
              variant="body1"
              color={
                answer.user_answer === answer.questionCorrect.label
                  ? 'primary'
                  : 'secondary'
              }
            >
              Selected Answer: {he.decode(answer.user_answer)}
            </DS.Typography>
            <DS.Typography variant="button" color="textPrimary">
              Correct answer: {he.decode(answer.questionCorrect.label)}
            </DS.Typography>
            {currentReport.userAnswer.length !== index + 1 && (
              <div
                style={{
                  background: 'black',
                  width: '100%',
                  height: '1',
                  marginTop: 30,
                  marginBottom: 30
                }}
              />
            )}
          </div>
        ))}
        {showButton && (
          <DS.Box width="100%" marginTop={5} marginBottom={10}>
            <DS.Button
              variant="contained"
              color="primary"
              onClick={() => router.replace('/')}
              fullWidth
              size="large"
            >
              <DS.Typography color="textSecondary">
                RESTART QUESTIONARY
              </DS.Typography>
            </DS.Button>
          </DS.Box>
        )}
      </DS.Box>
    </DS.Container>
  )
}

export default CheckResult
