import Link from "next/link";
import {GetServerSideProps} from "next";
import Resource, {Props as ResourceProps} from "@/components/Resource";
import {useEffect, useState} from "react";

type ResourceType = ResourceProps["data"]

export default function Home() {
	const [resources, setResources] = useState<ResourceType[]>([])
	const [foundResources, setFoundResources] = useState<ResourceType[]>([])
	const [search, setSearch] = useState("")

	useEffect(() => {
		(async () => {
			setResources(await fetch("/resources.json").then(res => res.json()))
			setFoundResources(resources)
		})()
	}, [])

	useEffect(() => {
		setFoundResources(resources.filter((r) => r.title.match(search) || search === ""))
	}, [resources, search])

	return (
		<div className="container mx-auto px-4">
			<div className="flex flex-row justify-between [line-height:36px]">
				<h1>Ресурсы</h1>
				<span>Разные сервисы, надеюсь полезные</span>
			</div>

			<hr/>

			<input type="text" className="control w-full" placeholder="Найти..."
				   value={search} onChange={(e) => setSearch(e.target.value)} />
			<div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mt-5">
				{foundResources.map((r, i) => (
					<Resource data={r} key={i}/>
				))}
			</div>
		</div>
	)
}
