import { Stepper, Step, StepLabel, StepContent, Button, Typography, Select, MenuItem, TextField } from '@mui/material';
import { useState } from 'react';
function TraitSelector(props) {
  const [selectedTrait, setSelectedTrait] = useState('');
  const traitOptions = ['Fun', 'Non-repetitive', 'Short', 'Longwinded', 'Hyper-accurate', 'Friendly', 'Standoffish'];

  return (
    <Select
      value={selectedTrait}
      onChange={(event) => setSelectedTrait(event.target.value)}
    >
      {traitOptions.map(trait => (
        <MenuItem value={trait}>{trait}</MenuItem>
      ))}
    </Select>
  );
}

function MessageStep(props) {
  const [message, setMessage] = useState('');

  return (
    <TextField
      value={message}
      onChange={(event) => setMessage(event.target.value)}
      label="Type your message"
      fullWidth
    />
  );
}

function BlackAndWhiteStep(props) {
  const [questions, setQuestions] = useState([]);
  const [responses, setResponses] = useState([]);

  return (
    <>
      <Typography>Select specific questions:</Typography>
      {/* Add the logic to select specific questions */}
      <Typography>Select specific responses:</Typography>
      {/* Add the logic to select specific responses */}
    </>
  );
}

function CustomStepper(props) {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Stepper activeStep={activeStep} orientation="vertical">
      <Step>
        <StepLabel>Select a behavior trait</StepLabel>
        <StepContent>
          <TraitSelector />
          <Button onClick={handleNext}>Next</Button>
        </StepContent>
      </Step>
      <Step>
        <StepLabel>Type a message</StepLabel>
        <StepContent>
          <MessageStep />
          <Button onClick={handleBack}>Back</Button>
          <Button onClick={handleNext}>Next</Button>
        </StepContent>
      </Step>
      <Step>
        <StepLabel>Choose specific questions and responses</StepLabel>
        <StepContent>
          <BlackAndWhiteStep />
          <Button onClick={handleBack}>Back</Button>
          <Button onClick={handleNext}>Next</Button>
</StepContent>
</Step>
</Stepper>
);
}

export default CustomStepper;