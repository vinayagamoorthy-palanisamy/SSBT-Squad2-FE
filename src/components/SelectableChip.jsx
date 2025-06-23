import { styled, alpha } from '@mui/material/styles';
import Chip from '@mui/material/Chip';

/**
 * A reusable MUI Chip with selectable styling.
 * Props:
 *   - selected: boolean  // whether this chip is selected
 *   - rest: any other MUI Chip props
 */
const SelectableChip = styled(Chip, {
  shouldForwardProp: (prop) => prop !== 'selected',
})(({ theme, selected }) => ({
  width: '100%',
  textAlign: 'center',
  border: `1px solid ${selected ? theme.palette.primary.main : 'rgba(0, 0, 0, 0.23)'}`,
  backgroundColor: selected
    ? alpha(theme.palette.primary.main, 0.1)
    : '#fff',
  color: selected ? theme.palette.primary.main : theme.palette.text.primary,
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  marginBottom: theme.spacing(1),
}));

export default SelectableChip;
