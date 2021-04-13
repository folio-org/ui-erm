import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { useLocalStorage, writeStorage } from '@rehooks/local-storage';

import {
  MultiColumnList,
  SearchField,
  Pane,
  Icon,
  Button,
  ButtonGroup,
  PaneMenu,
} from '@folio/stripes/components';

import { AppIcon } from '@folio/stripes/core';

import {
  CollapseFilterPaneButton,
  ExpandFilterPaneButton,
  PersistedPaneset,
  SearchAndSortNoResultsMessage,
  SearchAndSortQuery,
} from '@folio/stripes/smart-components';

import {
  getResourceIdentifier,
  getSiblingIdentifier,
  EResourceType
} from '@folio/stripes-erm-components';
import EResourceFilters from '../EResourceFilters';
import IfEResourcesEnabled from '../IfEResourcesEnabled';

import { urls } from '../utilities';
import { resultCount } from '../../constants';

import css from './Agreements.css';

const propTypes = {
  children: PropTypes.object,
  data: PropTypes.shape({
    eresources: PropTypes.arrayOf(PropTypes.object).isRequired,
  }),
  onNeedMoreData: PropTypes.func.isRequired,
  queryGetter: PropTypes.func.isRequired,
  querySetter: PropTypes.func.isRequired,
  searchString: PropTypes.string,
  selectedRecordId: PropTypes.string,
  source: PropTypes.shape({
    loaded: PropTypes.func,
    totalCount: PropTypes.func,
  }),
};

const filterPaneVisibilityKey = '@folio/agreements/eresourcesFilterPaneVisibility';

