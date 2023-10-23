import minimist from "minimist";

let isDebug = false;
let args = minimist(process.argv.slice(2));
if (args.d)
	isDebug = true;

export { isDebug };


type DebugTypes = "info" | "warn" | "error";

export async function debugPrint(type: DebugTypes, ...args: any[]) {
	const emoji: { [key in DebugTypes]: string } = { info: "ℹ️", warn: "⚠️", error: "❌" };

	if (isDebug) {
		console.log(`[DEBUG ${emoji[type]}]`)
		console.log(...args);
	}
}

export async function debugExecute(fn: Function) {
	if (isDebug) {
		fn();
	}
}

