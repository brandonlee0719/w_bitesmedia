import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import Select from 'react-select';
import MenuItem from '@material-ui/core/MenuItem';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Assignment from "../../../../../models/assignment";
import Assignments from "../../../../../collections/assignments";
import Articles from '../../../../../collections/articles';
import { observer } from 'mobx-react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { emphasize } from '@material-ui/core/styles/colorManipulator';
import LinearProgress from '@material-ui/core/LinearProgress';

const styles = theme => ({
    root: {
        flexGrow: 1,
        height: 250,
    },
    input: {
        display: 'flex',
        padding: 0,
    },
    valueContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        flex: 1,
        alignItems: 'center',
    },
    chip: {
        margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
    },
    chipFocused: {
        backgroundColor: emphasize(
            theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700],
            0.08,
        ),
    },
    noOptionsMessage: {
        padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
    },
    singleValue: {
        fontSize: 16,
    },
    placeholder: {
        position: 'absolute',
        left: 2,
        fontSize: 16,
    },
    paper: {
        position: 'absolute',
        zIndex: 1,
        marginTop: theme.spacing.unit,
        left: 0,
        right: 0,
    },
    divider: {
        height: theme.spacing.unit * 2,
    },
    textField: {
        marginTop: theme.spacing.unit,
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    textFieldFirst: {
        marginTop: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
});

function NoOptionsMessage(props) {
    return (
        <Typography
            color="textSecondary"
            className={props.selectProps.classes.noOptionsMessage}
            {...props.innerProps}
        >
            {props.children}
        </Typography>
    );
}

function inputComponent({ inputRef, ...props }) {
    return <div ref={inputRef} {...props} />;
}

function Control(props) {
    return (
        <TextField
            fullWidth
            InputProps={{
                inputComponent,
                inputProps: {
                    className: props.selectProps.classes.input,
                    inputRef: props.innerRef,
                    children: props.children,
                    ...props.innerProps,
                },
            }}
            {...props.selectProps.textFieldProps}
        />
    );
}

function Option(props) {
    return (
        <MenuItem
            buttonRef={props.innerRef}
            selected={props.isFocused}
            component="div"
            style={{
                fontWeight: props.isSelected ? 500 : 400,
            }}
            {...props.innerProps}
        >
            {props.children}
        </MenuItem>
    );
}

function Placeholder(props) {
    return (
        <Typography
            color="textSecondary"
            className={props.selectProps.classes.placeholder}
            {...props.innerProps}
        >
            {props.children}
        </Typography>
    );
}

function SingleValue(props) {
    return (
        <Typography className={props.selectProps.classes.singleValue} {...props.innerProps}>
            {props.children}
        </Typography>
    );
}

function ValueContainer(props) {
    return <div className={props.selectProps.classes.valueContainer}>{props.children}</div>;
}

function Menu(props) {
    return (
        <Paper square className={props.selectProps.classes.paper} {...props.innerProps}>
            {props.children}
        </Paper>
    );
}

const components = {
    Control,
    Menu,
    NoOptionsMessage,
    Option,
    Placeholder,
    SingleValue,
    ValueContainer,
};

export default withStyles(styles, { withTheme: true })(observer(class Form extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            open: props.open || false,
            selectedOption: null
        };


        if(props.assignment) {
            this.assignment = props.assignment;
        } else {
            this.assignment = new Assignment();

            this.assignment.startDate = new Date().toISOString().split('T')[0];
            this.assignment.endDate = new Date().toISOString().split('T')[0];

        }
        this.assignments = new Assignments();
        this.articles = new Articles();
    }

    componentDidMount() {
        this.articles.limit = 200;
        this.articles.fetch();
    }

    componentWillReceiveProps(props) {
        // this.setState({
        //     open: props.open
        // })
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleSave = () => {
        this.assignment.save()
            .then(() => {
                if(this.props.onSave) {
                    this.props.onSave(this.assignment);
                }
            })
            .catch((error) => {
                this.setState({
                    error: /401/.test(error.message) ? "You don't have permissions to do that.": error.message
                });
            })
    }

    handleArticleChange = (selected) => {
        const article = this.articles.models.get(selected.value);
        this.assignment.name = selected.label;
        this.assignment.articleId = selected.value;
        this.assignment.articleSlug = article.slug;
        this.assignment.articleImage = article.image_url;
        this.assignment.articleThumbnail = article.thumbnail;

        this.setState({
            selectedOption: selected
        });
    }

    handleChange = (field) => {
        return (event) => {
            this.assignment[field] = event.target.value;
        }
    }

    render() {
        const {assignment, articles} = this;
        const { classes, theme } = this.props;

        const selectStyles = {
            input: base => ({
                ...base,
                color: theme.palette.text.primary,
                '& input': {
                    font: 'inherit',
                },
            }),
        };

        const suggestions = articles.map((article) => {
            return {
                label: article.title,
                value: article.id
            };
        });

        return (
            <Dialog
                open={this.state.open}
                onClose={this.handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">{assignment.id ? `Edit Assignment`: `Create Assignment`}</DialogTitle>
                <DialogContent>
                    <div style={{
                        minHeight: '350px',
                        minWidth: '380px'
                    }}>
                        <DialogContentText>
                            Create an assignment.
                        </DialogContentText>
                        {articles.size ? (<Select
                            classes={classes}
                            styles={selectStyles}
                            options={suggestions}
                            components={components}
                            value={this.state.selectedOption}
                            onChange={this.handleArticleChange}
                            placeholder="Select an article to assign"
                        />): (
                            <LinearProgress />
                        )}

                        <div style={{marginTop: 15}}>
                            <TextField
                                id="start-date"
                                label="Start Date"
                                type="date"
                                defaultValue={assignment.startDate}
                                className={classes.textFieldFirst}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={this.handleChange('startDate')}
                            />

                            <TextField
                                id="due-date"
                                label="Due Date"
                                type="date"
                                defaultValue={assignment.endDate}
                                className={classes.textField}
                                onChange={this.handleChange('endDate')}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </div>

                        {/*<div>*/}
                            {/*<FormControlLabel*/}
                                {/*control={*/}
                                    {/*<Checkbox*/}
                                        {/*checked={assignment.individual}*/}
                                        {/*onChange={(event) => assignment.individual = event.target.checked}*/}
                                        {/*value="individual"*/}
                                        {/*color="primary"*/}
                                    {/*/>*/}
                                {/*}*/}
                                {/*label="Assign to this student only"*/}
                            {/*/>*/}
                        {/*</div>*/}
                    </div>

                    <div>{this.state.error}</div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={this.handleSave} color="primary">
                        {assignment.id ? `Edit`: `Create`}
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}));