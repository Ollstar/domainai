import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import { useState, useEffect, useRef } from "react";
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import MenuIcon from '@mui/icons-material/Menu';

import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import NestedList from '@/components/NestedList';
import styles from '@/styles/index.module.css';
import { NoSsr } from '@mui/material';
import Message from '@/components/Message.jsx';
import { Typography } from '@mui/material';
import { AppBar } from '@mui/material';
import theme from '/styles/theme.js';
import BottomAppBar from '@/components/BottomAppBar.jsx';
import Main from '@/components/Main.jsx';
import DrawerSpacer from '@/components/DrawerSpacer.jsx';
import Stepper from '@mui/material';
import txt from '@/public/default.txt';


const drawerWidth = 240;

export default function App(props) {
  let [timestamp, setTimestamp] = useState(new Date().toLocaleString());

  const [messageInput, setMessageInput] = useState("");
  const [prependageMessage, setPrependageMessage] = useState(`Imagine you are the StarburgerAI chatbot. 
  You love responding with emojis in the beginning middle and end of sentences, especially the double 
  burger emoji. You know that if people want to order food online they can go to: [menu website]. If they 
  want to leave a review they can leave it with you. Try to get Voice of customer and market research data. 
  If they want restaurant hours or schedule: [schedule]. Map or location related send them [location]Conversation:
  1: Hi, I'd like to know more about your menu.
  2: 🍔 Great! Our menu features a wide variety of delicious burgers, sides, and drinks. What specifically are you interested in?
  1: Can you tell me about any new items or promotions you have going on?
  2: 🆕 We have some exciting new menu items and promotions coming up soon! Would you like to receive updates about our latest offerings by email?
  1: Yes, please sign me up!
  2: 📧 Great! You're now subscribed to receive updates on our latest menu items and promotions. In the meantime, be sure to check out our website for the latest offerings.

  Conversation:
  1: Yes, I had a horrible experience!
  2: 💔 We're sorry to hear that! Please share what we can do better next time.
  1: I ordered a burger and it was cold and soggy. I want a refund.
  Response: I'll be sure to pass your email along to have someone contact you. What was your email?
  Conversation:
  1: I recently visited one of your restaurants and had a great experience. Can I leave a review?
  Response: 💖 We would love to hear about your experience! To leave a review, please visit our website where you can share your thoughts and feedback. Thank you for choosing Starburger!`);

  const [behaviourList, setBehaviourList] = useState([]);
  const [questionList, setQustionList] = useState([]);


  const [conversation, setConversation] = useState([]);
  const scrollableContainerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!timestamp) {
      setTimestamp(new Date().toLocaleString());
    }
    scrollableContainerRef.current.scrollTop = scrollableContainerRef.current.scrollHeight;
  }, [conversation, timestamp]);

  async function onSubmit(event, message = messageInput, pMessage = prependageMessage) {
    if (event && event.preventDefault) {
      event.preventDefault();
    }
    let currentTimestamp = new Date().toLocaleString();

    if (message !== "") {
      setConversation([...conversation, { text: message, author: "User", timestamp: currentTimestamp }]);
    }
    if (message === "Change") {
      setConversation([...conversation, { text: "Training saved.", author: "Starburger", timestamp: currentTimestamp }]);
      // console log if im here
      console.log("change")
      return
    }
    if (message === "") {
      // console log if im here
      console.log("nothing")
      return
    }
    setPrependageMessage(prependageMessage);
    setMessageInput("");
    try {
      setIsLoading(true);
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message, pMessage }),
      });
      if (message === "") {
        setIsLoading(false);

      }
      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }


      let currentTimestamp2 = new Date().toLocaleString();

      setConversation([...conversation, {
        text: message,
        author: "User",
        timestamp: currentTimestamp
      },
      {
        text: data.result,
        author: "StarburgerGPT",
        timestamp: currentTimestamp2
      }]);
      setMessageInput("");
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }

  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (

    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" sx={{ padding: "5px", zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: "rgb(240,240,240)" }}

        open={open} elevation={2}>

        <Toolbar>
          <IconButton
            color="black"
            aria-label="open drawer"
            onClick={open ? handleDrawerClose : handleDrawerOpen}
            edge="start"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" fontFamily={"poppins"} color="black" overflow={"hidden"} component="div" sx={{ flexGrow: 1 }}>
            Starburger GPT
          </Typography>


          <Box sx={{ flexGrow: 1 }} />
          <Avatar alt="domainailogo.png" src="/starb.png" />
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
        onClose={handleDrawerClose}

      >
        <DrawerSpacer >
          <Box sx={{ position: "fixed" }}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </Box>
        </DrawerSpacer>
        <Divider />
        <NestedList
          onSubmit={onSubmit}
          setMessageInput={setMessageInput}
          handleDrawerClose={handleDrawerClose}
          prependageMessage={prependageMessage}
          setPrependageMessage={setPrependageMessage}
          setBehaviourList={setBehaviourList}
          setQuestionList={setQustionList} />
        <Box
          component="img"
          sx={{
            position: "fixed",
            bottom: 0,
            zIndex: -1,
            margin: "85px 85px 100px",
            maxWidth: { xs: drawerWidth - 170, md: drawerWidth - 170 },
          }}
          alt="The house from the offer."
          src="/avatar/powerlogo.png"
        />
        <DrawerSpacer />

      </Drawer>
      <Box>
        <Main ref={scrollableContainerRef} onClick={open ? handleDrawerClose : null}>
          <DrawerSpacer />
          <div className={styles.messageContainer}>
            <Message
              author="StarburgerGPT"
              text="Hey... 👋"
              timestamp={<NoSsr>{timestamp}</NoSsr>}>
            </Message>
          </div>
          <div className={styles.messageContainer}>
            <Message
              author="StarburgerGPT"
              text="Thanks for jumping on to the StarburgerGPT loyalty chat 🙏.  We are here to help and serve… And we appreciate your feedback.😃 What can we do for you?"
              timestamp={<NoSsr>{timestamp}</NoSsr>}>
            </Message>
          </div>

          {conversation.map((message, index) => (
            <div key={index} className={styles.messageContainer} >
              <Message
                className={message.author === "User" ? styles.messageRight : styles.messageLeft}
                author={message.author}
                text={message.text}
                timestamp={message.timestamp}>
              </Message>
            </div>
          ))}
          <div style={{ clear: "both" }}></div>
          <DrawerSpacer />
        </Main>
      </Box>
      <BottomAppBar isLoading={isLoading} open={open} onSubmit={onSubmit} setMessageInput={setMessageInput} messageInput={messageInput} handleDrawerClose={handleDrawerClose} handleDrawerOpen={handleDrawerOpen} />
    </Box>
  );
}
