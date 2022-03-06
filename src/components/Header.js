import { AppBar, createTheme, makeStyles, MenuItem, Select, ThemeProvider, Toolbar, Typography } from '@material-ui/core'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { CryptoState } from '../CryptoContext'

const Header = () => {
  
  const useStyle = makeStyles(()=>({
    title:{
      flex:1,
      color:"gold",
      fontFamily:"Montserrat",
      fontWeight:"bold",
      cursor:"pointer"
    }
  }))

  const {currency,setCurrency} = CryptoState()


  const classes = useStyle()

  const navigate = useNavigate()

  const darkTheme = createTheme({
    palette:{
      main:"#fff"
    },
    type:"dark"
  })
  

  return (
    <div>
    <ThemeProvider theme={darkTheme}>
    <AppBar color='transparent' position='static'>
    <Toolbar>
    <Typography onClick={()=>navigate('/') } variant="h6" className={classes.title}>
    Crypto Hunter
    </Typography>

    <Select variant='outlined' style={{
      width:100,
      height:40,
      marginRight:15
    }}
    value={currency}
    onChange={e=>setCurrency(e.target.value)}
    >
    <MenuItem value={"USD"}>USD</MenuItem>
    <MenuItem value={"INR"}>INR</MenuItem>
    </Select>
    </Toolbar>
    
    </AppBar>
    </ThemeProvider>
    </div>
  )
}

export default Header