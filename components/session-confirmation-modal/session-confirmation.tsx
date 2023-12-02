import { RefObject } from "react"
import ConfirmationModal from "../confirmation-modal/confirmation-modal"
import Button from "../ui/button/button"
import RatingSystem from "../ui/rating/rating"

interface SessionConfirmationModalProps {
	setIsConfirmationModalOpen: (isOpen: boolean) => void
	hasRated: boolean
	rating: number
	setRating: (rating: number) => void
	onRateSession: () => void
	tipFormField: RefObject<HTMLDivElement>
	handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void
	validateSession: (tipped: boolean) => void
}

export default function SessionConfirmationModal({
	setIsConfirmationModalOpen,
	hasRated,
	rating,
	setRating,
	onRateSession,
	tipFormField,
	handleInputChange,
	validateSession
}: SessionConfirmationModalProps) {
	return (
		<ConfirmationModal
			setIsConfirmationModalOpen={setIsConfirmationModalOpen}
		>
			{!hasRated ? (
				<div className="flex flex-col gap-2">
					<h4>Please rate your session :</h4>
					<RatingSystem rating={rating} setRating={setRating} />
					<div className="flex justify-center gap-2">
						<Button onClick={onRateSession} filled={true}>
							Rate
						</Button>
					</div>
				</div>
			) : (
				<div className="flex flex-col gap-2">
					<h4>Thank your mentor with a tip !</h4>
					<p>(Amount in USD will be converted to ETH)</p>
					<div
						ref={tipFormField}
						className="dark-input short flex items-center"
					>
						<input
							type="number"
							name="tipAmount"
							placeholder="5"
							min={0}
							onChange={handleInputChange}
						/>
						<span className="dollar-symbol">$</span>
					</div>
					<div className="flex justify-center gap-2">
						<Button
							onClick={() => {
								validateSession(false)
							}}
							filled={true}
						>
							Confirm
						</Button>
						<Button
							onClick={() => {
								validateSession(true)
							}}
							filled={true}
						>
							Tip and confirm
						</Button>
					</div>
				</div>
			)}
		</ConfirmationModal>
	)
}
