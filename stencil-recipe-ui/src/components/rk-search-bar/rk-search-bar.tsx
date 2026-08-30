import { Component, Prop, Event, EventEmitter, h, State, Watch, Host } from '@stencil/core';

@Component({
  tag: 'rk-search-bar',
  styleUrl: 'rk-search-bar.scss',
  shadow: true,
})
export class RkSearchBar {
  @Prop() placeholder: string = 'Search recipes…';

  @Prop({ mutable: true }) value: string = '';

  @Prop() debounce: number = 400;

  @State() internalValue: string = this.value;
  private debounceTimer: any;

  @Event({ eventName: 'search' }) search!: EventEmitter<{ query: string }>;

  @Watch('value')
  watchValue(newVal: string) {
    this.internalValue = newVal;
  }

  private onInput = (ev: InputEvent) => {
    const target = ev.target as HTMLInputElement;
    this.internalValue = target.value;
    clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout(() => {
      this.search.emit({ query: this.internalValue.trim() });
    }, this.debounce);
  };

  private onSubmit = (ev: Event) => {
    ev.preventDefault();
    clearTimeout(this.debounceTimer);
    this.search.emit({ query: this.internalValue.trim() });
  };

  render() {
    return (
      <Host>
        <form class="bar" onSubmit={this.onSubmit}>
          <span class="icon">🔍</span>
          <input
            type="search"
            value={this.internalValue}
            placeholder={this.placeholder}
            onInput={this.onInput}
            aria-label="Search recipes"
          />
          <button type="submit">Search</button>
          <slot name="actions" />
        </form>
      </Host>
    );
  }
}
