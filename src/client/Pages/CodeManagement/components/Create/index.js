import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import Code from "../../../../models/codes";
import Codes from "../../../../collections/codes";
import { observer } from 'mobx-react';


export default observer(class CodeManagement extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            open: props.open || false
        };


        if(props.code) {
            this.code = props.code;
        } else {
            this.code = new Code();
            this.generateCode();
        }
        this.codes = new Codes();
    }

    componentWillReceiveProps(props) {
        this.setState({
            open: props.open
        })
    }

    generateCode = () => {
        let r = Math.random().toString(36).substring(7);
        this.code.name = 'biteswelcome_' + r;
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleSave = () => {
        this.code.save()
            .then(() => {
                if(this.props.onSave) {
                    this.props.onSave(this.code);
                }
            })
            .catch((error) => {
                this.setState({
                    error: /401/.test(error.message) ? "You don't have permissions to do that.": error.message
                });
            })
    }

    handleNameChange = event => {
        this.code.name = event.target.value;
    };

    handleTypeChange = event => {
        this.code.type = event.target.value;
    };

    handleSelectCodeChange = event => {
        this.code.relationCode = event.target.value;
    };

    componentDidMount() {
        if(this.code.id) {
            this.code.fetch();
        }

        this.codes.limit = 1000;
        this.codes.fetch({
            params: {
                q: {
                    type: 'teacher'
                }
            }
        });
    }

    render() {
        const { code } = this;
        return (
            <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                <DialogTitle id="form-dialog-title">{code.id ? `Edit Code`: `Create Code`}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Create a code for signing up to BitesMedia.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        id="name"
                        label="Code"
                        fullWidth
                        value={code.name}
                        onChange={this.handleNameChange}
                        style={{marginTop: 10, marginBottom: 10}}
                    />

                    <RadioGroup
                        aria-label="Type"
                        name="type"
                        value={this.code.type}
                        onChange={this.handleTypeChange}
                    >
                        <FormControlLabel value="teacher" control={<Radio style={{padding: 5, marginLeft: 5}} />} label="Teacher" />
                        <FormControlLabel value="student" control={<Radio style={{padding: 5, marginLeft: 5}} />} label="Student" />
                    </RadioGroup>

                    {code.type === 'student' ? (
                        <div style={{marginTop: 20}}>
                            <InputLabel htmlFor="relation_code">Assign to Teacher</InputLabel>
                            <br />
                            <Select
                                value={this.code.relationCode}
                                onChange={this.handleSelectCodeChange}
                                inputProps={{
                                    name: 'relationCode',
                                    id: 'relation_code',
                                }}
                                style={{
                                    width: '100%'
                                }}
                            >
                                {this.codes.size ? this.codes.map((code) => {
                                    return (
                                        <MenuItem key={code.id} value={code.name}>{code.relationName ? code.relationName: code.name}</MenuItem>
                                    )
                                }): null}
                            </Select>
                        </div>
                    ): null}

                    <div>{this.state.error}</div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={this.handleSave} color="primary">
                        {code.id ? `Edit`: `Create`}
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
})