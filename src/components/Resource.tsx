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
		<div className="p-4 border rounded-3xl flex flex-col justify-between dark:border-slate-600" {...props}>
			<div>
				<p className="font-semibold">{data.title}</p>
				<p className="italic font-light">{data.description}</p>
			</div>
			<Link href={data.url}>
				<button className="btn green mt-3 w-full">Перейти</button>
			</Link>
		</div>
	)
}