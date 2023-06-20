import { Col, Form, Input, InputGroup, InputGroupText, Label, Row, UncontrolledTooltip } from 'reactstrap';
import { RefreshCcw, Search } from 'react-feather';
import CollActive from '@src/assets/images/coll_active.png';
import ExpandInactive from '@src/assets/images/expand_inactive.png';
import { Controller } from 'react-hook-form';
import Select from 'react-select';
import { PropTypes } from 'prop-types';
import theme from '../../../configs/themeVariables';
import { FormWrapper, SecondaryFiltersWrap } from '../../styled';
import timeOptions from '../../../utility/constants/TimeDropdownOptions';
import { selectThemeColors } from '../../../utility/Utils';

const SecondaryFilters = ({ control, toggleExapantion, isExpanded }) => (
  <FormWrapper>
    <SecondaryFiltersWrap>
      <Form onSubmit={(e) => e.preventDefault()} className="mt-auto">
        <InputGroup className="input-group-merge marketplace-search">
          <InputGroupText>
            <Search size={14} />
          </InputGroupText>
          <Input placeholder="Search project name, user name" />
        </InputGroup>
      </Form>
      <Row>
        <Col className="d-flex mt-auto mb-50">
          <Label className="view-label me-1" id="view-label">
            View:
          </Label>
          <img
            className="cursor-pointer"
            src={isExpanded ? ExpandInactive : CollActive}
            alt="collactive"
            onClick={() => toggleExapantion()}
          />
          <UncontrolledTooltip placement="right" target="view-label">
            <style>{`
                  .tooltip-inner {
                    background-color: white !important;
                    color: black !important;
                  }
                  .tooltip-arrow::before {
                    right: -1px;
                    border-right-color: white !important;
                  }
                `}</style>
            <div className="d-flex align-items-center">
              <img className="me-50 " src={ExpandInactive} alt="collactive" onClick={() => toggleExapantion()} />
              <span>Expand</span>
            </div>
            <div className="d-flex align-items-center">
              <img className="me-50 " src={CollActive} alt="collactive" onClick={() => toggleExapantion()} />
              <span>Compress</span>
            </div>
          </UncontrolledTooltip>
        </Col>
        <Col>
          <Label className="form-label" for="weekendEndTime">
            Select end time<span className="label-asterisk me-50">*</span>
          </Label>
          <Controller
            id="weekendEndTime"
            name="weekendEndTime"
            control={control}
            render={({ field }) => (
              <Select
                options={timeOptions}
                classNamePrefix="select"
                placeholder="Select end time"
                theme={selectThemeColors}
                {...field}
              />
            )}
          />
        </Col>
        <Col>
          <Label className="form-label" for="weekendEndTime">
            Select end time<span className="label-asterisk me-50">*</span>
          </Label>
          <Controller
            id="weekendEndTime"
            name="weekendEndTime"
            control={control}
            render={({ field }) => (
              <Select
                options={timeOptions}
                classNamePrefix="select"
                placeholder="Select end time"
                theme={selectThemeColors}
                {...field}
              />
            )}
          />
        </Col>
        <Col>
          <Label className="form-label" for="weekendEndTime">
            Select end time<span className="label-asterisk me-50">*</span>
          </Label>
          <Controller
            id="weekendEndTime"
            name="weekendEndTime"
            control={control}
            render={({ field }) => (
              <Select
                options={timeOptions}
                classNamePrefix="select"
                placeholder="Select end time"
                theme={selectThemeColors}
                {...field}
              />
            )}
          />
        </Col>
        <Col className="reset-btn">
          <div className="reset-icon">
            <RefreshCcw size={18} color={theme.activeNavPillText} />
          </div>
          <span className="reset-label">Reset</span>
        </Col>
      </Row>
    </SecondaryFiltersWrap>
  </FormWrapper>
);

SecondaryFilters.propTypes = {
  control: PropTypes.object,
  toggleExapantion: PropTypes.func,
  isExpanded: PropTypes.bool,
};
SecondaryFilters.defaultProps = {
  control: {},
  toggleExapantion: () => {},
  isExpanded: false,
};

export default SecondaryFilters;
