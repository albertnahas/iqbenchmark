import { useEffect, useState } from "react"
import DialogTitle from "@mui/material/DialogTitle"
import Dialog from "@mui/material/Dialog"
import {
  Container,
  Typography,
  Grid,
  Stack,
  Button,
  TextField,
  InputAdornment,
} from "@mui/material"
import { PayPalButtons } from "@paypal/react-paypal-js"
import { DoneOutline } from "../../icons/DoneOutline"
import { useTheme } from "@mui/system"
import anime from "animejs"
import { useSelector } from "react-redux"
import { useAnalytics } from "../../hooks/useAnalytics"
import { userSelector } from "../../store/userSlice"
import { useUser } from "../../hooks/useUser"
import { useFormik } from "formik"
import * as Yup from "yup"
import LocalOfferIcon from "@mui/icons-material/LocalOffer"

export interface PaymentDialogProps {
  open: boolean
  amount: number
  onClose: (payed: boolean) => void
}

export function PaymentDialog(props: PaymentDialogProps) {
  const theme = useTheme()
  const { onClose, open } = props
  const [showPromo, setShowPromo] = useState(false)
  const [payed, setPayed] = useState(false)
  const [error, setError] = useState()
  const user = useSelector(userSelector)
  const { logEvent } = useAnalytics()
  const { updateUser } = useUser()

  const createOrder = (data: any, actions: any) =>
    actions.order.create({
      purchase_units: [
        {
          amount: {
            value: props.amount,
          },
        },
      ],
    })

  const onApprove = (data: any, actions: any) => {
    const orders = user?.orders || []
    try {
      updateUser({
        ...user,
        orders: [
          ...orders,
          {
            orderId: data.orderID,
            amount: props.amount,
            date: new Date(),
          },
        ],
      })
    } catch (error: any) {
      setError(error)
    }

    const capture = actions.order.capture()
    setPayed(true)
    return capture
  }

  useEffect(() => {
    if (payed) {
      setTimeout(() => {
        handleClose()
      }, 500)
    }
    return () => {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [payed])

  const handleClose = () => {
    onClose(payed)
  }

  const animation = () => {
    anime({
      targets: "[class*=doneOutline-]",
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: "easeInOutSine",
      duration: 500,
      delay: function (el, i) {
        return i * 500
      },
    })
  }

  const formik = useFormik({
    initialValues: {
      code: "",
    },
    validationSchema: Yup.object({
      code: Yup.string().max(100).min(3).required("promo code is required"),
    }),
    onSubmit: (values, { resetForm, setErrors, setSubmitting }) => {
      if (values.code === "20FREE") {
        setPayed(true)
        setSubmitting(false)
      } else {
        setErrors({ code: "invalid promo code" })
        setSubmitting(false)
      }
    },
  })

  useEffect(() => {
    if (payed) {
      setTimeout(() => {
        animation()
      }, 500)
    }
    return () => {}
  }, [payed])

  useEffect(() => {
    open && logEvent("payment_open", { userId: user?.uid })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  return (
    <Dialog
      onClose={handleClose}
      aria-label={"payment"}
      open={open}
      fullWidth
      maxWidth="xs"
    >
      <DialogTitle>Payment process</DialogTitle>
      <Container maxWidth="xs">
        {!payed && (
          <>
            <Typography color="success.main" variant="subtitle1">
              Congratulations! you finished the test
            </Typography>
            <Typography color="text.primary" variant="subtitle1">
              Please proceed with the payment in order to see your results
            </Typography>
            {!!error && (
              <Typography color="error" sx={{ my: 1 }} variant="body2">
                {error}
              </Typography>
            )}
            <Typography color="primary.main" variant="h6">
              ${props.amount} will be charged to your account
            </Typography>
            <Grid container sx={{ my: 2 }}>
              <PayPalButtons
                createOrder={(data: any, actions: any) =>
                  createOrder(data, actions)
                }
                onApprove={(data: any, actions: any) =>
                  onApprove(data, actions)
                }
                onError={(error: any) => setError(error.message)}
                style={{ layout: "horizontal" }}
              />
            </Grid>
            <Button sx={{ mb: 2 }} onClick={() => setShowPromo(true)}>
              I have a promo code
            </Button>
            {showPromo && (
              <form onSubmit={formik.handleSubmit}>
                <TextField
                  error={Boolean(formik.touched.code && formik.errors.code)}
                  helperText={formik.touched.code && formik.errors.code}
                  fullWidth
                  label="Code"
                  margin="normal"
                  name="code"
                  aria-label="code"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.code}
                  variant="outlined"
                  type="text"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocalOfferIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                <Button
                  type="submit"
                  aria-label="google pay"
                  variant="outlined"
                  sx={{ my: 2 }}
                >
                  Apply Code
                </Button>
              </form>
            )}
          </>
        )}
        {!!payed && (
          <Stack sx={{ alignItems: "center", mb: 3 }} spacing={1}>
            <DoneOutline
              style={{ fontSize: "4em", color: theme.palette.secondary.light }}
            />
            <Typography color="secondary" sx={{ mb: 2 }} variant="h4">
              Thank you!
            </Typography>
            <Typography
              sx={{ display: "flex", justifyContent: "center" }}
              color="textSecondary"
              gutterBottom
              variant="body2"
            >
              Payment successful
              {/* <Typography color="red" variant="inherit" sx={{ ml: 0.5 }}>
                &#x2764;
              </Typography> */}
            </Typography>
          </Stack>
        )}
      </Container>
    </Dialog>
  )
}
