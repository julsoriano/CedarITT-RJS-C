import React, { Component } from 'react';
import { Typography } from '@material-ui/core';
import MUIDataTable from "mui-datatables";

export class AsyncFetchPop extends Component {

	componentWillUnmount() {
		alert('componentWillUnmount');
	}

	_handleRef = (component) => {
		this.component = component;
	};

	render() {
		const { data, title } = this.props;
		const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
		// console.log(data);
		
		// Applicable only to: Description, Owner, Status, Model/Manufacturer and Service Provider Tables		
		const columnsComponent = [
			{
			  name: "assetnumber",
			  label: "Asset#"
			}, 
			{
			  name:"imte",
			  label: "IMTE"
			}, 
			{
			  name:"serialnumber",
			  label: "Serial Number"
			},  
			{
			  name:"description.desc",
			  label: "Description"
			}, 	
			{
		      name:"owner.desc",
			  label: "Owner"
			}, 
			{
			  name:"status.desc",
			  label: "Status"
			}, 
			{
			  name:"model_Manufacturer.desc",
			  label: "Model/Manufacturer"
			}, 
			{
			  name:"providerOfService.desc",
			  label: "Service Provider"
			},  
			{
			  name:"calibrationDate",
			  label: "Calibration Date",
			  options: {
				customBodyRender: (value) => {
				  return new Date(value).toLocaleDateString('en-GB', dateOptions);
				},
			  }
			},
			{
			  name:"maintenanceDate",
			  label: "Maintenance Date",
			  options: {
				customBodyRender: (value) => {
				  return new Date(value).toLocaleDateString('en-GB', dateOptions);
				},
			  }
			},								  			
		  ]
		
		// Applicable to Location table only
		const columnsSystem = [
			{
			  name: "assetnumber",
			  label: "Asset#"
			}, 
			{
			  name:"imte",
			  label: "IMTE"
			}, 
			{
			  name:"referenceNo",
			  label: "Reference Number"
			},  
			{
			  name:"systemsDescription.desc",
			  label: "Systems Description"
			}, 	
			{
		      name:"location.desc",
			  label: "Location"
			}, 
			{
			  name:"deploymentDate",
			  label: "Deployment Date",
			  options: {
				customBodyRender: (value) => {
				  return new Date(value).toLocaleDateString('en-GB', dateOptions);
				},
			  }
			},						  			
		  ]
		const columns = title === "Component" ? columnsComponent : columnsSystem;
		/* or
        const columns = columnsComponent;    
        title === 'Component' ? columns = columnsComponent : columns = columnsSystem;		
		*/
		const options = {
			filterType: "dropdown",
			responsive: "vertical",
			enableNestedDataAccess: '.', // allows nested data separated by "." (see column names and the data structure above)
			// resizableColumns: true
		}
		return (
			<MUIDataTable title = 
			{<Typography variant="h4">
				{title}
			</Typography>
			} 
			columns={columns}
			data={data}
			options={options}
			/>
		)
	}
}

export default AsyncFetchPop