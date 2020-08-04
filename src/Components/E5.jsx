import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import { pxToVh, pxToVw, Theme } from '../theme';
import BadRequest from '../static/503.svg'

import { makeStyles, Toolbar } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

const styles = makeStyles(t => ({
    root: { 
        height: '100vh', 
        backgroundColor:"#fff"
    },
 
}))



export default function E4(){
    const history = useHistory()

    const register = () => { history.push('/signup') }

    const classes = styles()
  
    
    return (<>
        <Grid  className={classes.root}>
            {/* <Toolbar style={{background:Theme.boxColor}}/> */}
            <Grid container justify='center' alignItems='center'>

        <img style={{height:'80vh', maxWidth:'100vw', width:'auto'}} src={BadRequest}/>
            </Grid>
        </Grid></>
    );
}



