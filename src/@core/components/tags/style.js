import styled from 'styled-components';

const Tagwrapper = styled.div`
  display: flex;
  .tag {
    line-height: 17px;
    border: 1.5px solid #093682;
    font-weight: 600;
    color: #093682;
    font-size: 12px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    padding: 0 6px;
    margin: ${(props) => (props.noMargin ? '0' : '0 0.1rem 0 0.8rem')};
  }
  .dot {
    height: 6px;
    width: 6px;
    border-radius: 50%;
    background: red;
    display: block;
    margin-top: -1px;
    margin-left: -7px;
    outline: 1.5px solid white;
  }
`;
export default Tagwrapper;
