import {
	Component,
	Host,
	h,
	Prop,
	Element,
	EventEmitter,
	Event,
	Listen,
	State
} from '@stencil/core';
import { Theme, ThemeListener } from '../theme-root/utils';

const INTERACTABLE_TAG_NAMES = ['INPUT', 'TEXTAREA', 'SELECT', 'BUTTON', 'A'];

export type TextboxType = 'text' | 'password';
export type TextboxVariant = 'primary' | 'secondary' | 'tertiary';

let i = 0;

@Component({
	tag: 'input-textbox',
	styleUrl: 'input-textbox.scss',
	scoped: true
})
export class InputTextbox {
	@Element() el: HTMLInputTextboxElement;
	refLabel: HTMLLabelElement;
	refInput: HTMLInputElement;

	@Prop() group = `paperdave-textbox-${i++}`;
	@Prop({ reflect: true }) type: TextboxType = 'text';
	@Prop() label?: string;
	@Prop() name?: string;
	@Prop() placeholder?: string;
	@Prop({ reflect: true }) disabled = false;
	@Prop({ mutable: true }) value: string = '';
	@Prop({ mutable: true, reflect: true }) error = false;
	@Prop({ mutable: true, reflect: true }) focused = false;
	@Prop({ mutable: true }) revealed = false;

	@Event() valueChange: EventEmitter<string>;
	@Event() clearError: EventEmitter<void>;

	@State() labelX = 0;
	@State() theme: Theme;

	connectedCallback = ThemeListener.connectedCallback;
	disconnectedCallback = ThemeListener.disconnectedCallback;

	private handleFocus = () => {
		this.focused = true;
	};

	private handleBlur = (ev: FocusEvent) => {
		const relatedTarget = ev.relatedTarget as HTMLElement;
		if (relatedTarget) {
			let parent = relatedTarget.parentElement;
			while (parent) {
				if (parent === this.el) {
					relatedTarget.addEventListener('blur', this.handleRelatedBlur);
					return;
				}
				parent = parent.parentElement;
			}
		}
		this.focused = false;
		// dispatch('blur');
	};

	private handleRelatedBlur = (ev: FocusEvent) => {
		(ev.currentTarget as HTMLElement).removeEventListener('blur', this.handleRelatedBlur);
		this.handleBlur(ev);
	};

	private handleInput = () => {
		this.value = this.refInput.value;
		// dispatch('change', value ?? '');
		if (this.error) {
			this.error = undefined;
			this.clearError.emit();
		}
	};

	@Listen('click')
	handleClickFocus(ev: MouseEvent) {
		if (this.disabled) return;
		for (const elem of ev.composedPath()) {
			if (elem === this.el) {
				this.refInput.focus();
				return;
			}
			if (
				elem instanceof HTMLElement &&
				INTERACTABLE_TAG_NAMES.includes(elem.tagName) &&
				elem !== this.refInput
			) {
				this.focused = true;
				elem.addEventListener('blur', this.handleRelatedBlur);
				return;
			}
		}
	}

	componentDidLoad() {
		this.labelX = this.refLabel?.offsetLeft || 0;
		if (document.activeElement === this.refInput) {
			this.focused = true;
		}
		setTimeout(() => {
			this.el.setAttribute('init', '');
		}, 100);
	}

	render() {
		const expanded = this.focused || !!this.value;

		const bgLightness = this.theme.neutral.initialLightness!;
		const backgroundColor = this.theme.neutral.hexAt(bgLightness + (bgLightness > 50 ? +5 : -5));

		return (
			<Host expanded={expanded} style={{ backgroundColor }}>
				{this.label && <div class="cover">{this.label}</div>}

				<slot name="left" />
				<div class="main">
					{this.label && (
						<label
							htmlFor={this.group + '-input'}
							ref={(el) => (this.refLabel = el)}
							style={{
								'--offsetX': this.labelX ? `${this.labelX}px` : ''
							}}
							class={{
								expand: expanded && this.labelX === 0
							}}
						>
							{this.label}
						</label>
					)}
					<input
						id={this.group + '-input'}
						ref={(el) => (this.refInput = el)}
						type="text"
						value={this.value}
						placeholder={this.placeholder}
						disabled={this.disabled}
						name={this.name}
						onFocus={this.handleFocus}
						onInput={this.handleInput}
						onBlur={this.handleBlur}
					/>
				</div>
				<slot />
				{this.type === 'password' && (this.focused || this.revealed) && (
					<button type="button" class="reveal"></button>
				)}
				<slot name="right" />
			</Host>
		);
	}
}