const EResources = ({
  children,
  data = {},
  onNeedMoreData,
  queryGetter,
  querySetter,
  searchString,
  selectedRecordId,
  source,
}) => {
  const count = source?.totalCount() ?? 0;
  const query = queryGetter() ?? {};
  const sortOrder = query.sort ?? '';

  const searchField = useRef(null);

  const [storedFilterPaneVisibility] = useLocalStorage(filterPaneVisibilityKey, true);
  const [filterPaneIsVisible, setFilterPaneIsVisible] = useState(storedFilterPaneVisibility);
  const toggleFilterPane = () => {
    setFilterPaneIsVisible(!filterPaneIsVisible);
    writeStorage(filterPaneVisibilityKey, !filterPaneIsVisible);
  };

  return (
    <div data-test-eresources>
      <SearchAndSortQuery
        initialFilterState={{}}
        initialSearchState={{ query: '' }}
        initialSortState={{ sort: 'name' }}
        queryGetter={queryGetter}
        querySetter={querySetter}
        sortableColumns={['name', 'publicationType']}
      >
        {
          ({
            searchValue,
            getSearchHandlers,
            onSubmitSearch,
            onSort,
            getFilterHandlers,
            activeFilters,
            filterChanged,
            searchChanged,
            resetAll,
          }) => {
            const disableReset = () => (!filterChanged && !searchChanged);
            const filterCount = activeFilters.string ? activeFilters.string.split(',').length : 0;

            return (
              <PersistedPaneset appId="@folio/agreements" id="eresources-paneset">
                {filterPaneIsVisible &&
                  <Pane
                    defaultWidth="20%"
                    id="pane-eresources-search"
                    lastMenu={
                      <PaneMenu>
                        <CollapseFilterPaneButton onClick={toggleFilterPane} />
                      </PaneMenu>
                    }
                    paneTitle={<FormattedMessage id="stripes-smart-components.searchAndFilter" />}
                  >
                    <form onSubmit={onSubmitSearch}>
                      <IfEResourcesEnabled>
                        <ButtonGroup fullWidth>
                          <Button
                            id="clickable-nav-agreements"
                            to={urls.agreements()}
                          >
                            <FormattedMessage id="ui-agreements.agreements" />
                          </Button>
                          <Button
                            buttonStyle="primary"
                            id="clickable-nav-eresources"
                          >
                            <FormattedMessage id="ui-agreements.eresources" />
                          </Button>
                          <Button
                            id="clickable-nav-platforms"
                            to={urls.platforms()}
                          >
                            <FormattedMessage id="ui-agreements.platforms" />
                          </Button>
                        </ButtonGroup>
                      </IfEResourcesEnabled>
                      {/* TODO: Use forthcoming <SearchGroup> or similar component */}
                      <div className={css.searchGroupWrap}>
                        <FormattedMessage id="ui-agreements.agreements.searchInputLabel">
                          {ariaLabel => (
                            <SearchField
                              aria-label={ariaLabel}
                              autoFocus
                              className={css.searchField}
                              data-test-eresource-search-input
                              id="input-eresource-search"
                              inputRef={searchField}
                              marginBottom0
                              name="query"
                              onChange={getSearchHandlers().query}
                              onClear={getSearchHandlers().reset}
                              value={searchValue.query}
                            />
                          )}
                        </FormattedMessage>
                        <Button
                          buttonStyle="primary"
                          disabled={!searchValue.query || searchValue.query === ''}
                          fullWidth
                          id="clickable-search-eresources"
                          marginBottom0
                          type="submit"
                        >
                          <FormattedMessage id="stripes-smart-components.search" />
                        </Button>
                      </div>
                      <div className={css.resetButtonWrap}>
                        <Button
                          buttonStyle="none"
                          disabled={disableReset()}
                          id="clickable-reset-all"
                          onClick={resetAll}
                        >
                          <Icon icon="times-circle-solid">
                            <FormattedMessage id="stripes-smart-components.resetAll" />
                          </Icon>
                        </Button>
                      </div>
                      <EResourceFilters
                        activeFilters={activeFilters.state}
                        data={data}
                        filterHandlers={getFilterHandlers()}
                      />
                    </form>
                  </Pane>
                }
                <Pane
                  appIcon={<AppIcon app="agreements" iconKey="eresource" size="small" />}
                  defaultWidth="fill"
                  firstMenu={
                    !filterPaneIsVisible ?
                      (
                        <PaneMenu>
                          <ExpandFilterPaneButton
                            filterCount={filterCount}
                            onClick={toggleFilterPane}
                          />
                        </PaneMenu>
                      )
                      :
                      null
                  }
                  id="pane-eresources-list"
                  noOverflow
                  padContent={false}
                  paneSub={
                    source?.loaded() ?
                      <FormattedMessage id="stripes-smart-components.searchResultsCountHeader" values={{ count: source.totalCount() }} />
                      :
                      <FormattedMessage id="stripes-smart-components.searchCriteria" />
                  }
                  paneTitle={<FormattedMessage id="ui-agreements.eresources" />}
                >
                  <MultiColumnList
                    autosize
                    columnMapping={{
                      name: <FormattedMessage id="ui-agreements.eresources.name" />,
                      publicationType: <FormattedMessage id="ui-agreements.eresources.publicationType" />,
                      isbn: <FormattedMessage id="ui-agreements.identifier.isbn" />,
                      eissn: <FormattedMessage id="ui-agreements.identifier.eissn" />,
                      pissn: <FormattedMessage id="ui-agreements.identifier.pissn" />,
                    }}
                    columnWidths={{
                      name: 300,
                      publicationType: 100,
                      isbn: 150,
                      eissn: 150,
                      pissn: 150,
                    }}
                    contentData={data.eresources}
                    formatter={{
                      name: e => {
                        return (
                          <AppIcon
                            app="agreements"
                            iconAlignment="baseline"
                            iconKey="eresource"
                            size="small"
                          >
                            {e._object?.longName ?? e.name}
                          </AppIcon>
                        );
                      },
                      publicationType: e => <EResourceType resource={e} />,
                      isbn: e => getResourceIdentifier(e._object, 'isbn'),
                      eissn: e => getResourceIdentifier(e._object, 'eissn'),
                      pissn: e => getResourceIdentifier(e._object, 'pissn') ?? getSiblingIdentifier(e._object, 'issn'),
                    }}
                    id="list-eresources"
                    isEmptyMessage={
                      source ? (
                        <div data-test-eresources-no-results-message>
                          <SearchAndSortNoResultsMessage
                            filterPaneIsVisible
                            searchTerm={query.query ?? ''}
                            source={source}
                            toggleFilterPane={toggleFilterPane}
                          />
                        </div>
                      ) : '...'
                    }
                    isSelected={({ item }) => item.id === selectedRecordId}
                    onHeaderClick={onSort}
                    onNeedMoreData={onNeedMoreData}
                    pageAmount={resultCount.RESULT_COUNT_INCREMENT}
                    pagingType="click"
                    rowProps={{
                      labelStrings: ({ rowData }) => [rowData.name],
                      to: id => `${urls.eresourceView(id)}${searchString}`,
                    }}
                    sortDirection={sortOrder.startsWith('-') ? 'descending' : 'ascending'}
                    sortOrder={sortOrder.replace(/^-/, '').replace(/,.*/, '')}
                    totalCount={count}
                    virtualize
                    visibleColumns={['name', 'publicationType', 'isbn', 'eissn', 'pissn']}
                  />
                </Pane>
                {children}
              </PersistedPaneset>
            );
          }
        }
      </SearchAndSortQuery>
    </div>
  );
};

EResources.propTypes = propTypes;
export default EResources;
