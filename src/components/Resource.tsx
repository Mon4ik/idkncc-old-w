import Link from "next/link";
import {PropsWithChildren} from "react";

export type Props = {
	data: {
		title: string
		description: string
		url: string
	},
	key?: any
} & PropsWithChildren

export default function Resource({data, ...props}: Props) {
	return (
		<div className="p-4 border rounded-3xl" {...props}>
			<p className="font-semibold">{data.title}</p>
			<p className="italic font-light">{data.description}</p>
			<Link href={data.url}>
				<button className="btn green mt-3 w-full">Перейти</button>
			</Link>
		</div>
	)
}