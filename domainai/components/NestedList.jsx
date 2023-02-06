import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import { ExpandMore, ExpandLess } from '@mui/icons-material';
import ChatIcon from '@mui/icons-material/Chat';

const companyNames = ['Apple', 'Amazon', 'Microsoft', 'Alphabet', 'Facebook', 'Tesla', 'Berkshire Hathaway', 'Vanguard Group', 'Procter & Gamble', 'Johnson & Johnson'];
const questions = [
  "What is the company's latest financial performance?", 
  "What are the company's latest product offerings?", 
  "What is the company's stance on sustainability?", 
  "What is the company's plan for future growth?"
];

export default function NestedList({ onSubmit, setMessageInput, handleDrawerClose }) {
  const [open, setOpen] = React.useState({});

  const handleOptionsClick = (companyName, question, e) => {
    setMessageInput(`${companyName} - ${question}`);
    setTimeout(() => {
      onSubmit(e, `${companyName} - ${question}`);
    }, 500);
    handleDrawerClose();
  };

  const handleCompanyClick = (index) => {
    setOpen({
      ...open,
      [index]: !open[index],
    });
  };

  return (
    <List component="nav">
      {companyNames.map((companyName) => (
        <>
        
          <ListItemButton key={`Company-${companyName}`} onClick={() => handleCompanyClick(companyName)}>

            <ListItemText primary={companyName} />
            {open[companyName] ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          
          <Collapse in={open[companyName]} timeout="auto" unmountOnExit>
            <List component="div">
              {questions.map((question, questionIndex) => (
                <ListItemButton
                  key={`Question ${questionIndex} for Company ${companyName}`}
                  onClick={(e) => handleOptionsClick(companyName, question, e)}>
                  <ListItemText primary={question} />
                </ListItemButton>
              ))}
            </List>
          </Collapse>
        </>
      ))}
    </List>
  );
}
