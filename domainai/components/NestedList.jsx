import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import { ExpandMore, ExpandLess } from '@mui/icons-material';
import ChatIcon from '@mui/icons-material/Chat';
import styles from "styles/index.module.css";

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
      scrollTop: open[index] ? 0 : open[index],
      [index]: !open[index],
      open: !open[index],
    });
  };

  return (
    <List
      component="nav"
      sx={{
        position: 'relative',
        overflow: 'auto',
      }}>

     {companyNames.map((company, index) => (
        <React.Fragment key={`company-${index}`}>
         <ListSubheader 
         onClick={() => handleCompanyClick(index)}>
                  <ListItemText     primaryTypographyProps={{fontFamily: 'poppins'}} 
 sx={{fontFamily:"poppins"}} inset primary={company} />          </ListSubheader>

          <Collapse in={open[index]} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {questions.map((question, questionIndex) => (
                <ListItemButton 
                  key={`question-${questionIndex}`}
                  onClick={(e) => handleOptionsClick(company, question, e)}
                >
                  <ListItemText     primaryTypographyProps={{fontFamily: 'poppins'}} 
 sx={{fontFamily:"poppins"}} inset primary={question} />
                </ListItemButton>
              ))}
            </List>
          </Collapse>
        </React.Fragment>
      ))}
    </List>
  );
}
