import { Alert, Button, Stack, Typography } from "@mui/material"
import React from "react"

export const Introduction = ({
  onReady,
  count = 0,
}: {
  onReady: () => void
  count: number
}) => {
  return (
    <Stack spacing={1} sx={{ p: 1, mt: 2, textAlign: "center" }}>
      <Typography color="primary.main" variant="h4">
        Before you start
      </Typography>
      <Typography
        color="text.primary"
        sx={{ textAlign: "left" }}
        variant="body2"
      >
        The questions that have been compiled for this test are multi-discipline
        and include a mix of verbal, numerical and diagrammatic questions, as
        well as additional questions involving logical thought processes as well
        as a degree of lateral thinking, the average score is 100
      </Typography>
      <Typography
        color="text.primary"
        sx={{ textAlign: "left" }}
        variant="body2"
      >
        Make sure you are in a quiet place where you can focus.
      </Typography>
      <Typography color="text.primary" variant="body2">
        Example question:
        <img
          style={{ verticalAlign: "middle", maxWidth: 300 }}
          src="./assets/sample.svg"
          alt="example"
        />
      </Typography>
      <Typography color="text.primary" variant="body2">
        You can turn on the dark mode from the top right button in the top bar
        if it feels more comfortable
      </Typography>
      <Alert variant="standard" severity="success">
        Spend your {count * 1.5} minutes wisely answering the upcoming {count}{" "}
        questions
      </Alert>
      {count > 10 && (
        <Alert variant="standard" severity="info">
          Payment will be required to view your results after finishing the test
        </Alert>
      )}

      <Typography color="text.secondary" variant="body1">
        Click start when you feel ready to begin!
      </Typography>
      <Button variant="contained" onClick={onReady}>
        Start
      </Button>
    </Stack>
  )
}
