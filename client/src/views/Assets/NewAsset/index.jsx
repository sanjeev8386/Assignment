import React from 'react'
import { Card, CardBody, CardHeader, Col, Container, Row } from 'reactstrap'
import Breadcrumbs from '../../../layout/breadcrumb'
import UploadAsset from './UploadAsset'

function NewBadge() {
    return (
        <>
            <Breadcrumbs parent="Assets" title="New Asset" />
            <Container fluid>
                <Row>
                    <Col md="12">
                        <Card>
                            <CardHeader>
                                <h5>Upload your Asset data</h5>
                                <span>Create your asset here</span>
                            </CardHeader>
                            <CardBody>
                                <UploadAsset />
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default NewBadge