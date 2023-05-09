#!/usr/bin/env node
import {
	isCamelCase,
	isKebabCase,
	isLowerCase,
	isPascalCase,
	isPointCase,
	isScreamingSnakeCase,
	isSnakeCase,
} from "./rule-utils";
import fs from "node:fs";
import path from "node:path";

const CHECK_FUNCTIONS = {
	lowercase: isLowerCase,
	camelCase: isCamelCase,
	PascalCase: isPascalCase,
	snake_case: isSnakeCase,
	SCREAMING_SNAKE_CASE: isScreamingSnakeCase,
	"kebab-case": isKebabCase,
	"point.case": isPointCase,
};

type Rule = keyof typeof CHECK_FUNCTIONS;

type LintConfig = {
	rules: {
		[extension: string]: Rule[];
	};
	ignore: string[];
};

enum CheckResult {
	Pass = 0,
	Fail = 1,
	Ignore = 2,
}

main();

function main() {
	console.time("filename-lint");
	const filenames = process.argv.slice(2);
	const lintConfig = getLintConfig();
	const result = checkFilenames(filenames, lintConfig);
	console.timeEnd("filename-lint");

	if (result.fails.length > 0) {
		process.exit(1);
	} else {
		process.exit(0);
	}
}

function getLintConfig(): LintConfig {
	const cwd = process.cwd();
	const lintConfigPath = path.resolve(cwd, "filenamelintrc.json");
	const lintConfig = JSON.parse(fs.readFileSync(lintConfigPath, "utf-8"));
	return lintConfig;
}

function checkFilenames(
	filenames: string[],
	config: LintConfig,
): {
	fails: string[];
	ignores: string[];
} {
	const fails: string[] = [];
	const ignores: string[] = [];

	filenames.forEach((filename) => {
		const checkResult = checkFilename(filename, config.rules);

		if (checkResult === CheckResult.Fail) {
			fails.push(filename);
		} else if (checkResult === CheckResult.Ignore) {
			ignores.push(filename);
		}
	});

	return { fails, ignores };
}

function checkFilename(
	filename: string,
	rules: LintConfig["rules"],
): CheckResult {
	const matchedExt = Object.keys(rules).find((ext) => filename.endsWith(ext));

	if (!matchedExt) {
		return CheckResult.Ignore;
	}

	const basename = path.basename(filename, matchedExt);

	const isMatchAnyRule = rules[matchedExt].some((rule) => {
		const isMatchRule = CHECK_FUNCTIONS[rule](basename);
		return isMatchRule;
	});

	if (isMatchAnyRule) {
		return CheckResult.Pass;
	} else {
		console.log(`Fail ${filename} ${rules[matchedExt]}`);
		return CheckResult.Fail;
	}
}
