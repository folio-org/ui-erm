import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { Redirect } from 'react-router-dom';

import { NoteCreatePage } from '@folio/stripes/smart-components';

import {
  formatNoteReferrerEntityData,
  urls,
} from '../components/utilities';

import { entityTypeTranslationKeys } from '../constants';

export default class NoteCreateRoute extends Component {
  static propTypes = {
    history: PropTypes.shape({
      goBack: PropTypes.func.isRequired,
    }).isRequired,
    location: ReactRouterPropTypes.location.isRequired,
  };

  renderCreatePage() {
    const { history } = this.props;

    return (
      <NoteCreatePage
        domain="agreements"
        entityTypeTranslationKeys={entityTypeTranslationKeys}
        navigateBack={history.goBack}
        paneHeaderAppIcon="agreements"
        referredEntityData={formatNoteReferrerEntityData(this.props.location.state)}
      />
    );
  }

  render() {
    const { location } = this.props;

    return location.state
      ? this.renderCreatePage()
      : <Redirect to={urls.agreements()} />;
  }
}
