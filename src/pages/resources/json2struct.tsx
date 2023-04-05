import _ from "lodash"
import ResourcePage from "@/components/ResourcePage";
import {useRef, useState} from "react";

import Editor from "@monaco-editor/react";
import useLocalStorage from "@/utils/useLocalStorage";

export default function Json2struct() {
	const [isDark, setIsDark] = useLocalStorage("dark-mode", false)

	const [json, setJSON] = useState(`{
  "id": 1,
  "name": "Cute Quail",
  "comment": "Development Server",
  "created_at": "2021-02-25T11:04:15Z",
  "os": {
    "id": 1,
    "name": "bitrix",
    "version": "18.04"
  },
  "software": {
    "id": 1,
    "name": "name"
  },
  "preset_id": 11,
  "location": "ru-1",
  "configurator_id": 11,
  "boot_mode": "std",
  "status": "on",
  "start_at": "2022-10-25T15:15:45.000Z",
  "is_ddos_guard": false,
  "cpu": 16,
  "cpu_frequency": "3.3",
  "ram": 2048,
  "disks": [
    {
      "id": 1,
      "size": 10240,
      "used": 5120,
      "type": "nvme",
      "is_mounted": true,
      "is_system": true,
      "system_name": "vda",
      "status": "done"
    }
  ],
  "avatar_id": "avatar",
  "vnc_pass": "password",
  "networks": [
    {
      "type": "public",
      "nat_mode": "dnat_and_snat",
      "bandwidth": 200,
      "ips": [
        {
          "type": "ipv4",
          "ip": "0.0.0.0",
          "ptr": "ptr",
          "is_main": true
        }
      ],
      "is_ddos_guard": false
    }
  ]
}`)
	const [swiftCode, setSwiftCode] = useState("")
	const exampleRef = useRef<HTMLInputElement>(null)
	const addMarkRef = useRef<HTMLInputElement>(null)

	function generateCode() {
		function isInt(n: number) {
			return n % 1 === 0;
		}

		function uppercaseFirstLetter(w: string) {
			if (w.length === 2) {
				return w.toUpperCase()
			} else {
				return w.charAt(0).toUpperCase() + w.slice(1)
			}
		}

		const typing_names = {
			"string": "String",
			"number": "Int",
			"boolean": "Bool",
		}

		function OBJ2Struct(name: string, o: Record<string, any>) {
			let code = ``
			let struct_code: string[] = []
			let coding_keys: string[] = []

			for (const [key, value] of Object.entries(o)) {
				let type = ""
				if (typeof value === "number") {
					if (isInt(value)) {
						type = "Int"
					} else {
						type = "Double"
					}
				} else if (typeof value === "object") {
					if (Array.isArray(value)) {
						let struct_name = uppercaseFirstLetter(_.camelCase(key))
						if (key.endsWith("s")) {
							struct_name = uppercaseFirstLetter(_.camelCase(key.slice(0, -1)))
						}

						type = `[${struct_name}]`
						code += OBJ2Struct(struct_name, value[0])
					} else {
						const struct_name = uppercaseFirstLetter(_.camelCase(key))
						type = struct_name
						code += OBJ2Struct(struct_name, value)
					}
				} else {
					//@ts-ignore
					type = typing_names[(typeof value)]
				}

				struct_code.push(`var ${_.camelCase(key)}: ${type}`)
			}

			// adding camelCase instead of snake_case or etc
			let last_is_ok = false
			for (const key of Object.keys(o)) {
				if (key === _.camelCase(key)) {
					if (last_is_ok) {
						coding_keys[coding_keys.length - 1] = `${_.last(coding_keys)}, ${key}`
					} else {
						coding_keys.push(`case ${key}`)
						last_is_ok = true
					}
				} else {
					if (last_is_ok) {
						last_is_ok = false
					}

					coding_keys.push(`case ${_.camelCase(key)} = "${key}"`)
				}
			}

			if (exampleRef.current!.checked) {
				let fields = Object
					.entries(o)
					.map(([field, val]) => {
						let swiftval = `${val}`
						if (typeof val === "string") {
							swiftval = `"${val}"`
						} else if (typeof val === "object") {
							if (Array.isArray(val)) {
								let struct_name = uppercaseFirstLetter(_.camelCase(field))
								if (field.endsWith("s")) {
									struct_name = uppercaseFirstLetter(_.camelCase(field.slice(0, -1)))
								}

								swiftval = `[${struct_name}.example]`
							} else {
								const struct_name = uppercaseFirstLetter(_.camelCase(field))
								swiftval = `${struct_name}.example`
							}
						}

						return `${_.camelCase(field)}: ${swiftval}`
					})

				struct_code.push(``)
				struct_code.push(`static let example = ${name}(${fields.join(", ")})`)
			}


			// static let example = Server(id: <#T##Int#>, name: <#T##String#>, comment: <#T##String#>, createdAt: <#T##Date#>, os: <#T##OS#>, software: <#T##Software#>, presetID: <#T##Int#>, location: <#T##String#>, configuratorID: <#T##Int#>, bootMode: <#T##String#>, status: <#T##String#>, startAt: <#T##String#>, isDdosGuard: <#T##Bool#>, cpu: <#T##Int#>, cpuFrequency: <#T##String#>, ram: <#T##Int#>, disks: <#T##[Disk]#>, avatarID: <#T##String#>, vncPass: <#T##String#>, networks: <#T##[Network]#>)
			return (addMarkRef.current!.checked ? [
				`// MARK: - ${name}`
			] : []).concat([
				`struct ${name}: Codable {`,
				`	${struct_code.join("\n\t")}`,
				`	`,
				`	enum CodingKeys: String, CodingKey {`,
				`		${coding_keys.join("\n\t\t")}`,
				`	}`,
				`}`,
				``,
				`${code}`
			]).join("\n")
		}

		try {
			const obj = JSON.parse(json)
			setSwiftCode(OBJ2Struct("Json2Struct", obj))

			//@ts-ignore
		} catch (e: Error) {
			setSwiftCode(`// Error raised: \n//   ${e.message}`)
		}
	}

	return (
		<ResourcePage title={"json2struct"}>
			<div className="grid md:grid-cols-2 gap-5">
				<div>
					<p className="mt-5">JSON:</p>
					<Editor
						value={json}
						className="border p-2 rounded-xl"
						onChange={val => setJSON(val!)}
						theme={isDark ? "vs-dark" : "light"}
						
						defaultLanguage="json"
						height="60vh"
					/>
				</div>


				<div>
					<p className="mt-5">Swift Code:</p>
					<Editor
						value={swiftCode}
						className="border p-2 rounded-xl"
						options={{
							readOnly: true,
							minimap: {
								enabled: false,
							},
						}}
						theme={isDark ? "vs-dark" : "light"}
						defaultLanguage="swift"
						height="60vh"
					/>
				</div>
			</div>

			<p className="mt-2">Options:</p>
			<div className="grid grid-cols-3 gap-2 p-4 border rounded-2xl">
				<div>
					<input type="checkbox" className="mr-2" ref={exampleRef}/>
					<label>Add <code>example</code> static</label>
				</div>
				<div>
					<input type="checkbox" className="mr-2" ref={addMarkRef}/>
					<label>Add <code>{"// MARK: - Name"}</code> before structs</label>
				</div>
			</div>

			<button className="btn blue w-full mt-2" onClick={generateCode}>Generate</button>

		</ResourcePage>
	)
}
