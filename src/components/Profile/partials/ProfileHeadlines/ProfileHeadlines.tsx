import { Grid, Typography } from "@mui/material"
import React, { useMemo } from "react"
import { useSelector } from "react-redux"
import { userSelector } from "../../../../store/userSlice"
import { getPercentile } from "../../../../utils/helpers"

export const ProfileHeadlines = () => {
  const user = useSelector(userSelector)
  const headlines = useMemo(() => {
    return [
      {
        label: "IQ",
        value: user?.score || 0,
        info: "IQ score",
      },
      {
        label: "Percentile",
        value: getPercentile(user?.score || 0) + "th",
        info: "Percentile in the popuplation",
      },
    ]
  }, [user])

  const renderHeadlines = () =>
    headlines.map((h) => (
      <Grid key={h.label} xs={12 / headlines.length} item>
        <Typography color="text.secondary" variant="body1">
          {h.label}
        </Typography>
        <Typography color="info.main" variant="h4">
          {h.value}
        </Typography>
      </Grid>
    ))

  return (
    <Grid sx={{ textALign: "center" }} container>
      {renderHeadlines()}
    </Grid>
  )
}
