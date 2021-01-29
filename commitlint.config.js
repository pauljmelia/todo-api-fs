module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "header-max-length": [2, "always", 144],
    "type-enum": [
      2,
      "always",
      [
        "build",
        "bug",
        "chore",
        "ci",
		"config",
        "docs",
        "feat",
        "fix",
        "perf",
        "refactor",
        "revert",
        "style",
        "test",
      ],
    ],
  },
};
