import React, { useEffect } from "react"
import { Box, styled } from "@mui/system"
import { ControlLink, ControlHeading1 } from "../ControlPage"
import { useAnalytics } from "../../../hooks/useAnalytics"

export var SubmitLink = styled("a")(
  ({ theme }) => `
  text-decoration: none;
  color: ${theme.palette.primary.main};
  cursor: pointer;
`
)

export var About = function () {
  const { logEvent } = useAnalytics()
  useEffect(() => {
    logEvent("about_page_viewed")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <ControlHeading1 variant="h1" color="primary">
        About us
      </ControlHeading1>
      <Box sx={{ textAlign: "left" }}>
        <p>
          IQBenchmark is an IQ test that offers the chance to measure your IQ
        </p>
        <p>
          At IQBenchmark we know that IQ is a key to understanding the human
          mental capacity. “Incredibly intelligent people always seem odd to
          those who are not as sharp.”. While we genuinely believe it's a true
          statement, we decided to put our efforts to make you able to measure
          your IQ easily, in an entertaining, engaging way.
        </p>
        <p>
          Many people would agree that it feels just amazing to know your true
          capacity and it helps you reaching your potenial, And IQBenchmark is
          here for you to help you upgrade this skill.
        </p>

        <p>
          If you enjoy IQBenchmark, please consider supporting us by making a
          donation. Every single dollar will help IQBenchmark to reach its full
          potential. All donations will be used for developing new game features
          and expanding the educational potential of the app.
        </p>
      </Box>
    </>
  )
}
