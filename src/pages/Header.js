import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from '@/styles/Header.module.css';
import { useSelector } from 'react-redux';

const Header = () => {
  const router = useRouter();
  const currentPath = router.pathname;
  const interviewDetails = useSelector((state) => state.interview);

  const stages = [
    { path: '/stage1', label: 'Interview Details' },
    { path: '/stage2', label: 'Questions' },
    { path: '/stage3', label: 'Review' },
  ];

  const isStageAccessible = (path) => {
    switch(path) {
      case '/stage1':
        return true;
      case '/stage2':
        return interviewDetails.stage1Completed;
      case '/stage3':
        return interviewDetails.stage1Completed && interviewDetails.questions.length > 0;
      default:
        return false;
    }
  };

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.logo}>
          <Link href="/">
            Interview Creator
          </Link>
        </div>
        
        <div className={styles.stages}>
          {stages.map((stage, index) => (
            <div key={stage.path} className={styles.stageWrapper}>
              <Link
                href={isStageAccessible(stage.path) ? stage.path : '#'}
                className={`${styles.stageLink} ${
                  currentPath === stage.path ? styles.active : ''
                } ${!isStageAccessible(stage.path) ? styles.disabled : ''}`}
                onClick={(e) => !isStageAccessible(stage.path) && e.preventDefault()}
              >
                <span className={styles.stageNumber}>{index + 1}</span>
                <span className={styles.stageLabel}>{stage.label}</span>
              </Link>
              {index < stages.length - 1 && (
                <span className={styles.connector}></span>
              )}
            </div>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Header;
