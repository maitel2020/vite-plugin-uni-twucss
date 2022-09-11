
const cr1 = /(?<=\[)([a-zA-Z]*)?(-[a-zA-Z]*)?(-[a-zA-Z]*)?(-[a-zA-Z]*)?(-[a-zA-Z]*)?(-[a-zA-Z]*)?(?==""])/g
const cr2 = /(?<=\[([a-zA-Z]*)?(-[a-zA-Z]*)?(-[a-zA-Z]*)?(-[a-zA-Z]*)?(-[a-zA-Z]*)?(-[a-zA-Z]*)?~=").*?(?="])/g
const cr3 =/\.(sm|md|lg|xl)?(-*)?space-[xy]-[0-9]+([a-zA-Z]*)?\s*>\s*:not\(\[hidden]\)\s*~\s*:not\(\[hidden]\)\s*{\s*(.*\s)*}/g
const cr4 =/\.(sm|md|lg|xl)?(-*)?space-[xy]-[0-9]+([a-zA-Z]*)?\s*>\s*:not\(\[hidden]\)\s*~\s*:not\(\[hidden]\)\s*(?={\s*(.*\s)*})/g
const cr5 =/([a-z]*-*)?(align|animate|backdrop|bg|border|box|container|content|cursor|display|filter|flex|font|gap|grid|h|justify|list|m|opacity|order|outline|overflow|p|ring|select|shadow|space|table|text|transform|transition|underline|w|z|rounded)~=/g
module.exports = {
	cr1,
	cr2,
	cr3,
	cr4,
	cr5
}
