import React from 'react';
import { Grid, Grow, Typography } from '@material-ui/core';

import NewsCard from './NewsCard/NewsCard';
import useStyles from './styles.js';

const infoCards = [
  { color: '#00838f', title: 'Welcome to Buddy the infomation Expect', text: 'Hey Buddy' },
  { color: '#1565c0', title: '', info: 'Tech Health', text: 'Hey Buddy', src: 'https://parade.com/wp-content/uploads/2020/06/iStock-1203599963.jpg' },
  { color: '#4527a0', title: '', info: 'Climate change', text: 'Hey Buddy', src: 'https://www.cbc.ca/kidscbc2/content/the_feed/_848/climatequiz_header.jpg' },
  { color: 'white', title: '', info: 'Education', text: 'Hey Buddy', src: 'https://www.pasobrewing.com/wp-content/uploads/2021/02/educaton.jpg' }

];

const NewsCards = ({ articles, activeArticle }) => {
  const classes = useStyles();

  if (!articles.length) {
    return (
      <Grow in>
        <Grid className={classes.container} container alignItems="stretch" spacing={3}>
          {infoCards.map((infoCard) => (
            <Grid item xs={12} sm={6} md={4} lg={3} className={classes.infoCard}>
              <div className={classes.card} style={{ backgroundColor: infoCard.color, backgroundImage: `url(${infoCard.src})` }} >
                <Typography variant="h5" component="h5">{infoCard.title}</Typography>
                {infoCard.info ? <Typography variant="h6" component="h6"><strong>{infoCard.title.split(' ')[2]}</strong>: <br />{infoCard.info}</Typography> : null}
                <Typography variant="h6" component="h6">Say: <br /> <i>{infoCard.text}</i></Typography>
              </div>
            </Grid>
          ))}
        </Grid>
      </Grow>
    );
  }

  return (
    <Grow in>
      <Grid className={classes.container} container alignItems="stretch" spacing={3}>
        {articles.map((article, i) => (
          <Grid item xs={12} sm={6} md={4} lg={3} style={{ display: 'flex' }}>
            <NewsCard activeArticle={activeArticle} i={i} article={article} />
          </Grid>
        ))}
      </Grid>
    </Grow>
  );
};

export default NewsCards;