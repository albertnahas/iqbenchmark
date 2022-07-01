import Highcharts from "highcharts"
import HighchartsReact from "highcharts-react-official"
import bellcurve from "highcharts/modules/histogram-bellcurve"
import {
  Alert,
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material"
import { getCelebPhoto, getEval, getPercentile } from "../../utils/helpers"
import { ProgressLine } from "../../atoms/ProgressLine/ProgressLine"
import { chartOptions } from "../../utils/utils"
import celebs from "../../data/celebs.json"
import { useEffect, useState } from "react"
import _ from "lodash"

bellcurve(Highcharts)

const placeholder =
  "https://www.itdp.org/wp-content/uploads/2021/06/avatar-man-icon-profile-placeholder-260nw-1229859850-e1623694994111.jpg"

export interface Celeb {
  "First Name": string
  "Last Name": string
  score: number
  photo?: string
}

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
  const options: Highcharts.Options = chartOptions(result)
  const [similarCelebs, setSimilarCelebs] = useState<Celeb[]>([])

  useEffect(() => {
    if (!result) return
    const topCelebs: Celeb[] = _.sortBy(celebs, [
      (o) => Math.abs(o.score - result),
    ]).slice(0, 4)

    Promise.all(
      topCelebs.map((celeb) =>
        getCelebPhoto(`${celeb["First Name"]} ${celeb["Last Name"]}`).then(
          (res) => res.json()
        )
      )
    ).then((res: any) => {
      res.forEach((celeb: any) => {
        const data = celeb?.query?.pages[0]
        const thumbnail: string = data?.thumbnail?.source
        console.log(thumbnail)
        const title: string = data?.title
        const celebObj = topCelebs.find((c) => title.match(c["Last Name"]))
        if (celebObj) {
          celebObj.photo = thumbnail
        }
      })
      setSimilarCelebs(topCelebs)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result])

  const resultString =
    result && accuracy && accuracy < 1 ? `${result - 7}-${result + 7}` : result

  return (
    <div>
      {result && (
        <Box sx={{ my: 2 }}>
          <Typography
            variant="h4"
            color="primary.light"
            sx={{ fontWeight: "400" }}
          >
            Score: {resultString}
          </Typography>
          <Typography variant="h6" sx={{ my: 1 }} color="text.secondary">
            Your results make you {getEval(result)}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            which is in the <strong>{getPercentile(result)}th</strong>{" "}
            percentile of the population
          </Typography>
        </Box>
      )}
      <HighchartsReact highcharts={Highcharts} options={options} />
      <Typography variant="h6" color="primary.light">
        {resultString}
      </Typography>
      {!!details && (
        <Box sx={{ textAlign: "left", mb: 4 }}>
          <Typography
            variant="h6"
            sx={{ textAlign: "left" }}
            color="text.primary"
          >
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
                    {detail.category.toUpperCase() || "GENERAL"}
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
      {!!accuracy && accuracy < 1 && (
        <Alert sx={{ my: 2 }} severity="info">
          Please try to take the complete test for more accurate score with full
          report
        </Alert>
      )}
      {similarCelebs && (
        <Grid sx={{ mb: 2 }} container spacing={2}>
          <Grid item xs={12}>
            <Typography
              variant="h6"
              sx={{ textAlign: "left" }}
              color="text.primary"
            >
              Celebrtities similar to you
            </Typography>
          </Grid>
          {similarCelebs.map((celeb) => (
            <Grid item xs={6} md={3} key={celeb["First Name"]}>
              <Card variant="outlined">
                <CardActionArea>
                  <CardMedia
                    component="img"
                    sx={{ height: { md: 250, sm: 225, xs: 180 } }}
                    src={celeb.photo || placeholder}
                    alt={`${celeb["First Name"]} ${celeb["Last Name"]}`}
                  />
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="body1"
                      color="text.primary"
                      component="div"
                    >
                      {`${celeb["First Name"]} ${celeb["Last Name"]}`}
                    </Typography>
                    <Typography
                      variant="h5"
                      component="p"
                      color="text.secondary"
                    >
                      {celeb.score}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      <Typography
        sx={{ mt: 2, textAlign: "left" }}
        color="text.primary"
        variant="h6"
      >
        Takeaways
      </Typography>
      <Typography
        sx={{ mt: 2, textAlign: "left", lineHeight: 1.5 }}
        variant="body2"
        color="text.primary"
      >
        The brain is a complex organ — we may never fully comprehend how
        intelligence, ability to learn, and knowledge overlap.
        <br /> You can have a high IQ, but lack education and general knowledge.
        You can earn a degree yet score a lower IQ.
        <br />
        IQ tests measure your ability to reason, grasp ideas, and solve
        problems. Intelligence, in that respect, may be a matter of inheritance
        and potential. For the most part, IQ is generally considered stable
        throughout life.
      </Typography>
    </div>
  )
}
