import React from 'react'
import {observable} from 'mobx'
import { observer } from 'mobx-react'
import { hot } from 'react-hot-loader'
import { Container, Row, Col } from 'reactstrap'
import Search from '../../components/search'

import UrlParamResourceSearch from '../../lib/resource/url-param-resource-search'
import {tableFormatters, textHighlighter} from '../../lib/helpers'

import Paneset from '@folio/stripes-components/lib/Paneset';
import Pane from '@folio/stripes-components/lib/Pane';


let searchIn = [
  '__cql'
]


const Kb = observer(({onTest, showFilterPane, showDetailPane, handleCloseFilter, handleCloseDetail app}) => {

  const columns = [
    // { Header: "Id", id: 'id', accessor: 'pci_id' },
    { Header: "Title", id: 'title', accessor: 'title' },
    // { Header: "Title ID", id: 'title_id', accessor: 'title_id' },
    { Header: "Platform", id: 'platform', accessor: 'platform' },
    { Header: "Source", id: 'source', accessor: 'package_source' },
    // { Header: "Source KB", id: 'kb', accessor: 'package_kb' },
    { Header: "Package", id: 'package_name', accessor: 'package_name' },
    { Header: "Coverage Depth", id: 'coverageDepth', accessor: 'coverageDepth' },
    { Header: "Coverage Note", id: 'coverageNote', accessor: 'coverageNote' },
    { Header: "Coverage Summary", id: 'coverage', accessor: 'coverage' },
    // { Header: "Date Added", id: 'dateAdded', accessor: 'dateAdded' },
    // { Header: "Date Removed", id: 'dateRemoved', accessor: 'dateRemoved' },
  ]

  const filterGroups = {
  }


  return (
    <Paneset>
      {
        showFilterPane &&
        <Pane defaultWidth="20%" dismissible paneTitle="KB Filters" onClose={handleCloseFilter}>
          KB Query
          <input type="text" name="KBQuery"/>
          <button type="submit" className="btn btn-primary">Go</button>
          
        </Pane>
      }
      <Pane defaultWidth="fill" paneTitle="KB Titles">
        <UrlParamResourceSearch resource="PackageContentItem" fieldsToSearch={searchIn} columnDef={columns} app={app} />
      </Pane>
      {
        showDetailPane &&
        <Pane defaultWidth="40%" dismissible paneTitle="Details" onClose={handleCloseDetail}>
          <button className="btn btn-primary" onClick={onTest}>Test</button>
        </Pane>
      }
    </Paneset>
  )
})

Kb.propTypes = {
    onTest: React.PropTypes.func,
    showFilterPane: React.PropTypes.bool,
    handleCloseFilter: React.PropTypes.func,
    showDetailPane: React.PropTypes.bool,
    handleCloseDetail: React.PropTypes.func,
    app: React.PropTypes.object,
};


export default hot(module)(Kb)
