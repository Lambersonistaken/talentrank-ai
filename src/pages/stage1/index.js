"use client"
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { 
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Paper
} from '@mui/material';
import { setInterviewDetails } from '@/redux/slices/interviewSlice';
import styles from '@/styles/Stage1.module.css';
import Footer from '../Footer';

const Stage1 = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const interviewDetails = useSelector((state) => state.interview);

  const [formData, setFormData] = useState({
    jobTitle: interviewDetails.jobTitle || '',
    jobDescription: interviewDetails.jobDescription || '',
    interviewDuration: interviewDetails.interviewDuration || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setInterviewDetails(formData));
    router.push('/stage2');
  };

  return (
    <>
      <Container maxWidth="md" className={styles.container}>
        <Paper elevation={3} className={styles.paper}>
          <Typography variant="h4" component="h1" className={styles.title}>
            Interview Details
          </Typography>
          <form onSubmit={handleSubmit} className={styles.form}>
            <TextField
              required
              fullWidth
              label="Job Title"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleChange}
            />
            <TextField
              required
              fullWidth
              multiline
              rows={4}
              label="Job Description"
              name="jobDescription"
              value={formData.jobDescription}
              onChange={handleChange}
            />
            <TextField
              required
              fullWidth
              label="Interview Duration (minutes)"
              name="interviewDuration"
              type="number"
              value={formData.interviewDuration}
              onChange={handleChange}
            />
            <div className={styles.buttonContainer}>
              <Button 
                type="submit"
                variant="contained" 
                color="primary"
                className={styles.submitButton}
              >
                Save & Continue
              </Button>
            </div>
          </form>
        </Paper>
      </Container>
      <Footer />
    </>
  );
};

export default Stage1;
