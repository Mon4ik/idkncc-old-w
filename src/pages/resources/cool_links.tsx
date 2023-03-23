import ResourcePage from "@/components/ResourcePage";
import Link from "next/link";
import {useEffect, useState} from "react";

type CoolLink = {
	title: string
	url: string
}

export default function Loadstring() {
	const [links, setLinks] = useState<CoolLink[]>([])

	useEffect(() => {
		fetch("/links.json")
			.then((res) => res.json())
			.then((j) => setLinks(j))
	}, [])

	return (
		<ResourcePage title="Прикольные ссылки">
			<div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
				{links.map((l, i) => (
					<Link href={l.url} key={i}>
						<button className="btn green w-full">{l.title}</button>
					</Link>
				))}
			</div>
		</ResourcePage>
	)
}
