import React, { useEffect, useState } from 'react';
import {  Modal, ModalBody, ModalHeader, CardText, CardTitle, Spinner, Table, UncontrolledTooltip, Button } from 'reactstrap';
import Select from "react-select";
import { selectThemeColors } from '../../utility/Utils';
import AssessmentsListItem from './AssessmentsListItem';
import { useDispatch, useSelector } from 'react-redux';
import { addAssessment } from '../../redux/actions/AssessmentActions';
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
    const [showAssessmentAddedModal, setShowAssessmentAddedModal] = useState(false)
    const [skillSelected, setSkillSelected] = useState(null)

    const addAssessmentLoading = useSelector(selectAddAssessmentLoading)

    const handleAddAssessment = (value) => {
        setDropdownValue(null)
        dispatch(addAssessment({ assessment_name: value.value.str_name, assessment_id: value.value.assessment_id, str_type: value.value.str_type, _id: value.value._id }))
        setSkillSelected(value.value.str_name)
    }

    useEffect(() => {
        if (addAssessmentLoading) setShowAssessmentAddedModal(true)
    }, [addAssessmentLoading])

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


            <Modal isOpen={showAssessmentAddedModal} contentClassName="custom-modal-style" className="modal-dialog-centered modal-lg">
                <ModalHeader toggle={() => setShowAssessmentAddedModal(false)} />
                <ModalBody>
                    <div className="d-flex justify-content-between pr-1">
                        <img className="gif" src={DeleteGif} width={244} height={244} alt="gif" />
                        <div className="me-4">
                            <CardTitle className="modal-heading">New Skill Added!</CardTitle>
                            <CardText className="modal-body-text fw-light w-76">
                            By adding a skill assessment your skill set is also updated.
                            </CardText>
                            <CardText className="modal-body-text fw-light w-76">
                                <b>{skillSelected}</b>
                            </CardText>
                        </div>
                    </div>
                    <div className="d-flex gap-1 me-1 justify-content-end">
                        <Button outline color="primary" onClick={() => setShowAssessmentAddedModal(false)}>
                            Close
                        </Button>
                        <Button color="primary" onClick={() => setShowAssessmentAddedModal(false)}>
                            Sounds good
                        </Button>
                    </div>
                </ModalBody>
            </Modal>

        </>
    );
};

export default AssessmentsList;
