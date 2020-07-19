import React, {useEffect, useState} from 'react';
import { Typography, Button } from '@material-ui/core';
import Close from '@material-ui/icons/Close';

import UploadIcon from './uploadIcon.svg';
import { useStyles } from './style';


const ImageUploaderComponent = ({onChange, dataUrl}) => {
    const ACCEPT = 'image/*';
    const ImgExtensions = ['.jpg', '.jpeg', '.gif', '.png'];
    const MaxFileSize = 1048576;
    const ERROR = {
        NOT_SUPPORTED_EXTENSION: 'NOT_SUPPORTED_EXTENSION',
        FILESIZE_TOO_LARGE: 'FILESIZE_TOO_LARGE'
    };
    const classes = useStyles();

    const [fileError, setfileError] = useState(null);
    const [inputElement, setinputElement] = useState(null);
    const [dataURL, setdataURL] = useState(null);

    /**
     * Check for the Extension for the file and Matches with IMGEXTENSIONS
     * @param {string} fileName The name of the file
     * @returns {boolean} If match found
     */
    const hasExtension = (fileName) => {
        const pattern = '(' + ImgExtensions.join('|').replace(/\./g, '\\.') + ')$';
        return new RegExp(pattern, 'i').test(fileName);
    }

    /**
     * Render FIle inputting Errors
     */
    const renderErrors = () => {
        if (fileError) {
            return (
                `* ${fileError.name} ${fileError.type === ERROR.FILESIZE_TOO_LARGE ? "file size is too big" : "is not a supported file extension"}`
            );
        }
    }

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    const triggerFileUpload = () => {
        inputElement.click();
    }

    const onDropFile = (e) => {
        const file = e.target.files[0];

        let fileError = {
            name: file.name,
        };

        // Check for file extension
        if (!hasExtension(file.name)) {
            fileError = Object.assign(fileError, {
                type: ERROR.NOT_SUPPORTED_EXTENSION
            });
            setfileError(fileError);
            return;
        }

        // Check for file size
        if (file.size > MaxFileSize) {
            fileError = Object.assign(fileError, {
                type: ERROR.FILESIZE_TOO_LARGE
            });
            setfileError(fileError);
            return;
        }

        toBase64(file).then((value) => {
            setdataURL(()=>value);
        });
    }

    useEffect(()=>{
        console.log(dataUrl)
        setdataURL(dataUrl)
    },[dataUrl])

    useEffect(()=> {
        onChange(dataURL)
    }, [dataURL])

    /**
     * Renders the preview image
     */
    const renderPreview = () => {
        if (dataURL) {
            return (
                <div >
                    <div className={classes.uploadPictureContainer}>
                        <Close className={classes.deleteImage} onClick={() => removeImage()} />
                        <img src={dataURL} style={{ width: '100%', height: '100%' }} alt="preview" />
                    </div>
                </div>
            )
        }
    }

    /**
     * Remove the Image file
     */
    const removeImage = () => {
        setdataURL(null);
    }
    
    return (
        <React.Fragment>
            <div className={classes.fileContainer}>
                {!dataURL ? (
                    <React.Fragment>

                        <img src={UploadIcon} className="uploadIcon" alt="Upload Icon" />
                        <Typography variant="body2">Max file size: 1mb</Typography>
                        <div className={classes.errorsContainer}>
                            {renderErrors()}
                        </div>
                        <Button variant="outlined" color="primary" onClick={triggerFileUpload}>
                            Choose image
                            </Button>
                        <input
                            hidden={true}
                            type="file"
                            ref={input => setinputElement(input)}
                            onChange={onDropFile}
                            accept={ACCEPT}
                        />

                    </React.Fragment>
                ) : renderPreview()}
            </div>
        </React.Fragment>
    )
}

export default ImageUploaderComponent;