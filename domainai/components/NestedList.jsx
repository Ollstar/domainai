import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import { ExpandMore, ExpandLess, ChevronRight, ChevronLeft, SetMealSharp } from '@mui/icons-material';
import ChatIcon from '@mui/icons-material/Chat';
import styles from "styles/index.module.css";
import { Divider, Icon, IconButton, Modal, Step, Tab, Tabs, TextField, Toolbar } from '@mui/material';
import { fontFamily, fontSize } from '@mui/system';
import DrawerSpacer from './DrawerSpacer';
import PsychologyIcon from '@mui/icons-material/Psychology';
import Stepper from '@/components/Stepper.jsx'
import { Box } from '@mui/material';
import { Typography } from '@mui/material';
import { useState } from 'react';
import { Dialog } from '@mui/material';
import { FormControl, InputLabel, FilledInput, InputAdornment } from '@mui/material';
import { TextareaAutosize } from '@mui/base';
import { Button } from '@mui/material';

export default function NestedList({ onSubmit, setMessageInput, handleDrawerClose, setPrependageMessage, setBehaviourList, setQuestionList }) {
  const [open, setOpen] = React.useState({});
  const [modalOpen, setModalOpen] = React.useState(false);
  const [message, setMessage] = useState("Imagine you are StarburgerAI who is a support bot for Starburger. You are a fun bot and you like to joke around with customers. You are also very helpful and you like to help customers with their orders. You are also very polite and you like to say please and thank you to customers. You are also very friendly and you like to say hi to customers. You are also very curious and you like to ask customers questions about their orders. You are also very smart and you like to answer customers' questions about their orders. You are also very fast and you like to answer customers' questions about their orders quickly. You are also very accurate and you like to answer customers' questions about their orders accurately. You are also very reliable and you like to answer customers' questions about their orders reliably. You are also very consistent and you like to answer customers' questions about their orders consistently. You are also very organized and you like to answer customers' questions about their orders in an organized manner. You are also very efficient and you like to answer customers' questions about their orders efficiently. You are also very effective and you like to answer customers' questions about their orders effectively. You are also very confident and you like to answer customers' questions about their orders confidently. You are also very professional and you like to answer customers' questions about their orders professionally. You are also very knowledgeable and you like to answer customers' questions about their orders knowledgeably. You are also very experienced and you like to answer customers' questions about their orders with experience. You are also very skillful and you like to answer customers' questions about their orders skillfully. You are also very talented and you like to answer customers' questions about their orders with talent. You are also very creative and you like to answer customers' questions about their orders creatively. You are also very innovative and you like to answer customers' questions about their orders innovatively. You are also very resourceful and you like to answer customers' questions about their orders resourcefully. You are also very determined and you like to answer customers' questions about their orders with determination. You are also very persistent and you like to answer customers' questions about their orders persistently. You are also very determined and you like to answer customers' questions about their orders with determination. You are also very persistent and you like to answer customers' questions about their orders persistently. You are also very determined and you like to answer customers' questions about their orders with determination.");

  const data = [
    {
      group: "Ordering",
      entries: [
        {
          entryPoint: "in-store ordering",
          questions: [
            "What menu items are available for in-store ordering?",
            "Is there a wait time for ordering at the counter?",
            "Can I place a custom order?",
            "Are there any special deals or promotions available?"
          ]
        },
        {
          entryPoint: "drive-thru ordering",
          questions: [
            "What menu items are available for drive-thru ordering?",
            "Is there a wait time for drive-thru ordering?",
            "Can I place a custom order through the drive-thru?",
            "Are there any special deals or promotions available for drive-thru orders?"
          ]
        },
        {
          entryPoint: "online ordering through website",
          questions: [
            "What menu items are available for online ordering?",
            "Can I place a custom order through the website?",
            "How long does delivery usually take?",
            "Are there any special deals or promotions available for online orders?"
          ]
        },
        {
          entryPoint: "mobile app ordering",
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
          entryPoint: "delivery through third-party services",
          questions: [
            "What third-party delivery services are available?",
            "What menu items are available for delivery?",
            "How long does delivery usually take?",
            "Are there any fees for delivery?"
          ]
        },
        {
          entryPoint: "catering services",
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
          entryPoint: "in-store dining",
          questions: [
            "What menu items are available for in-store dining?",
            "Is there a wait time for seating?",
            "Do you have outdoor seating available?",
            "Do you offer table service?",
            "Do you offer a kid's menu?"
          ]
        },
        {
          entryPoint: "tutdoor dining",
          questions: [
            "What menu items are available for outdoor dining?",
            "Is there a wait time for outdoor seating?",
            "Do you have heaters or umbrellas for outdoor seating?",
            "Do you offer table service for outdoor dining?",
            "Do you offer a kid's menu for outdoor dining?"
          ]
        },
        {
          entryPoint: "takeout",
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




  const handleModalClose = () => {
    setModalOpen(false);
    setPrependageMessage("");

  };


  const handleBrainClick = (message) => {
    setModalOpen(true);
    setPrependageMessage(message);
    setOpen({})
  };





const handleClick = (entryPoint) => {
  setOpen({
    ...open,
    [entryPoint]: !open[entryPoint]
  });

};

const handleQuestionClick = (entryPoints, question, e) => {
  const message = `For ${entryPoints}. ${question}`;
  setMessageInput(message);
  setTimeout(() => {
    onSubmit(e, message);
  }, 100);
  setOpen({});
  handleDrawerClose();
};

return (
  <>
    <Dialog
      fullWidth

      open={modalOpen}
      scroll="paper"
      onClose={handleModalClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box

        sx={{}}
        bgcolor="background.paper" >



<Box padding={2}>
<ListSubheader sx={{ fontFamily: "poppins" }} component="div" id="modal-header">
        Model Traits
      </ListSubheader>
        <TextField fullWidth={true} multiline minRows={10} id="outlined-basic" placeholder='Enter your primer text' variant="outlined">
          {message}
        </TextField>
        </Box>

      </Box>
      <Toolbar sx={{ justifyContent: "flex-end" }}>
      <Button variant="contained" onClick={handleModalClose}>Save</Button>

        <Button  onClick={handleModalClose}>Cancel</Button>

      </Toolbar>
    </Dialog>
    <List
      component="nav"
      sx={{ maxWidth: 240, bgcolor: 'background.paper' }}
      aria-labelledby="nested-list-subheader"

    >
      <ListSubheader sx={{ fontFamily: "poppins", marginTop: 4 }} component="div" id="nested-list-subheader">
        Quick Questions
      </ListSubheader>
      {data.map((group, groupIndex) => (

        <React.Fragment key={groupIndex}>

          <ListItemButton onClick={() => handleClick(group.group)}>
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

                          onClick={() => handleQuestionClick(entry.entryPoint, question)}
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
      <Divider />
      <ListSubheader sx={{ fontFamily: "poppins", marginTop: 4 }} component="div" id="nested-list-subheader">
        Admin
      </ListSubheader>
      <ListItemButton onClick={() => handleBrainClick()}>
        <ListItemIcon>
          <PsychologyIcon />
        </ListItemIcon>
        <ListItemText primaryTypographyProps={{ fontFamily: "poppins" }} primary="Model traits" />
      </ListItemButton>

    </List>


  </>
);
};
