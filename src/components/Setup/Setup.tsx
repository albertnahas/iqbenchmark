import * as React from "react"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import CardHeader from "@mui/material/CardHeader"
import CssBaseline from "@mui/material/CssBaseline"
import Grid from "@mui/material/Grid"
import StarIcon from "@mui/icons-material/StarBorder"
import Typography from "@mui/material/Typography"
import GlobalStyles from "@mui/material/GlobalStyles"
import Container from "@mui/material/Container"
import { styled } from "@mui/system"
import { keyframes } from "@emotion/react"
import { Results } from "../Results/Results"

const tiers = [
  {
    title: "Free",
    price: "0",
    description: [
      "10 questions",
      "10 minutes",
      "Least Accurate",
      "Basic Report",
    ],
    buttonText: "Start for Free",
    buttonVariant: "outlined",
  },
  {
    title: "Rapid",
    subheader: "Most popular",
    price: "0.99",
    description: [
      "20 questions",
      "20 minutes",
      "Likely Accurate",
      "Basic Report",
    ],

    buttonText: "Get started",
    buttonVariant: "contained",
  },
  {
    title: "Complete",
    price: "2.99",
    description: ["40 questions", "40 minutes", "Most Accurate", "Full Report"],

    buttonText: "Get started",
    buttonVariant: "outlined",
  },
]

const bounce = keyframes`
  0% {
    transform: translateY(0);
    }
    50% {
        transform: translateY(10px);
    }
    100% {
        transform: translateY(0);
    }
    `

const shrink = keyframes`
    0% {
        transform: scaleX(1);
    }
    50% {
        transform: scaleX(1.2);
    }
    100% {
        transform: scaleX(1);
    }
    `

const BrainWrapper = styled(Box)`
  width: "auto";
  display: inline-block;

  & img {
    width: 100%;
    max-width: 150px;
    animation: ${bounce} 3s infinite;
    z-index: 999;
    position: relative;
  }
`
const BrainShadow = styled("div")`
  margin: auto;
  margin-top: 1em;
  opacity: 0.3;
  width: 80%;
  height: 30px;
  background: #ccc;
  border-radius: 50%;
  animation: ${shrink} 3s infinite;
  z-index: -1;
`

export function Setup({ onSelect }: { onSelect: (item: string) => void }) {
  return (
    <React.Fragment>
      <GlobalStyles
        styles={{ ul: { margin: 0, padding: 0, listStyle: "none" } }}
      />
      <Typography
        variant="h3"
        sx={{ fontWeight: "light" }}
        color="text.secondary"
      >
        Welcome to IQBenchmark
      </Typography>
      <Container
        disableGutters
        maxWidth="sm"
        component="main"
        sx={{ pt: 2, pb: 4 }}
      >
        <CssBaseline />
        <BrainWrapper sx={{ my: 1 }}>
          <img alt="brain" src="./assets/brain.svg" />
          <BrainShadow />
        </BrainWrapper>

        <Typography
          variant="body1"
          align="center"
          color="text.secondary"
          component="p"
        >
          IQ (Intelligence Quotient) test, is a standardized test designed to
          measure human intelligence as distinct from attainments
        </Typography>
        <Box sx={{ my: 1 }}>
          <Results />
        </Box>
        <Typography variant="h6" align="center" color="primary" component="p">
          Choose your preferred test format and get started!
        </Typography>
      </Container>
      {/* End hero unit */}
      <Container maxWidth="md" component="main" sx={{ pb: 4 }}>
        <Grid container spacing={5} alignItems="flex-end">
          {tiers.map((tier) => (
            // Enterprise card is full width at sm breakpoint
            <Grid
              item
              key={tier.title}
              xs={12}
              sm={tier.title === "Enterprise" ? 12 : 6}
              md={4}
            >
              <Card>
                <CardHeader
                  title={tier.title}
                  subheader={tier.subheader}
                  titleTypographyProps={{ align: "center" }}
                  action={tier.title === "Pro" ? <StarIcon /> : null}
                  subheaderTypographyProps={{
                    align: "center",
                  }}
                  sx={{
                    backgroundColor: (theme) =>
                      theme.palette.mode === "light"
                        ? theme.palette.grey[200]
                        : theme.palette.grey[700],
                  }}
                />
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "baseline",
                      mb: 2,
                    }}
                  >
                    <Typography
                      component="h2"
                      variant="h3"
                      color="text.primary"
                    >
                      ${tier.price}
                    </Typography>
                  </Box>
                  <ul>
                    {tier.description.map((line) => (
                      <Typography
                        component="li"
                        variant="subtitle1"
                        align="center"
                        key={line}
                      >
                        {line}
                      </Typography>
                    ))}
                  </ul>
                </CardContent>
                <CardActions>
                  <Button
                    fullWidth
                    variant={tier.buttonVariant as "outlined" | "contained"}
                    onClick={() => onSelect(tier.title)}
                  >
                    {tier.buttonText}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </React.Fragment>
  )
}
