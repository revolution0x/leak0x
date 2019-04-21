import React, {Component} from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { SimpleFileUpload, TextField } from 'formik-material-ui';
import Fab from '@material-ui/core/Fab';
import {withStyles} from '@material-ui/core/styles';
import CreateIcon from '@material-ui/icons/LeakAdd';
import * as yup from "yup";
import {uploadToIPFS,getFromIPFS} from "../utils/ipfs";
import {createLeak} from "../services/leak0x";
import store from '../state';
import {Redirect} from 'react-router-dom';
var Buffer = require('buffer/').Buffer

const styles = theme => ({
    fab: {
        width: '100%',
        marginTop: theme.spacing.unit * 2,
    },
    extendedIcon: {
        marginRight: theme.spacing.unit,
    },
    inputMargin: {
        marginBottom: theme.spacing.unit * 2,
    }
});

class CreateLeakForm extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    setRedirect(redirect) {
        this.setState({redirect});
    }
    
    render(){
        const {redirect} = this.state;
        const {classes} = this.props;
        const thisPersist = this;
        const FILE_SIZE = 100 * 1000 * 1000; //100 MB
        const SUPPORTED_FORMATS = [
            "image/jpg",
            "image/jpeg",
            "image/gif",
            "image/png",
            "application/pdf",
            "video/webm",
            "video/mp4",
            "video/ogg"
        ];
        const validationSchema = yup.object().shape({
        recaptcha: yup.array(),
        file: yup
            .mixed()
            .required("A file is required")
            .test(
            "fileSize",
            "File too large",
            value => value && value.size <= FILE_SIZE
            )
            .test(
            "fileFormat",
            "Unsupported Format",
            value => value && SUPPORTED_FORMATS.includes(value.type)
            ),
        title: yup
            .string()
            .required("A title is required")
            .test('len', 'Must be more than 12 characters', val => (val && (val.length >= 12)))
        });
        return(
            <div className={"center"}>
                {redirect && 
                    <Redirect to={redirect}/>
                }
                {!redirect && 
                    <Formik
                    initialValues={{ file: "", title: "" }}
                    validationSchema={validationSchema}
                    validateOnBlur={true}
                    onSubmit={(values, { setSubmitting }) => {
                        const reader = new FileReader();
                        const title = values.title;
                        const mimeType = values.file.type;
                        reader.readAsArrayBuffer(values.file)
                        reader.onloadend = function() {
                            let data = Buffer.from(reader.result);
                            uploadToIPFS(data).then(async (res) => {
                                await createLeak(store.getState().setActiveAccount, res[0].hash, title, mimeType);
                                thisPersist.setRedirect(`leak/${res[0].hash}`);
                                setSubmitting(false);
                            });
                        };
                    }}
                    >
                    {({ isSubmitting, setFieldValue }) => (
                        <Form>
                            <Field className={"fullwidth " + classes.inputMargin} type="text" name="title" placeholder="Leak Title" component={TextField}/>
                            <Field type="file" name="file" setFieldValue={setFieldValue} component={SimpleFileUpload}/>
                            <Fab variant="extended" type="submit" disabled={isSubmitting} aria-label="Submit" className={classes.fab}>
                                <CreateIcon className={classes.extendedIcon} />
                                Submit
                            </Fab>
                            {/* <pre>{JSON.stringify({name: values.file.name, type: values.file.type, size: values.file.size})}</pre> */}
                        </Form>
                    )}
                    </Formik>
                }
            </div>
        )
    }
};

export default withStyles(styles, {withTheme: true})(CreateLeakForm);