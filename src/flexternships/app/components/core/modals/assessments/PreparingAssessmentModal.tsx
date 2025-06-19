import GenericModal from '../../modals/GenericModal';

interface PreparingAssessmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PreparingAssessmentModal(props: PreparingAssessmentModalProps) {
  const { isOpen, onClose } = props;
  return (
    <GenericModal isOpen={isOpen} onClose={onClose}>
      <div>PreparingAssessmentModal</div>
    </GenericModal>
  );
}
