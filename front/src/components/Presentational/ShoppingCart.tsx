import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { BsFillCartFill } from "react-icons/bs";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Style from "./CartPosition.module.css"
import DeleteCart from "../UserView/ShoppingCart/DeleteCartButton"
import { textAlign } from '@mui/system';
import styles from "../../styles/styles.module.css"




type Anchor = 'right';

export default function TemporaryDrawer(props: any) {
  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
      (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
          event.type === 'keydown' &&
          ((event as React.KeyboardEvent).key === 'Tab' ||
            (event as React.KeyboardEvent).key === 'Shift')
        ) {
          return;
        }

        setState({ ...state, [anchor]: open });
      };

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: 400 }}
      role="presentation"
      onClick={toggleDrawer(anchor, true)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Divider />
      <List>
        {props.cart?.map((text: any, index: any) => (
          <ListItem key={text.title} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {<img src={text.image} width="100px" alt="none" />}
              </ListItemIcon>
              <ListItemText className={Style.posCart} primary={text.title.length > 25 ? text.title.slice(0, 25) + "..." : text.title} secondary={`$${text.price}`} />
              <DeleteCart id={text._id} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      {
        <div style={{ display: "flex", width: "100%", flexDirection: "column", alignItems: "center" }}>
          <hr className={Style.hrTotal} />
          <div>Total: ${props.cart?.map((e:any)=> parseFloat(e.price)).reduce((a:any, b:any) => a + b, 0)}</div>
          <hr className={Style.hrTotal} />
          <h6 className={Style.cartText}>You must be logged in, to buy a movie</h6>
          <button className={styles.btnBuy}>Login</button>
        </div>
      }
    </Box>

  );

  return (
    <div>
      {(['right'] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}><AddShoppingCartIcon /></Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}