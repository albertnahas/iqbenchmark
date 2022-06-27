import React from "react"
import Highcharts from "highcharts"
import HighchartsReact from "highcharts-react-official"
import bellcurve from "highcharts/modules/histogram-bellcurve"
import { Alert, Box, Grid, Typography } from "@mui/material"
import { getEval, getPercentile } from "../../utils/helpers"
import { ProgressLine } from "../../atoms/ProgressLine/ProgressLine"
bellcurve(Highcharts)

export const Results = ({
  result,
  accuracy,
  details,
}: {
  result?: number
  accuracy?: number
  details?: {
    category: string
    score: number
  }[]
}) => {
  var data = [
    86, 80, 85, 90, 95, 85, 65, 98, 99, 101, 100, 97, 75, 55, 100, 100, 100, 86,
    80, 85, 90, 95, 85, 65, 98, 99, 101, 100, 97, 75, 55, 100, 100, 100, 86, 80,
    85, 90, 95, 85, 65, 98, 99, 101, 100, 97, 86, 80, 85, 90, 95, 85, 65, 98,
    99, 101, 100, 97, 75, 55, 100, 100, 100, 111, 107, 100, 107, 114, 115, 111,
    97, 100, 112, 104, 89, 104, 102, 91, 114, 114, 103, 106, 105, 113, 109, 108,
    113, 130, 128, 128, 118, 113, 130, 128, 128, 118, 113, 130, 128, 128, 118,
    113, 120, 132, 111, 124, 127, 128, 136, 106, 118, 119,
  ]

  const options: Highcharts.Options = {
    title: {
      text: "IQ Chart",
    },

    legend: {
      enabled: false,
    },

    xAxis: [
      {
        title: {
          text: "Data",
        },
        visible: false,
      },
      {
        title: {
          text: "IQ",
        },
        opposite: true,
        visible: true,
      },
    ],
    tooltip: {
      enabled: false,
    },

    yAxis: [
      {
        title: {
          text: "Data",
        },
        visible: false,
      },
      {
        title: {
          text: "IQ",
        },
        opposite: true,
        visible: false,
      },
    ],

    series: [
      {
        name: "IQ",
        type: "bellcurve",
        xAxis: 1,
        yAxis: 1,

        intervals: 4,
        baseSeries: 1,
        zIndex: -1,
        marker: {
          enabled: true,
        },

        zoneAxis: "x",
        zones: [
          { value: result || 0, color: "rgb(0, 102, 255, 0.6)" },
          {
            value: 70,
            color: "rgb(0, 102, 255, 0.1)",
          },
          {
            value: 85,
            color: "rgb(0, 102, 255, 0.2)",
          },
          {
            value: 100,
            color: "rgb(0, 102, 255, 0.3)",
          },
          {
            value: 115,
            color: "rgb(0, 102, 255, 0.4)",
          },
          {
            value: 125,
            color: "rgb(0, 102, 255, 0.3)",
          },
          {
            value: 140,
            color: "rgb(0, 102, 255, 0.2)",
          },
          {
            color: "rgb(0, 102, 255, 0.1)",
          },
        ],
      },
      {
        name: "Data",
        type: "scatter",
        data: data,
        visible: false,
        marker: {
          radius: 1.5,
        },
      },
    ],
  }
  const resultString =
    result && accuracy && accuracy < 1 ? `${result - 7}-${result + 7}` : result

  return (
    <div>
      {result && (
        <Box sx={{ my: 2 }}>
          <Typography
            variant="h4"
            color="primary.light"
            sx={{ fontWeight: "light" }}
          >
            Score: {resultString}
          </Typography>
          <Typography variant="h6" color="primary.light">
            Your results make you {getEval(result)}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            which is in the {getPercentile(result)}th percentile of the
            population
          </Typography>
        </Box>
      )}
      <HighchartsReact highcharts={Highcharts} options={options} />
      <Typography variant="h6" color="primary.light">
        {resultString}
      </Typography>
      {details && (
        <Box sx={{ textAlign: "left", mb: 4 }}>
          <Typography variant="h6" color="primary.light">
            Details:
          </Typography>
          <Grid sx={{ alignItems: "baseline" }} container>
            {/* render details */}
            {details.map((detail, index) => (
              <Grid sx={{ alignItems: "baseline" }} container>
                <Grid item xs={8}>
                  <ProgressLine
                    value={detail.score}
                    variant="determinate"
                    sx={{ mt: 2 }}
                  ></ProgressLine>
                </Grid>
                <Grid sx={{ textAlign: "center" }} item xs={2}>
                  <Typography color="primary.main" variant="body2">
                    {detail.category.toUpperCase() || "OTHER"}
                  </Typography>
                </Grid>
                <Grid sx={{ textAlign: "center" }} item xs={2}>
                  <Typography color="primary.main" variant="body2">
                    {detail.score}%
                  </Typography>
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
      {accuracy && accuracy < 1 && (
        <Alert severity="info">
          Try to take the complete test for more accurate result
        </Alert>
      )}
    </div>
  )
}
