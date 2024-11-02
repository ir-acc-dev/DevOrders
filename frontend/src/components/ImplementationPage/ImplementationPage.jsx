import ReactMarkdown from 'react-markdown';
import {useEffect, useState} from "react";
import 'github-markdown-css';
import './ImplementationPage.css'
import {Box} from "@mui/material";


const ImplementationPage = () => {

    const [markdownContent, setMarkdownContent] = useState('')

    useEffect(() => {
        fetch('../../../public/ImplDoc.md')
            .then((res) => res.text())
            .then((text) => setMarkdownContent(text))
    }, []);


    return (
        <Box className="page-container">
            <ReactMarkdown className='markdown-body'>{markdownContent}</ReactMarkdown>
        </Box>

    );
};

export default ImplementationPage;