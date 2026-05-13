import visit from 'unist-util-visit';

export default function remarkHighlight() {
	return (tree) => {
		visit(tree, 'text', (node, index, parent) => {
			const regex = /!!(.+?)!!/g;
			let match;
			const nodes = [];
			let lastIndex = 0;

			while ((match = regex.exec(node.value)) !== null) {
				if (match.index > lastIndex) {
					nodes.push({ type: 'text', value: node.value.slice(lastIndex, match.index) });
				}
				nodes.push({
					type: 'html',
					value: `<span class="blue-bold">${match[1]}</span>`
				});
				lastIndex = regex.lastIndex;
			}

			if (nodes.length > 0) {
				if (lastIndex < node.value.length) {
					nodes.push({ type: 'text', value: node.value.slice(lastIndex) });
				}
				parent.children.splice(index, 1, ...nodes);
			}
		});
	};
}
