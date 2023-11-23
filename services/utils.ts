import { Session } from "./blockchain/SessionContext"
import { Engagement, engagements, levels, teachingSubjects } from "./constants"

function getShortenedAddress(address: string): string {
	return address ? address.slice(0, 6) + "..." + address.slice(-4) : address
}

function replacer(_: any, value: any) {
	if (typeof value === "bigint") {
		return value.toString()
	} else {
		return value
	}
}

function getEngagement(engagementDuration: number) {
	return engagements.find(
		(engagement: Engagement) =>
			engagement.durationInSeconds === +engagementDuration
	)
}

function getLevelLabel(levelId: number) {
	return levels[levelId]
}

function getTeachingSubjectLabel(subjectId: number) {
	return teachingSubjects[subjectId]
}

function convertProxyResult(result: any) {
	return JSON.parse(JSON.stringify(result, replacer))
}

function getReadableDate(durationInSeconds: number): string {
	return new Date(durationInSeconds * 1000).toLocaleDateString()
}

function isAddressZero(address: string) {
	return address === "0x0000000000000000000000000000000000000000"
}

function isSessionOver(currentTimestamp: number, session: Session) {
	return (
		session?.engagement?.durationInSeconds &&
		session?.startTime + session?.engagement?.durationInSeconds <
			currentTimestamp
	)
}
export {
	getShortenedAddress,
	replacer,
	getEngagement,
	getTeachingSubjectLabel,
	convertProxyResult,
	getReadableDate,
	isAddressZero,
	getLevelLabel,
	isSessionOver
}
