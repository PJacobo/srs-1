import React, { Component, useReducer } from "react";
import "./Search.css";

import logo from './alagarinc.jpg';


class Search extends Component {
  state = {
    searchValue: "",
    resumes: [],
    locationValue: "",
    educationValue: "",
    searches: [["", false], ["", false], ["", false]],
  };

  handleOnChange = event => {

    this.setState({ [event.target.name]: event.target.value });
  };

  handleSearch = () => {


    this.setState({ searches: [[this.state.searchValue, false], [this.state.locationValue, false], [this.state.educationValue, false]] });

    if (this.state.searches[0][0] !== "") {
      this.state.searches[0][1] = true;      
    }

    if (this.state.searches[1][0] !== "") {
      this.state.searches[1][0] = "location:" + this.state.searches[1][0];
    }
    if (this.state.searches[2][0] !== "") {
      this.state.searches[2][0] = "education:" + this.state.searches[2][0];
    }

      
      if (this.state.searches[0][0].indexOf(' ') >= 0) {
        this.state.searches[0][0] =  "\"" +  this.state.searches[0][0].replace(" ", "+") + "\"";

      }
      if(this.state.searches[1][0].indexOf(' ') >= 0 ){


        this.state.searches[1][0] = this.state.searches[1][0].replace(" ", "+") + "\"";
        this.state.searches[1][0] = this.state.searches[1][0].replace("location:", "location:\"") 

      }
      if(this.state.searches[2][0].indexOf(' ') >= 0){


        this.state.searches[2][0] = this.state.searches[2][0].replace(" ", "+") + "\"";
        this.state.searches[2][0] = this.state.searches[2][0].replace("education:", "education:\"") 

      
        

      }


    if(this.state.searches[0][0] && this.state.searches[1][0]){
      this.state.searches[0][0] += "+"; 
    } else if(this.state.searches[0][0] && this.state.searches[2][0]){
      this.state.searches[0][0] += "+"; 
    }
    if(this.state.searches[1][0] && this.state.searches[2][0]){
      this.state.searches[1][0] += "+"; 
    }

    this.makeApiCall(this.state.searches);

    
  };

  makeApiCall = searchInput => {


    var searchUrl = "http://localhost:8983/solr/resumes/select?q=" + searchInput[0][0] + 
    searchInput[1][0] + searchInput[2][0];
    

    fetch(searchUrl,
      { mode: 'cors' })
      .then(response => {

        return response.json();
      })
      .then(jsonData => {

        this.setState({ resumes: jsonData.response.docs });
      });
  };

  render() {
    return (

      <div id="main">
        <div id="top">
          <div id="logo">
            <img id="alagarimg" src={logo} alt="logo"  />
          </div>

          <h1>Resume search</h1>
          <div className="searchInput">
            <input
              name="searchValue"
              type="text"
              placeholder="Search"
              onChange={this.handleOnChange}
            />
          </div>
          <div className="searchInput">
            <input
              name="locationValue"
              type="text"
              placeholder="Location"
              onChange={this.handleOnChange}
            />
          </div>
          <div className="searchInput">
            <input
              name="educationValue"
              type="text"
              placeholder="Education"
              onChange={this.handleOnChange} />
          </div>
          <div className="searchButton">
            <button onClick={this.handleSearch}>Search</button>
          </div>
          <div className="clearButton">
            <button onClick="">Clear</button>
          </div>
        </div>
        <div className="results">
        {

          this.state.resumes ? (
            <div className="results">

              {this.state.resumes.map(resume =>

                // <div className='center' key={resume.id} >

                //     <div className="general">
                //     <h1><a href={"https://www.linkedin.com/search/results/all/?keywords="+resume.name+"&origin=GLOBAL_SEARCH_HEADER"} target="_blank" >{resume.name}</a></h1>

                //   <p className="location">{resume.location}</p>
                //       <p className="education">{resume.education}</p>
                //       <p className="experience">{resume.experience}</p>
                //       <p className="summary">{resume.summary}</p>
                //     </div>
                //   </div>

                <div class="highcontrast2" key={resume.id}>
                  <div class="_2iwr">
                    
    
                      <h2>{resume.name}</h2>
                                     
                  </div>

                  <div className="_2iwt">
                    
                     <a href={"https://www.linkedin.com/search/results/all/?keywords=" + resume.name + "&origin=GLOBAL_SEARCH_HEADER"} target="_blank" >
                    <div className="searches"><i class="fab fa-linkedin fa-3x" ></i></div> 
                    </a>
                    <a href={"https://www.google.com/search?q="+resume.name+"+"+resume.location} target="_blank" >
                     <div className="searches">  <i class="fab fa-google fa-3x"></i></div>
                     </a>
                     
                     </div>
                  

                  <div className="_2iwu"><h3>Location</h3></div>
                  <div className="_2iwv">{resume.location}</div>
                  <div className="_2iww"></div>
                  <div className="_2iwx"><h3>Education</h3></div>
                  <div className="_2iwy">{resume.education}</div>
                  <div className="_2iwz"><h3>Experience</h3></div>
                  <div className="_2iw-">{resume.experience}</div>
                  <div className="_2iw_"><h3>Summary</h3></div>
                  <div className="_2ix0">{resume.summary}</div>


                </div>




              )}

            </div>

          ) : (
              <p>Try another search</p>

            )

        }
        </div>
      </div >
    );
  }
}

export default Search;