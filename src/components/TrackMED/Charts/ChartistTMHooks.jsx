import React, { useEffect, useState } from "react";

// nodejs library to set properties for components
import PropTypes from "prop-types";

// react plugin for creating charts
import ChartistGraph from "react-chartist";

// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";

// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

import Chartist from "chartist";

var delays = 80,
  durations = 500;

function ChartistPage(props) {
  const [list, setList] = useState({ labels:[], 
                  series:[[]] });

  // I finally got this to work using https://swsinswsin.medium.com/unhandled-rejection-typeerror-this-setstate-is-not-a-function-9799dcb55c34
  // Solves the "Unhandled Rejection (TypeError): this is undefined - callback ...

  useEffect(() => {
    let mounted = true;
    fetch('http://localhost:5000/api/owner/getnoofcomps')
      .then(response => response.json())
      .then(function(ownerComps) {
        var data = {
          labels: ownerComps.map(function(ownerComps) {
            return ownerComps.desc;
          }),
          series: ownerComps.map(function(ownerComps) {
            return ownerComps.noOfComponents;
          })
        }
      
        if (mounted) {
          setList({labels: data.labels, series: Array(data.series)})
        } 
      });
    return () => mounted = false;
  }, [])

  const { classes } = props;
  const options = {
    lineSmooth: Chartist.Interpolation.cardinal({
      tension: 0
    }),
    low: 0,
    high: 50, // creative tim: we recommend you to set the high as the biggest value + something for a better look
    chartPadding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    }
  }

  const animation =  {
    draw: function(data) {
      if (data.type === "line" || data.type === "area") {
        data.element.animate({
          d: {
            begin: 600,
            dur: 700,
            from: data.path
              .clone()
              .scale(1, 0)
              .translate(0, data.chartRect.height())
              .stringify(),
            to: data.path.clone().stringify(),
            easing: Chartist.Svg.Easing.easeOutQuint
          }
        });
      } else if (data.type === "point") {
        data.element.animate({
          opacity: {
            begin: (data.index + 1) * delays,
            dur: durations,
            from: 0,
            to: 1,
            easing: "ease"
          }
        });
      }
    }
  }

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="success">
              <ChartistGraph
                className="ct-chart"
                data={list}
                type="Line"
                options={options}
                listener={animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Components Per Owner</h4>
              <p className={classes.cardCategory}>
                <span className={classes.successText}>
                  <ArrowUpward className={classes.upArrowCardCategory} /> 55%
                </span>{" "}
                increase in today sales.
              </p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> updated 4 minutes ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}

Chartist.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(ChartistPage);
