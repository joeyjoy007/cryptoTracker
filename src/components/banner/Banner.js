import { Container, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import Carousal from '../carousal/Carousal'



const useStyle = makeStyles(()=>({
  banner:{
    backgroundImage:"url(./banner2.jpg)"
  },
  bannerContent:{
    display:"flex",
    height:400,
    flexDirection:"column",
    paddingTop:25,
    justifyContent:"space-around"
  },
  tagline:{
    display:"flex",
    height:"40%",
    flexDirection:"column",
    justifyContent:"center",
    textAlign:"center",
  }
}))
const Banner = () => {

  const classes = useStyle()

  
  return (
    <div className={classes.banner}>
    <Container className={classes.bannerContent}>
    <div className={classes.tagline}>
    <Typography varient="h2"
    style={{
      fontWeight:"bold",
      marginBottom:15,
      fontFamily:"Montserrat"
    }}>
    Crypto Hunter
    </Typography>
    <Typography varient="subtitle2"
    style={{
      fontWeight:"darkgrey",
      textTransform:"capitalize",
      fontFamily:"Montserrat"
    }}>
    Get all the infor of your favourite crypto currency
    </Typography>
    <Carousal/>
    </div>
    </Container>
    </div>
  )
}

export default Banner