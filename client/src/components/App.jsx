import React, { useState, useEffect } from 'react';
import '../styles/main.scss';
import Overview from './overview/overview.jsx';
import QAmodule from './Q&A/QAmodule';
import ReviewRatings from './R&R/ReviewRatings';
import Grid from '@material-ui/core/Grid';

const App = () => {
  const [productId, setProductId] = useState(41);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(100);

  const onSearch = (productId) => {
    setProductId(productId);
  };
  return (
    <div>
      <Grid container spacing={8}>
        <Grid item xs={12}>
          <Overview productId={productId} onSearch={onSearch} />
        </Grid>
        <Grid style={{ margin: '0% 10%' }} item xs={12}>
          <QAmodule prodID={productId} />
        </Grid>
        <Grid style={{ margin: '0% 10%' }} item xs={12}>
          <ReviewRatings productId={productId} page={page} count={count} />
        </Grid>
      </Grid>
    </div>
  );
};

export default App;
