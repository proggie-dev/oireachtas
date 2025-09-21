import { Backdrop, Box, Fade, Modal } from '@mui/material';
import type { BillTitle } from '../types/Bill';
import TitleContent from './TitleContent';
import './../styles/App.css';

interface TitleModalProps {
  title: BillTitle;
  isOpen: boolean;
  toggleModalVisibility: (value: boolean) => void;
}

const TitleModal = ({ title, isOpen, toggleModalVisibility }: TitleModalProps) => (
  <div>
    <Modal
      aria-labelledby='title modal'
      aria-describedby='title-modal-description'
      open={isOpen}
      onClose={() => toggleModalVisibility(false)}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={isOpen}>
        <Box className='title-modal'>
          <TitleContent title={title} />
        </Box>
      </Fade>
    </Modal>
  </div>
);

export default TitleModal;
