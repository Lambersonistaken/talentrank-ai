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
  Paper,
  List,
  ListItem,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import AddIcon from '@mui/icons-material/Add';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useSortable } from '@dnd-kit/sortable';
import { addQuestion, updateQuestion, removeQuestion, reorderQuestions } from '@/redux/slices/interviewSlice';
import styles from '@/styles/Stage2.module.css';
import Footer from '../Footer';

// Mock questions for initial state
const MOCK_QUESTIONS = [
  "Describe your experience with React",
  "How do you handle state management?",
  "What is your approach to testing?",
  "Explain your debugging process"
];

const SortableQuestion = ({ id, index, question, onUpdate, onDelete }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({ id: question.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  return (
    <ListItem 
      ref={setNodeRef} 
      style={style} 
      className={styles.questionItem}
    >
      <IconButton {...attributes} {...listeners}>
        <DragIndicatorIcon />
      </IconButton>
      <TextField
        fullWidth
        value={question.text}
        onChange={(e) => onUpdate(index, e.target.value, question.weightage)}
      />
      <FormControl sx={{ minWidth: 120, ml: 2 }}>
        <InputLabel>Weightage</InputLabel>
        <Select
          value={question.weightage}
          label="Weightage"
          onChange={(e) => onUpdate(index, question.text, e.target.value)}
        >
          {[0, 1, 2, 3].map((value) => (
            <MenuItem key={value} value={value}>{value}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <IconButton onClick={() => onDelete(index)}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  );
};

const Stage2 = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { questions, stage1Completed } = useSelector((state) => state.interview);
  const [newQuestion, setNewQuestion] = useState('');

  // Add mock questions if none exist
  useState(() => {
    if (questions.length === 0) {
      MOCK_QUESTIONS.forEach(q => dispatch(addQuestion(q)));
    }
  }, []);

  if (!stage1Completed) {
    router.push('/stage1');
    return null;
  }

  const handleAddQuestion = () => {
    if (newQuestion.trim()) {
      dispatch(addQuestion(newQuestion.trim()));
      setNewQuestion('');
    }
  };

  const handleUpdateQuestion = (index, text, weightage) => {
    dispatch(updateQuestion({ index, text, weightage }));
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = questions.findIndex(q => q.id === active.id);
      const newIndex = questions.findIndex(q => q.id === over.id);
      dispatch(reorderQuestions({ oldIndex, newIndex }));
    }
  };

  return (
    <>
      <Container maxWidth="md" className={styles.container}>
        <Paper elevation={3} className={styles.paper}>
          <Typography variant="h4" component="h1" className={styles.title}>
            Interview Questions
          </Typography>
          
          <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={questions} strategy={verticalListSortingStrategy}>
              <List className={styles.questionList}>
                {questions.map((question, index) => (
                  <SortableQuestion
                    key={index}
                    id={index}
                    index={index}
                    question={question}
                    onUpdate={handleUpdateQuestion}
                    onDelete={() => dispatch(removeQuestion(index))}
                  />
                ))}
              </List>
            </SortableContext>
          </DndContext>

          <Box className={styles.addQuestion}>
            <TextField
              fullWidth
              label="Add a new question"
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddQuestion()}
            />
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleAddQuestion}
              disabled={!newQuestion.trim()}
            >
              Add Question
            </Button>
          </Box>
        </Paper>
      </Container>
      <Footer />
    </>
  );
};

export default Stage2;
