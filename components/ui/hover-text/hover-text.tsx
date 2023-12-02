import { useRef, ReactNode } from "react"
import classes from "./hover-text.module.scss"

interface HoverComponentProps {
	children: ReactNode
	title: string
}

export default function HoverComponent({
	children,
	title
}: HoverComponentProps) {
	const hoverTextRef = useRef<HTMLDivElement>(null)

	function handleMouseEnter() {
		if (hoverTextRef.current) {
			hoverTextRef.current.style.display = "block"
		}
	}

	function handleMouseLeave() {
		if (hoverTextRef.current) {
			hoverTextRef.current.style.display = "none"
		}
	}

	return (
		<div className="relative">
			<div
				ref={hoverTextRef}
				className={`${classes.hovertext} fade-in-slight`}
			>
				{title}
			</div>
			<div
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
			>
				{children}
			</div>
		</div>
	)
}
