import { Component, Prop, Event, EventEmitter, h, State, Host } from '@stencil/core';

@Component({
  tag: 'rk-star-rating',
  styleUrl: 'rk-star-rating.scss',
  shadow: true,
})
export class RkStarRating {
  @Prop({ mutable: true }) value: number = 0;

  @Prop() readonly: boolean = false;

  @Prop() size: number = 20;

  @State() hovered: number = 0;

  @Event({ eventName: 'ratingchange' }) ratingChange!: EventEmitter<{ value: number }>;

  private setValue(v: number) {
    if (this.readonly) return;
    this.value = v;
    this.ratingChange.emit({ value: v });
  }

  render() {
    const display = this.hovered || this.value;
    return (
      <Host>
        <div
          class={{ stars: true, readonly: this.readonly }}
          style={{ fontSize: `${this.size}px` }}
          onMouseLeave={() => (this.hovered = 0)}
        >
          {[1, 2, 3, 4, 5].map((n) => (
            <span
              class={{ star: true, filled: n <= display }}
              onMouseEnter={() => !this.readonly && (this.hovered = n)}
              onClick={() => this.setValue(n)}
              role="button"
              aria-label={`Rate ${n} star${n > 1 ? 's' : ''}`}
            >
              ★
            </span>
          ))}
        </div>
      </Host>
    );
  }
}
