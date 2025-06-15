import { Card, CardContent, Typography, Box } from '@mui/material';

const ExtractCard = ({ title, description, selected, onClick }) => {
    
  return (
    <Card
      onClick={onClick}
      sx={{
        width: 212,
        height: 124,
        cursor: 'pointer',
        backgroundColor: selected ? '#0033cc' : '#fff',
        color: selected ? '#fff' : '#000',
        boxShadow: selected ? 6 : 3,
        borderRadius: 0,
        transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: 6,
        },
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '8px 12px'
      }}
    >
      <CardContent>
        <Box display='flex' flexDirection='column'>
          <Typography
            variant="caption"
            fontWeight="bold"
            gutterBottom
          >
            {title}
          </Typography>
          <Typography
            variant="caption"
          >
            {description}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ExtractCard;
