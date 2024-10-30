import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#FFCC01',
        },
        secondary: {
            main: '#3f423f',
        },
    },
});

const Theme = ({ children }) => {
    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    );
};

export default Theme;
