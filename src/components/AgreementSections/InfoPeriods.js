import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import {
  Button,
  ButtonGroup,
  Col,
  FormattedUTCDate,
  Headline,
  KeyValue,
  Layout,
  NoValue,
  Row,
} from '@folio/stripes/components';

const InfoPeriods = ({ periods = [] }) => {
  /*
   * This could be handled by callback, but since we need to know for display whether next/prev/current exist
   * it seems more prudent to just fetch all three at once and then do our logic at this stage
   */

  const displayPeriodOptions = periods.reduce((map, period) => {
    if (period.periodStatus) map[period.periodStatus] = period;
    return map;
  }, {});

  /*
   * Set up which period is currently selected. Heirachy is Current > Next > Previous
   * This code only runs once per component lifecycle
   * to prevent infinite loops.
   * This is equivalent to the old "componentDidMount"
   */

  const [selectedPeriod, setSelectedPeriod] = useState('current');
  const { current, next } = displayPeriodOptions;
  const isCurrent = !!current;
  const isNext = !!next;

  useEffect(() => {
    if (!isCurrent) {
      setSelectedPeriod(() => {
        return isNext ? 'next' : 'previous';
      });
    }
  }, [isCurrent, isNext]);

  const displayPeriod = displayPeriodOptions[selectedPeriod];

  const PeriodButton = (periodStatus) => {
    return (
      <Button
        buttonStyle={selectedPeriod === periodStatus ? 'primary' : 'default'}
        disabled={!displayPeriodOptions[periodStatus]}
        onClick={() => setSelectedPeriod(periodStatus)}
      >
        <FormattedMessage id={`ui-agreements.agreementPeriods.${periodStatus}`} />
      </Button>
    );
  };

  return (
    <>
      <Row>
        <Col xs={12}>
          <div data-test-period-header>
            <Headline
              size="large"
              tag="h3"
            >
              <FormattedMessage id="ui-agreements.agreementPeriods.period" />
            </Headline>
          </div>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <Layout className="textCentered">
            <ButtonGroup>
              {PeriodButton('previous')}
              {PeriodButton('current')}
              {PeriodButton('next')}
            </ButtonGroup>
          </Layout>
        </Col>
      </Row>
      <Row>
        <Col xs={3}>
          <KeyValue label={<FormattedMessage id="ui-agreements.agreementPeriods.periodStart" />}>
            <div data-test-period-info-start-date>
              {displayPeriod?.startDate ? <FormattedUTCDate value={displayPeriod?.startDate} /> : <NoValue />}
            </div>
          </KeyValue>
        </Col>
        <Col xs={3}>
          <KeyValue label={<FormattedMessage id="ui-agreements.agreementPeriods.periodEnd" />}>
            <div data-test-period-info-end-date>
              {displayPeriod?.endDate ? <FormattedUTCDate value={displayPeriod?.endDate} /> : <NoValue />}
            </div>
          </KeyValue>
        </Col>
        <Col xs={3}>
          <KeyValue label={<FormattedMessage id="ui-agreements.agreements.cancellationDeadline" />}>
            <div data-test-period-info-cancellation-deadline>
              {displayPeriod?.cancellationDeadline ? <FormattedUTCDate value={displayPeriod?.cancellationDeadline} /> : <NoValue />}
            </div>
          </KeyValue>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <KeyValue label={<FormattedMessage id="ui-agreements.agreementPeriods.periodNote" />}>
            <div data-test-period-info-note>
              {displayPeriod?.note ?? <NoValue />}
            </div>
          </KeyValue>
        </Col>
      </Row>
    </>
  );
};

export default InfoPeriods;

InfoPeriods.propTypes = {
  periods: PropTypes.arrayOf(PropTypes.shape({
    cancellationDeadline: PropTypes.string,
    endDate: PropTypes.string,
    periodStatus: PropTypes.string,
    startDate: PropTypes.string.isRequired,
  })),
};
