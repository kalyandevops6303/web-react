import React, { useEffect, useState } from 'react';
import { Modal, ModalBody, ModalHeader, CardText, CardTitle, Spinner, Table, UncontrolledTooltip, Button } from 'reactstrap';
import Select from "react-select";
import { selectThemeColors } from '../../utility/Utils';
import AssessmentsListItem from './AssessmentsListItem';
import { useDispatch, useSelector } from 'react-redux';
import { addAssessment } from '../../redux/actions/assessmentActions';
import { selectAddAssessmentLoading } from '../../redux/selectors/assessmentSelectors';
import { Info } from 'react-feather';
import { Note, TableWrapper } from './style';
import { currentAssessmentLimit } from '../../utility/constants/AssessmentConstants';
import { ChevronDown, ChevronUp } from 'react-feather';
import DeleteGif from "../../assets/images/NewSkillAdded.png";

const AssessmentsList = ({ setOpen, data, dropdownOptions }) => {
    const tableHeadings = ["SKILLS", "COMPLETED ON", "SECTIONS", "OVERALL MARKS", "OVERALL GRADE", "ACTIONS"]

    const dispatch = useDispatch()
    const [dropdownValue, setDropdownValue] = useState(null)

    const addAssessmentLoading = useSelector(selectAddAssessmentLoading)

    const handleAddAssessment = (value) => {
        setDropdownValue(null)
        dispatch(addAssessment({ assessmentName: value.value.str_name, assessmentId: value.value.assessment_id, strType: value.value.str_type, id: value.value._id }))
    }

    return (
        <>
            <div className='d-flex'>
                <CardTitle tag="h4">
                    Skills & Tools Assessment  &nbsp;
                </CardTitle>
            </div>

            <TableWrapper>
                <Table responsive>

                    <thead>
                        <tr>
                            {tableHeadings.map((heading) => (
                                <th>{heading}</th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {data?.map((assessment) => (
                            <AssessmentsListItem open={setOpen == assessment.assessment_id} assessment={assessment} />
                        ))}
                        <td>
                            <>
                                {Array.from({ length: Math.max(currentAssessmentLimit - (data ? data.length : 0), 1) }).map((_, index) => (
                                    <Select
                                        isClearable
                                        options={dropdownOptions?.map((item) => {
                                            return { value: item, label: item.str_name }
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
