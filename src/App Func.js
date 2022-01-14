import React from 'react';
import PropTypes from 'prop-types';

// material ui core
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

// material ui icons
// import InboxIcon from '@material-ui/icons/MoveToInbox';
// import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';

// added
import { Switch, Route, NavLink, Redirect } from "react-router-dom";
import routes from "routesRD.js";
import Icon from "@material-ui/core/Icon";
import image from "assets/img/sidebar-2.jpg";
import logo from "assets/img/reactlogo.png";
import classNames from "classnames";

import sidebarStyle from "assets/jss/material-dashboard-react/components/sidebarStyle.jsx";

// Re-export with a default theme. See https://material-ui.com/styles/basics/ under "@material-ui/core/styles vs @material-ui/styles"
import withStyles from "@material-ui/core/styles/withStyles"; 
import { useTheme } from '@material-ui/core/styles';
// import { useLocation } from 'react-router-dom';

function ResponsiveDrawer(props) {
  /* console.log("Props: " + Object.keys(props));
  // Props: classes,history,location,match,staticContext
  
  var cls = props.classes;
  for (var x in cls) {
    console.log("Class Name: " + cls[x]);
  } 
  */

  const { window, location } = props;
  // const classes = useStyles(); // CSS Hook API

  function activeRoute(routeName) {
    return (location.pathname === routeName) ? true : false;
  }

  const { classes } = props;
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  var color = "purple";

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const switchRoutes = (
    <Switch>
      {routes.map((prop, key) => {
          return (
            <Route
              path={prop.path}
              component={prop.component}
              key={key}
            />
          );        
      })}
      <Redirect from="/" to="/dashboard" />
    </Switch>
  );

  // classes.list used to be classes.toolbar in the official Demo
  const drawer = (
    <div>
      <div className={classes.list} />
      <Divider />
      <List>
        {/*['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))*/}
        { routes.map((prop, key) => {    
          var listItemClasses;
          listItemClasses = classNames({
            [" " + classes[color]]: activeRoute(prop.path)
          });
      
          const whiteFontClasses = classNames({
            [" " + classes.whiteFont]: activeRoute(prop.path)
          });       
          /*
          if (activeRoute(prop.path)) {
            console.log("Active Route: " + activeRoute(prop.path));
            console.log(prop.path + " listItemClasses: " + listItemClasses);
          }
          */
          return (
            <NavLink
              to={prop.path}
              className={classes.item}
              activeClassName="active"
              key={key}
            >
              <ListItem button className={classes.itemLink + listItemClasses}>
                {typeof prop.icon === "string" ? (
                  <Icon
                   className={classNames(classes.itemIcon, whiteFontClasses)}
                  >
                    {prop.icon}
                  </Icon>
                ) : (
                  <prop.icon
                  className={classNames(classes.itemIcon, whiteFontClasses)}
                  />
                )}
                <ListItemText
                  primary={prop.name}
                  className={classes.itemText}
                  disableTypography={true}
                />
              </ListItem>
            </NavLink>
          );
        })}                
      </List>
    </div>
  );

  var brand = (
    <div className={classes.logo}>
      <a
        href="https://www.creative-tim.com?ref=mdr-sidebar"
        className={classes.logoLink}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className={classes.logoImage}>
          <img src={logo} alt="logo" className={classes.img} />
        </div>
        CedarITT-RJS-C
      </a>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;
  // var x = "Total Width: " + window.innerWidth + "px";
  console.log(window);
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Responsive drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        
        {/* Drawer here refers to the pop up drawer when menu button is clicked which is, of course, 
            hidden when screen size is md or up. The pop up vanishes when user clicks outside
            of the drawer */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaperCT,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {brand}
            <div className={classes.sidebarWrapper}>{drawer}</div>
            {image !== undefined ? (
            <div
              className={classes.background}
              style={{ backgroundImage: "url(" + image + ")" }}
            />
            ) : null}
          </Drawer>
        </Hidden>

        {/* Drawer is hidden when screen size is sm or lower but appears otherwise.*/}
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaperRD,
            }}
            variant="permanent"
            open
          >
            {brand}
            <div className={classes.sidebarWrapper}>{drawer}</div>
            {image !== undefined ? (
            <div
              className={classes.background}
              style={{ backgroundImage: "url(" + image + ")" }}
            />
          ) : null}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar}/>
          {switchRoutes}
      </main>
    </div>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
  classes: PropTypes.object.isRequired,
  rtlActive: PropTypes.bool,
  handleDrawerToggle: PropTypes.func,
  bgColor: PropTypes.oneOf(["purple", "blue", "green", "orange", "red"]),
  logo: PropTypes.string,
  image: PropTypes.string,
  logoText: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object),
  open: PropTypes.bool
};

export default withStyles(sidebarStyle)(ResponsiveDrawer);

/*
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>

        <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Rhoncus dolor purus non enim praesent elementum
          facilisis leo vel. Risus at ultrices mi tempus imperdiet. Semper risus in hendrerit
          gravida rutrum quisque non tellus. Convallis convallis tellus id interdum velit laoreet id
          donec ultrices. Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
          adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra nibh cras.
          Metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo quis
          imperdiet massa tincidunt. Cras tincidunt lobortis feugiat vivamus at augue. At augue eget
          arcu dictum varius duis at consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem
          donec massa sapien faucibus et molestie ac.
        </Typography>
        <Typography paragraph>
          Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper eget nulla
          facilisi etiam dignissim diam. Pulvinar elementum integer enim neque volutpat ac
          tincidunt. Ornare suspendisse sed nisi lacus sed viverra tellus. Purus sit amet volutpat
          consequat mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis risus sed
          vulputate odio. Morbi tincidunt ornare massa eget egestas purus viverra accumsan in. In
          hendrerit gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem et
          tortor. Habitant morbi tristique senectus et. Adipiscing elit duis tristique sollicitudin
          nibh sit. Ornare aenean euismod elementum nisi quis eleifend. Commodo viverra maecenas
          accumsan lacus vel facilisis. Nulla posuere sollicitudin aliquam ultrices sagittis orci a.
        </Typography>
*/