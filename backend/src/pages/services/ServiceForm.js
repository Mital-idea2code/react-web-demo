import {
  Grid,
  CircularProgress,
  Typography,
  Button,
  Container,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import CustomInput from "../../components/CustomInput/CustomInput";
import PageTitle from "../../components/PageTitle";
import { makeStyles } from "@material-ui/core/styles";

import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { useForm, Controller } from "react-hook-form";
import { addService, editService } from "../../apiServices";
import { toast } from "react-toastify";

const useStyles = makeStyles({
  form: {
    width: "100%",
  },
  cardroot: {
    minWidth: 275,
    textAlign: "center",
    background: "#8080801a",
  },
  sub_btn: {
    marginTop: "20px",
  },
});

export default function ServiceForm(props) {
  const classes = useStyles();
  // local
  var [isLoading, setIsLoading] = useState(false);
  var [error, setError] = useState("");
  const [isupdate, setisupdate] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  useEffect(() => {
    console.log(props);
    if (props.location.state) {
      if (props.location.state.editdata) {
        setisupdate(props.location.state.editdata._id);
        setValue("name", props.location.state.editdata.name);
        setValue("sub_title", props.location.state.editdata.sub_title);
        setValue("desc", props.location.state.editdata.desc);
      }
    }
  });
  const onFormSubmit = async (data) => {
    isupdate === ""
      ? addService(data)
          .then((res) => {
            toast.success("Added successfully!");
            props.history.push("/app/services");
          })
          .catch((err) => {
            toast.error("Something Went Wrong!");
            setIsLoading(false);
          })
      : editService(data, isupdate)
          .then((res) => {
            toast.success("Update successfully!");
            props.history.push("/app/services");
          })
          .catch((err) => {
            toast.error("Something Went Wrong!");
            setIsLoading(false);
          });
  };

  return (
    <Container>
      <PageTitle title="Add Service" />
      <Card className={classes.cardroot}>
        <CardContent>
          <Grid container spacing={3}>
            <Container>
              <form
                className={classes.form}
                onSubmit={handleSubmit(onFormSubmit)}
              >
                <Grid container spacing={3}>
                  <CustomInput
                    xs={12}
                    sm={6}
                    name="name"
                    label="Service Name"
                    defaultValue=""
                    inputProps={{
                      ...register("name", { required: true }),
                    }}
                    errors={
                      errors.name?.type === "required" && "Name is required"
                    }
                  />
                  <CustomInput
                    xs={12}
                    sm={6}
                    name="sub_title"
                    label="Service Sub-title"
                    defaultValue=""
                    inputProps={{
                      ...register("sub_title", { required: true }),
                    }}
                    errors={
                      errors.sub_title?.type === "required" &&
                      "Sub title is required"
                    }
                  />

                  <CustomInput
                    xs={12}
                    sm={12}
                    name="desc"
                    label="Short Description"
                    rows={3}
                    multiline={true}
                    inputProps={{ ...register("desc", { required: true }) }}
                    errors={
                      errors.desc?.type === "required" &&
                      "Description is required"
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  {isLoading ? (
                    <CircularProgress
                      size={26}
                      className={classes.loginLoader}
                    />
                  ) : (
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      size="large"
                    >
                      Submit
                    </Button>
                  )}
                </Grid>
              </form>
            </Container>
          </Grid>
        </CardContent>
      </Card>

      {/* <PageTitle title="Add Service" />
      <Grid container spacing={3}>
        <form className={classes.form}>
          <Grid container spacing={3}>
            <CustomInput
              xs={12}
              sm={6}
              name="Name"
              label="Service Name"
              defaultValue=""
            />
            <CustomInput
              xs={12}
              sm={6}
              name="sub-title"
              label="Service Sub-title"
              defaultValue=""
            />
            <CustomInput
              xs={12}
              sm={6}
              name="Short Description"
              label="Short Description"
              rows={3}
              multiline={true}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
            >
              Submit
            </Button>
          </Grid>
        </form>
      </Grid> */}
    </Container>
  );
}
