import classes from "./triangle-bg.module.scss"

export default function TriangleBackground() {
	return (
		<div className={`${classes.background_container}`}>
			<div
				className={`${classes.custom_shape_divider_bottom_1700748689} fade-in-bottom-shape`}
			>
				<svg
					data-name="Layer 1"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 1200 120"
					preserveAspectRatio="none"
				>
					<path
						d="M1200 0L0 0 598.97 114.72 1200 0z"
						className={classes.shape_fill}
					></path>
				</svg>
			</div>
		</div>
	)
}
