import classes from './Navbar.module.scss'
import AuthBtns from './AuthBtns/AuthBtns'
import Sections from './SectionsHeader/Sections'
const Header = () => {
	return (
		<div className={classes.navbar}>
			<Sections className={classes.sections} />
			<AuthBtns />
		</div>
	)
}

export default Header
