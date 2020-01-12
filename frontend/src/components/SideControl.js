import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import axios from 'axios';
// 
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ValueButton from "./ValueButton";


export class SideControl extends Component {
    constructor(props) {
        super(props);
        this.state = {
            industry: "",
            industries: ["Agriculture, forestry, fishing and hunting",
                "Mining, quarrying, and oil and gas extraction",
                "Utilities",
                "Construction",
                "Manufacturing",
                "Wholesale trade",
                "Retail trade",
                "Transportation and warehousing",
                "Information and cultural industries",
                "Finance and insurance",
                "Real estate and rental and leasing",
                "Professional, scientific and technical services",
                "Management of companies and enterprises",
                "Administrative and support, waste management and remediation services",
                "Educational services",
                "Health care and social assistance",
                "Arts, entertainment and recreation",
                "Accommodation and food services",
                "Other services (except public administration)",
                "Public administration"],
            population: undefined,
            distance: undefined
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleIndustryChange = this.handleIndustryChange.bind(this);
        this.handlePopulationChange = this.handlePopulationChange.bind(this);

    }

    componentDidMount() {
        // axios.get('data/industry_categories/industries.json')
        //     .then(res => {
        //         console.log(res.data)
        //         this.setState({
        //             industries: res.data.categories
        //         })

        //     })
        // navigator.geolocation.getCurrentPosition(success, error, options)
    }


    handlePopulationChange = (size) => {
        this.setState({ population: size });
        this.props.onPopulationChange(size)
      };

    handleChange = (e) => {

    }

    handleIndustryChange = (e) => {
        this.setState({ industry: e.target.value });
        this.props.onIndustryChange(e.target.value);
    }

    render() {
        const population = this.props.population;
        const industry = this.props.industry;
        const distance = this.props.distance;

        return (
            <div>
                <div>
                    <h2>Current Location</h2>
                    {this.props.coords == true &&
                        <p>{this.props.coords}</p>
                    }
                    <p>Vancouver</p>
                </div>

                <div style={{ border: "1px solid black", width: "100%" }}>
                    <h2>Industry</h2>
                    {this.state.industries.length > 0 && (
                        <FormControl style={{ border: "1px solid black" }}>
                            <Select
                                value={this.state.industry}
                                onChange={this.handleIndustryChange}
                            >
                                {this.state.industries.map((v, index) => {
                                    return <MenuItem key={index} value={v}>{v}</MenuItem>
                                })}
                            </Select>
                        </FormControl>
                    )}
                </div>

                {/* Population Density */}
                <div>
                    <h2>Population</h2>



                    <ButtonGroup size="small" aria-label="small outlined button group">
                        {["Small", "Medium", "Large", "All"].map((value, index) => {
                            return <ValueButton
                                    type={value}
                                    key={index}
                                    value={this.state.population}
                                    click={this.handlePopulationChange}
                        />
                        })}
                    </ButtonGroup>
                </div>
                <div>
                    <h2>Distance</h2>
                    <ButtonGroup size="small" aria-label="small outlined button group">
                        <Button>Within Province</Button>
                        <Button>Within Canada</Button>
                        <Button>Out of Country</Button>
                    </ButtonGroup>
                </div>

                <div>
                    <h2>Landscape</h2>
                    <ButtonGroup size="small" aria-label="small outlined button group">
                        <Button>Mountain</Button>
                        <Button>Costal</Button>
                        <Button>Urban</Button>
                    </ButtonGroup>
                </div>
            </div>
        );
    }
}

export default SideControl;
