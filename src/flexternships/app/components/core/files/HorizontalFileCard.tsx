import Styles from '@flexternships/styles/components/core/files.module.css';
import SimpleElevatedCard from '../cards/SimpleElevatedCard';
import { getFileIcon } from '@/flexternships/utils/file-utils';

export default function HorizontalFileCard(props: Props) {
    const { fileName, fileSize, createdAt, className, removable = false, remove, generateDownloadLink } = props;
    const handleClick = async () => {
        const downloadResponse = await generateDownloadLink();
        window.open(downloadResponse.data, "_blank");
    }
    return (
        <SimpleElevatedCard className={`${Styles.horizontalFileCard} ${className ?? ''}`}>
            <div className={`${Styles.fileContainer} cursor-pointer`} onClick={handleClick}>
                {/* TODO: Image */}
                <div className={Styles.fileIconContainer}>
                    <img className='h-6 w-5' src={getFileIcon(fileName)}/>
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
