import CartIcon from '../Cart/CartIcon'
import classes from './HeaderCartButton.module.css'
import { useContext, useEffect, useState } from 'react'
import CartContext from '../../store/cart-context'

const HeaderCartButton = props => {
  const [btnIsHighlighted, setBtnisHighlighted] = useState(false)
  const cartCtx = useContext(CartContext)
  const { items } = cartCtx
  const numberOfCartItems = items.reduce((curNumber, item) => {
    return curNumber + item.amount
  }, 0)

  useEffect(() => {
    if (items.length === 0) {
      return
    }
    setBtnisHighlighted(true)

    const timer = setTimeout(() => {
      setBtnisHighlighted(false)
    }, 300)

    return () => {
      clearTimeout(timer)
    }
  }, [items])
  const btnClasses = `${classes.button} ${btnIsHighlighted ? classes.bump : ''}`
  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  )
}

export default HeaderCartButton
