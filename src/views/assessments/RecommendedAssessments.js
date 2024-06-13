import React, { useState } from 'react';
import { RecommendedAssessmentsList, RecommendedAssessmentsItemSelected, RecommendedAssessmentsItemDefault } from './style';
import { CardText, CardTitle } from 'reactstrap';

const RecommendedAssessmentsItem = ({ data, onChange }) => {

    const [itemData, setItemData] = useState(data)

    const handleClick = () => {
        setItemData({ ...itemData, selected: !itemData.selected })
        onchange(itemData)
    }

    return (
        itemData.selected ?
            <RecommendedAssessmentsItemSelected
                onClick={handleClick}
            >
                <div>{itemData.name}</div>
                <div>-</div>
            </RecommendedAssessmentsItemSelected>
            :
            <RecommendedAssessmentsItemDefault
                onClick={handleClick}
            >
                <div>{itemData.name}</div>
                <div>+</div>
            </RecommendedAssessmentsItemDefault>
    )
}

const RecommendedAssessments = ({ data }) => {

    const [assessmentsData, setAssessmentsData] = useState(data)

    const handleChange = (item) => {
        setAssessmentsData(prevData =>
            prevData.map(dataItem =>
                dataItem.name === item.name
                    ? { ...dataItem, selected: !dataItem.selected }
                    : dataItem
            )
        );
    }

    return (
        <>
            <CardTitle tag="h4">
                Let's build your credibility
            </CardTitle>

            <CardText>
                Recommended skills based  on client and project requirements
            </CardText>

            <RecommendedAssessmentsList>
                {assessmentsData.map((item) => (
                    <RecommendedAssessmentsItem data={item} onChange={() => handleChange(item)} />
                ))}
            </RecommendedAssessmentsList>

            <hr />

        </>
    );
};

export default RecommendedAssessments;
