import {
  Box,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  Button,
  useTheme,
} from "@mui/material"
import React, { useState } from "react"
import { Question } from "../../types/question"
import { keyframes } from "@emotion/react"

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(25px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`

export const TestQuestion = ({
  question,
  index,
  onAnswer,
  onBack,
}: {
  question: Question
  index: number
  onAnswer: (answer: string) => void
  onBack: () => void
}) => {
  const [answer, setAnswer] = useState<string | undefined>(
    question.userAnswer || ""
  )
  const theme = useTheme()
  const resPath = `/assets/${
    theme.palette.mode === "light" ? "light" : "dark"
  }/`
  return (
    <>
      <Box sx={{ minHeight: 200, animation: `${fadeIn} 1s ease` }}>
        <Box sx={{ mb: 2 }}>
          <Typography color="text.primary" variant="h6">
            {question.question}
          </Typography>
          {question.question_line2 && (
            <Typography color="text.secondary" sx={{ my: 1 }} variant="body1">
              {question.question_line2}
            </Typography>
          )}
          {!!question.hasFigure && (
            <Box sx={{ mt: 1 }}>
              <img
                src={`${resPath}/s${question.id}.svg`}
                style={{
                  ...figureSize(question.figureSize as Size),
                }}
                alt="figure"
              />
            </Box>
          )}
        </Box>
        {question.type === "text" && (
          <Box sx={{ my: 1 }}>
            <TextField
              id="answer"
              type={question.category === "numerical" ? "number" : "text"}
              fullWidth
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              label="Answer..."
              variant="filled"
            />
          </Box>
        )}
        {question.type === "choices" && (
          <RadioGroup
            row
            aria-label="choices"
            name="choices"
            onChange={(e) => setAnswer(e.target.value)}
            value={answer}
          >
            {question.choices.map((choice) => (
              <FormControlLabel
                value={choice}
                control={<Radio />}
                label={
                  <Typography color="text.primary" variant="body1">
                    {choice}
                  </Typography>
                }
              />
            ))}
          </RadioGroup>
        )}
        {question.type === "shapes" && (
          <RadioGroup
            row
            aria-label="choices"
            name="choices"
            onChange={(e) => setAnswer(e.target.value)}
            value={answer}
          >
            {Array.from(Array(question.shapesCount || 5).keys()).map((i) => (
              <FormControlLabel
                value={intToChar(i)}
                control={<Radio />}
                label={
                  <img
                    src={`${resPath}/${intToChar(i)}${question.id}.svg`}
                    style={{ width: "100%", maxHeight: 80, maxWidth: 80 }}
                    alt="figure"
                  />
                }
                sx={{ mt: 1 }}
              />
            ))}
          </RadioGroup>
        )}
      </Box>
      <Box sx={{ mt: 4 }}>
        <Button
          variant="contained"
          size="large"
          color="warning"
          sx={{ mr: 2 }}
          onClick={onBack}
          disabled={index === 0}
        >
          Back
        </Button>
        <Button
          variant="contained"
          size="large"
          disabled={answer === undefined}
          onClick={() => !!answer && onAnswer(answer)}
        >
          Next
        </Button>
      </Box>
    </>
  )
}

export type Size = "small" | "medium" | "large"

const figureSize = (size?: Size) => {
  switch (size) {
    case "small":
      return { maxWidth: 200, maxHeight: 100 }
    case "large":
      return { maxWidth: 400, maxHeight: 200 }
    default:
      return { maxWidth: 300, maxHeight: 150 }
  }
}

const intToChar = (int: number) => {
  // 👇️ for Uppercase letters, replace `a` with `A`
  const code = "a".charCodeAt(0)
  return String.fromCharCode(code + int)
}
