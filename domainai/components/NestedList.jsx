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

export default function NestedList({ onSubmit, setMessageInput, handleDrawerClose }) {
  
  const [open, setOpen] = React.useState({});
  const  data = [
    {
    entryPoint: "In-store ordering",
    questions: [
    "What menu items are available for in-store ordering?",
    "Is there a wait time for ordering at the counter?",
    "Can I place a custom order?",
    "Are there any special deals or promotions available?"
    ]
    },
    {
    entryPoint: "Drive-thru ordering",
    questions: [
    "What menu items are available for drive-thru ordering?",
    "Is there a wait time for drive-thru ordering?",
    "Can I place a custom order through the drive-thru?",
    "Are there any special deals or promotions available for drive-thru orders?"
    ]
    },
    {
    entryPoint: "Online ordering through website",
    questions: [
    "What menu items are available for online ordering?",
    "Can I place a custom order through the website?",
    "How long does delivery usually take?",
    "Are there any special deals or promotions available for online orders?"
    ]
    },
    {
    entryPoint: "Mobile app ordering",
    questions: [
    "What menu items are available for ordering through the mobile app?",
    "Can I place a custom order through the mobile app?",
    "How long does delivery usually take?",
    "Are there any special deals or promotions available for mobile app orders?"
    ]
    },
    {
    entryPoint: "Delivery through third-party services",
    questions: [
    "What third-party delivery services are available?",
    "What menu items are available for delivery?",
    "How long does delivery usually take?",
    "Are there any fees for delivery?"
    ]
    },
    {
    entryPoint: "Catering services",
    questions: [
    "What catering services are available?",
    "What menu items are available for catering?",
    "Can I place a custom catering order?",
    "What is the minimum order size for catering?"
    ]
    },
    {
    entryPoint: "In-store dining",
    questions: [
    "Is in-store dining available?",
    "What is the wait time for in-store dining?",
    "Are there any restrictions for in-store dining?",
    "Are there any special deals or promotions available for in-store dining?"
    ]
    },
    {
    entryPoint: "Takeout services",
    questions: [
    "What menu items are available for takeout?",
    "Can I place a custom takeout order?",
    "What is the wait time for takeout?",
    "Are there any special deals or promotions available for takeout orders?"
    ]
    },
    {
    entryPoint: "Outdoor seating",
    questions: [
    "Is outdoor seating available?",
    "What is the wait time for outdoor seating?",
    "Are there any restrictions for outdoor seating?",
    "Are there any special deals or promotions available for outdoor seating?"
    ]
    },
    {
    entryPoint: "Rewards program enrollment",
    questions: [
    "What benefits does the rewards program offer?",
    "How do I enroll in the rewards program?",
    "How do I redeem rewards?",
    "Are there any restrictions for the rewards program?"
    ]
    },
    {
    entryPoint: "Gift card purchasing",
    questions: [
    "How do I purchase a gift card?",
    "Can gift cards be redeemed for online and in-store purchases?",
    "Are there any restrictions for using gift cards?",
    "Do gift cards have an expiry date?"
    ]
    }
    ];
    
    const entryPoints = data.map(d => d.entryPoint);

  const handleOptionsClick = (entryPoints, question, e) => {
    setMessageInput(`${entryPoints} - ${question}`);
    setTimeout(() => {
      onSubmit(e, `${entryPoints} - ${question}`);
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

{entryPoints.map((entryPoint, index) => (
  <React.Fragment key={`company-${index}`}>
    <ListItemText onClick={() => handleCompanyClick(index)}
              primaryTypographyProps={{ fontFamily: 'poppins' }}
              sx={{ fontFamily: "poppins" }}
              inset
              primary={entryPoint}/>
              

    <Collapse in={open[index]} timeout="auto" unmountOnExit>
      <List component="div" disablePadding>
        {data[index].questions.map((question, questionIndex) => (
          <ListItemButton
            key={`question-${questionIndex}`}
            onClick={(e) => handleOptionsClick(entryPoint, question, e)}
          >
            <ListItemText
              primaryTypographyProps={{ fontFamily: 'poppins' }}
              sx={{ fontFamily: "poppins" }}
              inset
              primary={question}
            />
          </ListItemButton>
        ))}
      </List>
    </Collapse>
  </React.Fragment>
))}
    </List>
  );
}
