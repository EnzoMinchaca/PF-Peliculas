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
import Pay from "../UserView/Pay.jsx"
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPayment, postPaymentPay } from "../../redux/Slice/userAction.jsx"
import Swal from "sweetalert2";



type Anchor = 'right';

export default function TemporaryDrawer(props: any) {
  const [state, setState] = React.useState({
    right: false,
  });
  const [isUser, setisUser] = useState(false)

  React.useEffect(() => {
    const login = JSON.parse(localStorage.getItem('user'))
    if (login) {
      setisUser(true)
    }
  }, [])

  const [isOpenModal, setisOpen] = useState(false)
  const openModal = () => {
    if (cart.length > 0) {
      const movies = JSON.parse(localStorage.getItem('cart'))
      console.log(movies)
      let moviesSend = []
      let price_total = 0
      for (let i = 0; i < movies.length; i++) {
        price_total += movies[i].price
        moviesSend.push({
          title: movies[i].title,
          description: movies[i].description,
          picture_url: movies[i].image,
          category_id: movies[i]._id,
          quantity: 1,
          unit_price: movies[i].price * 250
        });
      }

      const user = JSON.parse(localStorage.getItem('user'))
      console.log(user)
      let email = user.email
      let sendMP = {
        payer_email: email,
        items: moviesSend
      }
      console.log(sendMP)

      let sendPP = {
        price: price_total
      }
      console.log(sendPP)

      setisOpen(true)
      dispatch(getPayment(sendMP))
      dispatch(postPaymentPay(sendPP))
      console.log(linkPay)
      console.log(linkPayPaypal)
    } else {
      Swal.fire({
        icon: "error",
        title: "Ohhh!",
        text: "No movies to buy",
        confirmButtonText: "Ok",
        confirmButtonColor: "#0b132b"
      });
    }
  }
  const closeModal = () => setisOpen(false)

  const dispatch = useDispatch()
  const linkPay = useSelector(state => state.users.payLink)
  const linkPayPaypal = useSelector(state => state.users.payPayLink)
  const cart = useSelector(state => state.movies.cart)

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
          <ListItem key={text.image} disablePadding>
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
            <div>Total: ${props.cart?.map((e: any) => parseFloat(e.price)).reduce((a: any, b: any) => a + b, 0)}</div>
            <hr className={Style.hrTotal} />
          {
            isUser ?
              <div>
                <button onClick={openModal} className={styles.btnBuy}>Pay
                  <Pay isOpen={isOpenModal} closeModal={closeModal} linkMP={linkPay} linkPP={linkPayPaypal}>
                    <h3>Payment methods</h3>
                  </Pay>
                </button>
              </div> :
              <h6 className={Style.cartText}>You must be logged in, to buy a movie</h6>
          }
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
