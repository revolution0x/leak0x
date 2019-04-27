import React, {Component} from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { SimpleFileUpload, TextField } from 'formik-material-ui';
import Fab from '@material-ui/core/Fab';
import {withStyles} from '@material-ui/core/styles';
import CreateIcon from '@material-ui/icons/LeakAdd';
import * as yup from "yup";
import {uploadToIPFS,getFromIPFS,downloadFromIPFS} from "../utils/ipfs";
import {registerWhistleBlower} from "../services/leak0x";
import store from '../state';
import {Redirect} from 'react-router-dom';
import RegisterIcon from "@material-ui/icons/VerifiedUser";

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

class RegisterWhistleBlowerForm extends Component {
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
        const FILE_SIZE = 3 * 1000 * 1000; //3 MB
        const SUPPORTED_FORMATS = [
            "image/jpg",
            "image/jpeg",
            "image/png",
        ];
        const validationSchema = yup.object().shape({
        recaptcha: yup.array(),
        file: yup
            .mixed()
            .required("A profile picture is required")
            .test(
            "fileSize",
            "File too large (Limit is " + FILE_SIZE/1000/1000 + " MB)",
            value => value && value.size <= FILE_SIZE
            )
            .test(
            "fileFormat",
            "Unsupported Format",
            value => value && SUPPORTED_FORMATS.includes(value.type)
            ),
        pseudonym: yup
            .string()
            .required("A pseudonym is required")
            .test('len', 'Must be more than 1 character and less than 32 characters', val => (val && (val.length >= 12) && (val.length <= 32)))
        });
        return(
            <div className={"center"}>
                {redirect && 
                    <Redirect to={redirect}/>
                }
                {!redirect && 
                    <Formik
                    initialValues={{ file: "", pseudonym: "" }}
                    validationSchema={validationSchema}
                    validateOnBlur={true}
                    onSubmit={(values, { setSubmitting }) => {
                        const reader = new FileReader();
                        const pseudonym = values.pseudonym;
                        const mimeType = values.file.type;
                        reader.readAsArrayBuffer(values.file)
                        reader.onloadend = function() {
                            let data = Buffer.from(reader.result);
                            uploadToIPFS(data).then(async (res) => {
                                await registerWhistleBlower(store.getState().setActiveAccount, pseudonym, res[0].hash, mimeType);
                                //thisPersist.setRedirect(`/leak/${res[0].hash}`);
                                downloadFromIPFS(res[0].hash, mimeType, "Profile Picture From IPFS");
                                setSubmitting(false);
                            });
                        };
                    }}
                    >
                    {({ isSubmitting, setFieldValue }) => (
                        <Form>
                            <Field className={"fullwidth " + classes.inputMargin} type="text" name="pseudonym" placeholder="Pseudonym" component={TextField}/>
                            <Field type="file" name="file" setFieldValue={setFieldValue} component={SimpleFileUpload}/>
                            <Fab variant="extended" type="submit" disabled={isSubmitting} aria-label="Submit" className={classes.fab}>
                                <RegisterIcon className={classes.extendedIcon} />
                                Register
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

export default withStyles(styles, {withTheme: true})(RegisterWhistleBlowerForm);