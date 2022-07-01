import { FC } from "react"
import { Box, Button, Grid, Typography } from "@mui/material"
import { styled } from "@mui/material/styles"
import { useTheme } from "@mui/system"
import { Logo } from "../../icons/logo"
import { Background } from "../../icons/background"
import { LogoLight } from "../../icons/logoLight"
import { Results } from "../Results/Results"

const BrainWrapper = styled(Box)`
  position: relative;
  display: flex;
  justify-content: center;
  width: 300px;
  @media (max-width: 767px) {
    width: 250px;
  }
  margin: auto;
`

export var Landing: FC<Props> = function (props) {
  const theme = useTheme()
  return (
    <>
      <Box
        sx={{
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          // justifyContent: "center",
          paddingTop: 6,
          backgroundColor: theme.palette.primary.dark,
          // backgroundBlendMode: "color-dodge",
          flexGrow: 1,
          textAlign: "center",
          width: "100%",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          height: "calc(100vh - 65px)",
          backgroundImage: `url('/assets/${
            theme.palette.mode === "dark" ? "bg" : "bg"
          }.svg') !important`,
        }}
      >
        {/* <Background /> */}
        <BrainWrapper sx={{ m: 3 }}>
          <LogoLight sx={{ fontSize: "8em" }} />
        </BrainWrapper>
        <Typography
          sx={{
            fontWeight: "400",
            fontSize: { md: "4em", xs: "3em", color: "#fff" },
          }}
          variant="h1"
          aria-label="IQBenchmark"
        >
          IQBenchmark
        </Typography>
        <Typography
          sx={{
            m: 2,
            fontSize: "18px",
            fontWeight: 400,
            px: { xs: "2.5rem", md: 0, color: "#eee" },
          }}
          variant="h2"
          color="text.primary"
        >
          A simple, easy to use tool to know your IQ and compare it to others
        </Typography>
        <Button
          color="primary"
          fullWidth
          size="large"
          onClick={props.login}
          sx={{
            width: 200,
            mt: 3,
            color: "primary.main",
            background: "#fff",
            "&:hover": {
              color: "#fff",
            },
          }}
          aria-label="get started"
          variant="contained"
        >
          Start
        </Button>
      </Box>
      <Box>
        <Grid container>
          <Grid
            item
            md={6}
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              "& img": { width: { md: "100%", xs: "140%" } },
            }}
          >
            <img src="./assets/pic1.jpg" alt="girl" />
          </Grid>
          <Grid
            item
            md={6}
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              minHeight: "50vh",
              px: 8,
              py: 4,
            }}
          >
            <Box>
              <Typography
                variant="h4"
                color="primary"
                sx={{ fontSize: "2em", py: 2 }}
              >
                Check out your IQ and share the results with your friends
              </Typography>
              <Typography variant="body1" color="text.secondary">
                IQ is a measurement of your intelligence and is expressed in a
                number, the average IQ is 100 by definition. If you achieve a
                score higher than 100, you did better than the average person,
                and a lower score means you (somewhat) performed less
              </Typography>
            </Box>
            <Button
              color="primary"
              fullWidth
              size="large"
              onClick={props.login}
              sx={{
                width: 200,
                mt: 3,
              }}
              aria-label="get started"
              variant="contained"
            >
              Start
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Box>
        <Grid
          sx={{ flexDirection: { md: "row", xs: "column-reverse" } }}
          container
        >
          <Grid
            item
            md={6}
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              minHeight: "50vh",
              px: 8,
              py: 4,
              backgroundColor: theme.palette.primary.dark,
            }}
          >
            <Box>
              <Typography
                variant="h4"
                color="primary.light"
                sx={{ fontSize: "2.2em", mb: 2 }}
              >
                Check out where do you stand compared to others
              </Typography>
              <Typography variant="body1" color="white">
                By the current "deviation IQ" definition of IQ test standard
                scores, about two-thirds of all test-takers obtain scores from
                85 to 115, and about 5 percent of the population scores above
                125, <strong>find out now if you're one of them!</strong>
              </Typography>
            </Box>
            <Button
              color="primary"
              fullWidth
              size="large"
              onClick={props.login}
              sx={{
                width: 200,
                mt: 3,
              }}
              aria-label="get started"
              variant="contained"
            >
              Start
            </Button>
          </Grid>
          <Grid
            item
            md={6}
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              "& img": { width: { md: "60%", xs: "100%" } },
              p: 6,
            }}
          >
            <img alt="iq chart" src="./assets/chart.svg" />
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

interface Props {
  login: () => void
}
