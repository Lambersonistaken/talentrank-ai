import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import {
  Box,
  Container,
  Paper,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
  IconButton
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import styles from '@/styles/Stage3.module.css';
import { useState } from 'react';

const Stage3 = () => {
  const router = useRouter();
  const interviewDetails = useSelector((state) => state.interview);
  const [isSaved, setIsSaved] = useState(false);

  if (!interviewDetails.stage1Completed || interviewDetails.questions.length === 0) {
    router.push('/stage1');
    return null;
  }

  const handleEdit = (stage) => {
    router.push(`/${stage}`);
  };

  const handlePublish = () => {
    
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000); // Reset after 3 seconds
  };

  return (
    <Container maxWidth="md" className={styles.container}>
      {isSaved ? (
        <Paper elevation={3} className={styles.paper}>
          <Typography variant="h4" className={styles.successTitle}>
            Your data has been saved!
          </Typography>
        </Paper>
      ) : (
        <>
          <Paper elevation={3} className={styles.paper}>
            <Box className={styles.sectionHeader}>
              <Typography variant="h5">Interview Details</Typography>
              <IconButton onClick={() => handleEdit('stage1')} color="primary">
                <EditIcon />
              </IconButton>
            </Box>
            <Divider />
            <Box className={styles.detailsSection}>
              <Typography><strong>Job Title:</strong> {interviewDetails.jobTitle}</Typography>
              <Typography><strong>Duration:</strong> {interviewDetails.interviewDuration} minutes</Typography>
              <Typography className={styles.description}>
                <strong>Description:</strong><br />
                {interviewDetails.jobDescription}
              </Typography>
            </Box>
          </Paper>

          <Paper elevation={3} className={styles.paper}>
            <Box className={styles.sectionHeader}>
              <Typography variant="h5">Interview Questions</Typography>
              <IconButton onClick={() => handleEdit('stage2')} color="primary">
                <EditIcon />
              </IconButton>
            </Box>
            <Divider />
            <List className={styles.questionList}>
              {interviewDetails.questions.map((question, index) => (
                <ListItem key={question.id}>
                  <ListItemText
                    primary={`${index + 1}. ${question.text}`}
                    secondary={`Weightage: ${question.weightage}`}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>

          <Box className={styles.publishContainer}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={handlePublish}
            >
              Publish Interview
            </Button>
          </Box>
        </>
      )}
    </Container>
  );
};

export default Stage3;
