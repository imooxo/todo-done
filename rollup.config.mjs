import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import postcss from "rollup-plugin-postcss";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import typescript from "rollup-plugin-typescript2";
import url from "@rollup/plugin-url";
import pkg from "./package.json" assert { type: "json" };

export default {
  input: "./src/index.tsx",
  output: [
    {
      file: "build/index.js", // CommonJS 번들 파일 경로
      format: "cjs",
      sourcemap: true,
    },
    {
      file: "build/index.esm.js", // ES Module 번들 파일 경로
      format: "esm",
      sourcemap: true,
    },
  ],
  plugins: [
    peerDepsExternal(),
    resolve(),
    babel({
      exclude: "node_modules/**",
      babelHelpers: "runtime",
	  extensions: ['.js', '.jsx', '.ts', '.tsx'],
    }),
    postcss({
      extensions: [".scss"],
      extract: true, // CSS 파일로 추출
      minimize: true, // CSS 최소화
      sourceMap: true, // 소스맵 생성
    }),
    commonjs(),
    typescript({ 
		useTsconfigDeclarationDir: true,
		tsconfigOverride: {
			compilerOptions: {
			  declaration: true,
			  declarationDir: 'build/types',
			},
		  },
		}),
    url(),
  ],
  external: Object.keys(pkg.peerDependencies || {}),
};
