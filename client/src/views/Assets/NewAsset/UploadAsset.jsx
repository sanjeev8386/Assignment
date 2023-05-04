import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Col, FormGroup, Input, Label, Row, Button } from 'reactstrap'
import { asyncWrap } from '../../../utils/utils';

function UploadBadgeImage({ onDone, toggle, incentiveName }) {
    const [uploadedFile, setUploadedFile] = useState();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [isUploaded, setIsUploaded] = useState(false);
    const navigate = useNavigate()

    const onSubmit = async () => {
        const payload = {
            title: title,
            description: description,
            url: uploadedFile
        }
        const [err] = await asyncWrap(axios.post('/asset', payload));
        if (err) {
            toast.error(err.response.data.message)
        } else {
            toast.success("Badge created successfully!")
            if (onDone) {
                await onDone(incentiveName);
                toggle();
            } else {
                navigate("/badge")
            }
        }
    }

    const readUploadFile = async (e) => {
        const formData = new FormData();
        formData.append('file', e.target.files[0])
        const [err, res] = await asyncWrap(axios.post('/upload', formData));

        if (err) {
            toast.error(err.response.data.message)
        } else {
            setUploadedFile(res.data.fileUrl)
            setIsUploaded(true);
        }
    };

    return (
        <>
            <Row xs="1" md="2" xl="3">
                <Col>
                    <FormGroup>
                        <Label for="title">Asset Title</Label>
                        <Input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="form-control input-air-primary rounded-4"
                            type="text"
                            name="text"
                            id="title"
                            placeholder="Enter title here"
                        />
                    </FormGroup>
                </Col>
            </Row>
            <Row xs="1" md="2" xl="3">
                <Col>
                    <FormGroup>
                        <Label for="description">Asset Title</Label>
                        <Input
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="form-control input-air-primary rounded-4"
                            type="text"
                            name="text"
                            id="description"
                            placeholder="Enter description here"
                        />
                    </FormGroup>
                </Col>
            </Row>
            <Row xs="1" md="2" xl="3">
                <Col>
                    <FormGroup>
                        <Label>Upload Badge Image </Label>
                        <Input
                            name="file"
                            accept=" .png, .JPEG, .JPG, .gif"
                            type="file"
                            onChange={readUploadFile}
                            className="form-control input-air-primary rounded-4"
                        />
                    </FormGroup>
                </Col>
            </Row>
            <Button disabled={!isUploaded} onClick={onSubmit} color="primary">Save</Button>
        </>
    )
}

export default UploadBadgeImage