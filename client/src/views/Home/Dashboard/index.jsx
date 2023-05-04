import React, { Fragment, useState } from 'react';
import Breadcrumb from '../../../layout/breadcrumb';
import ApexCharts from 'react-apexcharts';
import { Container, Row, Col, Card, CardBody, CardHeader, Table } from 'reactstrap';
import CountUp from 'react-countup';
import { Monthlysales } from './chartsData/apex-charts-data';
import { TodayTotalSale } from '../../../constant';
import { usePagination } from '../../../hooks';

const Dashboard = (props) => {
  const { data, total, fetchData, loading, setPerPage, perPage, currentPage } =
    usePagination('/asset');

  const sum = () => {
    let sum = 0;
    for (let i = 0; i < data.length; i++) {
      sum += data[i].amount;
    }
    return sum;
  };

  return (
    <Fragment>
      <Breadcrumb title="Home" />
      <Container fluid={true}>
        <Row className="size-column">
          <Col xl="7 xl-100" className="box-col-12 ">
            <Row className="dash-chart">
              <Col xl="6" className="box-col-6" md="6">
                <Card className="o-hidden">
                  <CardHeader className="card-no-border">
                    <div className="card-header-right">
                      <ul className="list-unstyled card-option">
                        <li>
                          <i className="fa fa-spin fa-cog"></i>
                        </li>
                        <li>
                          <i className="view-html fa fa-code"></i>
                        </li>
                        <li>
                          <i className="icofont icofont-maximize full-card"></i>
                        </li>
                        <li>
                          <i className="icofont icofont-minus minimize-card"></i>
                        </li>
                        <li>
                          <i className="icofont icofont-refresh reload-card"></i>
                        </li>
                        <li>
                          <i className="icofont icofont-error close-card"></i>
                        </li>
                      </ul>
                    </div>
                    <div className="media">
                      <div className="media-body">
                        <p style={{ display: 'flex', gap: '10px' }}>
                          <span className="f-w-500 font-roboto">You have borrowed money till now</span>
                        </p>
                        <h4 className="f-w-500 mb-0 f-26">
                          {'₹'}
                          <span className="counter">
                            <CountUp end={sum()} />
                          </span>
                        </h4>
                      </div>
                    </div>
                  </CardHeader>
                  <CardBody className="p-0">
                    <div className="media">
                      <div className="media-body">
                        <div className="profit-card">
                          <ApexCharts
                            id="spaline-chart"
                            options={Monthlysales.options}
                            series={Monthlysales.series}
                            type="area"
                            height={150}
                          />
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Dashboard;
