import React, {Component} from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { SimpleFileUpload } from 'formik-material-ui';
import Fab from '@material-ui/core/Fab';
import {withStyles} from '@material-ui/core/styles';
import CreateIcon from '@material-ui/icons/LeakAdd';
import * as yup from "yup";
import {uploadToIPFS,getFromIPFS} from "../utils/ipfs";
var Buffer = require('buffer/').Buffer

const styles = theme => ({
    fab: {
        marginTop: theme.spacing.unit,
        width: '100%'
    },
    extendedIcon: {
        marginRight: theme.spacing.unit,
    },
});

class CreateLeakForm extends Component {
    render(){
        const {classes} = this.props;
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
            )
        });
        return(
            <div className={"center"}>
                <Formik
                initialValues={{ file: "" }}
                validationSchema={validationSchema}
                validateOnBlur={true}
                onSubmit={(values, { setSubmitting }) => {
                    const reader = new FileReader();
                    reader.readAsArrayBuffer(values.file)
                    reader.onloadend = function() {
                        let data = Buffer.from(reader.result);
                        uploadToIPFS(data).then((res) => {
                            getFromIPFS(res[0].hash);
                            setSubmitting(false);
                        });
                    };
                }}
                >
                {({ isSubmitting, setFieldValue }) => (
                    <Form>
                        <Field type="file" name="file" setFieldValue={setFieldValue} component={SimpleFileUpload}/>
                        <Fab variant="extended" type="submit" disabled={isSubmitting} aria-label="Submit" className={classes.fab}>
                            <CreateIcon className={classes.extendedIcon} />
                            Submit
                        </Fab>
                        {/* <pre>{JSON.stringify({name: values.file.name, type: values.file.type, size: values.file.size})}</pre> */}
                    </Form>
                )}
                </Formik>
            </div>
        )
    }
};

export default withStyles(styles, {withTheme: true})(CreateLeakForm);