import { AbstractInputSuggest, App, TAbstractFile, TFolder } from 'obsidian';

export class FolderSuggest extends AbstractInputSuggest<TFolder> {
	private input: HTMLInputElement;

	constructor(app: App, input: HTMLInputElement) {
		super(app, input);
		this.input = input;
	}

	getSuggestions(inputStr: string): TFolder[] {
		const lowerCaseInputStr = inputStr.toLowerCase();
		return this.app.vault
			.getAllLoadedFiles()
			.filter((f): f is TFolder => f instanceof TFolder && f.path.toLowerCase().contains(lowerCaseInputStr));
	}

	renderSuggestion(folder: TFolder, el: HTMLElement): void {
		el.setText(folder.path);
	}

	selectSuggestion(folder: TFolder, _evt: MouseEvent | KeyboardEvent): void {
		this.input.value = folder.path;
		this.input.trigger('input');
		this.close();
	}
}
