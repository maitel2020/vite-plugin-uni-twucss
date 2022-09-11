const fs = require("fs");
const path = require("path")
const miniRules = require("./mini-rules.js")
const attributifyRules = require("./attributify-rules.js")
const {
	cr1,
	cr2,
	cr3,
	cr4,
	cr5
} = require("./css-rules.js")



// 默认是unocss
let source = "unocss";

function uniTwuCssPlugin(options) {
	let outDir = "";

	if (options) {
		source = options.source;
	}

	return {
		name: "vite:uni-twucss",
		apply: "build",

		config(config, mode) {
			if (mode.command === "build") {
				outDir = config.build.outDir;
			}
		},

		async transform(code, bundle) {
			code = code.replace(/<!--.*?-->/gms, "");

			// 修改:class=""里的
			if (outDir.includes("mp-weixin")) {
				// 把类似:class="[flag?'bg-red-900':'bg-[#fafa00]']"改成:class="[flag?'bg-red-900':'bg-fafa00']"
				return code.replace(/_n\(.*?'\)/g, (match) => {
					match = match.replace(/dark:/g, "dark--");
					return match.replace(/\[|]|#/g, "");
				});
			}

			//app有.nvue文件才修改
			if (outDir.includes(".nvue")) {
				return await rewriteStyleCss(code);
			}
		},

		async generateBundle(_, bundle) {
			const files = Object.keys(bundle);

			if (outDir.includes("mp-weixin") || outDir.includes("mp-qq")) {
				let codeFiles = null
				if (outDir.includes("mp-weixin")) {
					codeFiles = files.filter((i) => i.endsWith(".wxml"));
				}

				if (outDir.includes("mp-qq")) {
					codeFiles = files.filter((i) => i.endsWith(".qml"));
				}

				if (!codeFiles.length) return;

				for (const file of codeFiles) {
					const chunk = bundle[file];

					if (chunk.type === "asset" && typeof chunk.source === "string") {
						chunk.source = await updateWXCode(chunk.source);
					}
				}
			}
		},
		async writeBundle(options, bundle) {
			const files = Object.keys(bundle);
			if (outDir.includes("mp-weixin") || outDir.includes("mp-qq")) {
				let cssFiles = null;
				if (outDir.includes("mp-weixin")) {
					cssFiles = files.filter((i) => i.endsWith(".wxss"));
				}

				if (outDir.includes("mp-qq")) {
					cssFiles = files.filter((i) => i.endsWith(".qss"));
				}

				if (!cssFiles.length) return;

				for (const file of cssFiles) {
					const bundleChunk = bundle[file];
					const currentFile = outDir + "/" + bundleChunk.fileName;

					if (
						bundleChunk.type === "asset" &&
						typeof bundleChunk.source === "string"
					) {
						bundleChunk.source = await updateWXCss(bundleChunk.source);
						fs.writeFile(currentFile, bundleChunk.source, (errWF) => {
							if (errWF) {
								console.log(errWF);
							}
						});
					}
				}
			}

		},
	};
}

async function updateWXCss(css) {
	// 解决*
	css = css.replace(/\*,/g, "page,");
	css = css.replace(/\*\s*{/g, ":page{");

	// 解决.\!
	css = css.replace(/\.\\!/g, ".");

	// 解决[\!
	css = css.replace(/\[\\!/g, "[");

	// 解决\:
	css = css.replace(/\\:/g, "--");

	// 解决\/
	css = css.replace(/\\\//g, "--");

	// 解决\<
	css = css.replace(/\\</g, "");

	// 解决\.
	css = css.replace(/\\\./g, "--");

	// 解决类似.grid-cols-\[auto\2c 1fr\2c 30px\]改成.grid-cols-auto1fr30px
	css = css.replace(/(?<=(-|.))\\\[.*?]/g, (mItem) => {
		return mItem.replace(/2c|\[|\\|\.|]|\s|%|\(|\)|,/g, "");
	});


	// 解决{}错误包含@keyframes的问题
	css = css.replace(/{\s*.*?\s*}}\s*}/g, mItem => {
		let result
		mItem.replace(/@keyframes.*?}}/g, mItem1 => {

			result = mItem.replace(/(?<=}})\s*}/g, mItem2 => {
				return `}${mItem1}`
			})
		})
		return result.replace(/@keyframes.*?}}}/g, "}")
	})
	css = css.replace(/{\s*@keyframes.*?}}.*?\s}/g, mItem => {
		let result
		mItem.replace(/@keyframes.*?}}/g, mItem1 => {
			result = mItem.replace(/(?<=;)\s*}/g, mItem2 => {
				return `}${mItem1}`
			})
		})
		return result.replace(/@keyframes.*?}}/g, "")
	})

	// 解决{}错误包含@keyframes的问题

	// [text~="sm"]修改为[data-css-text~="sm"]
	css = css.replace(cr5, (mItem) => {
		return mItem.replace(mItem, "data-css-" + mItem);
	});


	// [rounded~="\35 0"]转成[rounded~="350"]
	// 官方不知为什么会多生成一个3，需要去掉
	css = css.replace(cr2, (mItem) => {
		mItem = mItem.replace(/\\/g, "")
		mItem = mItem.replace(/^3/g, "")
		return mItem.replace(/\s+/g, "")
	});


	//[m-2=""]转成[data-css-m-2="m-2"]
	css.replace(cr1, (mItem) => {
		let reg1 = new RegExp(`\\[${mItem}=""]`, "g");
		css = css.replace(reg1, `[data-css-${mItem}="${mItem}"]`);
	});



	// 修改>:not([hidden])~:not([hidden])
	css = css.replace(
		cr3,
		mItem => {
			mItem = mItem.replace(
				cr4,
				mItem1 => {
					return mItem.replace(/}*?}/g, mItem2 => {
						return `${mItem2}${mItem1}:first-child{margin:unset;}`
					})
				})
			mItem = mItem.replace(/}{\s*(.*\s)*}/g, mItem1 => {
				return `}`
			})
			return mItem.replace(
				/>\s*:not\(\[hidden]\)\s*~\s*:not\(\[hidden]\)/g,
				">view:not([hidden])"
			);
		})


	// 移除类似.bg-#00aaff中的#
	css = css.replace(/-#/g, "-");

	return await css;
}

