import React from 'react';
import Styles from '@flexternships/styles/components/core/files.module.css';
import SimpleElevatedCard from '../cards/SimpleElevatedCard';

export default function HorizontalFileCard(props: Props) {
    const { fileName, fileSize, createdAt, className, removable = false, remove, generateDownloadLink } = props;
    const handleClick = async () => {
        const downloadResponse = await generateDownloadLink();
        console.log(downloadResponse.data)
        window.open(downloadResponse.data, "_blank");
    }
    return (
        <SimpleElevatedCard className={`${Styles.horizontalFileCard} ${className ?? ''}`}>
            <div className={`${Styles.fileContainer} cursor-pointer`} onClick={handleClick}>
                {/* TODO: Image */}
                <div className={Styles.fileIconContainer}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="24" viewBox="0 0 20 24" fill="none">
                        <path fillRule="evenodd" clipRule="evenodd" d="M2.46462 0H12.3231L19.717 7.2V21.6C19.717 22.9248 18.6128 24 17.2523 24H2.46462C1.10415 24 0 22.9248 0 21.6V2.4C0 1.0752 1.10415 0 2.46462 0ZM5.1785 17.5324C5.83286 17.5324 6.39479 17.3764 6.77558 17.0284C7.0664 16.7584 7.2266 16.3612 7.22783 15.8908C7.22783 15.4228 7.01588 15.0256 6.70287 14.7832C6.37384 14.5276 5.88585 14.4004 5.19945 14.4004C4.52168 14.4004 4.03985 14.4436 3.69727 14.4988V19.222H4.79895V17.5108C4.9 17.5252 5.03186 17.5324 5.1785 17.5324ZM11.4668 18.6544C10.9493 19.0732 10.1618 19.2724 9.19939 19.2724C8.62266 19.2724 8.21477 19.2364 7.9375 19.2004V14.5C8.34539 14.4352 8.87775 14.4004 9.43969 14.4004C10.3725 14.4004 10.9788 14.5636 11.452 14.9116C11.9635 15.2812 12.2839 15.8704 12.2839 16.7164C12.2839 17.632 11.94 18.2644 11.4668 18.6544ZM14.1321 15.3235H16.02V14.4355H13.0156V19.2223H14.1321V17.2975H15.8968V16.4167H14.1321V15.3235ZM12.3231 8.40039H11.0908V2.40039L17.2524 8.40039H12.3231ZM5.25822 15.2168C5.03148 15.2168 4.87867 15.2384 4.7998 15.26V16.6736C4.89346 16.6952 5.01053 16.7012 5.17196 16.7012C5.76224 16.7012 6.12577 16.4108 6.12577 15.92C6.12577 15.4808 5.81276 15.2168 5.25822 15.2168ZM9.55526 15.2305C9.3088 15.2305 9.1486 15.2521 9.05371 15.2737V18.4057C9.1486 18.4273 9.3014 18.4273 9.43942 18.4273C10.4462 18.4345 11.1018 17.8945 11.1018 16.7521C11.1092 15.7561 10.5115 15.2305 9.55526 15.2305Z" fill="#EA5455" />
                    </svg>
                </div>
                <div className={Styles.fileName}>
                    {fileName}
                </div>
            </div>
            <div className={Styles.fileInfoContainer}>
                <span className={Styles.fileSize}>
                    {fileSize}
                </span>
                <span className={Styles.fileUploadDate}>
                    {createdAt}
                </span>
            </div>
            {
                removable && (
                    <div className='p-2 text-error text-sm font-semibold tracking-wide not-italic self-center cursor-pointer' onClick={remove}>
                        Remove
                    </div>
                )
            }
        </SimpleElevatedCard>
    )
}

type Props = {
    fileName: string
    fileSize: string
    createdAt: string
    removable?: boolean
    className?: string,
    remove?: () => void
    generateDownloadLink: () => Promise<any>
};
