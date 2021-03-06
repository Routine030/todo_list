import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Topcon from '@material-ui/icons/ArrowDropUp';
import Link from '@material-ui/core/Link';

class BottomAppBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({ title: 'TOP' });
  }

  render() {
    const { title } = this.state;
    const hrefLink = '#';
    return (
      <AppBar position="fixed" color="default" style={{ top: 'auto', bottom: 0 }}>
        <Toolbar>
          <Link href={hrefLink} color="secondary">
            <div style={{ position: 'absolute', right: '5%' }}>
              {title}
              <Topcon />
            </div>
          </Link>
        </Toolbar>
      </AppBar>
    );
  }
}
export default BottomAppBar;
