import { Component, Prop, h, Host } from '@stencil/core';

@Component({
  tag: 'rk-tag',
  styleUrl: 'rk-tag.scss',
  shadow: true,
})
export class RkTag {
  @Prop() variant: 'default' | 'primary' = 'default';

  render() {
    return (
      <Host>
        <span class={{ tag: true, primary: this.variant === 'primary' }}>
          <slot />
        </span>
      </Host>
    );
  }
}
