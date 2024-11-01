"use client"
import { Box, Button } from '@mui/material';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import styles from '@/styles/Footer.module.css';

const Footer = () => {
  const router = useRouter();
  const interviewDetails = useSelector((state) => state.interview);

  const getNextRoute = () => {
    switch (router.pathname) {
      case '/stage1':
        return '/stage2';
      case '/stage2':
        return '/stage3';
      default:
        return '/stage1';
    }
  };

  const isNextEnabled = () => {
    switch (router.pathname) {
      case '/stage1':
        return interviewDetails.stage1Completed;
      case '/stage2':
        return interviewDetails.questions.length > 0;
      default:
        return true;
    }
  };

  const handleNavigation = async () => {
    const nextRoute = getNextRoute();
    await router.push(nextRoute);
  };

  return (
    <Box className={styles.footer}>
      <Button
        variant="contained"
        color="primary"
        onClick={handleNavigation}
        disabled={!isNextEnabled()}
      >
        Next
      </Button>
    </Box>
  );
};

export default Footer;
