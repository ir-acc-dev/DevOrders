import ReactMarkdown from "react-markdown";
import {useEffect, useState} from "react";
import {Box} from "@mui/material";
import './ResourcePage.css'


const ResourcesPage = () => {

    const [markdownContent, setMarkdownContent] = useState('');

    useEffect(() => {
        fetch('../../../public/ResourcesDoc.md')
            .then((res) => res.text())
            .then((text) => setMarkdownContent(text))
    }, []);

    return (
        <Box className="page-container">
            <ReactMarkdown className='markdown-body'>{markdownContent}</ReactMarkdown>
        </Box>
    );
};

export default ResourcesPage;