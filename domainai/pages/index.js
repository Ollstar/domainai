import * as React from 'react';
import { styled, createTheme } from '@mui/material/styles';
import { useState, useEffect, useRef } from "react";
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Fab from '@mui/material/Fab';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Avatar from '@mui/material/Avatar';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import MoreIcon from '@mui/icons-material/MoreVert';
import MuiAppBar from '@mui/material/AppBar';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import { CircularProgress, TextField } from '@mui/material';
import NestedList from '@/components/NestedList';
import styles from '@/styles/index.module.css';
import { NoSsr } from '@mui/material';
import { Container, height, textAlign } from '@mui/system';
import { Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import Grid from '@mui/material/Grid';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Message from '@/components/Message.jsx';
import SubmitButton from '@/components/SubmitButton';
const drawerWidth = 240;

function ScrollTop(props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      '#back-to-top-anchor',
    );

    if (anchor) {
      anchor.scrollIntoView({
        block: 'end',
      });
    }
  };

  return (
    <Box
      onClick={handleClick}
      role="presentation"
    >
      {children}
    </Box>
  );
}

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  padding: "10px",
  width: "100%",
  position: "absolute",
  backgroundColor: "white",
  overflow: "scroll",
  bottom: "0",
  top: "0",
  marginLeft:`-${drawerWidth}px`,

  ...(open && {
    marginRight: `+${drawerWidth}px`,
  }),
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export function BottomAppBar({ open, onSubmit, setMessageInput, messageInput, props, isLoading }) {
  return (
    <React.Fragment>
      <AppBar position="fixed" sx={{ top: 'auto', bottom: "0", padding:"10px", backgroundColor: "rgb(240,240,240)" }}>
        <Toolbar>



          <form onSubmit={onSubmit}>
            <TextField
              width="100%"
              id="outlined-basic"
              label="Enter message..."
              variant="outlined"
              value={messageInput}
              color='primary'
              disabled={isLoading}
              onChange={e => setMessageInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') onSubmit(e) }}
            />
          </form>
          <Box sx={{ flexGrow: 1 }} />
          <ScrollTop {...props}>
            <IconButton 
              color="primary"
              aria-label="scroll back to top"
              disabled={isLoading}
              onClick={onSubmit}
            >
              {isLoading ? <CircularProgress size={24}/> :  <SendIcon />}
            </IconButton>

          </ScrollTop>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}



export default function App(props) {
  let [timestamp, setTimestamp] = useState(new Date().toLocaleString());

  const [messageInput, setMessageInput] = useState("");
  const [conversation, setConversation] = useState([]);
  const scrollableContainerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!timestamp) {
      setTimestamp(new Date().toLocaleString());
    }
    scrollableContainerRef.current.scrollTop = scrollableContainerRef.current.scrollHeight;
  }, [conversation, timestamp]);

  async function onSubmit(event, message = messageInput) {
    if (event && event.preventDefault) {
      event.preventDefault();
    }
    let currentTimestamp = new Date().toLocaleString();

    if (message !== "") {
      setConversation([...conversation, { text: message, author: "User", timestamp: currentTimestamp }]);
    }



    setMessageInput("");



    try {
      setIsLoading(true);
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
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
        author: "StarburgerAI",
        timestamp: currentTimestamp2
      }]);
      setMessageInput("");
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }

  const theme = createTheme({
    palette: {
      primary: {
        light: '#757ce8',
        main: '#3f50b5',
        dark: '#002884',
        contrastText: '#fff',
      },
      secondary: {
        light: '#ff7961',
        main: '#f44336',
        dark: '#ba000d',
        contrastText: '#000',
      },
    },
  }); const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" open={open} sx={{ backgroundColor: "rgb(240,240,240)" }}>

        <Toolbar>
          <IconButton
            color="black"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Avatar alt="walmartlogo.png" src="/avatar/walmartlogo.png" />
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
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <NestedList />

        <Divider />

      </Drawer>

      <Box>

      <Main ref={scrollableContainerRef}  >
      <DrawerHeader/>
        <div className={styles.messageContainer}>
          <Message
            author="StarburgerAI"
            text="Hey... 👋"
            timestamp= {<NoSsr>{timestamp}</NoSsr>}>
          </Message>
        </div>
        <div className={styles.messageContainer}>
          <Message
            author="StarburgerAI"
            text="Thanks for jumping on to the Starburger feedback chat 🙏.  We are here to help and serve… 😃 What can we do for you?"
            timestamp= {<NoSsr>{timestamp}</NoSsr>}>
          </Message>
        </div>

        {conversation.map((message, index) => (
          <div key={index} className={styles.messageContainer} >
                     <Message
                     className = {message.author === "User" ? styles.messageRight : styles.messageLeft}
            author={message.author}
            text={message.text}
            timestamp={message.timestamp}>
          </Message>
          </div>
        ))}

        <div style={{ clear: "both" }}></div>
      </Main>
      <Toolbar id="back-to-top-anchor" />


      

    </Box>
          <BottomAppBar isLoading={isLoading} open={open} onSubmit={onSubmit} setMessageInput={setMessageInput} messageInput={messageInput} props={props} />
</Box>
    
  );
}
