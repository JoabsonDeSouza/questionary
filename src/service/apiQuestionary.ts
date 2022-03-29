import axios from './BaseApi'

export const GetQuestionary = async (questionsQtd: number) => {
  try {
    const result = await axios.get('api.php', {
      params: { amount: questionsQtd }
    })
    return result.data
  } catch (error) {
    console.warn('Error on GetQuestionary: ', error)
    return null
  }
}
