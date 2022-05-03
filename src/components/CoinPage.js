import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import CryptoState from '../CryptoContext'
import {makeStyles, Typography} from '@material-ui/core';
import axios from 'axios'
import { SingleCoin } from '../config/api'
import CoinInfo from './CoinInfo';

const CoinPage = () => {

const {id} = useParams()


const [coin, setCoin] = useState()




const fetchCoin = async()=>{
  const {data} = await axios.get(SingleCoin(id))
  console.log(data)
  setCoin(data)
}



useEffect(() => {
 fetchCoin()
}, [])


const useStyles = makeStyles((theme)=>({
container:{
  display:"flex",
  [theme.breakpoints.down("md")]:{
      flexDirection:"column",
      alignItems:"center"
  }
},
sidebar:{
  width:"30%",
  display:"flex",
  [theme.breakpoints.down("md")]:{
  width:"100%"
  },
      flexDirection:"column",
      alignItems:"center",
      marginTop:"25px",
      borderRight:"2px solid grey"
  
},
heading:{
  fontWeight:"bold",
  marginBottom:20,
  fontFamily:"Montserrat"
},
description:{
  width:"100%",
  fontFamily:"Montserrat",
  padding:25,
  paddingBottom:15,
  paddingTop:0,
  textAlign:"justify"
},
marketData:{
  alignSelf:"start",
  padding:25,
  paddingTop:10,
  width:"100%",
  [theme.breakpoints.down("md")]:{
    display:"flex",
    justifyContent:"space-around"
  },
  [theme.breakpoints.down("sm")]:{
    flexDirection:"column",
    alignItems:"center"
  },
  [theme.breakpoints.down("xs")]:{
    alignItems:"start"
  }
}

}))

const classes = useStyles()

const  numberWithComas = (x)=>{
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g,',');
}

    
  return (
    <div className={classes.container}>
    <div className={classes.sidebar}>
    <img
    src={coin?.image.large}
    alt={coin?.name}
    height="200"
    style={{marginBottom:20}}
    />
    </div>
    <Typography variant='h3' className={classes.heading}>
    {coin?.name}
    </Typography>
    <Typography variant='subtitle1' className={classes.description}>
    {coin?.description.en.split('. ')[0]}
    </Typography>
    <div className={classes.marketData}>
    <span style={{display:"flex"}}>
    <Typography variant='h5' style={{fontFamily:"Montserrat"}} className={classes.heading}>
    Rank:
    </Typography>
    </span>
    <span style={{display:"flex"}}>
    <Typography variant='h5' style={{fontFamily:"Montserrat"}} className={classes.heading}>
    Current Price:
    </Typography>
    </span>
    <span style={{display:"flex"}}>
    <Typography variant='h5' style={{fontFamily:"Montserrat"}} className={classes.heading}>
    Market Price:
    </Typography>
    </span>
    </div>
    <CoinInfo coin = {coin}  />
    
    </div>
  )
}

export default CoinPage