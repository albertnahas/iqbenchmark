import { FC } from "react"
import { Box, Button, Typography } from "@mui/material"
import { styled } from "@mui/material/styles"
import { useTheme } from "@mui/system"
import { Logo } from "../../icons/logo"

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
    <Box
      sx={{
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "right",
        justifyContent: "center",
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
      <BrainWrapper sx={{ m: 2 }}>
        <Logo sx={{ fontSize: "10em" }} />
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
        }}
        aria-label="get started"
        variant="contained"
      >
        Start
      </Button>
    </Box>
  )
}

interface Props {
  login: () => void
}
