import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input'; 
import BadRequest from '../static/404.svg'

import { makeStyles, Toolbar } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { boxColor } from '../config/config';

const styles = makeStyles(t => ({
    root: {
        // width: '100%',
        // background: Theme.boxColor,
        // height: 'calc(100vh - 64px)',
        height: '100vh',
        // padding:90
        // overflow: 'auto',
    },
 
}))



export default function E4(){
    const history = useHistory()

    const register = () => { history.push('/signup') }

    const classes = styles()
  
    
    return (<>
        <Grid  className={classes.root}>
            <Toolbar style={{background:boxColor}}/>
            <Grid container justify='center' alignItems='center'>

        <img style={{height:'80vh', maxWidth:'100vw', width:'auto'}} src={BadRequest}/>
            </Grid>
        </Grid></>
    );
}



