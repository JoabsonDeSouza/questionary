import { useState } from 'react'

import StartQuestionary from './StartQuestionary'
import StartApplication from './StartApplication'

const Home = () => {
  const [isStartQuestionary, setIsStartQuestionary] = useState<boolean>(false)

  return (
    <>
      {isStartQuestionary ? (
        <StartQuestionary setIsStartQuestionary={setIsStartQuestionary} />
      ) : (
        <StartApplication setIsStartQuestionary={setIsStartQuestionary} />
      )}
    </>
  )
}

export default Home
