import { Container, createTheme, LinearProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, ThemeProvider, Typography } from '@material-ui/core'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

import { CoinList } from '../../config/api'
import { CryptoState } from '../../CryptoContext'
import {useNavigate} from 'react-router-dom'
import { makeStyles } from '@material-ui/styles'

const CoinsTable = () => {

    const navigate = useNavigate()

    const [coins, setCoins] = useState([])
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState()

    const {currency,symbol} = CryptoState()

    const fetchCoins = async()=>{
        setLoading(true)
        const {data} = await axios.get(CoinList(currency))
        setCoins(data)
        setLoading(false)

    }

    

    useEffect(() => {
      fetchCoins()
    }, [currency])

    const handelSearch = ()=>{
       return coins.filter((coin)=>(
           coin.name.toLowerCase().includes(search) ||
           coin.symbol.toLowerCase().includes(search)
       ))
    }
    
    const darkTheme = createTheme({
        palette:{
            primary:{
                main:"#fff"
            },
            type:"dark"
        }
    })

    const useStyle = makeStyles(()=>({

    }))
    const  numberWithComas = (x)=>{
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g,',');
    }
    const classes = useStyle()
  return (
    <ThemeProvider theme={darkTheme}>
    <Container style={{textAlign:"center"}}>
    <Typography variant='h4' style={{margin:18,fontFamily:"Montserrat"}}>
    CryptoCurrency prices by market cap
    </Typography>
    <TextField label="search for crypto currency..." variant='outlined' style={{marginBottom:20,width:"100%"}} onChange={e=>setSearch(e.target.value)}/>

    <TableContainer>
   {
    loading?(
        <LinearProgress style={{background:"gold"}}></LinearProgress>
    ):(
       <Table>
       <TableHead style={{background:"#eebc1d"}}>
       <TableRow>
       {["Coin","Price","24h change","Market Cap"].map((head)=>(

        <TableCell
        style={{
            color:"black",
            fontWeight:700,
            fontFamily:"Montserrat"
        }}
        key={head}
        align={head === "Coin"?"":"right"}
        >
        {head}
        </TableCell>
       ))}
       
       </TableRow>
       
       
       </TableHead>
       <TableBody>
       {handelSearch().map((row)=>{
           const profit = row.price_change_percentage_24h > 0;

           return(
               <TableRow  
               onClick={()=>navigate(`/coins/${row.id}`)}
               className={classes.row}
               key={row.name}
               >
               <TableCell
                component="th"
                 scope="row"
                  styles={{display:"flex",gap:15}}>


               <img 
               src={row?.image}
                alt={row.name} 
                height="50"
                 style={{marginBottom:10}}
                  />
               <div style={{display:"flex",flexDirection:"column"}}>
               
               <span
               style={{
                   textTransform:"uppercase",
                   fontSize:24

               }}>
               {row.symbol}
               </span>
               <span style={{ color: "darkgrey" }}>
               {row.name}
             </span>
               </div>
               </TableCell>

               <TableCell align="right">
               {symbol}{" "}
               {numberWithComas(row.current_price.toFixed(2))}
             </TableCell>
             <TableCell
               align="right"
               style={{
                 color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                 fontWeight: 500,
               }}
             >
               {profit && "+"}
               {row.price_change_percentage_24h.toFixed(2)}%
             </TableCell>
             <TableCell align="right">

             {symbol}
             {numberWithComas(row.market_cap.toString().slice(0,6))}
              M
             </TableCell>
               
               
               </TableRow>
           )
       })}
       </TableBody>
       
       </Table>
    )

   }
    
    </TableContainer>
    </Container>
    </ThemeProvider>
  )
}

export default CoinsTable