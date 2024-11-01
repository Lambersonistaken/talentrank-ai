import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  jobTitle: '',
  jobDescription: '',
  interviewDuration: '',
  questions: [],
  stage1Completed: false,
  stage2Completed: false
};

const interviewSlice = createSlice({
  name: 'interview',
  initialState,
  reducers: {
    setInterviewDetails: (state, action) => {
      const { jobTitle, jobDescription, interviewDuration } = action.payload;
      state.jobTitle = jobTitle;
      state.jobDescription = jobDescription;
      state.interviewDuration = interviewDuration;
      state.stage1Completed = true;
    },
    addQuestion: (state, action) => {
      state.questions.push({
        id: Date.now().toString(),
        text: action.payload,
        weightage: 1
      });
    },
    updateQuestion: (state, action) => {
      const { index, text, weightage } = action.payload;
      state.questions[index] = {
        ...state.questions[index],
        text,
        weightage
      };
    },
    removeQuestion: (state, action) => {
      state.questions = state.questions.filter((_, index) => index !== action.payload);
    },
    reorderQuestions: (state, action) => {
      const { oldIndex, newIndex } = action.payload;
      const question = state.questions[oldIndex];
      state.questions.splice(oldIndex, 1);
      state.questions.splice(newIndex, 0, question);
    },
    setStage2Completed: (state) => {
      state.stage2Completed = true;
    },
    resetInterviewDetails: (state) => {
      return initialState;
    }
  },
});

export const { 
  setInterviewDetails, 
  addQuestion, 
  updateQuestion, 
  removeQuestion,
  reorderQuestions,
  setStage2Completed,
  resetInterviewDetails 
} = interviewSlice.actions;
export default interviewSlice.reducer; 