import classes from "./footer.module.scss"

interface FooterProps {
	setIsDebugTabOpen: (value: boolean) => void
}

export default function Footer({ setIsDebugTabOpen }: FooterProps) {
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
				<a href="/donate" className={classes.footerLink}>
					Donate
				</a>
				<button
					className={classes.debugBtn}
					onClick={() => setIsDebugTabOpen(true)}
				>
					Testing tab
				</button>
			</div>
		</footer>
	)
}
