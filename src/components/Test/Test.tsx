import { Box, Chip, Grid, Typography } from "@mui/material"
import React, { useEffect } from "react"
import { ProgressLine } from "../../atoms/ProgressLine/ProgressLine"
import { Timer } from "../../atoms/Timer/Timer"
import { DoneOutline } from "../../icons/DoneOutline"
import { Question } from "../../types/question"
import { TestQuestion } from "../TestQuestion/TestQuestion"

export const Test = ({
  questions,
  onFinish,
}: {
  questions?: Question[]
  onFinish: (result?: number) => void
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0)
  const [finish, setFinish] = React.useState(false)

  const onAnswer = (answer: string) => {
    if (questions && questions[currentQuestionIndex]) {
      questions[currentQuestionIndex].userAnswer = answer
      setCurrentQuestionIndex((curr) =>
        Math.min(curr + 1, questions?.length || 0)
      )
    }
  }

  useEffect(() => {
    if (questions && currentQuestionIndex === questions.length) {
      setFinish(true)
    }
  }, [currentQuestionIndex, questions])

  const onBack = () => {
    setCurrentQuestionIndex((curr) => Math.max(curr - 1, 0))
  }

  useEffect(() => {
    if (finish) {
      const result = questions?.reduce(
        (acc, question) =>
          acc +
          (question.userAnswer?.toLowerCase() === question.answer.toLowerCase()
            ? 1
            : 0),
        0
      )
      onFinish(result)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finish, questions])

  //   const renderQuestions = () =>
  //     questions?.map((question, index) => (
  //       <TestQuestion question={question} onAnswer={onAnswer} index={index} />
  //     ))
  const questionsCount = questions?.length

  return (
    <div>
      {questionsCount && currentQuestionIndex < questionsCount && questions && (
        <>
          <Grid sx={{ alignItems: "baseline" }} container>
            <Grid item xs={8}>
              <ProgressLine
                value={((currentQuestionIndex + 1) / questionsCount) * 100}
                variant="determinate"
                sx={{ mt: 2 }}
              ></ProgressLine>
            </Grid>
            <Grid sx={{ textAlign: "center" }} item xs={2}>
              <Typography color="text.primary" variant="body2">
                {currentQuestionIndex + 1}/{questionsCount}
              </Typography>
            </Grid>
            <Grid sx={{ textAlign: "center" }} item xs={2}>
              <Chip
                label={
                  <Timer
                    active={!finish}
                    endtime={90 * questions.length}
                    countdown={true}
                    onTimerStop={() => setFinish(true)}
                  />
                }
              />
            </Grid>
          </Grid>
          <Box sx={{ m: 1, mt: 2, textAlign: "left" }}>
            <TestQuestion
              question={questions[currentQuestionIndex]}
              onAnswer={onAnswer}
              onBack={onBack}
              index={currentQuestionIndex}
              key={currentQuestionIndex}
            />
          </Box>
        </>
      )}
      {finish && (
        <>
          <DoneOutline style={{ fontSize: "4em", color: "green" }} />
          <Typography sx={{ my: 4 }} color="success.main" variant="h4">
            You finished the test!
          </Typography>
        </>
      )}
    </div>
  )
}
