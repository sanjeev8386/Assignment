import React from 'react'
import { Card, CardBody, CardHeader, Row, Col, Container } from 'reactstrap'
import { PlusSquare } from 'react-feather';
import { useNavigate } from 'react-router-dom';
import Breadcrumbs from '../../layout/breadcrumb'
import AssetsTable from './AssetsTable';

function Asset() {
    const navigateTo = useNavigate();
    return (
        <>
            <Breadcrumbs title="Assets" />
            <Container fluid>
                <Row>
                    <Col md="12">
                        <Card>
                            <CardHeader style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <h5>List of uploaded Assets</h5>
                                <PlusSquare style={{ cursor: 'pointer' }} onClick={() => navigateTo('/assets/new')} />
                            </CardHeader>
                            <CardBody>
                                <AssetsTable />
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Asset