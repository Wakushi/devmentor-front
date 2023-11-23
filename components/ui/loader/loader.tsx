import classes from "./loader.module.scss"

export default function Loader() {
	return (
		<div className={classes.loader}>
			<span className={classes.bar}></span>
			<span className={classes.bar}></span>
			<span className={classes.bar}></span>
		</div>
	)
}
