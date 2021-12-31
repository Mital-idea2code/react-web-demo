import React, { useState, useEffect } from "react";
import PageTitle from "../../components/PageTitle";
import {
  Grid,
  Container,
  CircularProgress,
  Typography,
  Button,
} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import { useForm, Controller } from "react-hook-form";
import CustomInput from "../../components/CustomInput/CustomInput";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { Editor } from "react-draft-wysiwyg";
import {
  EditorState,
  convertToRaw,
  ContentState,
  convertFromHTML,
  convertFromRaw,
} from "draft-js";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "../../css/react-tabs.css";
import {
  allSettings,
  updateSetting,
  updateConatctSetting,
} from "../../apiServices";
import { toast } from "react-toastify";
import { stateFromHTML } from "draft-js-import-html";
import { TextField } from "@material-ui/core";
import htmlToDraft from "html-to-draftjs";

const useStyles = makeStyles({
  form: {
    width: "100%",
    padding: "20px 0px",
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
export default function Setting(props) {
  const classes = useStyles();
  var [isLoading, setIsLoading] = useState(false);
  var [error, setError] = useState("");

  const [SettingId, setSettingId] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm();

  const {
    register: register2,
    handleSubmit: handleSubmit2,
    formState: { errors: errors2 },
    setValue: setValue2,
    control: control2,
  } = useForm();

  const [editorState, setEditorState] = useState(null);
  const [temp, setTemp] = useState(null);

  const getAboutUsData = () => {
    allSettings()
      .then((response) => {
        const contentBlock = htmlToDraft(response.data[0].about);
        if (contentBlock) {
          const contentState = ContentState.createFromBlockArray(
            contentBlock.contentBlocks,
          );
          const editorState = EditorState.createWithContent(contentState);
          setTemp(editorState);
        }
        setSettingId(response.data[0]._id);
        setValue2("address", response.data[0].address);
        setValue2("facebook", response.data[0].facebook);
        setValue2("instagram", response.data[0].instagram);
        setValue2("linkedin", response.data[0].linkedin);
        setValue2("twitter", response.data[0].twitter);
        setValue2("googleplus", response.data[0].googleplus);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAboutUsData();
  }, []);

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };

  const onFormSubmit = async (data) => {
    const item = {};
    if (editorState) {
      item["about"] = draftToHtml(
        convertToRaw(editorState.getCurrentContent()),
      );
    } else {
      item["about"] = draftToHtml(convertToRaw(temp.getCurrentContent()));
    }

    updateSetting(item, SettingId)
      .then((res) => {
        toast.success("Update successfully!");
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  const oncontactSubmit = async (data) => {
    updateConatctSetting(data, SettingId)
      .then((res) => {
        toast.success("Update successfully!");
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };
  return (
    <Container>
      <PageTitle title="Setting" />
      <Card className={classes.cardroot}>
        <CardContent>
          <Tabs>
            <TabList>
              <Tab>About Info</Tab>
              <Tab>Contact Info</Tab>
            </TabList>

            <TabPanel>
              <h2>
                <Grid container spacing={3}>
                  <Container>
                    <form
                      className={classes.form}
                      onSubmit={handleSubmit(onFormSubmit)}
                    >
                      <Grid className="editor_text">
                        <Controller
                          control={control}
                          name="about"
                          render={() => (
                            <Editor
                              wrapperClassName="wrapper-class"
                              editorClassName="editor-class"
                              // contentState={editorState}
                              editorState={editorState ? editorState : temp}
                              onEditorStateChange={onEditorStateChange}
                            />
                          )}
                          // render={() => <input {...register("test")} />}
                        />
                      </Grid>

                      <Grid item xs={12} sm={12} className={classes.sub_btn}>
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
              </h2>
            </TabPanel>
            <TabPanel>
              <form
                className={classes.form}
                onSubmit={handleSubmit2(oncontactSubmit)}
              >
                <Grid container spacing={3}>
                  <CustomInput
                    xs={12}
                    sm={12}
                    name="address"
                    label="Address"
                    defaultValue=""
                    inputProps={{
                      ...register2("address", { required: true }),
                    }}
                    errors={
                      errors2.address?.type === "required" &&
                      "Address is required"
                    }
                  />
                  <CustomInput
                    xs={12}
                    sm={4}
                    name="facebook"
                    label="Facebook"
                    defaultValue=""
                    inputProps={{
                      ...register2("facebook", { required: true }),
                    }}
                    errors={
                      errors2.facebook?.type === "required" &&
                      "Facebook is required"
                    }
                  />
                  <CustomInput
                    xs={12}
                    sm={4}
                    name="twitter"
                    label="Twitter"
                    defaultValue=""
                    inputProps={{
                      ...register2("twitter", { required: true }),
                    }}
                    errors={
                      errors2.twitter?.type === "required" &&
                      "Twitter is required"
                    }
                  />
                  <CustomInput
                    xs={12}
                    sm={4}
                    name="linkedin"
                    label="LinkedIn"
                    defaultValue=""
                    inputProps={{
                      ...register2("linkedin", { required: true }),
                    }}
                    errors={
                      errors2.linkedin?.type === "required" &&
                      "LinkedIn is required"
                    }
                  />
                  <CustomInput
                    xs={12}
                    sm={6}
                    name="instagram"
                    label="Instagram"
                    defaultValue=""
                    inputProps={{
                      ...register2("instagram", { required: true }),
                    }}
                    errors={
                      errors2.instagram?.type === "required" &&
                      "Instagram is required"
                    }
                  />
                  <CustomInput
                    xs={12}
                    sm={6}
                    name="googleplus"
                    label="Google Plus"
                    defaultValue=""
                    inputProps={{
                      ...register2("googleplus", { required: true }),
                    }}
                    errors={
                      errors2.googleplus?.type === "required" &&
                      "Google Plus is required"
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={12} className={classes.sub_btn}>
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
            </TabPanel>
          </Tabs>
        </CardContent>
      </Card>
    </Container>
  );
}
