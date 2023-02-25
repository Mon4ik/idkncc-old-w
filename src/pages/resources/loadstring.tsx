import ResourcePage from "@/components/ResourcePage";
import Link from "next/link";
import {useState} from "react";

export default function Loadstring() {
	const [rawInput, setRawInput] = useState("https://pastebin.com/raw/p9GNPKUy")

	return (
		<ResourcePage title={"loadstring генератор"}>
			<input type="text" className="control w-full" placeholder="Ссылка на сырой текст (raw)" value={rawInput} onChange={(e) => setRawInput(e.target.value)}/>

			<p className="mt-5">Готовый код:</p>
			<textarea className="control w-full resize-none" readOnly value={`loadstring(game:HttpGet("${rawInput}"))()`}/>
		</ResourcePage>
	)
}
