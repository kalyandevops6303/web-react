import React, { useState } from 'react';
import { CardText, CardTitle, Spinner, Table, UncontrolledTooltip } from 'reactstrap';
import Select from "react-select";
import { selectThemeColors } from '../../utility/Utils';
import AssessmentsListItem from './AssessmentsListItem';
import { useDispatch, useSelector } from 'react-redux';
import { addAssessment } from '../../redux/actions/AssessmentActions';
import { selectAddAssessmentLoading } from '../../redux/selectors/assessmentSelectors';
import { Info } from 'react-feather';
import { TableWrapper } from './style';

const AssessmentsList = ({ setOpen, data, dropdownOptions }) => {
    const tableHeadings = ["SKILLS", "COMPLETED ON", "SECTIONS", "OVERALL MARKS", "OVERALL GRADE",
        <span className='d-flex align-items-center justify-content-center gap-1'>
            <span>REATTEMPT</span>
            <Info size={18} id='reattempt' className='cursor-pointer' />
            <UncontrolledTooltip
                target="reattempt"
            >
                Retake your assessment after cooldown period, if attempts left.
            </UncontrolledTooltip>
        </span>,
        "ACTIONS"]

    const dispatch = useDispatch()
    const [dropdownValue, setDropdownValue] = useState(null)

    const addAssessmentLoading = useSelector(selectAddAssessmentLoading)

    const handleAddAssessment = (value) => {
        setDropdownValue(null)
        dispatch(addAssessment({ assessment_name: value.value.assessment_name, assessment_id: value.value.assessment_id, str_type: value.value.str_type, _id: value.value._id }))
    }

    return (
        <>
            <div className='d-flex'>
                <CardTitle tag="h4">
                    Skills & Tools Assessment  &nbsp;
                </CardTitle>

                <CardText>
                    (Take any 5 assessments)
                </CardText>
            </div>

            <TableWrapper>
                <Table responsive>

                    <thead>
                        <tr>
                            {tableHeadings.map((heading) => (
                                <th>{heading}</th>
                            ))

                            }
                        </tr>
                    </thead>

                    <tbody>
                        {data?.map((assessment) => (
                            <AssessmentsListItem open={setOpen == assessment.assessment_id} assessment={assessment} />
                        ))}
                        <td>
                            <>
                                {Array.from({ length: Math.max(5 - (data? data.length : 0), 1) }).map((_, index) => (
                                    <Select
                                        isClearable
                                        options={dropdownOptions?.map((item) => {
                                            return { value: item, label: item.assessment_name }
                                        })}
                                        classNamePrefix="select"
                                        placeholder={"Enter skill"}
                                        theme={selectThemeColors}
                                        menuPosition='fixed'
                                        onChange={handleAddAssessment}
                                        value={dropdownValue}
                                        isDisabled={addAssessmentLoading}
                                    />
                                ))}
                            </>


                        </td>
                    </tbody>

                </Table>
            </TableWrapper>

        </>
    );
};

export default AssessmentsList;
