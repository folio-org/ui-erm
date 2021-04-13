import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Field } from 'react-final-form';
import { Button, Layout, Tooltip } from '@folio/stripes/components';

import { EditCard, withKiwtFieldArray } from '@folio/stripes-erm-components';
import CoverageField from './CoverageField';

class CoverageFieldArray extends React.Component {
  static propTypes = {
    addButtonId: PropTypes.string,
    addButtonTooltipId: PropTypes.string,
    addLabelId: PropTypes.string,
    deleteButtonTooltipId: PropTypes.string,
    disabled: PropTypes.bool,
    headerId: PropTypes.string,
    id: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.object),
    name: PropTypes.string.isRequired,
    onAddField: PropTypes.func.isRequired,
    onDeleteField: PropTypes.func.isRequired,
    isEmptyCoverageId: PropTypes.string,
  }

  static defaultProps = {
    isEmptyCoverageId: 'ui-agreements.emptyAccordion.lineCustomCoverage',
  }

  renderCoverages = () => {
    const { deleteButtonTooltipId, headerId, items, name, isEmptyCoverageId } = this.props;

    return items.length ? items.map((coverage, index) => (
      <EditCard
        key={index}
        data-test-coverage-number={index}
        data-testid={`coverageFieldArray[${index}]`}
        deleteButtonTooltipText={<FormattedMessage id={deleteButtonTooltipId} values={{ index: index + 1 }} />}
        header={<FormattedMessage id={headerId} values={{ number: index + 1 }} />}
        onDelete={() => this.props.onDeleteField(index, coverage)}
      >
        <Field
          component={CoverageField}
          index={index}
          name={`${name}[${index}]`}
        />
      </EditCard>
    )) : (
      <Layout className="padding-bottom-gutter">
        <FormattedMessage id={isEmptyCoverageId} />
      </Layout>
    );
  }

  render = () => {
    const { addButtonId, addButtonTooltipId, addLabelId, disabled, id } = this.props;
    return (
      <div>
        <div
          data-testid="coverageFieldArray"
          id={id}
        >
          {this.renderCoverages()}
        </div>
        {
          addButtonTooltipId && disabled ? (
            <Tooltip
              id="add-coverage-button-tooltip"
              placement="bottom-start"
              text={<FormattedMessage id={addButtonTooltipId} />}
            >
              {({ ref, ariaIds }) => (
                <div
                  ref={ref}
                  aria-labelledby={ariaIds.text}
                >
                  <Button
                    disabled={disabled}
                    id={addButtonId}
                  >
                    <FormattedMessage id={addLabelId} />
                  </Button>
                </div>
              )}
            </Tooltip>
          ) : (
            <Button id={addButtonId} onClick={() => this.props.onAddField()}>
              <FormattedMessage id={addLabelId} />
            </Button>
          )
        }


      </div>
    );
  }
}

export default withKiwtFieldArray(CoverageFieldArray);
