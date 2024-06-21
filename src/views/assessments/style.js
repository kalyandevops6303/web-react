import styled from 'styled-components';
import theme from '../../configs/themeVariables';

const gradeColors = {
    "Novice": "#FBC02D",
    "Fundamental": "#00BCD4",
    "Proficient": "#7C4DFF",
    "Mastery": "#414DFD",
}

const RecommendedAssessmentsList = styled.div`
    display: inline-flex;
    align-items: flex-start;
    align-content: flex-start;
    gap: 16px;
    flex-wrap: wrap;
    margin-bottom: 15px;
`;

const RecommendedAssessmentsItemSelected = styled.div`
    display: flex;
    height: 32px;
    align-items: center;
    justify-content: center;
    border-radius: 18px;
    border: 1px solid #0185E4;
    background: #0185E4;
    color: #FFF;
    font-feature-settings: 'clig' off, 'liga' off;
    font-family: Montserrat;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 18px; /* 128.571% */
    padding: 0px 10px 0px 10px;
    gap: 6px;
    cursor: pointer;
`;

const RecommendedAssessmentsItemDefault = styled.div`
    display: flex;
    height: 32px;
    align-items: center;
    justify-content: center;
    border-radius: 18px;
    border: 1px solid #0185E4;
    color: #757575;
    font-feature-settings: 'clig' off, 'liga' off;
    font-family: Montserrat;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 18px; /* 128.571% */
    padding: 0px 10px 0px 10px;
    gap: 6px;
    cursor: pointer;
`


const AssessmentsSectionTitle = styled.div`
    color: var(--1-theme-color-heading-display-text, #5E5873);
    font-family: Montserrat;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
`

const NavigationText = styled.div`
    color: #0185E4;
    font-feature-settings: 'clig' off, 'liga' off;
    font-family: Montserrat;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
`
const AssessmentsNavigation = styled.div`
    cursor: pointer;
    display: flex; 
    gap: 10px;
    align-items: center;
    margin-bottom: 20px;
    img {
        width: 25px;
        height: 25px;
        background: #0185E4;
        fill: #fff;   
        border-radius: 100%;
        padding: 4px;
    }
`

const GradeBar = styled.div`
    width: 100%;
    height: 6px;
    flex-shrink: 0;
    border-radius: 6px;
    background: ${({ grade }) => gradeColors[grade] || 'gray'};
    margin: 5px 0px 5px 0px;
`

const SectionCount = styled.span`
    display: flex;
    padding: 1px 9px;
    justify-content: center;
    align-items: center;
    gap: 3px;
    border-radius: 17px;
    border: 1px solid #9E9E9E;
    margin: 0px 5px 0px 5px;
    flex-shrink: 0;
`

const CircularProgressbarWrapper = styled.div`
    width: 32px;
    height: 32px;
    opacity: 0.6;
`

const TableWrapper = styled.div`
    border-radius: 6px;
    border: 1px solid #EBE9F1;
    background: #FFF;
    box-shadow: 0px 4px 6px -1px rgba(0, 0, 0, 0.10), 0px 2px 4px -1px rgba(0, 0, 0, 0.06);
`

const ActionOffContainer = styled.div`
    background: rgba(234, 84, 85, 0.12);
    padding: 8px;
    border-radius: 100%
`

const ActionContainer = styled.div`
    background: rgba(1, 133, 228, 0.12);
    padding: 8px;
    border-radius: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`

const ArrowWrapper = styled.div`
    background: rgba(1, 133, 228, 1);
    border-radius: 100%;
    padding: 5px;
    display: flex;
    align-items: center;
`

const SuccessInfoBanner = styled.div`
  border-radius: 6px;
  background: ${theme.succesGreenBg};

  .info-banner-icon {
    margin-top: 2px;
  }

  p {
    color: ${theme.succesGreenColor};
  }
`;

export {
    RecommendedAssessmentsList,
    RecommendedAssessmentsItemSelected,
    RecommendedAssessmentsItemDefault,
    AssessmentsSectionTitle,
    NavigationText,
    AssessmentsNavigation,
    GradeBar,
    SectionCount,
    CircularProgressbarWrapper,
    TableWrapper,
    ActionContainer,
    ActionOffContainer,
    ArrowWrapper,
    SuccessInfoBanner
}