import React from 'react';
import PropTypes from 'prop-types';
import { Embargo, SerialCoverage } from '@folio/stripes-erm-components';
import { Layout } from '@folio/stripes/components';
import MonographCoverage from '../MonographCoverage';

import { resourceTypes } from '../../constants';

export default class Coverage extends React.Component {
  static propTypes = {
    pci: PropTypes.shape({
      embargo: PropTypes.shape({
        movingWallStart: PropTypes.shape({
          length: PropTypes.number,
          unit: PropTypes.string
        }),
        movingWallEnd: PropTypes.shape({
          length: PropTypes.number,
          unit: PropTypes.string
        })
      }),
      pti: PropTypes.shape({
        titleInstance: PropTypes.shape({
          dateMonographPublished: PropTypes.string,
          monographVolume: PropTypes.string,
          monographEdition: PropTypes.string,
          name: PropTypes.string,
          type: PropTypes.shape({
            value: PropTypes.string,
          })
        }),
      })
    }),
    line: PropTypes.shape({
      resource: PropTypes.shape({
        _object: PropTypes.shape({
          embargo: PropTypes.shape({
            movingWallStart: PropTypes.shape({
              length: PropTypes.number,
              unit: PropTypes.string
            }),
            movingWallEnd: PropTypes.shape({
              length: PropTypes.number,
              unit: PropTypes.string
            })
          }),
          pci: PropTypes.shape({
            pti: PropTypes.shape({
              titleInstance: PropTypes.shape({
                dateMonographPublished: PropTypes.string,
                monographVolume: PropTypes.string,
                monographEdition: PropTypes.string,
                name: PropTypes.string,
                type: PropTypes.shape({
                  value: PropTypes.string,
                })
              })
            })
          }),
          pti: PropTypes.shape({
            titleInstance: PropTypes.shape({
              type: PropTypes.shape({
                value: PropTypes.string,
              }),
            })
          }),
        })
      })
    }),
    eResource: PropTypes.shape({
      _object: PropTypes.shape({
        embargo: PropTypes.shape({
          movingWallStart: PropTypes.shape({
            length: PropTypes.number,
            unit: PropTypes.string
          }),
          movingWallEnd: PropTypes.shape({
            length: PropTypes.number,
            unit: PropTypes.string
          })
        }),
        pci: PropTypes.shape({
          pti: PropTypes.shape({
            titleInstance: PropTypes.shape({
              dateMonographPublished: PropTypes.string,
              monographVolume: PropTypes.string,
              monographEdition: PropTypes.string,
              name: PropTypes.string,
              type: PropTypes.shape({
                value: PropTypes.string,
              })
            })
          })
        }),
        pti: PropTypes.shape({
          titleInstance: PropTypes.shape({
            type: PropTypes.shape({
              value: PropTypes.string,
            }),
          })
        }),
      })
    }),
  }

  /* This component can be called from an agreement line context or from an eresource context, so we pass in the data on one of three props,
  * depending on the shape of that data.
  */

  render() {
    const { pci, line, eResource } = this.props;
    let isMonograph = false;
    let dataToRender;
    let embargo;

    if (pci) {
      if (pci?.pti?.titleInstance?.type?.value === resourceTypes.MONOGRAPH) {
        isMonograph = true;
      }
      dataToRender = pci;
      embargo = pci?.embargo;
    } else if (line) {
      if (line?.resource?._object?.pti?.titleInstance?.type?.value === resourceTypes.MONOGRAPH) {
        isMonograph = true;
        dataToRender = line?.resource?._object;
      } else {
        dataToRender = line;
        embargo = line?.resource?._object?.embargo;
      }
    } else if (eResource?._object?.pti?.titleInstance?.type?.value === resourceTypes.MONOGRAPH) {
      isMonograph = true;
      dataToRender = eResource?._object;
    } else {
      dataToRender = eResource;
      embargo = eResource?._object?.embargo;
    }

    if (isMonograph) {
      return (
        <div>
          <MonographCoverage pci={dataToRender} />
          <Embargo embargo={dataToRender?.embargo} />
        </div>
      );
    } else {
      return (
        <Layout className="full">
          <SerialCoverage statements={dataToRender?.coverage} />
          <Embargo embargo={embargo} />
        </Layout>
      );
    }
  }
}
