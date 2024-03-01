import styled from 'styled-components';
import theme from '../../configs/themeVariables';

const ArtifactsModalWrap = styled.div`
  max-height: 5rem;
  overflow-y: auto;
  scrollbar-width: thin;
  .truncated-filename {
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const AcceptModalWrapper = styled.div`
  .object-fit-contain {
    object-fit: contain;
  }
  padding-bottom: 1.2rem;
  .gif {
    margin-left: 2rem;
  }
  .content-side {
    width: 65%;
  }
  .modal-title-custom {
    font-size: 1.75rem;
    font-weight: 500;
    // color: ${theme.red};
    margin-bottom: 0.75rem;
  }
  .subtitle {
    font-size: 1.125rem;
  }
  .desc {
    font-size: 1.125rem;
  }
  .stats {
    margin-top: 1.2rem;
    .names {
      width: 55%;
    }
    .key {
      font-size: 0.9rem;
      color: ${theme.gray};
    }
    .value {
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
      width: 15rem;
      text-overflow: ellipsis;
      font-size: 1.312rem;
      font-weight: 500;
    }
  }
`;

const DeleteModalWrapper = styled.div`
  padding-bottom: 1.2rem;
  .gif {
    margin: -30px 0 -70px -1rem;
  }
  .modal-title-custom {
    font-size: 1.75rem;
    font-weight: 500;
    color: ${theme.red};
    margin-bottom: 0.75rem;
  }
  .subtitle {
    font-size: 1.125rem;
  }
  .desc {
    font-size: 1.125rem;
  }
  .stats {
    margin-top: 1.2rem;
    .names {
      width: 55%;
    }
    .key {
      font-size: 0.9rem;
      color: ${theme.gray};
    }
    .value {
      font-size: 1.312rem;
      font-weight: 500;
    }
  }
`;

const TerminateModalWrapper = styled.div`
  padding-bottom: 1.2rem;
  .gif {
    margin: 1rem 0.5rem 0px 0rem;
  }
  .modal-title-custom {
    font-size: 1.75rem;
    font-weight: 500;
    color: ${theme.red};
    margin-bottom: 0.75rem;
  }
  .subtitle {
    font-size: 1.125rem;
  }
  .desc {
    font-size: 1rem;
    font-weight: 400 !important;
  }
  .stats {
    margin-top: 1.2rem;
    .names {
      width: 55%;
    }
    .key {
      font-size: 0.9rem;
      color: ${theme.gray};
    }
    .value {
      font-size: 1.312rem;
      font-weight: 500;
    }
  }
  .grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr); /* Two columns, each taking 50% */
    gap: 1rem; /* Adjust the gap as needed */
  }
`;

const RemoveMemberModalWrapper = styled.div`
  padding-bottom: 1.2rem;
  .gif {
    margin: -30px 0 -70px -1rem;
  }
  .modal-title-custom {
    font-size: 1.75rem;
    font-weight: 500;
    color: ${theme.red};
    margin-bottom: 0.75rem;
  }
  .subtitle {
    font-size: 1.125rem;
  }
  .desc {
    font-size: 1.125rem;
  }
  .stats {
    margin-top: 1.2rem;
    .names {
      width: 55%;
    }
    .key {
      font-size: 0.9rem;
      color: ${theme.gray};
    }
    .value {
      font-size: 1.312rem;
      font-weight: 500;
    }
  }
`;
const EditContractWrap = styled.div`
  .modal-header {
    padding: 0.7rem;
  }
  .modal-title-edit {
    text-align: center;
    margin-bottom: 3rem;
    font-size: 1.75rem !important;
    font-weight: 500;
  }
`;

const MessageIconWrap = styled.div`
  cursor: pointer;
  .mail-bg {
    background-color: ${theme.activeColor}1f;
    border-radius: 50%;
    height: 2.5rem;
    width: 2.5rem;
    display: flex;
    margin-left: auto;
    justify-content: center;
    .mail-icon {
      margin: auto;
    }
  }
  .trash-bg {
    background-color: ${theme.red}1f;
    border-radius: 50%;
    height: 2.5rem;
    width: 2.5rem;
    display: flex;
    margin-left: auto;
    justify-content: center;
    .mail-icon {
      margin: auto;
    }
  }
`;

const MakePaymentModalWrapper = styled.div`
  .modal-header {
    font-size: 26px;
    font-weight: 500;
  }
  .modal-title {
    font-size: 18px;
    font-weight: 500;
  }
  .card-header-border {
    border: 1px solid #ebe9f1;
  }
`;

const PrivacyPolicyModalWrapper = styled.div`
  max-height: 80vh;
  overflow: auto;

  table {
    width: 90%;

    .row-bottom-border {
      border-bottom: 1px solid black;
    }
    .row-right-border {
      border-right: 1px solid black;
    }
    .row-left-border {
      border-left: 1px solid black;
    }
    .row-content-top {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
    }
  }

  .underline-text {
    text-decoration: underline;
  }
`;

const RelistModalWrapper = styled.div`
  .note-text {
    line-height: 29.124px;
  }
`;

export {
  RemoveMemberModalWrapper,
  MessageIconWrap,
  DeleteModalWrapper,
  EditContractWrap,
  AcceptModalWrapper,
  MakePaymentModalWrapper,
  PrivacyPolicyModalWrapper,
  TerminateModalWrapper,
  RelistModalWrapper,
  ArtifactsModalWrap,
};
