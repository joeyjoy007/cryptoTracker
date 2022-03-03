import { makeStyles } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { TrendingCoins } from '../../config/api'
import { CryptoState } from '../../CryptoContext'

const useStyle = makeStyles((theme)=>({
        carousal:{
            height:"50%",
            display:"flex",
            alignItems:"center"
        }
    }))

const Carousal = () => {

    const [trending, setTrending] = useState([])

    const {currency}  = CryptoState()

    const classes = useStyle()

    const fetchTrendingCoins = async()=>{

        const {data} = await axios.get(TrendingCoins(currency))

        setTrending(data)
    }

    console.log(trending)

    useEffect(() => {
      fetchTrendingCoins()
    }, [currency])
    

  return (
    <div className={classes.carousal}>Carousal</div>
  )
}

export default Carousal