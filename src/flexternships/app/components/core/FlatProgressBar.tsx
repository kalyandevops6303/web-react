import Styles from '@flexternships/styles/components/core/progress-bar.module.css';

export default function FlatProgressBar({ currentProgress, maxProgress, hidePercentage = false }: ProgressProps) {
  const percentage: number = Math.floor((currentProgress * 100) / maxProgress);

  return (
    // eslint-disable-next-line tailwindcss/migration-from-tailwind-2
    <div className={Styles.flatProgressBar}>
      <div
        className={Styles.progress}
        style={{ width: `${percentage}%` }} // Inline style for dynamic width
      >
        {!hidePercentage && `${percentage}%`} {/* Show percentage with 2 decimal points */}
      </div>
    </div>
  );
}

type ProgressProps = {
  currentProgress: number;
  maxProgress: number;
  hidePercentage?: boolean;
};
