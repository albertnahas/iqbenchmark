import { useSelector } from "react-redux"
import firebase from "../config"
import { userSelector } from "../store/userSlice"
import { Question } from "../types/question"

export const useScores = () => {
  const user = useSelector(userSelector)

  const writeScore = (score: number, questions: Question[]) => {
    if (!user) {
      return
    }
    return firebase.firestore().collection(`users/${user.uid}/tests`).add({
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      score,
      questions,
      number: questions.length,
    })
  }

  return { writeScore }
}
