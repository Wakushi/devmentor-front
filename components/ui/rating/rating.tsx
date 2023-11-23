import { useState } from "react"
import classes from "./rating.module.scss"

interface RatingSystemProps {
	rating: number
	setRating: (rating: number) => void
}

interface StarProps {
	isFilled: boolean
	onMouseEnter: () => void
	onMouseLeave: () => void
	onClick: () => void
}

function Star(props: StarProps) {
	const style = props.isFilled ? { color: "#0077ff" } : { color: "#fff" }

	return (
		<span
			className={classes.star}
			onMouseEnter={props.onMouseEnter}
			onMouseLeave={props.onMouseLeave}
			onClick={props.onClick}
			style={style}
		>
			<i className="fa-solid fa-star"></i>
		</span>
	)
}

export default function RatingSystem({ rating, setRating }: RatingSystemProps) {
	const [hoveredRating, setHoveredRating] = useState<number>(0)

	function handleMouseEnter(index: number) {
		setHoveredRating(index)
	}

	function handleMouseLeave() {
		setHoveredRating(0)
	}

	function handleClick(index: number) {
		setRating(index)
	}

	return (
		<div className="flex justify-center mb-5">
			{[1, 2, 3, 4, 5].map((index) => (
				<Star
					key={index}
					isFilled={index <= (hoveredRating || rating)}
					onMouseEnter={() => handleMouseEnter(index)}
					onMouseLeave={handleMouseLeave}
					onClick={() => handleClick(index)}
				/>
			))}
		</div>
	)
}
