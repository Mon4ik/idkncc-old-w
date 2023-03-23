import ResourcePage from "@/components/ResourcePage";
import Link from "next/link";
import {useEffect, useState} from "react";

export default function Loadstring() {
	const [webhook, setWebhook] = useState("")
	const [started, setStarted] = useState(false)

	// not finished yet
	// so no references to it
	// ignore this

	useEffect(() => {
		setInterval(async () => {
			console.log("tryna ", started)
			if (!started) {
				return;
			}

			await fetch(webhook, {
				method: "POST",
				body: JSON.stringify({
					"content": "@everyone @here L\n**Webhook has been found**\n\nhttps://media.tenor.com/R51AQMAeR-0AAAAC/fnaf-thanos-l-dance.gif\nhttps://media.tenor.com/VTPEAbrZ9VIAAAAC/thanos-dance.gif",
					"username": "L BOZO",
					"avatar_url": "https://media.tenor.com/ZUy3LFGTfoUAAAAM/breaking-bad-saul-goodman.gif"
				}),
				headers: {
					"Content-Type": "application/json",
					// 'Content-Type': 'application/x-www-form-urlencoded',
				}
			})
		}, 2000)
	}, [])

	return (
		<ResourcePage title={"L Bozo Webhook"}>
			<input type="text" className="control w-full" placeholder="Ссылка на вебхук в дискорде"
				   value={webhook}
				   onChange={(e) => setWebhook(e.target.value)}/>

			<button className={`btn ${started ? "red" : "green"} w-full mt-2`}
					onClick={() => setStarted(!started)}>
				{ started ? "Отменить" : "Начать" }
			</button>
		</ResourcePage>
	)
}
