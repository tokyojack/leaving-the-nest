import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import axios from 'axios';
// 
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

export class TopBar extends Component {
    state = {
        industries: []
    }

    componentDidMount() {
        axios.get('data/industry_categories/industries.json')
            .then(res => {
                console.log(res.data)
                this.setState({
                    industries: res.data.categories
                })

        })
        // navigator.geolocation.getCurrentPosition(success, error, options)
    }

    render() {
        return (
            <Grid 
                container 
                style={{ border: "1px solid green"}} 
                direction="row"
                justify="flex-start"
                alignItems="center"    
            >
                <img src="./assets/logo.svg"></img>
            </Grid>
        );
    }
}

export default TopBar;
