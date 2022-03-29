import React from 'react'
import { useApp } from '../../context/app'

const CheckResult = () => {
  const { currentReport } = useApp()

  return (
    <div>
      <h1>Total hits: {currentReport.totalCorrect}</h1>
      <h1>Total errors: {currentReport.totalIncorrect}</h1>
      {currentReport.userAnswer.map((answer, index) => (
        <div key={index}>
          <h1>Questão: {answer.question}</h1>
          <h2>Resposta Certa: {answer.questionCorrect.label}</h2>
          <h2>Resposta Selecionada: {answer.user_answer}</h2>
          <h2>------------ </h2>
        </div>
      ))}
    </div>
  )
}

export default CheckResult
