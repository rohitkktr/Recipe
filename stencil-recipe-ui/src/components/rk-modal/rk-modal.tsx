import { Component, Prop, Event, EventEmitter, h, Host } from '@stencil/core';

@Component({
  tag: 'rk-modal',
  styleUrl: 'rk-modal.scss',
  shadow: true,
})
export class RkModal {
  @Prop() open: boolean = false;

  @Prop() label: string = 'Dialog';

  @Event({ eventName: 'modalclose' }) modalClose!: EventEmitter<void>;

  private onBackdrop = (ev: MouseEvent) => {
    if (ev.target === ev.currentTarget) this.modalClose.emit();
  };

  render() {
    if (!this.open) return null;
    return (
      <Host>
        <div class="backdrop" onClick={this.onBackdrop}>
          <div class="dialog" role="dialog" aria-modal="true" aria-label={this.label}>
            <div class="header">
              <slot name="header" />
              <button class="close" onClick={() => this.modalClose.emit()} aria-label="Close dialog">
                ✕
              </button>
            </div>
            <div class="body">
              <slot />
            </div>
            <div class="footer">
              <slot name="footer" />
            </div>
          </div>
        </div>
      </Host>
    );
  }
}
