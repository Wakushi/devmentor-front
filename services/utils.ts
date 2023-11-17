import { useContext } from "react"
import { Engagement, engagements, teachingSubjects } from "./constants"
import { BlockchainContext } from "./blockchain/BlockchainContext"

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

function getTeachingSubjectLabel(subjectId: string) {
	return teachingSubjects[+subjectId]
}

function getLanguageLabel(languageId: number): string {
	const { languages } = useContext(BlockchainContext)
	return languages[languageId]?.label
}

function convertProxyResult(result: any) {
	return JSON.parse(JSON.stringify(result, replacer))
}

function getReadableDate(durationInSeconds: number): string {
	return new Date(durationInSeconds * 1000).toLocaleDateString()
}
export {
	getShortenedAddress,
	replacer,
	getEngagement,
	getTeachingSubjectLabel,
	convertProxyResult,
	getLanguageLabel,
	getReadableDate
}
