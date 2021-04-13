import React, { lazy, Suspense } from 'react';
import PropTypes from 'prop-types';
import { Switch } from 'react-router-dom';
import { Route } from '@folio/stripes/core';
import {
  CommandList,
  HasCommand,
  Layout,
  checkScope,
  defaultKeyboardShortcuts,
} from '@folio/stripes/components';

import css from './index.css';

const AgreementsRoute = lazy(() => import('./routes/AgreementsRoute'));
const AgreementCreateRoute = lazy(() => import('./routes/AgreementCreateRoute'));
const AgreementEditRoute = lazy(() => import('./routes/AgreementEditRoute'));
const AgreementViewRoute = lazy(() => import('./routes/AgreementViewRoute'));

const AgreementLineCreateRoute = lazy(() => import('./routes/AgreementLineCreateRoute'));
const AgreementLineEditRoute = lazy(() => import('./routes/AgreementLineEditRoute'));
const AgreementLineViewRoute = lazy(() => import('./routes/AgreementLineViewRoute'));

const BasketRoute = lazy(() => import('./routes/BasketRoute'));

const EResourcesRoute = lazy(() => import('./routes/EResourcesRoute'));
const EResourceViewRoute = lazy(() => import('./routes/EResourceViewRoute'));
const EResourceEditRoute = lazy(() => import('./routes/EResourceEditRoute'));

const NoteCreateRoute = lazy(() => import('./routes/NoteCreateRoute'));
const NoteEditRoute = lazy(() => import('./routes/NoteEditRoute'));
const NoteViewRoute = lazy(() => import('./routes/NoteViewRoute'));

const PlatformsRoute = lazy(() => import('./routes/PlatformsRoute'));
const PlatformViewRoute = lazy(() => import('./routes/PlatformViewRoute'));
const PlatformEditRoute = lazy(() => import('./routes/PlatformEditRoute'));

const UrlCustomizerEditRoute = lazy(() => import('./routes/UrlCustomizerEditRoute'));
const UrlCustomizerViewRoute = lazy(() => import('./routes/UrlCustomizerViewRoute'));
const UrlCustomizerCreateRoute = lazy(() => import('./routes/UrlCustomizerCreateRoute'));

const IfEResourcesEnabled = lazy(() => import('./components/IfEResourcesEnabled'));
const OpenBasketButton = lazy(() => import('./components/OpenBasketButton'));

const Settings = lazy(() => import('./settings'));

class App extends React.Component {
  static propTypes = {
    history: PropTypes.object,
    location: PropTypes.shape({
      pathname: PropTypes.string
    }),
    match: PropTypes.object.isRequired,
    actAs: PropTypes.string.isRequired,
    stripes: PropTypes.object.isRequired,
  }

  searchInput = () => {
    const { pathname } = this.props.location;

    if (pathname.search('/erm/agreements') === 0) {
      return 'input-agreement-search';
    } else if (pathname.search('/erm/eresources') === 0) {
      return 'input-eresource-search';
    } else if (pathname.search('/erm/platforms') === 0) {
      return 'input-platform-search';
    } else {
      return undefined;
    }
  }

  focusSearchField = () => {
    const { history, stripes } = this.props;
    const el = document.getElementById(this.searchInput());
    if (el) {
      el.focus();
    } else {
      history.push(stripes.home);
    }
  }

  shortcuts = [
    {
      name: 'search',
      handler: this.focusSearchField
    },
  ];

  render() {
    const { actAs, match: { path } } = this.props;

    if (actAs === 'settings') {
      return (
        <Suspense fallback={null}>
          <Settings {...this.props} />
        </Suspense>
      );
    }

    return (
      <CommandList commands={defaultKeyboardShortcuts}>
        <HasCommand
          commands={this.shortcuts}
          isWithinScope={checkScope}
          scope={document.body}
        >
          <div className={css.container}>
            <Suspense fallback={null}>
              <IfEResourcesEnabled>
                <Layout className={`${css.header} display-flex justify-end full padding-top-gutter padding-start-gutter padding-end-gutter`}>
                  <OpenBasketButton />
                </Layout>
              </IfEResourcesEnabled>
              <div className={css.body}>
                <Switch>
                  <Route component={AgreementCreateRoute} path={`${path}/agreements/create`} />
                  <Route component={AgreementEditRoute} path={`${path}/agreements/:id/edit`} />
                  <Route component={AgreementLineCreateRoute} path={`${path}/agreements/:agreementId/line/create`} />
                  <Route component={AgreementLineEditRoute} path={`${path}/agreements/:agreementId/line/:lineId/edit`} />
                  <Route component={AgreementsRoute} path={`${path}/agreements/:id?`}>
                    <Switch>
                      <Route component={AgreementLineViewRoute} path={`${path}/agreements/:agreementId/line/:lineId`} />
                      <Route component={AgreementViewRoute} path={`${path}/agreements/:id`} />
                    </Switch>
                  </Route>

                  <Route component={EResourceEditRoute} path={`${path}/eresources/:id/edit`} />
                  <Route component={EResourcesRoute} path={`${path}/eresources/:id?`}>
                    <Suspense fallback={null}>
                      <Route component={EResourceViewRoute} path={`${path}/eresources/:id`} />
                    </Suspense>
                  </Route>

                  <Route component={NoteCreateRoute} path={`${path}/notes/create`} />
                  <Route component={NoteEditRoute} path={`${path}/notes/:id/edit`} />
                  <Route component={NoteViewRoute} path={`${path}/notes/:id`} />

                  <Route component={PlatformEditRoute} path={`${path}/platforms/:id/edit`} />
                  <Route component={UrlCustomizerCreateRoute} path={`${path}/platforms/:platformId/urlcustomizer/create`} />
                  <Route component={UrlCustomizerEditRoute} path={`${path}/platforms/:platformId/urlcustomizer/:templateId/edit`} />
                  <Route component={PlatformsRoute} path={`${path}/platforms/:id?`}>
                    <Switch>
                      <Route component={UrlCustomizerViewRoute} path={`${path}/platforms/:platformId/urlcustomizer/:templateId`} />
                      <Route component={PlatformViewRoute} path={`${path}/platforms/:id`} />
                    </Switch>
                  </Route>

                  <Route component={BasketRoute} path={`${path}/basket`} />
                </Switch>
              </div>
            </Suspense>
          </div>
        </HasCommand>
      </CommandList>
    );
  }
}

export default App;
export { default as Agreements } from './components/views/Agreements';
