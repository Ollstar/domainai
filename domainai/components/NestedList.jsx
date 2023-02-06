import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import { ExpandMore, ExpandLess, ChevronRight, ChevronLeft } from '@mui/icons-material';
import ChatIcon from '@mui/icons-material/Chat';
import styles from "styles/index.module.css";
import { Icon, IconButton } from '@mui/material';
import { fontFamily, fontSize } from '@mui/system';

export default function NestedList({ onSubmit, setMessageInput, handleDrawerClose }) {
  const [open, setOpen] = React.useState({});
  const data = [
    {
      group: "Ordering",
      entries: [
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
        }
      ]
    },
    {
      group: "Delivery",
      entries: [
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
        }
      ]
    },
    {
      group: "Dining",
      entries: [
        {
          entryPoint: "In-store dining",
          questions: [
            "What menu items are available for in-store dining?",
            "Is there a wait time for seating?",
            "Do you have outdoor seating available?",
            "Do you offer table service?",
            "Do you offer a kid's menu?"
          ]
        },
        {
          entryPoint: "Outdoor dining",
          questions: [
            "What menu items are available for outdoor dining?",
            "Is there a wait time for outdoor seating?",
            "Do you have heaters or umbrellas for outdoor seating?",
            "Do you offer table service for outdoor dining?",
            "Do you offer a kid's menu for outdoor dining?"
          ]
        },
        {
          entryPoint: "Takeout",
          questions: [
            "What menu items are available for takeout?",
            "Is there a wait time for takeout orders?",
            "Can I place a custom takeout order?",
            "Do you offer any discounts or promotions for takeout orders?"
          ]
        }
      ]
    }
  ];

  const handleClick = (entryPoint) => {
    setOpen({
      ...open,
      [entryPoint]: !open[entryPoint]
    });
  };

  const handleQuestionClick = (entryPoints, question, e) => {
    setMessageInput(`${entryPoints} - ${question}`);
    setTimeout(() => {
      onSubmit(e, `${entryPoints} - ${question}`);
    }, 500);
    setOpen({});
    handleDrawerClose();
  };

  return (
    <List
      component="nav"
      sx={{bgcolor: "#f5f5f5", width: 300, maxWidth: 360, bgcolor: 'background.paper'}}
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader sx={{ fontFamily: "poppins", marginTop: 5}} component="div" id="nested-list-subheader">
          Quick Questions
        </ListSubheader>
      }
    >
      {data.map((group, groupIndex) => (
        <React.Fragment key={groupIndex}>
          <ListItemButton  onClick={() => handleClick(group.group)}>
            <ListItemIcon>
              {open[group.group] ? <ExpandLess /> : <ExpandMore />}
            </ListItemIcon>
            <ListItemText primaryTypographyProps={{ fontFamily: "poppins" }} primary={group.group} />
          </ListItemButton>
          <Collapse in={open[group.group]} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {group.entries.map((entry, entryIndex) => (
                <React.Fragment key={entryIndex}>
                  <ListItemButton onClick={() => handleClick(entry.entryPoint)}>
                    <ListItemIcon>
                      {open[entry.entryPoint] ? <ChevronLeft /> : <ChevronRight />}
                    </ListItemIcon>
                    <ListItemText primaryTypographyProps={{ fontFamily: "poppins", fontSize: 12 }} primary={entry.entryPoint} />
                  </ListItemButton>
                  <Collapse in={open[entry.entryPoint]} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {entry.questions.map((question, questionIndex) => (
                        <ListItemButton
                          key={questionIndex}
                          
                          onClick={() => handleQuestionClick(question, entry.entryPoint)}
                        >
                          <ListItemIcon>
                            <ChatIcon />
                          </ListItemIcon>
                          <ListItemText primaryTypographyProps={{ fontFamily: "poppins", fontSize: 10 }} primary={question} />
                        </ListItemButton>
                      ))}
                    </List>
                  </Collapse>
                </React.Fragment>
              ))}
            </List>
          </Collapse>
        </React.Fragment>
      ))}
    </List>
  );
};
