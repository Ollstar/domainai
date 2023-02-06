import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import { useState, useEffect, useRef } from "react";
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
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
import { CircularProgress, TextField } from '@mui/material';
import NestedList from '@/components/NestedList';
import styles from '@/styles/index.module.css';
import { NoSsr } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import Message from '@/components/Message.jsx';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import Head from 'next/head';
import Link from '@mui/material/Link';



const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  padding: "10px",
  width: "100%",
  position: "absolute",
  backgroundColor: "white",
  overflow: "scroll",
  bottom: "0",
  top: "0",
  marginLeft: `-${drawerWidth}px`,
  marginBottom: "56px",


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
  padding: '5px',
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));
const DrawerFooter = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: '5px',

  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export function BottomAppBar({ open, onSubmit, setMessageInput, messageInput, isLoading }) {
  return (
    <React.Fragment>
      <AppBar position="fixed" sx={{ bottom: "0", top: "auto", padding: "5px", backgroundColor: "rgb(240,240,240)" }}>
        <Toolbar>

              <TextField
                id="outlined-basic"
                label="Enter message..."
                variant="outlined"
                fontFamily="typo"
                value={messageInput}
                color='primary'
                disabled={isLoading}
                onSubmit={onSubmit}
                sx={{ width: "100%", backgroundColor: "white" }}
                onChange={e => setMessageInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') onSubmit(e) }}
              >
              </TextField>

            <Box sx={{ flexGrow: 1 }} />
            <IconButton
              color="primary"
              aria-label="scroll back to top"
              disabled={isLoading || open}
              onClick={onSubmit}
            >
              {isLoading ? <CircularProgress size={24} /> : <SendIcon />}
            </IconButton>
            
        </Toolbar>
        <footer>
          <Typography variant="body2" color="text.secondary" align="center">
            {'Built with ❤️ by '}
            <Link color="inherit" href="https://rivaltech.com/">
              Rival
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
          </Typography>
        </footer>
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
        author: "DomainAI",
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
      root: {
        fontFamily: 'Poppins'
      },
      messageLeft: {
        backgroundColor: 'Poppins'
      }, messageRight: {
        backgroundColor: 'Poppins'
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
    <ThemeProvider theme={theme}>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />

      </Head>

      <Box sx={{ display: 'flex' }}>
        <AppBar position="fixed"
        
        open={open} elevation={2} sx={{ padding: "5px", backgroundColor: "rgb(240,240,240)" }}>

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
            <Typography variant="h6" fontFamily={"poppins"} color="black" overflow={"hidden"} component="div" sx={{ flexGrow: 1 }}>
              StarburgerAI
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
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <NestedList onSubmit={onSubmit} setMessageInput={setMessageInput} handleDrawerClose={handleDrawerClose} />

          <Divider />

        </Drawer>

        <Box>

          <Main ref={scrollableContainerRef}  >
            <DrawerHeader />
            <div className={styles.messageContainer}>
              <Message
                author="DomainAI"
                text="Hey... 👋"
                timestamp={<NoSsr>{timestamp}</NoSsr>}>
              </Message>
            </div>
            <div className={styles.messageContainer}>
              <Message
                author="DomainAI"
                text="Thanks for jumping on to the StarburgerAI loyalty chat 🙏.  We are here to help and serve… And we appreciate your feedback.😃 What can we do for you?"
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
            <DrawerFooter />

          </Main>



        </Box>

        <BottomAppBar isLoading={isLoading} open={open} onSubmit={onSubmit} setMessageInput={setMessageInput} messageInput={messageInput} />
      


      </Box>

    </ThemeProvider>
  );
}
