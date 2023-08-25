import styled from 'styled-components';
import theme from '../../configs/themeVariables';

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
`;
export { RemoveMemberModalWrapper, MessageIconWrap, DeleteModalWrapper, EditContractWrap };
