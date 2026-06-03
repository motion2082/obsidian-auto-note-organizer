import { AbstractInputSuggest, App, getAllTags } from 'obsidian';

export class TagSuggest extends AbstractInputSuggest<string> {
	private input: HTMLInputElement;

	constructor(app: App, input: HTMLInputElement) {
		super(app, input);
		this.input = input;
	}

	private getAllVaultTags(): string[] {
		const tags = new Set<string>();
		this.app.vault.getMarkdownFiles().forEach((file) => {
			const cache = this.app.metadataCache.getFileCache(file);
			if (cache) {
				getAllTags(cache)?.forEach((tag) => tags.add(tag));
			}
		});
		return [...tags].sort();
	}

	getSuggestions(inputStr: string): string[] {
		const lower = inputStr.toLowerCase();
		return this.getAllVaultTags().filter((tag) => tag.toLowerCase().contains(lower));
	}

	renderSuggestion(tag: string, el: HTMLElement): void {
		el.setText(tag);
	}

	selectSuggestion(tag: string, _evt: MouseEvent | KeyboardEvent): void {
		this.input.value = tag;
		this.input.trigger('input');
		this.close();
	}
}
