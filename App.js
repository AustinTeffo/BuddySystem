
import React, { useState, useEffect } from 'react';
import { Typography } from '@material-ui/core';
import wordsToNumbers from 'words-to-numbers';
import alanBtn from '@alan-ai/alan-sdk-web';

import logo from './images/logo.png';
import { NewsCards, Modal } from './components';
import useStyles from './styles';

const App = () => {
    const [activeArticle, setActiveArticle] = useState(0);
    const [newsArticles, setNewsArticles] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    const classes = useStyles();

    useEffect(() => {
        alanBtn({
            key: 'cd663f6f908f0775cda7666eb8f2b36e2e956eca572e1d8b807a3e2338fdd0dc/stage',
            onCommand: ({ command, articles, number }) => {
                if (command === 'theTops') {
                    setNewsArticles(articles);
                    setActiveArticle(-1);
                } else if (command === 'instructions') {
                    setIsOpen(true);
                } else if (command === 'highlight') {
                    setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
                } else if (command === 'vula') {
                    const parsedNumber = number.length > 2 ? wordsToNumbers((number), { fuzzy: true }) : number;
                    const article = articles[parsedNumber - 1];

                    if (parsedNumber > articles.length) {
                        alanBtn().playText('try agan i believe in you even though no else does...');
                    } else if (article) {
                        window.open(article.url, '_blank');
                        alanBtn().playText('Opening...');
                    } else {
                        alanBtn().playText('one more time you cant possibly do worse than you already have...');
                    }
                }
            },
        });
    }, []);

    return (
        <div style={{
            backgroundColor: 'gray'
        }}>
            <div className={classes.logoContainer}>
                {newsArticles.length ? (
                    <div className={classes.infoContainer}>

                    </div>
                ) : null}
                <img src="https://indepreneur.io/wp-content/uploads/2018/10/sQUARE.jpg" className={classes.alanLogo} alt="logo" />
            </div>
            <NewsCards articles={newsArticles} activeArticle={activeArticle} />
            <Modal isOpen={isOpen} setIsOpen={setIsOpen} />,
            {!newsArticles.length ? (
                <div className={classes.footer}>
                    <Typography variant="body1" component="h2">
                    </Typography>
                    <img className={classes.image} src="https://indepreneur.io/wp-content/uploads/2018/10/sQUARE.jpg" height="50px" alt="Buddy logo" />
                </div>
            ) : null}
        </div>
    );
};

export default App;