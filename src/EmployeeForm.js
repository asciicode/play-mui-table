import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import { onKeyUpAmount } from './utils/handy';

const useStyles = (theme) => ({
	root: {
		flexGrow: 1,
		height: 500,
		backgroundColor: theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[900]
	},
	input: (base) => ({
		...base,
		color: theme.palette.text.primary,
		'& input': {
			font: 'inherit'
		}
	}),
	button: {
		margin: theme.spacing.unit
	}
});

export default withStyles(useStyles, { withTheme: true })((props) => {
	const { classes } = props;
	console.log(props);
	return (
		<div className={classes.root}>
			<form noValidate autoComplete="off">
				<TextField id="lastname" label="Lastname" margin="normal" fullWidth />
				<TextField id="firstname" label="Firstname(s)" margin="normal" fullWidth />
				<TextField id="rate" label="Rate" margin="normal" fullWidth onKeyUp={onKeyUpAmount} />
				<TextField id="ot-multiplier" label="OT multiplier" margin="normal" fullWidth />
				<TextField id="sss" label="SSS" margin="normal" fullWidth />
				<TextField id="philhealth" label="PhilHealth" margin="normal" fullWidth />

				<DialogActions>
					<Button variant="contained" color="primary" className={classes.button} size="small">
						Save
					</Button>
					<Button variant="contained" color="secondary" className={classes.button} size="small">
						Save and Add to Payroll
					</Button>
				</DialogActions>
			</form>
		</div>
	);
});
