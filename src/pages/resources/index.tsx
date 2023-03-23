import Link from "next/link";
import {GetServerSideProps} from "next";
import Resource, {Props as ResourceProps} from "@/components/Resource";
import React, {useEffect, useState} from "react";
import Layout from "@/components/Layout";

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
		setFoundResources(
			resources.filter((r) =>
				r.title.toLowerCase().match(search.toLowerCase()) ||
				search === ""
			)
		)
	}, [resources, search])

	return (
		<Layout>
			<div className="container mx-auto px-4">
				<div className="flex flex-row justify-between [line-height:36px]">
					<div className="flex flex-row gap-2">
						<Link href="/">{"<"} Назад</Link>
						<h1 className="w-fit">Ресурсы</h1>

					</div>
					<span>Разные сервисы, надеюсь полезные</span>
				</div>

				<hr/>

				<input type="text" className="control w-full" placeholder="Найти..."
					   value={search} onChange={(e) => setSearch(e.target.value)}/>
				<div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mt-5">
					{foundResources.map((r, i) => (
						<Resource data={r} key={i}/>
					))}
				</div>
			</div>
		</Layout>

	)
}
