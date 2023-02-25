import Link from "next/link";
import {PropsWithChildren} from "react";

type Props = {
	title: string
} & PropsWithChildren

export default function Resource(props: Props) {
	return (
		<div className="container mx-auto px-4">
			<div className="flex flex-row [line-height:36px]">
				<Link href="/resources"><h1 className="w-fit">Ресурсы</h1></Link>
				<p className="text-3xl ml-1">{` / ${props.title}`}</p>
			</div>
			<hr/>
			{props.children}
		</div>
	)
}