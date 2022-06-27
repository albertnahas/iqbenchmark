import React, { FC } from "react"
import {
  Container,
  Typography,
  TextField,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material"
import { Box } from "@mui/system"
import { useFormik } from "formik"
import * as Yup from "yup"
import { useUser } from "../../../hooks/useUser"

export const RegisterStep2: FC<Props> = function (props) {
  const { updateUser } = useUser()

  const formik = useFormik({
    initialValues: {
      age: 25,
      gender: "male",
    },
    validationSchema: Yup.object({
      age: Yup.number().max(90).min(16).required("Age is required"),
      gender: Yup.string().required("Gender is required"),
    }),
    onSubmit: (values, { resetForm, setErrors, setSubmitting }) => {
      updateUser({
        uid: props.uid,
        age: values.age,
        gender: values.gender as "male" | "female" | undefined,
        complete: true,
      })
    },
  })

  return (
    <Box
      component="main"
      sx={{
        display: "flex",
        flexGrow: 1,
        minHeight: "100%",
        textAlign: "center",
        pb: 2,
      }}
    >
      <Container maxWidth="sm">
        <form onSubmit={formik.handleSubmit}>
          <Box sx={{ my: 3 }}>
            <Typography color="textPrimary" variant="h4">
              Tell us more about you
            </Typography>
            <Typography color="textSecondary" gutterBottom variant="body2">
              Fill in the information below to get started
            </Typography>
          </Box>
          <TextField
            error={Boolean(formik.touched.age && formik.errors.age)}
            helperText={formik.touched.age && formik.errors.age}
            fullWidth
            label="age"
            margin="normal"
            name="age"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="number"
            value={formik.values.age}
            variant="outlined"
          />
          <Box>
            <FormControl component="fieldset">
              <FormLabel component="legend">Gender</FormLabel>
              <RadioGroup
                row
                aria-label="gender"
                name="gender"
                value={formik.values.gender}
                onChange={formik.handleChange}
              >
                <FormControlLabel
                  value="female"
                  control={<Radio size="small" />}
                  label="Female"
                />
                <FormControlLabel
                  value="male"
                  control={<Radio size="small" />}
                  label="Male"
                />
              </RadioGroup>
            </FormControl>
          </Box>
          <Box sx={{ py: 2 }}>
            <Button
              color="primary"
              disabled={formik.isSubmitting}
              fullWidth
              size="large"
              type="submit"
              variant="contained"
            >
              Submit
            </Button>
          </Box>
        </form>
      </Container>
    </Box>
  )
}

interface Props {
  uid?: string
}
