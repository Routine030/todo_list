import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

class MainTitle extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({ title: 'TODO LIST' });
  }

  render() {
    const { title } = this.state;
    return (
      <div style={{ paddingRight: '10%' }}>
        <Grid
          container
          direction="row"
          justify="flex-end"
          alignItems="center"
        >
          <Grid item>
            <AppBar position="static" color="primary">
              <Toolbar>
                <Typography variant="h6" color="inherit">
                  {title}
                </Typography>
              </Toolbar>
            </AppBar>
          </Grid>
        </Grid>
      </div>
    );
  }
}
export default MainTitle;
