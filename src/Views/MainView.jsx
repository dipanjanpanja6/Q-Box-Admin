import React, { useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import { Grid, CardActions, CardContent, Button, Divider, CardActionArea, } from '@material-ui/core';
import { Theme } from './../theme';
import { Toolbar, makeStyles, Card } from '@material-ui/core';
import { useHistory } from 'react-router-dom';


const styles = makeStyles((t) => ({
  header: {
    padding: 20,
  },
  total: {
    color: '#0d0',
  },
  card: {
    background: Theme.boxColor,
    color: '#fff',
    margin: 20,
    // padding: 12
  },
  title: {
    color: '#fff',
  },
}));

const Console = (props) => {
  const sty = styles();
  const history = useHistory();
  useEffect(() => {
    document.title = "Teacher Dashboard | Qrioctybox"
  }, [])


  var item = [
    {
      title: 'Check question for Q Book',
      header: 'Q Book',
    },
    {
      title: 'Check question for Q Bank',
      header: 'Q Bank',
    },
    {
      title: 'Check question for Weekly Quiz Test',
      header: 'Weekly Quiz Test',
    },
    {
      title: 'Check question for Monthly Test',
      header: 'Monthly Test',
    },
  ];

  var handelRedirect = (e) => {
    switch (e) {
      case 'Q Book':
        history.push('/QBook');
        break;
      case 'Q Bank':
        history.push('/QBank');
        break;
      case 'Weekly Quiz Test':
        history.push('/WeeklyTest');
        break;
      case 'Monthly Test':
        history.push('/MonthlyTest');
        break;

      default:
        break;
    }
  };

  var CardData = item.map((p, i) => {
    return (
      <Card className={sty.card} key={i}>
        <CardActionArea
          onClick={() => { handelRedirect(p.header); }}        >
          <CardContent>
            <Typography className={sty.title} gutterBottom>
              {p.title}
            </Typography>
            <Typography variant="h5" className={sty.title} component="h2">
              {p.header}
            </Typography>
            <Typography color="textSecondary">
              {/* total questions : 38 */}
            </Typography>
            <Typography variant="body2" className={sty.total} component="p">
              {/* Approve questions : 25  */}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions>
        </CardActionArea>
      </Card>
    );
  });

  return (
    <div
      style={{ paddingLeft: 57 }}
    >
      {/* <Toolbar style={{ background: Theme.boxColor }} /> */}
      <Typography variant="h5" color="textSecondary" className={sty.header}>
        Welcome User,
      </Typography>

      <Grid container style={{ padding: 20 }}>
        {CardData}
      </Grid>
      <Divider />
      <Grid container></Grid>
    </div>
  );
};


export default (Console);
