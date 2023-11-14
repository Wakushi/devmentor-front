import { Engagement, engagements, teachingSubjects } from "./constants"

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

function getEngagement(engagementDuration: string) {
	return engagements.find(
		(engagement: Engagement) =>
			engagement.durationInSeconds === +engagementDuration
	)
}

function getTeachingSubjectLabel(subjectId: string) {
	return teachingSubjects[+subjectId]
}
export { getShortenedAddress, replacer, getEngagement, getTeachingSubjectLabel }
