import React from 'react';
import Grid from '@material-ui/core/Grid';
import { pxToVh, Theme } from '../theme';
import { makeStyles } from '@material-ui/core';

const styles = makeStyles(t => ({
	root: {
		backgroundColor: Theme.backgroundColor,
		boxShadow: `inset 4px 3px 7px #C6CCE1 ,inset -3px -4px 7px white`,
		height: '100%',
		width: '100%',
		borderRadius: pxToVh(80),
		[t.breakpoints.down('xs')]: {
			borderRadius: pxToVh(70),

		}
	},
}))

const CardDepth = (props) => {
	const classes = styles()
	return (
		<Grid
			{...props}
			container
			className={classes.root}
			justify="center"
			alignItems="center">
			{props.children}
		</Grid>
	);
};

export default (CardDepth);
