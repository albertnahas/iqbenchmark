import { Button, Container } from "@mui/material"
import _ from "lodash"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import questions from "../../data/data.json"
import { useScores } from "../../hooks/useScore"
import { useUser } from "../../hooks/useUser"
import { userSelector } from "../../store/userSlice"
import { Question } from "../../types/question"
import { Introduction } from "../Introduction/Introduction"
import { Results } from "../Results/Results"
import { Setup } from "../Setup/Setup"
import firebase from "../../config"
import { Test } from "../Test/Test"
import { PaymentDialog } from "../../molecules/PaymentDialog/PaymentDialog"
import { getTestPrice } from "../../utils/helpers"
import { setFeedback } from "../../store/feedbackSlice"

export const Main = () => {
  const [testQuestions, setTestQuestions] = useState<Question[]>()
  const [finish, setFinish] = useState(false)
  const [started, setStarted] = useState(false)
  const [written, setWritten] = useState(false)
  const [result, setResult] = useState(0)
  const [details, setDetails] = useState<
    {
      category: string
      score: number
    }[]
  >()
  const dispatch = useDispatch()

  const [openPayment, setOpenPayment] = useState(false)

  const user = useSelector(userSelector)

  const { writeScore } = useScores()
  const { updateUser } = useUser()

  const onSelectTest = (item: string) => {
    let count = 0
    switch (item) {
      case "Free":
        count = 10
        break
      case "Rapid":
        count = 20
        break
      case "Complete":
        count = 40
        break
    }

    const sampleQuestions = _.sampleSize(
      _.cloneDeep(questions.filter((q) => q.category !== "verbal")),
      count
    )
    setTestQuestions(_.shuffle(sampleQuestions))
  }

  const onFinish = (testResult?: number) => {
    if (!testQuestions) return
    const pointsPerQuestion = Math.round(120 / (testQuestions?.length || 1))
    setResult((testResult || 0) * pointsPerQuestion + 40)
    if (testQuestions.length > 20) {
      var categories = _.groupBy(testQuestions, "category")
      const categoriesScore = Object.entries(categories).map(
        ([category, questions]) => {
          const corrects = questions.reduce(
            (acc, question) =>
              acc +
              (question.userAnswer?.toLowerCase() ===
              question.answer.toLowerCase()
                ? 1
                : 0),
            0
          )
          return { category, score: (corrects / questions.length) * 100 }
        }
      )
      setDetails(categoriesScore)
    }
    onShowResults()
  }

  const onReset = () => {
    setTestQuestions(undefined)
    setFinish(false)
    setResult(0)
  }

  const onShowResults = () => {
    if (testQuestions && testQuestions.length > 10) {
      setOpenPayment(true)
    } else {
      setFinish(true)
      if (!user?.feedback) {
        setTimeout(() => {
          dispatch(setFeedback(true))
        }, 3500)
      }
    }
  }

  useEffect(() => {
    if (testQuestions && finish && result && !written) {
      writeScore(result, testQuestions)?.then(() => {
        const currDate =
          firebase.firestore.FieldValue.serverTimestamp() as firebase.firestore.Timestamp
        updateUser({
          ...user,
          score: result,
          lastTestAt: currDate,
        })
        setWritten(true)
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [testQuestions, result, finish, user, written])

  const onClosePayment = (payed: boolean) => {
    setOpenPayment(false)
    if (payed) {
      setFinish(true)
    }
  }

  return (
    <Container maxWidth="md" sx={{ my: 2 }}>
      {!testQuestions && <Setup onSelect={onSelectTest} />}
      {!!testQuestions &&
        !finish &&
        (started ? (
          <Test questions={testQuestions} onFinish={onFinish}></Test>
        ) : (
          <Introduction
            count={testQuestions.length}
            onReady={() => setStarted(true)}
          />
        ))}
      {finish && (
        <Results
          result={result}
          details={details}
          accuracy={(testQuestions?.length || 0) / 40}
        />
      )}
      {!!result && !finish && (
        <Button onClick={onShowResults}>Show my results</Button>
      )}
      {!!testQuestions && (
        <Button sx={{ mt: 2 }} onClick={onReset}>
          Return to Home page
        </Button>
      )}
      {testQuestions && (
        <PaymentDialog
          open={openPayment}
          amount={getTestPrice(testQuestions.length)}
          onClose={onClosePayment}
        />
      )}
    </Container>
  )
}
