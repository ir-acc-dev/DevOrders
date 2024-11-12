import {AppBar, Box, Button, Toolbar, Typography} from "@mui/material";
import {NavLink} from "react-router-dom";

const HeaderComponent = () => {
    return (
        <Box sx={{marginBottom: 0}}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" sx={{flexGrow: 1}}> Roadmap </Typography>

                    <Box sx={{display: 'flex'}}>
                        <Button component={NavLink} to="/" color="inherit" sx={{textTransform: 'none'}}> Home </Button>
                        <Button component={NavLink} to="/mainlist" color="inherit" sx={{textTransform: 'none'}}> Checklist </Button>
                        <Button component={NavLink} to="/implementation" color="inherit" sx={{textTransform: 'none'}}> Implementation </Button>
                        <Button component={NavLink} to="/resources" color="inherit" sx={{textTransform: 'none'}}> Resources </Button>
                    </Box>

                </Toolbar>
            </AppBar>

        </Box>

    );
};

export default HeaderComponent;