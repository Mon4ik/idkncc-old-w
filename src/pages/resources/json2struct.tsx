import ResourcePage from "@/components/ResourcePage";
import Link from "next/link";
import {useState} from "react";
import {func} from "prop-types";

export default function Json2struct() {
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

	function generateCode() {
		function isInt(n: number) {
			return n % 1 === 0;
		}
		function uppercaseFirstLetter(w: string) {
			return w.charAt(0).toUpperCase() + w.slice(1)
		}

		const typing_names = {
			"string": "String",
			"number": "Int",
			"boolean": "Bool",
		}

		function OBJ2Struct(name: string, o: Record<string, any>) {
			let code = ``
			let struct_code = []

			for (const [key, value] of Object.entries(o)) {
				let type = ""
				if (typeof value === "number") {
					if (isInt(value)) {
						type = "Int"
					} else {
						type = "Float"
					}
				} else if (typeof value === "object") {
					if (Array.isArray(value)) {
						const struct_name = uppercaseFirstLetter(key.slice(0, -1))
						type = `[${struct_name}]`
						code += OBJ2Struct(struct_name, value[0])
					} else {
						const struct_name = uppercaseFirstLetter(key)
						type = struct_name
						code += OBJ2Struct(struct_name, value)

					}
				} else {
					//@ts-ignore
					type = typing_names[(typeof value)]
				}

				struct_code.push(`\tvar ${key}: ${type}`)
			}

			return `struct ${name}: Codable {\n${struct_code.join("\n")}\n}\n\n${code}`
		}

		const obj = JSON.parse(json)
		setSwiftCode(OBJ2Struct("Json2Struct", obj))
	}

	return (
		<ResourcePage title={"json2struct"}>
			<div className="grid grid-cols-2 gap-2">
				<div>
					<p className="mt-5">JSON:</p>
					<textarea className="control w-full resize-none" rows={18}
							  value={json} onChange={(e) => setJSON(e.target.value)}
					/>
				</div>

				<div>
					<p className="mt-5">Swift Code:</p>
					<textarea className="control w-full resize-none" readOnly rows={18}
							  value={swiftCode}
					/>
				</div>
			</div>

			<button className="btn blue w-full mt-2" onClick={generateCode}>Сгенерировать</button>

		</ResourcePage>
	)
}
