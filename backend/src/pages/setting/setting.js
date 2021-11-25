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
import { allSettings, updateSetting } from "../../apiServices";
import { toast } from "react-toastify";
import { stateFromHTML } from "draft-js-import-html";
import { TextField } from "@material-ui/core";

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
export default function Setting(props) {
  const classes = useStyles();
  var [isLoading, setIsLoading] = useState(false);
  var [error, setError] = useState("");

  const [SettingId, setSettingId] = useState("");

  var [test, setTest] = useState("Default Text");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm();

  const calcState = () => {
    allSettings().then((response) => {
      setTest(response.data[0].about);
      setSettingId(response.data[0]._id);
    });
    return EditorState.createWithContent(stateFromHTML(test));
  };

  const [editorState, setEditorState] = useState(calcState());

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };

  const onFormSubmit = async (data) => {
    const item = {};
    item["about"] = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    updateSetting(item, SettingId)
      .then((res) => {
        toast.success("Update successfully!");
        setTest(draftToHtml(convertToRaw(editorState.getCurrentContent())));
      })
      .catch((err) => {
        toast.error("Something Went Wrong!");
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
              <Tab>Contact Info {test}</Tab>
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
                              contentState={editorState}
                              editorState={editorState}
                              onEditorStateChange={onEditorStateChange}
                            />
                          )}
                          // render={() => <input {...register("test")} />}
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
              </h2>
            </TabPanel>
            <TabPanel>
              <h2>Content 2</h2>
            </TabPanel>
          </Tabs>
        </CardContent>
      </Card>
    </Container>
  );
}
