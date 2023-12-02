import classes from "./footer.module.scss"

export default function Footer() {
	const currentYear = new Date().getFullYear()

	return (
		<footer className={classes.footerContainer}>
			<div className={classes.footerText}>
				© {currentYear} DEVMentor. All rights reserved.
			</div>
			<div>
				<a
					href="mailto:devmentor.eth@gmail.com"
					className={classes.footerLink}
				>
					Contact Support
				</a>
				<a href="/terms" className={classes.footerLink}>
					Terms & Agreements
				</a>
			</div>
		</footer>
	)
}
