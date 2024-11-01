import {Box, Button, Card, CardActions, CardContent, Container, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";


const HomePage = () => {

    const navigator = useNavigate();

    const handleViewChecklist = () => {
        navigator("/mainlist")
    }

    const handleViewImplementation = () => {
        navigator("/implementation")
    }

    const handleViewResources = () => {
        navigator("/resources")
    }


    return (
        <>
            <Box
                sx={{
                    height: '40vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: 'white',
                    textAlign: 'center',
                    padding: '15vh 0'
                }}
            >
                <Typography variant="h3" sx={{textShadow:"5px 5px 15px black"}}>Roadmap</Typography>
                <Typography variant="h5" sx={{ marginTop: 2, fontStyle: 'italic', textShadow:"5px 5px 10px black" }}>So you wanna build a full stack app?</Typography>

            </Box>

            <Container>
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: 4
                    }}
                >

                    <Card sx={{opacity:.7, textShadow:"5px 5px 5px black", boxShadow:"5px 5px 10px black"}}>

                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2"> Checklist </Typography>
                            <Typography> List of steps to guide you through building an application using the SWF tech stack</Typography>
                        </CardContent>

                        <CardActions>
                            <Button size="small" color="primary" onClick={handleViewChecklist}>View Checklist</Button>
                        </CardActions>

                    </Card>

                    <Card sx={{opacity:.7, textShadow:"5px 5px 5px black", boxShadow:"5px 5px 10px black"}}>

                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2"> Implementation </Typography>
                            <Typography> Confused about the specifics? Navigate to a detailed walkthrough for each step </Typography>
                        </CardContent>

                        <CardActions>
                            <Button size="small" color="primary" onClick={handleViewImplementation}>View Implementation</Button>
                        </CardActions>

                    </Card>

                    <Card sx={{opacity:.7, textShadow:"5px 5px 5px black", boxShadow:"5px 5px 10px black"}}>

                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2"> Resources </Typography>
                            <Typography> List of educational material to assist with SWF tech stack familiarization</Typography>
                        </CardContent>

                        <CardActions>
                            <Button size="small" color="primary" onClick={handleViewResources}>View Resources</Button>
                        </CardActions>

                    </Card>

                </Box>


            </Container>


        </>
    );
};

export default HomePage;