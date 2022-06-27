import { useEffect, useState } from "react"
import DialogTitle from "@mui/material/DialogTitle"
import Dialog from "@mui/material/Dialog"
import { Container, Typography, Grid, Stack } from "@mui/material"
import { PayPalButtons } from "@paypal/react-paypal-js"
import { DoneOutline } from "../../icons/DoneOutline"
import { useTheme } from "@mui/system"
import anime from "animejs"
import { useSelector } from "react-redux"
import { useAnalytics } from "../../hooks/useAnalytics"
import { userSelector } from "../../store/userSlice"
import { useUser } from "../../hooks/useUser"

export interface PaymentDialogProps {
  open: boolean
  amount: number
  onClose: (payed: boolean) => void
}

export function PaymentDialog(props: PaymentDialogProps) {
  const theme = useTheme()
  const { onClose, open } = props
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
    } catch (error) {
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
      onClose={() => handleClose(payed)}
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
