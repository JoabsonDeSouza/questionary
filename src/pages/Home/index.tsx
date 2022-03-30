import { useEffect, useState } from 'react'

import StartQuestionary from './StartQuestionary'
import StartApplication from './StartApplication'
import Head from 'next/head'

import * as DS from '@material-ui/core'
import { getReports } from '../../datastore'
import { Report } from '../../model/report'
import { dateToString } from '../../util/functions'
import { useApp } from '../../context/app'
import { useRouter } from 'next/router'

const Home = () => {
  const [isStartQuestionary, setIsStartQuestionary] = useState<boolean>(false)
  const [lastReports, setLastReports] = useState<Report[]>([])

  const router = useRouter()
  const { updateCurrentReport } = useApp()

  const startApp = () => {
    const containsReports: Report[] = getReports()
    setLastReports(containsReports)
  }

  const handleClickReport = (event: any, report: Report) => {
    event.preventDefault()
    updateCurrentReport(report)

    router.push({
      pathname: '/checkresult',
      query: { result: true }
    })
  }

  useEffect(() => {
    startApp()
  }, [])

  return (
    <DS.Box
      display="flex"
      height="100vh"
      justifyContent="center"
      alignItems="center"
    >
      <Head>
        <title>
          Quiz - {isStartQuestionary ? 'Start' : 'Select Number Questions'}
        </title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <DS.Container maxWidth="sm" fixed>
        <DS.Box display="flex" flexDirection="column" width="100%">
          {isStartQuestionary ? (
            <StartQuestionary setIsStartQuestionary={setIsStartQuestionary} />
          ) : (
            <StartApplication setIsStartQuestionary={setIsStartQuestionary} />
          )}

          {lastReports.length !== 0 && (
            <DS.Box
              bgcolor="white"
              marginTop={3}
              width="100%"
              padding={2}
              borderRadius={20}
              marginBottom={6}
            >
              <DS.Box marginTop={1} marginBottom={4} textAlign="center">
                <DS.Typography variant="h6">
                  Latest questionnaires answered
                </DS.Typography>
              </DS.Box>
              <DS.List component="nav" aria-label="secondary mailbox folders">
                {lastReports.map((report: Report, index: number) => (
                  <DS.ListItem button key={index}>
                    <DS.ListItemText
                      onClick={(e: any) => handleClickReport(e, report)}
                      primary={`Result ${index + 1} - ${dateToString(
                        report.date
                      )}`}
                    />
                  </DS.ListItem>
                ))}
              </DS.List>
            </DS.Box>
          )}
        </DS.Box>
      </DS.Container>
    </DS.Box>
  )
}

export default Home
