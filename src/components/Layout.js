import React, { useRef } from 'react'
import { Avatar, makeStyles } from '@material-ui/core'
import { Drawer, Typography, List, ListItem, ListItemIcon, ListItemText, AppBar, Toolbar } from '@material-ui/core'
import { AddCircleOutlined, AddCircleOutlineOutlined, SubjectOutlined } from '@material-ui/icons';
import { useHistory, useLocation } from 'react-router-dom'
import { format } from 'date-fns'
const drawerWidth = 240;
const useStyles = makeStyles((theme) => {
    return {
        page: {
            background: '#f9f9f9',
            width: '100%',
            padding: theme.spacing(3),
            height: `calc(100vh - ${theme.mixins.toolbar.minHeight}px)`
        },
        drawer: {
            width: drawerWidth,

        },
        drawerPaper: {
            width: drawerWidth
        },
        root: {
            display: 'flex'
        },
        active: {
            background: '#f4f4f4'
        },
        title: {
            padding: theme.spacing(2)
        },
        appBar: {
            width: `calc(100% - ${drawerWidth}px)`
        },
        toolbar: theme.mixins.toolbar,
        date: {
            flexGrow: 1
        },
        avatar: {
            marginLeft: theme.spacing(2)
        }
    }
})

const Layout = ({ children }) => {

    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();
    const toolbarRef = useRef()
    const menuItems = [
        {
            text: 'My Notes',
            icon: <SubjectOutlined color="secondary" />,
            path: '/'
        },
        {
            text: 'Create Notes',
            icon: <AddCircleOutlineOutlined color="secondary" />,
            path: '/create'
        }
    ]

    return <div className={classes.root}>
        {/* appbar */}
        <AppBar elevation={0} className={classes.appBar}>
            <Toolbar>
                <Typography className={classes.date}>{`Today is ${format(new Date(), 'do MMMM Y')}`}</Typography>
                <Typography>Mario</Typography>
                <Avatar className={classes.avatar} />
            </Toolbar>
        </AppBar>
        {/* sidedrawer */}
        <Drawer
            className={classes.drawer}
            variant="permanent"
            anchor="left"
            classes={{ paper: classes.drawerPaper }}
        >
            <Typography className={classes.title} variant="h5">Noteify</Typography>

            <List>
                {menuItems.map(item =>
                    <ListItem
                        className={location.pathname === item.path ? classes.active : ''}
                        button
                        onClick={() => { history.push(item.path) }} key={item.text}>
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.text} />
                    </ListItem>)}
            </List>

        </Drawer>
        <div className={classes.page}>
            <div className={classes.toolbar}></div>
            {children}
        </div >
    </div >
}

export default Layout;