async function updateWXCode(code) {

	code = code.replace(/dark:/g, "dark--");

	code = code.replace(/class=".*?"/g, (mItem) => {
		// return mItem.replace(/-#/g, "-");
		mItem = mItem.replace(/:/g, "--")
		mItem = mItem.replace(/\./g, "--")
		mItem = mItem.replace(/\//g, "--")
		// 移除类似.bg-#00aaff中的#
		return mItem.replace(/-#/g, "-")
	});


	// 解决类似.grid-cols-\[auto\2c 1fr\2c 30px\]改成.grid-cols-auto1fr30px
	code = code.replace(/-\[.*?]/g, (mItem) => {
		return mItem.replace(/2c|\[|\\|\.|]|\s|%|\(|\)|,/g, "");
	});


	// 只匹配<>或者</>里的内容
	// 如text="sm white"改成data-css-text="sm white"
	code = code.replace(/(?!<\/)<.*?\/?>/g, mItem => {
		for (let i = 0; i < attributifyRules.length; i++) {
			if (!attributifyRules[i].test(mItem)) {
				continue
			}
			mItem = mItem.replace(attributifyRules[i], mItem1 => {
				return `data-css-${mItem1}`
			})
		}
		return mItem.replace(/(data-css-)+/g, 'data-css-')
	})


	// 只匹配<>或者</>里的内容
	// 如<button m-2>替换成<button data-css-m-2="m-2">
	code = code.replace(/(?!<\/)<.*?\/?>/g, mItem => {
		return mItem.replace(/(?!<.*?)\s.*?(?=\/?>)/g, mItem1 => {
			let splitCla = mItem1.split(/(?<=[a-zA-Z]*-*[a-zA-z]+=".*?")\s/g)
			return splitCla.map(itemCla => {
				if (!/[a-zA-Z]*-*[a-zA-z]+=".*?"/g.test(itemCla.trim())) {
					let splitSpa = itemCla.trim().split(" ")
					return splitSpa.map(itemSpa => {
						for (let i = 0; i < miniRules.length; i++) {
							if (!miniRules[i].test(itemSpa.trim())) {
								continue
							}
							return itemSpa.trim().replace(
								miniRules[i], (mItem2) => {
									return ` data-css-${mItem2}="${mItem2}" `
								});
						}
					}).join(" ")
				} else {
					return ` ${itemCla} `
				}
			}).join(" ")
		})
	})

	return await code;
}

// 修改style里的样式
async function rewriteStyleCss(css) {

	let cssList = [],
		sourcePreFix = "--un";

	if (source !== "unocss") {
		sourcePreFix = "--tw";
	}

	css = css.replace(/(-webkit-)?mask-.*?;/g, "");
	css = css.replace(/mask:.*?no-repeat;/g, "");
	css = css.replace(/-webkit-background-color.*?;/g, "");
	// 移除keyframes
	css = css.replace(/@keyframes.*?}}/g, "");
	// 移除animate
	css = css.replace(/.animate-[a-z]+(-[a-z]*)*{.*?;}/g, "");
	// 移除animation
	css = css.replace(/animation-[a-z]+(-[a-z]*)*:[a-z]+;.*?;/g, "");

	css = css.replace(/display: -webkit-box;/g, "");
	css = css.replace(/display: -ms-flexbox;/g, "");
	css = css.replace(/display: -webkit-flex;/g, "");
	css = css.replace(/-webkit-box-align: center;/g, "");
	css = css.replace(/-ms-flex-align: center;/g, "");
	css = css.replace(/-webkit-align-items: center;/g, "");
	css = css.replace(/-webkit-box-pack: center;/g, "");
	css = css.replace(/-ms-flex-pack: center;/g, "");
	css = css.replace(/-webkit-justify-content: center;/g, "");
	css = css.replace(/-webkit-transform: scale\(\d+\);/g, "");
	css = css.replace(/-webkit-animation:.*?;/g, "");
	css = css.replace(/animation:.*?;/g, "");
	css = css.replace(/grid-template-columns:.*?;/g, "");
	css = css.replace(/-webkit-box-shadow:.*?;/g, "");
	css = css.replace(/text-align:.*?;/g, "");
	css = css.replace(/user-select:.*?;/g, "");
	css = css.replace(/white-space:.*?;/g, "");
	css = css.replace(/font-variant-numeric:.*?;/g, "");
	css = css.replace(/\.[a-zA-Z0-9]*>\s*:not\(\[hidden]\)\s*~\s*:not\(\[hidden]\){.*?}/g, "");


	css = css.replace(/flex:.*?;/g, mItem => {
		if (mItem.includes("%")) {
			return "flex: 1 !important;"
		}
		return mItem
	})


	css = css.replace(/transition-property:.*?;/g, mItem => {
		if (mItem.includes("all")) {
			return "transition-property: width,height,top,bottom,left,right,background-color,opacity,transform;"
		}
		return mItem
	})


	// 有多个值的情况
	let cssRegArr = [
		`${sourcePreFix}-bg-opacity`,
		`${sourcePreFix}-text-opacity`,
		`${sourcePreFix}-from-opacity`,
		`${sourcePreFix}-border-opacity`,
		`${sourcePreFix}-divide-opacity`,
	];

	cssRegArr.forEach((item) => {
		const cssReg1 = new RegExp(`(?<=${item}:).*?(?=;)`, "g");
		const cssReg2 = new RegExp(`var\\(${item}\\)`, "g");
		// 先匹配{}里的内容
		css.replace(/{.*?}/gms, (repCss) => {
			// 匹配--un-bg-opacity:1;中的1
			let mItemCss = repCss.match(cssReg1);
			if (mItemCss) {
				if (
					// opacity默认是1，不是1的基本是另写覆盖的
					!mItemCss.every((item) => {
						return item === "1";
					})
				) {
					// 当前有多个--un-bg-opacity时，最低的会排在后面，所以只取最后一个
					mItemCss.splice(0, mItemCss.length - 1);
				}

				// 目的是使--un-bg-opacity:1;和var(--un-bg-opacity)的个数一样，减少误差
				mItemCss.forEach((item) => {
					cssList.push(item);
				});
			}
		});
		// 匹配var(--un-bg-opacity)
		css.replace(cssReg2, (mItem) => {

			cssList.forEach((item) => {
				css = css.replace(mItem, item);

			});

		});
		cssList = [];
	});
	// 有多个值的情况



	let cssReg1 = new RegExp(`(?<=${sourcePreFix}-divide-x-reverse:).*?(?=;)`, );
	let cssReg2 = new RegExp(`var\\(${sourcePreFix}-divide-x-reverse\\)`, "g");
	css.replace(cssReg1, (mItem) => {
		css = css.replace(cssReg2, mItem);
	});

	cssReg1 = new RegExp(`(?<=var\\(${sourcePreFix}-empty,).*?(?=\\))`, "g");
	cssReg2 = new RegExp(`var\\(${sourcePreFix}-empty,.*?\\)`, "g");
	css.replace(cssReg1, (mItem) => {
		css = css.replace(cssReg2, mItem);
	});

	cssReg1 = new RegExp(`(?<=${sourcePreFix}-shadow-inset:).*?(?=;)`, "g");
	cssReg2 = new RegExp(`var\\(${sourcePreFix}-shadow-inset\\)`, "g");
	css.replace(cssReg1, (mItem) => {
		css = css.replace(cssReg2, mItem);
	});
	// -shadow-inset上面的条件会存在不成功，所以再次重新覆盖成默认的样式
	cssReg1 = new RegExp(`var\\(${sourcePreFix}-shadow-inset\\)`, "g");
	css = css.replace(cssReg1, "/*!*/ /*!*/");

	cssReg1 = new RegExp(`(?<=${sourcePreFix}-space-x-reverse:).*?(?=;)`, "g");
	cssReg2 = new RegExp(`var\\(${sourcePreFix}-space-x-reverse\\)`, "g");
	css.replace(cssReg1, (mItem) => {
		css = css.replace(cssReg2, mItem);
	});

	cssReg1 = new RegExp(`(?<=${sourcePreFix}-space-y-reverse:).*?(?=;)`, "g");
	cssReg2 = new RegExp(`var\\(${sourcePreFix}-space-y-reverse\\)`, "g");
	css.replace(cssReg1, (mItem) => {
		css = css.replace(cssReg2, mItem);
	});

	cssReg1 = new RegExp(`(?<=${sourcePreFix}-ring-width:).*?(?=;)`, "g");
	cssReg2 = new RegExp(`var\\(${sourcePreFix}-ring-width\\)`, "g");
	css.replace(cssReg1, (mItem) => {
		css = css.replace(cssReg2, mItem);
	});

	cssReg1 = new RegExp(`(?<=${sourcePreFix}-ring-color:).*?(?=;)`, "g");
	cssReg2 = new RegExp(`var\\(${sourcePreFix}-ring-color\\)`, "g");
	css.replace(cssReg1, (mItem) => {
		css = css.replace(cssReg2, mItem);
	});

	cssReg1 = new RegExp(`(?<=${sourcePreFix}-rotate-x:).*?(?=;)`, "g");
	cssReg2 = new RegExp(`var\\(${sourcePreFix}-rotate-x\\)`, "g");
	css.replace(cssReg1, (mItem) => {
		css = css.replace(cssReg2, mItem);
	});
	cssReg1 = new RegExp(`(?<=${sourcePreFix}-rotate-y:).*?(?=;)`, "g");
	cssReg2 = new RegExp(`var\\(${sourcePreFix}-rotate-y\\)`, "g");
	css.replace(cssReg1, (mItem) => {
		css = css.replace(cssReg2, mItem);
	});

	cssReg1 = new RegExp(`(?<=${sourcePreFix}-rotate-z:).*?(?=;)`, "g");
	cssReg2 = new RegExp(`var\\(${sourcePreFix}-rotate-z\\)`, "g");
	css.replace(cssReg1, (mItem) => {
		css = css.replace(cssReg2, mItem);
	});

	cssReg1 = new RegExp(`(?<=${sourcePreFix}-rotate:).*?(?=;)`, "g");
	cssReg2 = new RegExp(`var\\(${sourcePreFix}-rotate\\)`, "g");
	css.replace(cssReg1, (mItem) => {
		css = css.replace(cssReg2, mItem);
	});

	cssReg1 = new RegExp(`(?<=${sourcePreFix}-numeric-spacing:).*?(?=;)`, "g");
	cssReg2 = new RegExp(`var\\(${sourcePreFix}-numeric-spacing\\)`, "g");
	css.replace(cssReg1, (mItem) => {
		css = css.replace(cssReg2, mItem);
	});

	cssReg1 = new RegExp(`(?<=var\\(${sourcePreFix}-shadow-color,).*?\\)`, "g");
	cssReg2 = new RegExp(`var\\(${sourcePreFix}-shadow-color,.*?\\)\\)`, "g");
	css.replace(cssReg1, (mItem) => {
		css = css.replace(cssReg2, mItem);
	});

	cssReg1 = new RegExp(`(?<=var\\(${sourcePreFix}-ring-offset-shadow,).*?(?=\\))`, "g");
	cssReg2 = new RegExp(`var\\(${sourcePreFix}-ring-offset-shadow,.*?\\)`, "g");
	css.replace(cssReg1, (mItem) => {
		css = css.replace(cssReg2, mItem);
	});

	cssReg1 = new RegExp(`(?<=var\\(${sourcePreFix}-ring-shadow,).*?(?=\\))`, "g");
	cssReg2 = new RegExp(`var\\(${sourcePreFix}-ring-shadow,.*?\\)`, "g");
	css.replace(cssReg1, (mItem) => {
		css = css.replace(cssReg2, mItem);
	});

	cssReg1 = new RegExp(`(?<=${sourcePreFix}-shadow:).*?(?=;)`, "g");
	cssReg2 = new RegExp(`var\\(${sourcePreFix}-shadow\\)`, "g");
	css.replace(cssReg1, (mItem) => {
		css = css.replace(cssReg2, mItem);
	});

	cssReg1 = new RegExp(`(?<=${sourcePreFix}-icon:).*?\\)(?=;)`, "g");
	cssReg2 = new RegExp(`var\\(${sourcePreFix}-icon\\)`, "g");
	css.replace(cssReg1, (mItem) => {
		css = css.replace(cssReg2, mItem);
	});



	cssReg1 = new RegExp(`var\\(${sourcePreFix}-scale-x\\)`, "g");
	css = css.replace(cssReg1, '1');

	cssReg1 = new RegExp(`var\\(${sourcePreFix}-scale-y\\)`, "g");
	css = css.replace(cssReg1, '1');

	cssReg1 = new RegExp(`var\\(${sourcePreFix}-scale-z\\)`, "g");
	css = css.replace(cssReg1, '1');

	cssReg1 = new RegExp(`var\\(${sourcePreFix}-skew-x\\)`, "g");
	css = css.replace(cssReg1, '0');

	cssReg1 = new RegExp(`var\\(${sourcePreFix}-skew-y\\)`, "g");
	css = css.replace(cssReg1, '0');

	cssReg1 = new RegExp(`var\\(${sourcePreFix}-skew-z\\)`, "g");
	css = css.replace(cssReg1, '0');

	cssReg1 = new RegExp(`var\\(${sourcePreFix}-translate-x\\)`, "g");
	css = css.replace(cssReg1, '0');

	cssReg1 = new RegExp(`var\\(${sourcePreFix}-translate-y\\)`, "g");
	css = css.replace(cssReg1, '0');

	cssReg1 = new RegExp(`var\\(${sourcePreFix}-translate-z\\)`, "g");
	css = css.replace(cssReg1, '0');

	cssReg1 = new RegExp(`var\\(${sourcePreFix}-ring-offset-shadow\\)`, "g");
	css = css.replace(cssReg1, '0 0 rgba(0,0,0,0)');

	cssReg1 = new RegExp(`var\\(${sourcePreFix}-ring-shadow\\)`, "g");
	css = css.replace(cssReg1, '0 0 rgba(0,0,0,0)');

	cssReg1 = new RegExp(`var\\(${sourcePreFix}-ring-offset-width\\)`, "g");
	css = css.replace(cssReg1, '0px');

	cssReg1 = new RegExp(`var\\(${sourcePreFix}-ring-offset-color\\)`, "g");
	css = css.replace(cssReg1, '#fff');

	cssReg1 = new RegExp(`var\\(${sourcePreFix}-shadow\\)`, "g");
	css = css.replace(cssReg1, '0 0 rgba(0,0,0,0)');

	cssReg1 = new RegExp(`var\\(${sourcePreFix}-ring-inset\\)`, "g");
	css = css.replace(cssReg1, 'inset');

	cssReg1 = new RegExp(`var\\(${sourcePreFix}-ordinal\\)`, "g");
	css = css.replace(cssReg1, '');

	cssReg1 = new RegExp(`var\\(${sourcePreFix}-slashed-zero\\)`, "g");
	css = css.replace(cssReg1, '');

	cssReg1 = new RegExp(`var\\(${sourcePreFix}-numeric-figure\\)`, "g");
	css = css.replace(cssReg1, '');

	cssReg1 = new RegExp(`var\\(${sourcePreFix}-numeric-fraction\\)`, "g");
	css = css.replace(cssReg1, '');

	cssReg1 = new RegExp(`${sourcePreFix}-icon:.*?\\);`, "g");
	css = css.replace(cssReg1, "");

	css = css.replace(/\(.*?\)/g, mItem => {
		return mItem.replace(/\s*!important/g, "")
	});

	cssReg1 = new RegExp(`${sourcePreFix}-.*?;`, "g");

	css = css.replace(cssReg1, "");


	//nvue环境下，将tailwindcss的rgb转成rgba
	if (sourcePreFix === "--tw") {
		css.replace(/(?<=color:).*\)/gm, (mItem) => {
			css = css.replace(mItem, rgbToRgba(mItem));
		});
	}

	return await css;
}

// rgb转rgba
function rgbToRgba(color) {
	let r, g, b, a = 1;
	let rgbaAttr = color.match(/[\d.]+/g);

	if (rgbaAttr.length >= 3) {
		let r, g, b;
		r = rgbaAttr[0];
		g = rgbaAttr[1];
		b = rgbaAttr[2];
		if (rgbaAttr[3]) {
			a = rgbaAttr[3];
		}
		return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
	}
}

module.exports = uniTwuCssPlugin;
uniTwuCssPlugin["default"] = uniTwuCssPlugin;
