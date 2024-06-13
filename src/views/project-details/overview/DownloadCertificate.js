import React from 'react';
import { CardText, CardTitle, Spinner } from 'reactstrap';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import theme from '../../../configs/themeVariables';
import downloadIcon from '../../../assets/images/Mask.svg';
import { CertificateInfo } from '../style';
import { projectDetails } from '../../../redux/selectors/projectDetailsSelectors';
import { downloadFile } from '../../../utility/Utils';

const DownloadCertificate = ({ downloadUrl }) => {
  const projectDetailsData = useSelector(projectDetails);
  const isDownloading = useSelector((state) => state.projectDetails.downloadCertificateLoading);

  const handleDownloadCertificate = () => {
    downloadFile({
      data: { download_url: downloadUrl },
      file_name: `Trumio-project-${projectDetailsData?._id}-certificate.pdf`,
    });
  };

  return (
    <CertificateInfo>
      <CardTitle className="title mb-75">Congratulation!</CardTitle>
      <div className="d-flex align-items-start">
        <CardText className="desc">
          You’ve earned a <span className="fw-bold">Trumio certificate</span> for successfully completing a project with
          us.
        </CardText>
        {isDownloading ? (
          <span className="p-25 avatar-bg d-flex align-items-center justify-content-center cursor-pointer">
            <Spinner className="spinner" size="sm" />{' '}
          </span>
        ) : (
          <span
            onClick={handleDownloadCertificate}
            className="p-25 avatar-bg d-flex align-items-center justify-content-center cursor-pointer"
          >
            <img src={downloadIcon} alt="download" height={22} color={theme.primary} />
          </span>
        )}
      </div>
    </CertificateInfo>
  );
};

DownloadCertificate.defaultProps = {
  downloadUrl: '',
};

DownloadCertificate.propTypes = {
  downloadUrl: PropTypes.string,
};

export default DownloadCertificate;
